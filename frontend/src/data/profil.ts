/**
 * Identité, coordonnées et recherche de stage.
 * C'est LE fichier à modifier si une date, un numéro ou une adresse change.
 * Source : CV de septembre 2026 (dossier Demarches_Stages) et présentation « Stage 26-27 » de l'IUT.
 */
import type { Texte } from '@/i18n';
import { typographier } from '@/i18n/typo';

export const profil = {
  prenom: 'Mamadou Bailo',
  nom: 'Barry',
  nomComplet: 'Mamadou Bailo Barry',
  initiales: 'MB',
  email: 'mounabarry620@gmail.com',
  telephone: { affichage: '07 53 17 27 52', lien: '+33753172752' },
  ville: 'Marseille',
  liens: {
    linkedin: 'https://linkedin.com/in/baillo-barry',
    github: 'https://github.com/mounabarry620-star',
    depot: 'https://github.com/mounabarry620-star/My_Portfolio',
  },
  /** Mois de la dernière mise à jour du contenu (affiché en pied de page). */
  miseAJour: '2026-11',
  /** Coordonnées géographiques et liens directs vers les cartes (sans clé d'API ni traceur). */
  localisation: {
    fuseau: 'Europe/Paris',
    marseille: {
      nom: 'Marseille',
      coordonnees: '43°17′47″N · 5°22′11″E',
      lat: 43.2965,
      lon: 5.3698,
      embed: 'https://www.openstreetmap.org/export/embed.html?bbox=5.3150%2C43.2650%2C5.4250%2C43.3280&layer=mapnik&marker=43.2965%2C5.3698',
      maps: 'https://www.google.com/maps/search/?api=1&query=43.2965,5.3698',
      osm: 'https://www.openstreetmap.org/?mlat=43.2965&mlon=5.3698#map=13/43.2965/5.3698',
    },
    arles: {
      nom: "IUT d'Aix-Marseille · Arles",
      coordonnees: '43°40′22″N · 4°38′25″E',
      lat: 43.6728,
      lon: 4.6403,
      embed: 'https://www.openstreetmap.org/export/embed.html?bbox=4.6100%2C43.6580%2C4.6700%2C43.6880&layer=mapnik&marker=43.6728%2C4.6403',
      maps: "https://www.google.com/maps/search/?api=1&query=IUT+Aix-Marseille+Arles+Rue+Raoul+Follereau",
      osm: 'https://www.openstreetmap.org/?mlat=43.6728&mlon=4.6403#map=15/43.6728/4.6403',
    },
  },
} as const;

/** Recherche de stage : dates officielles du stage de BUT 2 (présentation « Stage 26-27 »). */
export const stage = {
  debut: '2027-03-29',
  fin: '2027-06-18',
  semaines: 12,
  prolongeableJusqua: '2027-08-31',
  /** Code du stage dans le programme national du BUT Informatique. */
  reference: 'S4·STAGE',
} as const;

/** « Bonjour » dans les quatre langues parlées, dans l'ordre d'apprentissage. */
export const salutations = [
  { texte: 'On jaaraama', lang: 'ff', langue: { fr: 'pular', en: 'Pular' } },
  { texte: 'Bonjour', lang: 'fr', langue: { fr: 'français', en: 'French' } },
  { texte: 'Hello', lang: 'en', langue: { fr: 'anglais', en: 'English' } },
  { texte: 'Hallo', lang: 'de', langue: { fr: 'allemand', en: 'German' } },
] as const;

export const languesParlees: { nom: Texte; niveau: Texte; jauge: number }[] = [
  { nom: { fr: 'Pular', en: 'Pular' }, niveau: { fr: 'Langue maternelle', en: 'Native language' }, jauge: 4 },
  { nom: { fr: 'Français', en: 'French' }, niveau: { fr: 'Courant', en: 'Fluent' }, jauge: 4 },
  {
    nom: { fr: 'Anglais', en: 'English' },
    niveau: { fr: 'Niveau B2 · technique et professionnel', en: 'B2 level · technical and professional' },
    jauge: 3,
  },
  { nom: { fr: 'Allemand', en: 'German' }, niveau: { fr: 'Niveau A2', en: 'A2 level' }, jauge: 1 },
];

