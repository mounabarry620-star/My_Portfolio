/**
 * Typographie française : espace insécable avant « : ; ? ! » et à l'intérieur des
 * guillemets, pour qu'un signe de ponctuation ne se retrouve jamais seul en début de ligne.
 * Appliqué une fois, au chargement, à tous les textes français des fichiers de données.
 */
const INSECABLE = ' ';

export function typoFr(texte: string): string {
  return texte
    .replace(/ ([:;?!»])/g, `${INSECABLE}$1`)
    .replace(/« /g, `«${INSECABLE}`)
    .replace(/(\d) (%|km|ms)(?![\p{L}])/gu, `$1${INSECABLE}$2`);
}

const estImage = (v: Record<string, unknown>) => 'src' in v && 'width' in v && 'height' in v;

/** Parcourt un objet de données et corrige sur place toutes les valeurs « fr ». */
export function typographier<T>(donnees: T): T {
  const visiter = (v: unknown): void => {
    if (Array.isArray(v)) return v.forEach(visiter);
    if (!v || typeof v !== 'object') return;
    const objet = v as Record<string, unknown>;
    if (estImage(objet)) return;
    for (const [cle, valeur] of Object.entries(objet)) {
      if (cle === 'fr' && typeof valeur === 'string') objet[cle] = typoFr(valeur);
      else visiter(valeur);
    }
  };
  visiter(donnees);
  return donnees;
}
