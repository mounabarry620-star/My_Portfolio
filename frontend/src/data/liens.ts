/** Lien vers une réalisation : sa page si elle en a une, sinon sa ligne sur l'accueil. */
import { routes, type Langue } from '@/i18n';
import { projetParSlug } from './projets';

export function lienRealisation(l: Langue, slug: string): string | undefined {
  const projet = projetParSlug(slug);
  if (!projet) return undefined;
  return projet.vedette ? routes.projet(l, slug) : routes.section(l, `r-${slug}`);
}

export function titreRealisation(l: Langue, slug: string): string {
  return projetParSlug(slug)?.titre[l] ?? slug;
}
