/**
 * Les six compétences du BUT Informatique.
 * Intitulés et définitions « techniques » : référentiel national (programme national
 * du BUT Informatique, parcours « Réalisation d'applications », version V35A).
 * Les versions « simples » sont des reformulations pour un lecteur non spécialiste.
 */
import type { DeuxNiveaux, Texte } from '@/i18n';
import { typographier } from '@/i18n/typo';

export type CompetenceId = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6';

export interface Competence {
  id: CompetenceId;
  numero: number;
  /** Verbe court, utilisé pour les étiquettes. */
  verbe: Texte;
  /** Intitulé officiel. */
  intitule: Texte;
  definition: DeuxNiveaux;
  /** Intitulés officiels des niveaux 1 (1re année) et 2 (2e année). */
  niveaux: [Texte, Texte];
  /** Projets qui servent de preuve, avec ce qu'ils démontrent. */
  preuves: { projet: string; apport: Texte }[];
}

export const competences: Competence[] = [
  {
    id: 'c1',
    numero: 1,
    verbe: { fr: 'Réaliser', en: 'Build' },
    intitule: { fr: "Réaliser un développement d'application", en: 'Develop an application' },
    definition: {
      simple: {
        fr: "Concevoir, coder, tester et livrer une application qui répond au besoin d'un client.",
        en: "Design, code, test and deliver an application that meets a client's need.",
      },
      technique: {
        fr: "Développer — c'est-à-dire concevoir, coder, tester et intégrer — une solution informatique pour un client.",
        en: 'Develop — that is, design, code, test and integrate — a software solution for a client.',
      },
    },
    niveaux: [
      { fr: 'Développer des applications informatiques simples', en: 'Develop simple applications' },
      {
        fr: "Partir des exigences et aller jusqu'à une application complète",
        en: 'Go from requirements to a complete application',
      },
    ],
    preuves: [
      {
        projet: 'archisim',
        apport: {
          fr: 'Module mémoire du simulateur, livré avec ses tests.',
          en: 'Memory module of the simulator, delivered with its tests.',
        },
      },
      {
        projet: 'parcoursup-explorer',
        apport: {
          fr: 'Application web complète, développée seul.',
          en: 'A complete web application, built alone.',
        },
      },
      {
        projet: 'immatriculations',
        apport: {
          fr: 'Application de bureau, du schéma UML à la livraison.',
          en: 'Desktop application, from the UML diagram to delivery.',
        },
      },
      {
        projet: 'bibliotheque',
        apport: {
          fr: 'Premier programme répondant à un besoin client.',
          en: 'First program answering a client need.',
        },
      },
    ],
  },
  {
    id: 'c2',
    numero: 2,
    verbe: { fr: 'Optimiser', en: 'Optimise' },
    intitule: { fr: 'Optimiser des applications', en: 'Optimise applications' },
    definition: {
      simple: {
        fr: "Choisir la bonne méthode de calcul pour qu'un programme soit rapide, exact et économe.",
        en: 'Choose the right computing method so that a program is fast, accurate and frugal.',
      },
      technique: {
        fr: "Proposer des applications informatiques optimisées en fonction de critères spécifiques : temps d'exécution, précision, consommation de ressources.",
        en: 'Deliver applications optimised against specific criteria: run time, accuracy, resource consumption.',
      },
    },
    niveaux: [
      { fr: 'Appréhender et construire des algorithmes', en: 'Understand and build algorithms' },
      {
        fr: 'Sélectionner les algorithmes adéquats pour répondre à un problème donné',
        en: 'Select suitable algorithms for a given problem',
      },
    ],
    preuves: [
      {
        projet: 'tri',
        apport: {
          fr: 'Trois algorithmes de tri programmés, mesurés et comparés.',
          en: 'Three sorting algorithms coded, measured and compared.',
        },
      },
      {
        projet: 'parcoursup-explorer',
        apport: {
          fr: 'Mise en cache et limitation des requêtes envoyées aux services publics.',
          en: 'Caching and limiting the requests sent to public services.',
        },
      },
      {
        projet: 'hypoxia',
        apport: {
          fr: "Un projet entier sur l'impact environnemental du numérique.",
          en: 'A whole project about the environmental impact of digital technology.',
        },
      },
      {
        projet: 'portfolio',
        apport: {
          fr: 'Nouvelle version plus légère, mesures avant et après.',
          en: 'Lighter new version, measured before and after.',
        },
      },
    ],
  },
  {
    id: 'c3',
    numero: 3,
    verbe: { fr: 'Administrer', en: 'Administer' },
    intitule: {
      fr: 'Administrer des systèmes informatiques communicants complexes',
      en: 'Administer complex networked systems',
    },
    definition: {
      simple: {
        fr: 'Installer et configurer des ordinateurs, des services et des réseaux, puis les garder en état de marche.',
        en: 'Install and configure computers, services and networks, then keep them running.',
      },
      technique: {
        fr: "Installer, configurer, mettre à disposition et maintenir en conditions opérationnelles des infrastructures, des services et des réseaux.",
        en: 'Install, configure, provide and keep in working order infrastructures, services and networks.',
      },
    },
    niveaux: [
      { fr: 'Installer et configurer un poste de travail', en: 'Install and configure a workstation' },
      { fr: 'Déployer des services dans une architecture réseau', en: 'Deploy services in a network architecture' },
    ],
    preuves: [
      {
        projet: 'poste-developpement',
        apport: {
          fr: 'Double amorçage Debian 12 et Windows 11, puis serveur de messagerie Postfix.',
          en: 'Dual-boot Debian 12 and Windows 11, then a Postfix mail server.',
        },
      },
    ],
  },
  {
    id: 'c4',
    numero: 4,
    verbe: { fr: 'Gérer', en: 'Manage' },
    intitule: { fr: "Gérer des données de l'information", en: 'Manage information data' },
    definition: {
      simple: {
        fr: "Ranger les données d'une organisation dans une base, les interroger et les présenter clairement.",
        en: "Store an organisation's data in a database, query it and present it clearly.",
      },
      technique: {
        fr: "Concevoir, gérer, administrer et exploiter les données de l'entreprise et mettre à disposition toutes les informations pour un bon pilotage.",
        en: 'Design, manage, administer and use company data, and make all information available for sound decision-making.',
      },
    },
    niveaux: [
      {
        fr: "Concevoir et mettre en place une base de données à partir d'un cahier des charges client",
        en: "Design and set up a database from a client's specifications",
      },
      {
        fr: 'Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité',
        en: 'Optimise a database, connect it to an application and implement security',
      },
    ],
    preuves: [
      {
        projet: 'base-de-donnees',
        apport: {
          fr: 'Schéma des données, tables, requêtes SQL et déclencheurs PostgreSQL.',
          en: 'Data model, tables, SQL queries and PostgreSQL triggers.',
        },
      },
      {
        projet: 'parcoursup-explorer',
        apport: {
          fr: 'Données ouvertes présentées en carte, en tableau et en graphique.',
          en: 'Open data presented as a map, a table and a chart.',
        },
      },
      {
        projet: 'immatriculations',
        apport: {
          fr: 'Lecture et écriture des données en JSON et en XML.',
          en: 'Reading and writing data in JSON and XML.',
        },
      },
    ],
  },
  {
    id: 'c5',
    numero: 5,
    verbe: { fr: 'Conduire', en: 'Lead' },
    intitule: { fr: 'Conduire un projet', en: 'Lead a project' },
    definition: {
      simple: {
        fr: "Comprendre le besoin des utilisateurs, organiser le travail et suivre l'avancement.",
        en: 'Understand what users need, organise the work and track progress.',
      },
      technique: {
        fr: 'Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.',
        en: "Meet users' needs with regard to the client's value chain; organise and steer an IT project with traditional or agile methods.",
      },
    },
    niveaux: [
      {
        fr: 'Identifier les besoins métiers des clients et des utilisateurs',
        en: 'Identify the business needs of clients and users',
      },
      {
        fr: 'Appliquer une démarche de suivi de projet en fonction des besoins métiers',
        en: 'Apply a project-tracking approach based on business needs',
      },
    ],
    preuves: [
      {
        projet: 'archisim',
        apport: {
          fr: 'Product Owner : 20 récits utilisateur, feuille de route, revue de sprint.',
          en: 'Product Owner: 20 user stories, roadmap, sprint review.',
        },
      },
      {
        projet: 'portfolio',
        apport: {
          fr: 'Cadrage du besoin et validation de chaque étape.',
          en: 'Framing the need and validating each step.',
        },
      },
    ],
  },
  {
    id: 'c6',
    numero: 6,
    verbe: { fr: 'Collaborer', en: 'Collaborate' },
    intitule: {
      fr: "Collaborer au sein d'une équipe informatique",
      en: 'Collaborate within an IT team',
    },
    definition: {
      simple: {
        fr: "Travailler efficacement avec d'autres : se répartir les rôles, communiquer, rendre compte.",
        en: 'Work effectively with others: share roles, communicate, report.',
      },
      technique: {
        fr: 'Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.',
        en: 'Acquire, develop and use the abilities needed to work effectively in an IT team.',
      },
    },
    niveaux: [
      {
        fr: 'Identifier ses aptitudes pour travailler dans une équipe',
        en: "Identify one's abilities for teamwork",
      },
      {
        fr: "Situer son rôle et ses missions au sein d'une équipe informatique",
        en: "Define one's role and tasks within an IT team",
      },
    ],
    preuves: [
      {
        projet: 'archisim',
        apport: {
          fr: 'Équipe de 5 en méthode Scrum, une branche Git par fonctionnalité.',
          en: 'Team of 5 using Scrum, one Git branch per feature.',
        },
      },
      {
        projet: 'hypoxia',
        apport: {
          fr: 'Équipe de 4, un projet livré en deux jours.',
          en: 'Team of 4, a project delivered in two days.',
        },
      },
      {
        projet: 'immatriculations',
        apport: {
          fr: 'Binôme, dépôt Git partagé, feuille de temps commune.',
          en: 'Pair work, shared Git repository, joint timesheet.',
        },
      },
    ],
  },
];

