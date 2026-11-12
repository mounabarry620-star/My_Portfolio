/**
 * Régénère toutes les images tirées du site lui-même, pour qu'elles suivent chaque modification :
 *  - src/assets/projets/portfolio-v2.webp         (accueil, thème Arles)
 *  - src/assets/projets/portfolio-v2-themes.webp  (mosaïque des 4 thèmes)
 *  - public/og/partage-fr.jpg, partage-en.jpg     (aperçu du lien sur LinkedIn, WhatsApp…)
 *  - public/cv/CV_Mamadou_Bailo_Barry_FR.pdf, _EN.pdf
 *
 * Ne pas lancer seul : utiliser « npm run maj », qui construit le site, lance ce script,
 * puis reconstruit le site avec les nouvelles images.
 * Il faut Google Chrome ou Chromium sur l'ordinateur.
 */
import { spawnSync } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import http from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const racine = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(racine, 'dist');
const seulementCv = process.argv.includes('--cv');
if (!existsSync(join(dist, 'index.html'))) {
  console.error("Le dossier dist/ est absent : lance d'abord « npm run build » (ou « npm run maj »).");
  process.exit(1);
}
const chrome = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  .map((nom) => spawnSync('which', [nom], { encoding: 'utf8' }).stdout.trim())
  .find(Boolean);
if (!chrome) {
  console.error('Google Chrome ou Chromium est introuvable.');
  process.exit(1);
}

// Petit serveur local pour dist/
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.pdf': 'application/pdf' };
const serveur = http.createServer((req, res) => {
  let f = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!f.startsWith(dist) || !existsSync(f)) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { 'content-type': types[extname(f)] ?? 'application/octet-stream' });
  createReadStream(f).pipe(res);
});
await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${serveur.address().port}`;

const navigateur = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await navigateur.newPage();
const ouvrir = async (chemin, largeur, hauteur, echelle = 2) => {
  await page.setViewport({ width: largeur, height: hauteur, deviceScaleFactor: echelle });
  await page.goto(base + chemin, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { scrollbar-gutter: auto !important; } .billet__badge-texte { animation: none !important; }' });
  await new Promise((r) => setTimeout(r, 2800));
};

try {
  if (!seulementCv) {
    // 1. Captures du portfolio
    const vues = {};
    for (const t of ['arles', 'marseille', 'conakry', 'machine']) {
      await ouvrir(`/?theme=${t}&lecture=simple`, 1440, 810);
      vues[t] = await page.screenshot();
    }
    const assets = join(racine, 'src/assets/projets');
    await sharp(vues.arles).resize({ width: 2400 }).webp({ quality: 88, effort: 6 }).toFile(join(assets, 'portfolio-v2.webp'));
    const L = 1200, H = 675, F = 8;
    const tuiles = await Promise.all(['arles', 'marseille', 'conakry', 'machine'].map((t) => sharp(vues[t]).resize(L, H).toBuffer()));
    await sharp({ create: { width: 2 * L + F, height: 2 * H + F, channels: 3, background: '#1b1b1b' } })
      .composite(tuiles.map((input, i) => ({ input, left: (i % 2) * (L + F), top: Math.floor(i / 2) * (H + F) })))
      .webp({ quality: 86, effort: 6 })
      .toFile(join(assets, 'portfolio-v2-themes.webp'));
    console.log('✓ captures du portfolio');

    // 2. Images de partage (1200 × 630)
    const sousTitres = {
      fr: 'Développeur logiciel et web · BUT Informatique, IUT d’Aix-Marseille',
      en: 'Software and web developer · BUT in Computer Science, IUT Aix-Marseille',
    };
    for (const l of ['fr', 'en']) {
      await ouvrir(`${l === 'fr' ? '/' : '/en/'}?theme=arles&lecture=simple`, 1200, 630);
      await page.addStyleTag({ content: `
        .entete, .evitement, .hero__accroche, .hero__actions, .depart__case--jours { display: none !important; }
        .hero { min-block-size: 630px !important; block-size: 630px; padding-block: 0 !important; }
        .hero__grille { align-items: center; width: calc(100% - 144px) !important; grid-template-columns: minmax(0, 1fr) 330px !important; gap: 56px !important; }
        .hero__billet { zoom: 0.72; }
        .hero__fond { mask-image: none !important; -webkit-mask-image: none !important; }
        .hero__texte { gap: 26px !important; }
        .og-sous { font-family: var(--f-etiquette); font-size: 25px; font-weight: 600; line-height: 1.35; color: var(--encre-2); max-width: 600px; margin: 0; }
        .depart { font-size: 19px !important; } .hero__salut { font-size: 24px !important; }
        * { animation-delay: 0s !important; animation-duration: 0.01s !important; }
        .hero__mots { animation: none !important; transform: translateY(-20%) !important; }` });
      await page.evaluate((txt) => {
        const p = document.createElement('p');
        p.className = 'og-sous';
        p.textContent = txt;
        document.querySelector('.hero__nom').after(p);
      }, sousTitres[l]);
      await new Promise((r) => setTimeout(r, 1200));
      const image = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
      await sharp(image).resize(1200, 630).jpeg({ quality: 88, mozjpeg: true }).toFile(join(racine, `public/og/partage-${l}.jpg`));
    }
    console.log('✓ images de partage');
  }

  // 3. CV en PDF (A4, une page)
  for (const [chemin, nom] of [['/cv/', 'FR'], ['/en/cv/', 'EN']]) {
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
    await page.goto(base + chemin, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: join(racine, `public/cv/CV_Mamadou_Bailo_Barry_${nom}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
  }
  console.log('✓ CV en PDF');
} finally {
  await navigateur.close();
  serveur.close();
}
