/**
 * Comportements communs à toutes les pages. Tout est optionnel : sans JavaScript,
 * le site reste lisible et navigable (liens, contenus, CV).
 */
import { changerLecture, changerTheme, initialiserPreferences, type Lecture, type Theme } from './preferences';
import { initialiserAssistant } from './assistant';

const $ = <T extends Element = HTMLElement>(sel: string, racine: ParentNode = document) => racine.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, racine: ParentNode = document) => [
  ...racine.querySelectorAll<T>(sel),
];

/* ------------------------------------------------------------ En-tête */
function initialiserEntete() {
  const entete = $('[data-entete]');
  if (!entete) return;

  // Filet sous l'en-tête dès que la page a défilé. Un repère invisible en haut de page
  // prévient quand il sort de l'écran : aucune mesure à chaque défilement.
  const repere = document.createElement('div');
  repere.style.cssText = 'position:absolute;inset:0 auto auto 0;inline-size:1px;block-size:8px;pointer-events:none';
  document.body.prepend(repere);
  new IntersectionObserver(([entree]) => entete.toggleAttribute('data-defile', !entree?.isIntersecting)).observe(repere);

  // Arrêt en cours sur le plan de ligne : la section qui traverse le milieu de l'écran.
  const arrets = new Map($$<HTMLAnchorElement>('[data-arret]').map((a) => [a.dataset.arret!, a]));
  const zones = $$('[data-section]');
  if (zones.length && arrets.size) {
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).dataset.section!;
          for (const [cle, a] of arrets) {
            if (cle === id) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          }
          document.documentElement.dataset.sectionActive = id;
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    zones.forEach((z) => observateur.observe(z));
  }

  // Lien de langue : on arrive sur la même section dans l'autre langue.
  const lienLangue = $<HTMLAnchorElement>('[data-lien-langue]');
  lienLangue?.addEventListener('click', () => {
    const id = document.documentElement.dataset.sectionActive;
    if (id && zones.length) lienLangue.hash = id;
  });
}

/* --------------------------------------------------------- Menu mobile */
function initialiserMenu() {
  const menu = $<HTMLDialogElement>('[data-menu]');
  if (!menu) return;
  $('[data-ouvrir-menu]')?.addEventListener('click', () => menu.showModal());
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('[data-fermer-menu]')) menu.close();
  });
}

/* ------------------------------------------- Apparitions au défilement */
function initialiserApparitions() {
  const elements = $$('[data-revele]');
  if (!elements.length) return;
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('vu'));
    return;
  }
  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('vu');
        observateur.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  elements.forEach((el) => observateur.observe(el));
}

/* -------------------------------------------------- Copier une adresse */
async function copier(texte: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    return false;
  }
}

function initialiserCopie() {
  document.addEventListener('click', async (e) => {
    const bouton = (e.target as Element).closest<HTMLElement>('[data-copier]');
    if (!bouton) return;
    const ok = await copier(bouton.dataset.copier!);
    if (!ok) return;
    const libelle = $('[data-copier-libelle]', bouton);
    const initial = libelle?.textContent ?? '';
    bouton.setAttribute('data-copie', '');
    if (libelle && bouton.dataset.copieTexte) libelle.textContent = bouton.dataset.copieTexte;
    setTimeout(() => {
      bouton.removeAttribute('data-copie');
      if (libelle) libelle.textContent = initial;
    }, 2200);
  });
}

/* ----------------------------- Boîte à outils : « où cet outil a servi » */
function initialiserOutils() {
  const ligne = $('[data-outils-ou]');
  if (!ligne) return;
  const montrer = (e: Event) => {
    const outil = (e.target as Element).closest<HTMLElement>('[data-ou]');
    if (!outil) return;
    $$('[data-ou][data-actif]').forEach((o) => o.removeAttribute('data-actif'));
    outil.setAttribute('data-actif', '');
    ligne.textContent = outil.dataset.ou ?? '';
  };
  document.addEventListener('pointerover', montrer);
  document.addEventListener('focusin', montrer);
}

