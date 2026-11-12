/**
 * Préférences du visiteur : thème et niveau de lecture.
 * Elles sont posées sur <html> (data-theme, data-lecture) avant le premier affichage
 * par un petit script dans <head>, puis gérées ici.
 */

export const THEMES = ['arles', 'marseille', 'conakry', 'machine'] as const;
export type Theme = (typeof THEMES)[number];
export type Lecture = 'simple' | 'technique';

const racine = document.documentElement;

/** Couleur de la barre du navigateur (mobile) pour chaque thème. */
const COULEUR_BARRE: Record<Theme, string> = {
  arles: '#f8f0e1',
  marseille: '#f0f6fc',
  conakry: '#17143a',
  machine: '#0a110c',
};

/** Polices à charger pour chaque thème (variables CSS créées par Astro). */
const POLICES: Record<Theme, { variable: string; graisse: number }[]> = {
  arles: [
    { variable: '--police-fraunces', graisse: 400 },
    { variable: '--police-instrument', graisse: 400 },
  ],
  marseille: [{ variable: '--police-bricolage', graisse: 750 }],
  conakry: [
    { variable: '--police-syne', graisse: 760 },
    { variable: '--police-dmsans', graisse: 400 },
  ],
  machine: [{ variable: '--police-jetbrains', graisse: 400 }],
};

const moinsDeMouvement = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function memoriser(cle: string, valeur: string) {
  try {
    localStorage.setItem(cle, valeur);
  } catch {
    /* navigation privée : on continue sans mémoriser */
  }
}

export function themeActuel(): Theme {
  const t = racine.dataset.theme as Theme;
  return THEMES.includes(t) ? t : 'arles';
}

export function lectureActuelle(): Lecture {
  return racine.dataset.lecture === 'technique' ? 'technique' : 'simple';
}

/** Télécharge les polices d'un thème avant de l'afficher, pour éviter un saut de texte. */
export function chargerPolices(theme: Theme): Promise<unknown> {
  if (!document.fonts?.load) return Promise.resolve();
  const style = getComputedStyle(racine);
  const chargements = POLICES[theme].map(({ variable, graisse }) => {
    const famille = style.getPropertyValue(variable).trim();
    return famille ? document.fonts.load(`${graisse} 1em ${famille}`, 'Aa é') : Promise.resolve();
  });
  const delaiMax = new Promise((r) => setTimeout(r, 900));
  return Promise.race([Promise.allSettled(chargements), delaiMax]);
}

function refleterTheme(theme: Theme) {
  racine.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COULEUR_BARRE[theme]);
  for (const b of document.querySelectorAll<HTMLElement>('[data-choix-theme]')) {
    b.setAttribute('aria-pressed', String(b.dataset.choixTheme === theme));
  }
}

function refleterLecture(lecture: Lecture) {
  racine.dataset.lecture = lecture;
  for (const b of document.querySelectorAll<HTMLElement>('[data-choix-lecture]')) {
    b.setAttribute('aria-pressed', String(b.dataset.choixLecture === lecture));
  }
}

type DocAvecTransition = Document & {
  startViewTransition?: (maj: () => void) => { finished: Promise<void> };
};

/** Change de thème. La nouvelle ambiance s'ouvre en cercle depuis le point cliqué. */
export async function changerTheme(theme: Theme, origine?: { x: number; y: number }) {
  if (theme === themeActuel()) return;
  await chargerPolices(theme);
  memoriser('theme', theme);

  const doc = document as DocAvecTransition;
  const appliquer = () => {
    refleterTheme(theme);
    document.dispatchEvent(new CustomEvent('theme:change', { detail: theme }));
  };
  if (!doc.startViewTransition || moinsDeMouvement()) return appliquer();

  const x = origine?.x ?? innerWidth / 2;
  const y = origine?.y ?? 0;
  const rayon = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  racine.style.setProperty('--vt-x', `${x}px`);
  racine.style.setProperty('--vt-y', `${y}px`);
  racine.style.setProperty('--vt-r', `${rayon}px`);
  racine.classList.add('vt-theme');
  doc.startViewTransition(appliquer).finished.finally(() => racine.classList.remove('vt-theme'));
}

/** Change le niveau de lecture (simple ou technique), avec un fondu. */
export function changerLecture(lecture: Lecture) {
  if (lecture === lectureActuelle()) return;
  memoriser('lecture', lecture);
  const doc = document as DocAvecTransition;
  const appliquer = () => {
    refleterLecture(lecture);
    document.dispatchEvent(new CustomEvent('lecture:change', { detail: lecture }));
  };
  if (!doc.startViewTransition || moinsDeMouvement()) return appliquer();
  racine.classList.add('vt-fondu');
  doc.startViewTransition(appliquer).finished.finally(() => racine.classList.remove('vt-fondu'));
}

/** Branche tous les boutons de réglage présents dans la page. */
export function initialiserPreferences() {
  refleterTheme(themeActuel());
  refleterLecture(lectureActuelle());

  document.addEventListener('click', (e) => {
    const cible = (e.target as Element | null)?.closest<HTMLElement>('[data-choix-theme], [data-choix-lecture]');
    if (!cible) return;
    if (cible.dataset.choixTheme) {
      const r = cible.getBoundingClientRect();
      void changerTheme(cible.dataset.choixTheme as Theme, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else if (cible.dataset.choixLecture) {
      changerLecture(cible.dataset.choixLecture as Lecture);
    }
  });

  // Dès que le pointeur approche d'un thème, on prépare ses polices.
  for (const b of document.querySelectorAll<HTMLElement>('[data-choix-theme]')) {
    const preparer = () => void chargerPolices(b.dataset.choixTheme as Theme);
    b.addEventListener('pointerenter', preparer, { once: true });
    b.addEventListener('focus', preparer, { once: true });
  }
}
