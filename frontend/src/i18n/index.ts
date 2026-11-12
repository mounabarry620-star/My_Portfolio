/**
 * Internationalisation : langues du site, adresses des pages et petits utilitaires.
 * Pour ajouter une langue (ex. le pular, code « ff ») : l'ajouter dans `langues`,
 * dans `astro.config.mjs` (i18n.locales), créer ses pages dans `src/pages/<code>/`
 * et compléter chaque texte `{ fr, en }` avec la nouvelle clé.
 */

export const langues = ['fr', 'en'] as const;
export type Langue = (typeof langues)[number];
export const langueParDefaut: Langue = 'fr';

/** Un texte traduit dans chaque langue du site. */
export type Texte<T = string> = Record<Langue, T>;

/** Un texte en deux niveaux de lecture : pour tout le monde, ou pour les techniciens. */
export interface DeuxNiveaux {
  simple: Texte;
  technique: Texte;
}

export const nomsLangues: Texte = { fr: 'Français', en: 'English' };
export const codesHtml: Record<Langue, string> = { fr: 'fr', en: 'en' };
export const codesOg: Record<Langue, string> = { fr: 'fr_FR', en: 'en_GB' };

/** Préfixe du site (vide à la racine, « /My_Portfolio » dans un sous-dossier). */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Ajoute le préfixe du site à un chemin interne ou à un fichier de `public/`. */
export function url(chemin: string): string {
  return `${BASE}${chemin.startsWith('/') ? chemin : `/${chemin}`}`;
}

/** Adresses des pages, par langue. */
export const routes = {
  accueil: (l: Langue) => url(l === 'fr' ? '/' : '/en/'),
  projet: (l: Langue, slug: string) => url(l === 'fr' ? `/projets/${slug}/` : `/en/projects/${slug}/`),
  cv: (l: Langue) => url(l === 'fr' ? '/cv/' : '/en/cv/'),
  /** Lien vers une section de la page d'accueil. */
  section: (l: Langue, id: string) => `${routes.accueil(l)}#${id}`,
};

/** Identifiants des sections de la page d'accueil (les mêmes dans toutes les langues). */
export const sections = ['profil', 'projets', 'competences', 'parcours', 'atouts', 'contact'] as const;
export type Section = (typeof sections)[number];

/** Date lisible : « 29 mars 2027 » / « 29 March 2027 ». */
export function dateLongue(iso: string, l: Langue): string {
  return new Intl.DateTimeFormat(l === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Date courte de billet : « 29 MARS » / « 29 MAR ». */
export function dateBillet(iso: string, l: Langue): string {
  return new Intl.DateTimeFormat(l === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: l === 'fr' ? 'long' : 'short',
    timeZone: 'UTC',
  })
    .format(new Date(`${iso}T00:00:00Z`))
    .toUpperCase();
}