export const centresInteret: { titre: Texte; texte: Texte }[] = [
  {
    titre: { fr: 'Échecs', en: 'Chess' },
    texte: {
      fr: 'Un jeu où il faut prévoir plusieurs coups à l\'avance.',
      en: 'A game where you have to think several moves ahead.',
    },
  },
  {
    titre: { fr: 'Intelligence artificielle locale', en: 'Local artificial intelligence' },
    texte: {
      fr: "Je fais tourner des modèles de langage sur mon propre ordinateur. Projet personnel en préparation : un modèle qui parle pular.",
      en: 'I run language models on my own computer. Personal project in preparation: a model that speaks Pular.',
    },
  },
  {
    titre: { fr: 'Linux et sécurité informatique', en: 'Linux and computer security' },
    texte: {
      fr: "J'administre mes systèmes Linux et j'apprends la sécurité sur un laboratoire personnel, hors de tout réseau réel.",
      en: 'I manage my own Linux systems and learn security on a personal lab, away from any real network.',
    },
  },
];

/** Les trois particularités (méthode des « 3 P » : Particularités, Preuves, Profits). */
export const particularites: {
  titre: Texte;
  texte: Texte;
  preuve: Texte;
  lien?: { projet: string } | { section: string };
}[] = [
  {
    titre: { fr: 'De la mécanique au logiciel', en: 'From mechanics to software' },
    texte: {
      fr: "Avant l'informatique, j'ai étudié le génie mécanique pendant deux ans à l'université Gamal Abdel Nasser de Conakry. J'en garde une habitude : comprendre comment la machine fonctionne avant d'écrire le code.",
      en: 'Before computer science, I studied mechanical engineering for two years at Gamal Abdel Nasser University in Conakry. One habit stayed with me: understanding how the machine works before writing the code.',
    },
    preuve: {
      fr: 'ArchiSim, un simulateur de processeur et de mémoire.',
      en: 'ArchiSim, a processor and memory simulator.',
    },
    lien: { projet: 'archisim' },
  },
  {
    titre: { fr: 'Études et emploi en même temps', en: 'Studying and working at the same time' },
    texte: {
      fr: "Depuis 2025, je travaille en contrat à durée indéterminée (CDI) à temps partiel comme opérateur logistique chez Lidl, en parallèle de ma formation. Préparation de commandes en flux tendu, cadences et procédures à respecter.",
      en: 'Since 2025, I have held a part-time permanent contract as a logistics operator at Lidl, alongside my studies. Order picking on a just-in-time basis, with pace and procedures to follow.',
    },
    preuve: {
      fr: '1re année de BUT validée avec mention, tout en travaillant.',
      en: 'First year of the BUT passed with honours, while working.',
    },
    lien: { section: 'parcours' },
  },
  {
    titre: { fr: 'Quatre langues', en: 'Four languages' },
    texte: {
      fr: "Pular (langue maternelle), français (courant), anglais (niveau B2) et allemand (niveau A2). Passer d'une langue à l'autre m'a appris à adapter mon discours à la personne en face.",
      en: 'Pular (native), French (fluent), English (B2 level) and German (A2 level). Moving between languages taught me to adapt what I say to the person in front of me.',
    },
    preuve: {
      fr: 'Ce site existe en deux langues et en deux niveaux de lecture, simple ou technique.',
      en: 'This site exists in two languages and two reading levels, plain or technical.',
    },
  },
];