/** Boîte à outils : chaque outil est relié aux projets où il a servi. */
export interface Outil {
  nom: string;
  /** Logos Devicon à afficher (nom du dossier sur devicon.dev). */
  logos?: string[];
  /** Identifiants de projets, ou « cours » pour un outil pratiqué en cours et en travaux pratiques. */
  utiliseDans: string[];
}

export const boiteAOutils: { titre: Texte; outils: Outil[] }[] = [
  {
    titre: { fr: 'Langages', en: 'Languages' },
    outils: [
      { nom: 'C++', logos: ['cplusplus'], utiliseDans: ['immatriculations', 'tri', 'bibliotheque'] },
      { nom: 'JavaScript', logos: ['javascript'], utiliseDans: ['archisim', 'parcoursup-explorer'] },
      { nom: 'TypeScript', logos: ['typescript'], utiliseDans: ['hypoxia', 'portfolio'] },
      { nom: 'SQL', logos: ['azuresqldatabase'], utiliseDans: ['base-de-donnees'] },
      { nom: 'Python', logos: ['python'], utiliseDans: ['cours'] },
      { nom: 'Java', logos: ['java'], utiliseDans: ['cours'] },
      { nom: 'C', logos: ['c'], utiliseDans: ['cours'] },
      { nom: 'Bash', logos: ['bash'], utiliseDans: ['poste-developpement'] },
    ],
  },
  {
    titre: { fr: 'Web', en: 'Web' },
    outils: [
      { nom: 'HTML · CSS', logos: ['html5','css3'], utiliseDans: ['site-web', 'parcoursup-explorer', 'portfolio'] },
      { nom: 'Vue 3', logos: ['vuejs'], utiliseDans: ['archisim'] },
      { nom: 'React · Next.js', logos: ['react','nextjs'], utiliseDans: ['hypoxia'] },
      { nom: 'Astro', logos: ['astro'], utiliseDans: ['portfolio'] },
      { nom: 'Three.js', logos: ['threejs'], utiliseDans: ['hypoxia'] },
      { nom: 'Sass', logos: ['sass'], utiliseDans: ['parcoursup-explorer'] },
      { nom: 'Tailwind CSS', logos: ['tailwindcss'], utiliseDans: ['hypoxia'] },
      { nom: 'Leaflet · Chart.js', logos: ['chartjs'], utiliseDans: ['parcoursup-explorer'] },
    ],
  },
  {
    titre: { fr: 'Données', en: 'Data' },
    outils: [
      { nom: 'PostgreSQL', logos: ['postgresql'], utiliseDans: ['base-de-donnees'] },
      { nom: 'PL/pgSQL', logos: ['postgresql'], utiliseDans: ['cours'] },
      { nom: 'WinDesign', utiliseDans: ['base-de-donnees'] },
      { nom: 'JSON · XML', logos: ['json','xml'], utiliseDans: ['immatriculations'] },
      { nom: 'API REST', utiliseDans: ['parcoursup-explorer'] },
    ],
  },
  {
    titre: { fr: 'Systèmes et réseaux', en: 'Systems and networks' },
    outils: [
      { nom: 'Linux (Debian, Ubuntu)', logos: ['linux','debian','ubuntu'], utiliseDans: ['poste-developpement'] },
      { nom: 'Windows 11', logos: ['windows11'], utiliseDans: ['poste-developpement'] },
      { nom: 'VirtualBox', utiliseDans: ['poste-developpement'] },
      { nom: 'Postfix', utiliseDans: ['poste-developpement'] },
      { nom: 'Qt 6', logos: ['qt'], utiliseDans: ['immatriculations'] },
    ],
  },
  {
    titre: { fr: 'Méthodes et outils', en: 'Methods and tools' },
    outils: [
      { nom: 'Git', logos: ['git'], utiliseDans: ['archisim', 'immatriculations', 'parcoursup-explorer', 'hypoxia'] },
      { nom: 'Scrum', utiliseDans: ['archisim'] },
      { nom: 'UML', logos: ['unifiedmodelinglanguage'], utiliseDans: ['immatriculations', 'archisim', 'parcoursup-explorer'] },
      { nom: 'Vitest', logos: ['vitest'], utiliseDans: ['archisim'] },
      { nom: 'Vite · webpack', logos: ['vitejs','webpack'], utiliseDans: ['archisim', 'parcoursup-explorer'] },
      { nom: 'Sage 100', utiliseDans: ['emploi'] },
    ],
  },
];

typographier([competences, boiteAOutils]);
