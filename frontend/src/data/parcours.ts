/**
 * Le parcours, présenté comme un plan de lignes : la ligne « Conakry » (mécanique),
 * une correspondance, puis la ligne « Arles » (informatique).
 * Sources : CV de septembre 2026 et lettres de motivation (dossier Demarches_Stages).
 */
import type { Texte } from '@/i18n';
import { typographier } from '@/i18n/typo';

export type Ligne = 'conakry' | 'arles';
export type Genre = 'formation' | 'emploi' | 'distinction' | 'objectif' | 'correspondance';

export interface Etape {
  dates: Texte;
  genre: Genre;
  ligne: Ligne;
  titre: Texte;
  lieu: Texte;
  texte?: Texte;
  /** Étape à venir : tracé en pointillés. */
  futur?: boolean;
  /** Projet lié (identifiant dans `projets.ts`). */
  projet?: string;
}

export const lignes: Record<Ligne, { nom: Texte; note: Texte }> = {
  conakry: {
    nom: { fr: 'Ligne 1', en: 'Line 1' },
    note: { fr: 'Sciences et mécanique', en: 'Science and mechanics' },
  },
  arles: {
    nom: { fr: 'Ligne 2', en: 'Line 2' },
    note: { fr: 'Informatique', en: 'Computer science' },
  },
};

export const etapes: Etape[] = [
  {
    dates: { fr: '2022', en: '2022' },
    genre: 'formation',
    ligne: 'conakry',
    titre: { fr: 'Baccalauréat scientifique, mention Bien', en: 'Science baccalaureate, with honours' },
    lieu: { fr: 'Guinée', en: 'Guinea' },
    texte: {
      fr: 'Série Sciences mathématiques : mathématiques, physique-chimie.',
      en: 'Mathematical sciences stream: mathematics, physics and chemistry.',
    },
  },
  {
    dates: { fr: '2022 – 2024', en: '2022 – 2024' },
    genre: 'formation',
    ligne: 'conakry',
    titre: { fr: 'Génie mécanique et productique', en: 'Mechanical and production engineering' },
    lieu: { fr: 'Université Gamal Abdel Nasser, Conakry', en: 'Gamal Abdel Nasser University, Conakry' },
    texte: {
      fr: 'Deux années de formation scientifique et technique : mathématiques appliquées, mécanique, modélisation.',
      en: 'Two years of scientific and technical training: applied mathematics, mechanics, modelling.',
    },
  },
  {
    dates: { fr: '2023 – 2024', en: '2023 – 2024' },
    genre: 'emploi',
    ligne: 'conakry',
    titre: { fr: 'Gestionnaire commercial et stocks', en: 'Sales and stock manager' },
    lieu: { fr: 'Boutique de téléphonie', en: 'Mobile phone shop' },
    texte: {
      fr: 'Facturation, devis et gestion informatisée des stocks avec le progiciel Sage 100.',
      en: 'Invoicing, quotes and computerised stock management with the Sage 100 package.',
    },
  },
  {
    dates: { fr: '2025', en: '2025' },
    genre: 'correspondance',
    ligne: 'arles',
    titre: { fr: "Réorientation vers l'informatique", en: 'Switch to computer science' },
    lieu: { fr: 'Conakry → Arles', en: 'Conakry → Arles' },
    texte: {
      fr: 'Admission en BUT Informatique par la procédure Campus France.',
      en: 'Admitted to the BUT in Computer Science through the Campus France procedure.',
    },
  },
  {
    dates: { fr: '2025 – 2028', en: '2025 – 2028' },
    genre: 'formation',
    ligne: 'arles',
    titre: {
      fr: 'Bachelor Universitaire de Technologie (BUT) Informatique',
      en: 'BUT in Computer Science (three-year Bachelor of Technology)',
    },
    lieu: { fr: "IUT d'Aix-Marseille, site d'Arles", en: 'IUT Aix-Marseille, Arles campus' },
    texte: {
      fr: 'Parcours « Réalisation d\'applications : conception, développement, validation ». 1re année validée avec mention.',
      en: '“Application development: design, development, validation” track. First year passed with honours.',
    },
  },
  {
    dates: { fr: 'Depuis 2025', en: 'Since 2025' },
    genre: 'emploi',
    ligne: 'arles',
    titre: { fr: 'Opérateur logistique, CDI à temps partiel', en: 'Logistics operator, part-time permanent contract' },
    lieu: { fr: 'Lidl, plateforme logistique de Rousset', en: 'Lidl, Rousset logistics platform' },
    texte: {
      fr: 'Préparation de commandes en flux tendu, en parallèle des études.',
      en: 'Just-in-time order picking, alongside my studies.',
    },
  },
  {
    dates: { fr: 'Février 2026', en: 'February 2026' },
    genre: 'distinction',
    ligne: 'arles',
    titre: { fr: "Prix du Jury, hackathon Dev'Art 2026", en: "Jury Prize, Dev'Art 2026 hackathon" },
    lieu: { fr: "IUT d'Arles", en: 'IUT Arles' },
    texte: {
      fr: "Avec HYPOXIA, une expérience 3D sur le coût environnemental de l'intelligence artificielle.",
      en: 'With HYPOXIA, a 3D experience about the environmental cost of artificial intelligence.',
    },
    projet: 'hypoxia',
  },
  {
    dates: { fr: '29 mars – 18 juin 2027', en: '29 March – 18 June 2027' },
    genre: 'objectif',
    ligne: 'arles',
    titre: { fr: 'Stage de 12 semaines', en: '12-week internship' },
    lieu: { fr: 'Votre équipe ?', en: 'Your team?' },
    texte: {
      fr: "Développement logiciel et web, à temps plein. Prolongeable jusqu'à fin août 2027.",
      en: 'Software and web development, full time. Can be extended until the end of August 2027.',
    },
    futur: true,
  },
  {
    dates: { fr: '2028', en: '2028' },
    genre: 'objectif',
    ligne: 'arles',
    titre: { fr: 'Diplôme du BUT Informatique', en: 'BUT degree in Computer Science' },
    lieu: { fr: 'Niveau bac + 3', en: "Bachelor's level" },
    futur: true,
  },
];

typographier([lignes, etapes]);