/* ------------------------------------------------ Palette de commandes */
function initialiserPalette() {
  const palette = $<HTMLDialogElement>('[data-palette]');
  const champ = $<HTMLInputElement>('[data-palette-champ]');
  const liste = $('[data-palette-liste]');
  const vide = $('[data-palette-vide]');
  if (!palette || !champ || !liste) return;

  const options = $$<HTMLLIElement>('[role="option"]', liste);
  const sansAccent = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  let visibles = options;
  let actif = 0;

  const selectionner = (i: number) => {
    actif = Math.max(0, Math.min(i, visibles.length - 1));
    options.forEach((o) => o.setAttribute('aria-selected', 'false'));
    const o = visibles[actif];
    if (!o) return champ.removeAttribute('aria-activedescendant');
    o.setAttribute('aria-selected', 'true');
    champ.setAttribute('aria-activedescendant', o.id);
    o.scrollIntoView({ block: 'nearest' });
  };

  const filtrer = () => {
    const mots = sansAccent(champ.value).split(/\s+/).filter(Boolean);
    visibles = options.filter((o) => {
      const texte = sansAccent(o.dataset.texte ?? '');
      const ok = mots.every((m) => texte.includes(m));
      o.hidden = !ok;
      return ok;
    });
    if (vide) vide.hidden = visibles.length > 0;
    selectionner(0);
  };

  const ouvrir = () => {
    if (palette.open) return;
    champ.value = '';
    filtrer();
    palette.showModal();
    champ.focus();
  };

  const executer = async (o: HTMLLIElement | undefined) => {
    if (!o) return;
    const { action, valeur, href } = o.dataset;
    palette.close();
    if (action === 'theme') return changerTheme(valeur as Theme, { x: innerWidth / 2, y: innerHeight / 3 });
    if (action === 'lecture') return changerLecture(valeur as Lecture);
    if (action === 'assistant') {
      const btn = Object.assign(document.createElement('button'), { hidden: true });
      btn.dataset.ouvrirAssistant = valeur ?? 'chat';
      document.body.appendChild(btn);
      btn.click();
      btn.remove();
      return;
    }
    if (action === 'copier') {
      const adresse = $<HTMLElement>('[data-copier]')?.dataset.copier ?? document.documentElement.dataset.courriel;
      if (adresse) await copier(adresse);
      return;
    }
    if (action === 'telecharger' && href) {
      const a = Object.assign(document.createElement('a'), { href, download: '' });
      a.click();
      return;
    }
    if (action === 'externe' && href) {
      window.open(href, '_blank', 'noopener');
      return;
    }
    if (href) location.href = href;
  };

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'k') {
      e.preventDefault();
      palette.open ? palette.close() : ouvrir();
    } else if (k === '/' && !palette.open && !(e.target as Element).closest('input, textarea, [contenteditable]')) {
      e.preventDefault();
      ouvrir();
    }
  });
  $$('[data-ouvrir-palette]').forEach((b) => b.addEventListener('click', ouvrir));

  champ.addEventListener('input', filtrer);
  champ.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectionner((actif + 1) % Math.max(visibles.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectionner((actif - 1 + visibles.length) % Math.max(visibles.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      void executer(visibles[actif]);
    }
  });
  liste.addEventListener('click', (e) => void executer((e.target as Element).closest<HTMLLIElement>('[role="option"]') ?? undefined));
  liste.addEventListener('pointermove', (e) => {
    const o = (e.target as Element).closest<HTMLLIElement>('[role="option"]');
    if (o && o.getAttribute('aria-selected') !== 'true') selectionner(visibles.indexOf(o));
  });
  // Clic sur le fond : on ferme.
  palette.addEventListener('click', (e) => {
    if (e.target === palette) palette.close();
  });
}

/* ------------------------------- Heure locale en direct (Marseille / Paris) */
function initialiserHorloge() {
  const conteneur = $<HTMLElement>('[data-horloge-fuseau]');
  const affichage = $<HTMLElement>('[data-horloge-texte]', conteneur ?? document);
  if (!conteneur || !affichage) return;
  const fuseau = conteneur.dataset.horlogeFuseau ?? 'Europe/Paris';
  const region = conteneur.dataset.horlogeLangue === 'en' ? 'en-GB' : 'fr-FR';
  const format = new Intl.DateTimeFormat(region, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: fuseau,
  });
  const maj = () => {
    affichage.textContent = format.format(new Date());
  };
  maj();
  setInterval(maj, 30_000);
}