/** Les « profits » : ce que l'équipe d'accueil y gagne, avec la preuve à côté. */
export const atouts: { titre: Texte; texte: Texte; preuve: Texte; lien?: string }[] = [
  {
    titre: { fr: 'Autonome sur mon poste de travail', en: 'Self-sufficient on my workstation' },
    texte: {
      fr: "J'installe et je configure mon environnement moi-même : Linux (Debian, Ubuntu) et Windows 11, Git, terminal, machines virtuelles.",
      en: 'I install and configure my own environment: Linux (Debian, Ubuntu) and Windows 11, Git, the terminal, virtual machines.',
    },
    preuve: {
      fr: "Installation d'un poste de développement en double amorçage Debian 12 et Windows 11.",
      en: 'Setting up a dual-boot Debian 12 and Windows 11 development workstation.',
    },
    lien: 'poste-developpement',
  },
  {
    titre: { fr: 'Du besoin au code', en: 'From the need to the code' },
    texte: {
      fr: "Je traduis la demande d'un client en tâches vérifiables, puis je développe ma partie.",
      en: 'I turn a client request into verifiable tasks, then I build my part.',
    },
    preuve: {
      fr: "Product Owner d'ArchiSim : 20 récits utilisateur, chacun avec ses critères d'acceptation.",
      en: 'Product Owner of ArchiSim: 20 user stories, each with its acceptance criteria.',
    },
    lien: 'archisim',
  },
  {
    titre: { fr: 'Du code testé et documenté', en: 'Tested and documented code' },
    texte: {
      fr: "Tests automatisés, notice d'installation, schémas : le projet reste utilisable par quelqu'un d'autre que moi.",
      en: 'Automated tests, installation guide, diagrams: the project stays usable by someone other than me.',
    },
    preuve: {
      fr: '23 tests automatisés sur ArchiSim ; une notice complète pour Parcoursup Explorer.',
      en: '23 automated tests on ArchiSim; a full guide for Parcoursup Explorer.',
    },
    lien: 'parcoursup-explorer',
  },
  {
    titre: { fr: 'Des explications claires', en: 'Clear explanations' },
    texte: {
      fr: "Je présente mon travail à l'oral et j'adapte le niveau de détail à mon interlocuteur.",
      en: 'I present my work out loud and adjust the level of detail to my audience.',
    },
    preuve: {
      fr: "Revue de sprint d'ArchiSim devant un jury ; ce site, lisible en version simple ou technique.",
      en: 'ArchiSim sprint review in front of a panel; this site, readable in a plain or technical version.',
    },
  },
];

/** Questions qu'un recruteur se pose, avec des réponses factuelles. */
export const faq: { question: Texte; reponse: Texte }[] = [
  {
    question: { fr: 'Quelles sont les dates du stage ?', en: 'What are the internship dates?' },
    reponse: {
      fr: "Du 29 mars au 18 juin 2027, soit 12 semaines à temps plein. Je peux prolonger jusqu'à fin août 2027.",
      en: 'From 29 March to 18 June 2027, that is 12 weeks full time. I can extend until the end of August 2027.',
    },
  },
  {
    question: { fr: 'Quel est le cadre du stage ?', en: 'What is the framework of the internship?' },
    reponse: {
      fr: "C'est le stage obligatoire de 2e année de BUT Informatique. Une convention est signée entre votre structure, l'IUT d'Aix-Marseille et moi. Comme il dure plus de deux mois, le stage est gratifié.",
      en: 'It is the compulsory second-year internship of the BUT in Computer Science. An agreement is signed between your organisation, IUT Aix-Marseille and me. As it lasts more than two months, the internship is paid.',
    },
  },
  {
    question: { fr: 'Où pouvez-vous travailler ?', en: 'Where can you work?' },
    reponse: {
      fr: "J'habite à Marseille. Je suis mobile dans toute la région Provence-Alpes-Côte d'Azur et ailleurs en France.",
      en: "I live in Marseille. I can travel across the Provence-Alpes-Côte d'Azur region and elsewhere in France.",
    },
  },
  {
    question: { fr: 'Sur quelles missions pouvez-vous aider ?', en: 'What kind of work can you help with?' },
    reponse: {
      fr: "Développement de fonctionnalités, côté interface ou côté serveur. Tests et correction d'anomalies. Rédaction de la documentation technique.",
      en: 'Building features, on the interface side or the server side. Testing and fixing defects. Writing technical documentation.',
    },
  },
  {
    question: { fr: 'Quels langages connaissez-vous ?', en: 'Which languages do you know?' },
    reponse: {
      fr: 'C++, Python, Java, JavaScript, TypeScript et SQL avec PostgreSQL. Côté web : Vue, React et Next.js. Chaque outil est relié à un projet dans la section Compétences.',
      en: 'C++, Python, Java, JavaScript, TypeScript and SQL with PostgreSQL. On the web side: Vue, React and Next.js. Each tool is linked to a project in the Skills section.',
    },
  },
];

typographier([languesParlees, centresInteret, particularites, atouts, faq]);
