// Configuration Astro — https://docs.astro.build/en/reference/configuration-reference/
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';

// Adresse publique du site (sert aux liens absolus : partage, plan du site, QR code du CV).
const site = process.env.SITE_URL ?? 'https://portfolio-mamadou-bailo-barry.mounabarry620.workers.dev';
// Sous-dossier éventuel (ex. "/My_Portfolio" sur GitHub Pages). À la racine sur Vercel.
const base = process.env.BASE_PATH ?? '/';

const fontsource = fontProviders.fontsource();
/** Une famille de polices par thème : la typographie change avec l'ambiance. */
const police = (name, cssVariable, weights, fallbacks) => ({
  provider: fontsource,
  name,
  cssVariable,
  weights: [weights],
  styles: ['normal'],
  subsets: ['latin', 'latin-ext'],
  fallbacks,
});

/**
 * Petite intégration maison : après la construction, écrit le service worker (dist/sw.js)
 * avec la liste des pages et des ressources à garder pour le mode hors connexion.
 */
function horsConnexion() {
  let prefixe = '';
  const lister = async (dossier, racine = dossier) => {
    const entrees = await readdir(dossier, { withFileTypes: true });
    const fichiers = await Promise.all(
      entrees.map((e) => {
        const chemin = join(dossier, e.name);
        return e.isDirectory() ? lister(chemin, racine) : [relative(racine, chemin).split(sep).join('/')];
      }),
    );
    return fichiers.flat();
  };
  return {
    name: 'hors-connexion',
    hooks: {
      'astro:config:done': ({ config }) => {
        prefixe = config.base.replace(/\/+$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        const racine = fileURLToPath(dir);
        const fichiers = await lister(racine);
        const pages = fichiers
          .filter((f) => f.endsWith('index.html'))
          .map((f) => `${prefixe}/${f.replace(/index\.html$/, '')}`);
        const ressources = fichiers
          .filter((f) => /^_astro\/[^/]+\.(css|js)$/.test(f) || /^(favicon\.svg|manifest\.webmanifest|404\.html)$/.test(f))
          .map((f) => `${prefixe}/${f}`);
        // Polices : seulement les fichiers de l'alphabet latin de base (repérés dans le CSS généré).
        const accueil = await readFile(join(racine, 'index.html'), 'utf8');
        const polices = [...accueil.matchAll(/@font-face\s*\{[^}]*\}/g)]
          .map((m) => m[0])
          .filter((regle) => /unicode-range:\s*U\+0{1,4}-0{0,2}FF/i.test(regle))
          .map((regle) => /url\(["']?([^"')]+\.woff2)/.exec(regle)?.[1])
          .filter(Boolean);
        const precache = [...new Set([...pages, ...ressources, ...polices])].sort();
        const version = createHash('sha256')
          .update(JSON.stringify(precache) + Date.now())
          .digest('hex')
          .slice(0, 10);
        const modele = await readFile(new URL('./src/sw.js', import.meta.url), 'utf8');
        await writeFile(
          join(racine, 'sw.js'),
          modele
            .replace("'__VERSION__'", JSON.stringify(version))
            .replace("'__BASE__'", JSON.stringify(prefixe))
            .replace("'__PRECACHE__'", JSON.stringify(precache)),
        );
        logger.info(`sw.js écrit : ${precache.length} adresses en pré-cache (version ${version}).`);
      },
    },
  };
}

/**
 * Ancienne adresse Vercel : quand le site est construit SUR Vercel (variable VERCEL=1),
 * chaque page est remplacée par une page qui renvoie aussitôt vers la même adresse sur
 * Cloudflare. Les CV, lettres et QR codes déjà envoyés continuent donc de marcher.
 * Le service worker de l'ancienne adresse est remplacé par un script qui se désinstalle.
 */
function redirectionVercel() {
  return {
    name: 'redirection-vercel',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (process.env.VERCEL !== '1') return;
        const racine = fileURLToPath(dir);
        const pages = [];
        const parcourir = async (dossier) => {
          for (const e of await readdir(dossier, { withFileTypes: true })) {
            const chemin = join(dossier, e.name);
            if (e.isDirectory()) await parcourir(chemin);
            else if (e.name.endsWith('.html')) pages.push(chemin);
          }
        };
        await parcourir(racine);
        // Anciennes adresses de la version 1 (liens dans de vieux CV).
        const anciennes = { 'cv/fr': '/cv/', 'cv/en': '/en/cv/', personal: '/' };
        for (const [ancienne, nouvelle] of Object.entries(anciennes)) {
          await mkdir(join(racine, ancienne), { recursive: true });
          pages.push([join(racine, ancienne, 'index.html'), nouvelle]);
        }
        for (const entree of pages) {
          const [page, force] = Array.isArray(entree) ? entree : [entree, null];
          let chemin = force ?? '/' + relative(racine, page).split(sep).join('/');
          chemin = chemin.endsWith('/404.html') ? '/' : chemin.replace(/index\.html$/, '');
          const cible = new URL(chemin, site).href;
          await writeFile(
            page,
            `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Le portfolio a déménagé</title>` +
              `<link rel="canonical" href="${cible}"><meta name="robots" content="noindex">` +
              `<meta http-equiv="refresh" content="0;url=${cible}">` +
              `<script>location.replace(${JSON.stringify(cible)} + location.search + location.hash)</script></head>` +
              `<body><p>Le portfolio a déménagé : <a href="${cible}">${cible}</a></p></body></html>`,
          );
        }
        await writeFile(
          join(racine, 'sw.js'),
          "self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.registration.unregister()));",
        );
        logger.info(`${pages.length} pages remplacées par une redirection vers ${site}.`);
      },
    },
  };
}

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    // Thème « Arles » : serif chaleureuse pour les titres, sans-serif nette pour le texte
    police('Fraunces', '--police-fraunces', '300 900', ['Georgia', 'serif']),
    police('Instrument Sans', '--police-instrument', '400 700', ['Arial', 'sans-serif']),
    // Thème « Marseille » : grotesque contemporaine (titres et texte)
    police('Bricolage Grotesque', '--police-bricolage', '300 800', ['Arial', 'sans-serif']),
    // Thème « Conakry » : titres larges et affirmés
    police('Syne', '--police-syne', '500 800', ['Arial', 'sans-serif']),
    police('DM Sans', '--police-dmsans', '300 800', ['Arial', 'sans-serif']),
    // Thème « Machine » : chasse fixe, comme dans un terminal
    police('JetBrains Mono', '--police-jetbrains', '300 800', ['Courier New', 'monospace']),
    // CV : les deux polices de mon CV de stage
    police('Raleway', '--police-raleway', '300 800', ['Arial', 'sans-serif']),
    police('Yanone Kaffeesatz', '--police-yanone', '300 700', ['Arial Narrow', 'sans-serif']),
  ],
  integrations: [horsConnexion(), redirectionVercel()],
  build: {
    // Le CSS (une douzaine de Ko compressés) est placé dans chaque page :
    // le navigateur peut afficher sans attendre un second fichier.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