/* ------------------ Sélecteur de lieu sur la carte OpenStreetMap en pied de page */
function initialiserCarteOsm() {
  const section = $<HTMLElement>('[data-loc]');
  const iframe = $<HTMLIFrameElement>('[data-iframe-osm]', section ?? document);
  if (!section || !iframe) return;

  const boutons = $$<HTMLButtonElement>('[data-changer-carte]', section);
  const cartes = $$<HTMLElement>('[data-lieu-carte]', section);
  const lienDirect = $<HTMLAnchorElement>('[data-lien-osm-actif]', section);

  section.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-changer-carte]');
    if (!btn) return;
    const lieu = btn.dataset.changerCarte;
    const embed = btn.dataset.embed;
    const osm = btn.dataset.osm;
    if (embed && iframe.src !== embed) iframe.src = embed;
    if (osm && lienDirect) lienDirect.href = osm;
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.changerCarte === lieu)));
    cartes.forEach((c) => c.toggleAttribute('data-actif', c.dataset.lieuCarte === lieu));
  });
}

/* ---------------- Visionneuse plein écran sur les galeries de projets */
function initialiserVisionneuse() {
  const section = $<HTMLElement>('[data-galerie-projet]');
  const dialogue = $<HTMLDialogElement>('[data-visionneuse]', section ?? document);
  if (!section || !dialogue) return;

  const declencheurs = $$<HTMLButtonElement>('[data-ouvrir-visionneuse]', section);
  const imgCible = $<HTMLImageElement>('[data-visionneuse-img]', dialogue);
  const legendeCible = $<HTMLElement>('[data-visionneuse-legende]', dialogue);
  const compteurCible = $<HTMLElement>('[data-visionneuse-compteur]', dialogue);
  const btnFermer = $<HTMLButtonElement>('[data-visionneuse-fermer]', dialogue);
  const btnPrec = $<HTMLButtonElement>('[data-visionneuse-prec]', dialogue);
  const btnSuiv = $<HTMLButtonElement>('[data-visionneuse-suiv]', dialogue);

  if (!declencheurs.length || !imgCible) return;
  let indexCourant = 0;

  const afficher = (idx: number) => {
    indexCourant = (idx + declencheurs.length) % declencheurs.length;
    const btn = declencheurs[indexCourant];
    const imgSource = $<HTMLImageElement>('img', btn);
    if (!btn || !imgSource) return;

    imgCible.src = imgSource.currentSrc || imgSource.src;
    imgCible.alt = imgSource.alt;
    if (legendeCible) legendeCible.textContent = btn.dataset.legende ?? imgSource.alt;
    if (compteurCible) compteurCible.textContent = `${indexCourant + 1} / ${declencheurs.length}`;
  };

  declencheurs.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      afficher(i);
      dialogue.showModal();
    });
  });

  btnFermer?.addEventListener('click', () => dialogue.close());
  btnPrec?.addEventListener('click', () => afficher(indexCourant - 1));
  btnSuiv?.addEventListener('click', () => afficher(indexCourant + 1));

  dialogue.addEventListener('click', (e) => {
    if (e.target === dialogue) dialogue.close();
  });

  dialogue.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      afficher(indexCourant - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      afficher(indexCourant + 1);
    }
  });
}

/* ------------------------------------ Mode hors connexion (service worker) */
function initialiserHorsConnexion() {
  if (!('serviceWorker' in navigator)) return;
  if (!import.meta.env.PROD) {
    // En mode développement (npm run dev), on désactive tout ancien service worker en cache
    navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
    return;
  }
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  addEventListener('load', () => {
    navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {
      /* pas de mode hors connexion : le site fonctionne quand même */
    });
  });
}

initialiserPreferences();
initialiserEntete();
initialiserMenu();
initialiserApparitions();
initialiserCopie();
initialiserOutils();
initialiserPalette();
initialiserHorloge();
initialiserCarteOsm();
initialiserVisionneuse();
initialiserAssistant();
initialiserHorsConnexion();
