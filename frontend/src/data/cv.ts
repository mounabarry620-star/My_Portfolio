/**
 * Contenu du CV (une page A4), en français et en anglais.
 *
 * Rédigé selon « Le CV, quelques rappels » (cours de communication professionnelle) :
 *  - le projet est lisible au premier coup d'œil (encadré « Recherche ») ;
 *  - contenu sobre et factuel : poste, structure, fonctions — pas d'adjectifs ni d'adverbes ;
 *  - les sigles sont écrits en toutes lettres à leur première apparition ;
 *  - cinq catégories attendues : profil, expériences professionnelles, compétences,
 *    diplômes, centres d'intérêt ;
 *  - pas de « phrases bateau » (motivé, ponctuel, esprit d'équipe…) : des faits à la place.
 *
 * Après toute modification : `npm run build` puis `npm run cv:pdf` pour refaire les PDF.
 */
import type { Texte } from '@/i18n';
import { typographier } from '@/i18n/typo';

export const cv = {
  titre: {
    fr: 'Développeur logiciel et web',
    en: 'Software and web developer',
  },
  /** Bandeau tout en haut du CV. */
  bandeau: {
    fr: 'Développeur logiciel et web | Conception, développement, validation',
    en: 'Software and web developer | Design, development, validation',
  },
  sousTitre: {
    fr: "Étudiant en 2e année de Bachelor Universitaire de Technologie (BUT) Informatique",
    en: 'Second-year student, BUT in Computer Science (French three-year Bachelor of Technology)',
  },
  recherche: {
    etiquette: { fr: 'Recherche', en: 'Seeking' },
    objet: { fr: 'Stage de 12 semaines', en: '12-week internship' },
    dates: { fr: 'du 29 mars au 18 juin 2027', en: '29 March to 18 June 2027' },
    details: {
      fr: "Temps plein · stage conventionné · prolongeable jusqu'à fin août 2027",
      en: 'Full time · under a university agreement · can be extended to end of August 2027',
    },
  },
  coordonnees: {
    ville: { fr: 'Marseille (13003)', en: 'Marseille, France' },
    mobilite: {
      fr: "Mobilité : Provence-Alpes-Côte d'Azur et France",
      en: "Mobility: Provence-Alpes-Côte d'Azur and France",
    },
    telephoneIntl: '+33 7 53 17 27 52',
  },

  rubriques: {
    profil: { fr: 'À propos de moi', en: 'About me' },
    projets: { fr: 'Projets et expériences', en: 'Projects and experience' },
    experiences: { fr: 'Expériences professionnelles', en: 'Work experience' },
    competences: { fr: 'Compétences', en: 'Skills' },
    diplomes: { fr: 'Diplômes', en: 'Education' },
    langues: { fr: 'Langues', en: 'Languages' },
    interets: { fr: "Centres d'intérêt", en: 'Interests' },
  },

  profil: {
    fr: "Deuxième année de BUT Informatique à l'IUT d'Aix-Marseille, site d'Arles, après deux ans de génie mécanique. Product Owner d'un projet mené à cinq. Prix du Jury d'un hackathon (concours de programmation) en 2026. En emploi à temps partiel depuis 2025, en parallèle des études.",
    en: 'Second year of a BUT in Computer Science at IUT Aix-Marseille (Arles campus), after two years of mechanical engineering. Product Owner of a five-person project. Jury Prize at a hackathon in 2026. Working part time since 2025, alongside my studies.',
  },

  projets: [
    {
      nom: 'ArchiSim',
      nature: { fr: "simulateur d'ordinateur", en: 'computer simulator' },
      cadre: { fr: 'Projet de 2e année, équipe de 5, en cours', en: 'Second-year project, team of 5, ongoing' },
      texte: {
        fr: 'Product Owner et développeur du module mémoire. 20 récits utilisateur rédigés, 23 tests automatisés.',
        en: 'Product Owner and developer of the memory module. 20 user stories written, 23 automated tests.',
      },
      outils: 'Vue 3, JavaScript, Vitest, Git, Scrum',
    },
    {
      nom: 'HYPOXIA',
      nature: { fr: 'expérience web en 3D', en: '3D web experience' },
      cadre: { fr: "Hackathon Dev'Art 2026, équipe de 4", en: "Dev'Art 2026 hackathon, team of 4" },
      texte: {
        fr: "Prix du Jury. Application qui montre le coût environnemental de l'intelligence artificielle.",
        en: 'Jury Prize. An application showing the environmental cost of artificial intelligence.',
      },
      outils: 'Next.js, React, Three.js',
    },
    {
      nom: 'Parcoursup Explorer',
      nature: { fr: 'application web de données ouvertes', en: 'open-data web application' },
      cadre: { fr: 'Projet individuel de 2e année, 2026', en: 'Individual second-year project, 2026' },
      texte: {
        fr: "Carte, graphiques et historique des formations autour d'une ville, à partir de données publiques.",
        en: 'Map, charts and history of the courses around a town, built on public data.',
      },
      outils: 'JavaScript, Leaflet, Chart.js, API REST',
    },
    {
      nom: { fr: 'Gestion des immatriculations', en: 'Vehicle registration manager' },
      nature: { fr: 'application de bureau', en: 'desktop application' },
      cadre: { fr: 'Projet de 1re année, en binôme, 2026', en: 'First-year project, pair work, 2026' },
      texte: {
        fr: 'Consultation, modification et recherche de fiches ; fichiers JSON et XML ; Windows et Linux.',
        en: 'Viewing, editing and searching records; JSON and XML files; Windows and Linux.',
      },
      outils: 'C++17, Qt 6, UML',
    },
    {
      nom: { fr: 'Bases de données et systèmes', en: 'Databases and systems' },
      nature: { fr: 'projets de 1re année', en: 'first-year projects' },
      cadre: { fr: '2025-2026', en: '2025–2026' },
      texte: {
        fr: 'Modèle de données et requêtes SQL. Poste de développement Debian 12 et Windows 11, serveur de messagerie.',
        en: 'Data model and SQL queries. Debian 12 and Windows 11 development workstation, mail server.',
      },
      outils: 'PostgreSQL, WinDesign, VirtualBox, Postfix',
    },
  ] as {
    nom: string | Texte;
    nature: Texte;
    cadre: Texte;
    texte: Texte;
    outils: string;
  }[],

  experiences: [
    {
      poste: { fr: 'Opérateur logistique', en: 'Logistics operator' },
      structure: { fr: 'Lidl, plateforme logistique de Rousset', en: 'Lidl, Rousset logistics platform' },
      dates: { fr: 'Depuis 2025', en: 'Since 2025' },
      texte: {
        fr: 'Contrat à durée indéterminée à temps partiel. Préparation de commandes en flux tendu, selon les cadences et les procédures du site.',
        en: 'Part-time permanent contract. Just-in-time order picking, following the pace and procedures of the site.',
      },
    },
    {
      poste: { fr: 'Gestionnaire commercial et stocks', en: 'Sales and stock manager' },
      structure: { fr: 'Boutique de téléphonie', en: 'Mobile phone shop' },
      dates: { fr: '2023 – 2024', en: '2023 – 2024' },
      texte: {
        fr: 'Facturation, devis et gestion informatisée des stocks avec le progiciel Sage 100 Commercial.',
        en: 'Invoicing, quotes and computerised stock management with the Sage 100 Commercial package.',
      },
    },
  ],

  /** Trois colonnes, comme sur le CV papier. `logo` = nom du logo chez Devicon. */
  competences: [
    [
      {
        titre: { fr: 'Développement', en: 'Development' },
        outils: [
          { nom: 'C++', logo: 'cplusplus' },
          { nom: 'Python', logo: 'python' },
          { nom: 'Java', logo: 'java' },
          { nom: 'C', logo: 'c' },
          { nom: 'JavaScript', logo: 'javascript' },
          { nom: 'TypeScript', logo: 'typescript' },
        ],
      },
    ],
    [
      {
        titre: { fr: 'Web', en: 'Web' },
        outils: [
          { nom: 'HTML', logo: 'html5' },
          { nom: 'CSS', logo: 'css3' },
          { nom: 'Vue 3', logo: 'vuejs' },
          { nom: 'React', logo: 'react' },
          { nom: 'Next.js', logo: 'nextjs' },
          { nom: 'Astro', logo: 'astro' },
        ],
      },
      {
        titre: { fr: 'Bases de données', en: 'Databases' },
        outils: [{ nom: 'PostgreSQL', logo: 'postgresql' }, { nom: 'SQL' }, { nom: 'WinDesign' }],
      },
    ],
    [
      {
        titre: { fr: 'Systèmes et outils', en: 'Systems and tools' },
        outils: [
          { nom: 'Linux', logo: 'linux' },
          { nom: 'Debian', logo: 'debian' },
          { nom: 'Windows 11', logo: 'windows11' },
          { nom: 'Git', logo: 'git' },
          { nom: 'Bash', logo: 'bash' },
          { nom: 'Qt 6', logo: 'qt' },
          { nom: 'Scrum' },
          { nom: 'UML', logo: 'unifiedmodelinglanguage' },
          { nom: 'Sage 100' },
          { nom: 'VirtualBox' },
        ],
      },
    ],
  ] as { titre: Texte; outils: { nom: string; logo?: string }[] }[][],

  diplomes: [
    {
      dates: '2025 – 2028',
      titre: { fr: 'BUT Informatique', en: 'BUT in Computer Science' },
      lieu: { fr: "IUT d'Aix-Marseille, site d'Arles", en: 'IUT Aix-Marseille, Arles campus' },
      note: {
        fr: "Parcours « Réalisation d'applications ». 1re année validée avec mention.",
        en: '“Application development” track. First year passed with honours.',
      },
    },
    {
      dates: '2022 – 2024',
      titre: { fr: 'Génie mécanique et productique', en: 'Mechanical and production engineering' },
      lieu: { fr: 'Université Gamal Abdel Nasser, Conakry', en: 'Gamal Abdel Nasser University, Conakry' },
    },
    {
      dates: '2022',
      titre: { fr: 'Baccalauréat scientifique', en: 'Science baccalaureate' },
      lieu: { fr: 'Sciences mathématiques, mention Bien', en: 'Mathematical sciences, with honours' },
    },
  ] as { dates: string; titre: Texte; lieu: Texte; note?: Texte }[],

  langues: [
    { nom: { fr: 'Pular', en: 'Pular' }, niveau: { fr: 'langue maternelle', en: 'native' } },
    { nom: { fr: 'Français', en: 'French' }, niveau: { fr: 'courant', en: 'fluent' } },
    { nom: { fr: 'Anglais', en: 'English' }, niveau: { fr: 'B2, technique et professionnel', en: 'B2, technical and professional' } },
    { nom: { fr: 'Allemand', en: 'German' }, niveau: { fr: 'A2', en: 'A2' } },
  ],

  interets: [
    { fr: 'Échecs', en: 'Chess' },
    {
      fr: 'Intelligence artificielle locale : modèles de langage sur mon ordinateur',
      en: 'Local artificial intelligence: language models on my own computer',
    },
    {
      fr: 'Linux et sécurité informatique, sur un laboratoire personnel',
      en: 'Linux and computer security, on a personal lab',
    },
  ] as Texte[],
};

typographier(cv);
