/**
 * Textes de l'interface (menus, boutons, titres de sections), en français et en anglais.
 * Règles de rédaction : phrases courtes, faits vérifiables, pas de superlatifs,
 * sigles écrits en toutes lettres à leur première apparition.
 */
import type { Texte } from './index';
import { typographier } from './typo';

export const ui = {
  meta: {
    titre: {
      fr: 'Mamadou Bailo Barry — Développeur logiciel et web · Stage du 29 mars au 18 juin 2027',
      en: 'Mamadou Bailo Barry — Software and web developer · Internship 29 March – 18 June 2027',
    },
    description: {
      fr: "Portfolio de Mamadou Bailo Barry, étudiant en 2e année de BUT Informatique à l'IUT d'Aix-Marseille (site d'Arles). Recherche un stage de 12 semaines en développement logiciel et web, du 29 mars au 18 juin 2027.",
      en: 'Portfolio of Mamadou Bailo Barry, second-year Computer Science student (BUT) at IUT Aix-Marseille, Arles campus. Looking for a 12-week software and web development internship, 29 March to 18 June 2027.',
    },
  },

  commun: {
    allerAuContenu: { fr: 'Aller au contenu', en: 'Skip to content' },
    menu: { fr: 'Menu', en: 'Menu' },
    fermer: { fr: 'Fermer', en: 'Close' },
    cv: { fr: 'CV', en: 'CV' },
    nouvelOnglet: { fr: '(nouvel onglet)', en: '(new tab)' },
    retourAccueil: { fr: "Retour à l'accueil", en: 'Back to home' },
    preuve: { fr: 'Preuve', en: 'Evidence' },
    voirProjet: { fr: 'Voir le projet', en: 'View project' },
    enCours: { fr: 'en cours', en: 'in progress' },
  },

  nav: {
    titre: { fr: 'Navigation principale', en: 'Main navigation' },
    profil: { fr: 'Profil', en: 'Profile' },
    projets: { fr: 'Projets', en: 'Projects' },
    competences: { fr: 'Compétences', en: 'Skills' },
    parcours: { fr: 'Parcours', en: 'Journey' },
    atouts: { fr: 'Atouts', en: 'Strengths' },
    contact: { fr: 'Contact', en: 'Contact' },
  },

  reglages: {
    titre: { fr: 'Réglages', en: 'Settings' },
    theme: { fr: 'Thème', en: 'Theme' },
    choisirTheme: { fr: 'Choisir un thème', en: 'Choose a theme' },
    langue: { fr: 'Langue', en: 'Language' },
    changerLangue: { fr: 'Read this page in English', en: 'Lire cette page en français' },
    lecture: { fr: 'Lecture', en: 'Reading' },
    simple: { fr: 'Simple', en: 'Plain' },
    technique: { fr: 'Technique', en: 'Technical' },
    lectureAide: {
      fr: 'Simple : pour tout le monde. Technique : pour les développeurs.',
      en: 'Plain: for everyone. Technical: for developers.',
    },
    commandes: { fr: 'Recherche et commandes', en: 'Search and commands' },
  },

  themes: {
    arles: {
      nom: { fr: 'Arles', en: 'Arles' },
      note: { fr: "Jour · là où j'étudie", en: 'Day · where I study' },
    },
    marseille: {
      nom: { fr: 'Marseille', en: 'Marseille' },
      note: { fr: 'Mer · là où je vis', en: 'Sea · where I live' },
    },
    conakry: {
      nom: { fr: 'Conakry', en: 'Conakry' },
      note: { fr: "Nuit · là d'où je viens", en: 'Night · where I come from' },
    },
    machine: {
      nom: { fr: 'Machine', en: 'Machine' },
      note: { fr: 'Terminal · là où je code', en: 'Terminal · where I code' },
    },
  },

  hero: {
    surtitre: { fr: 'Portfolio 2026 – 2027', en: 'Portfolio 2026 – 2027' },
    salutationsAria: {
      fr: 'Bonjour, en pular, en français, en anglais et en allemand',
      en: 'Hello, in Pular, French, English and German',
    },
    accroche: {
      simple: {
        fr: "Je conçois et je développe des logiciels et des applications web. Je suis en 2e année de Bachelor Universitaire de Technologie (BUT) Informatique à l'IUT d'Aix-Marseille, site d'Arles.",
        en: 'I design and build software and web applications. I am a second-year Computer Science student in a BUT (the French three-year Bachelor of Technology) at IUT Aix-Marseille, Arles campus.',
      },
      technique: {
        fr: 'Développement logiciel et web : C++, Python, Java, JavaScript, TypeScript, SQL. 2e année de BUT Informatique, parcours « Réalisation d\'applications : conception, développement, validation ».',
        en: 'Software and web development: C++, Python, Java, JavaScript, TypeScript, SQL. Second year of a BUT in Computer Science, “Application development: design, development, validation” track.',
      },
    },
    departLabel: { fr: 'Prochain départ', en: 'Next departure' },
    departObjet: { fr: 'Stage · 12 semaines', en: 'Internship · 12 weeks' },
    jours: { fr: 'J-', en: 'D-' },
    joursAria: { fr: 'jours avant le début du stage', en: 'days until the internship starts' },
    voirProjets: { fr: 'Voir mes projets', en: 'See my projects' },
    telechargerCv: { fr: 'Télécharger mon CV', en: 'Download my CV' },
    contacter: { fr: 'Me contacter', en: 'Contact me' },
    portraitAlt: {
      fr: 'Portrait de Mamadou Bailo Barry',
      en: 'Portrait of Mamadou Bailo Barry',
    },
  },

  billet: {
    titre: { fr: 'Billet de stage', en: 'Internship ticket' },
    ref: { fr: 'Réf.', en: 'Ref.' },
    de: { fr: 'De', en: 'From' },
    vers: { fr: 'Vers', en: 'To' },
    origine: { fr: "IUT d'Arles", en: 'IUT Arles' },
    origineNote: { fr: 'BUT Informatique, 2e année', en: 'BUT Computer Science, year 2' },
    destination: { fr: 'Votre équipe', en: 'Your team' },
    destinationNote: { fr: 'Entreprise ou administration', en: 'Company or public body' },
    depart: { fr: 'Départ', en: 'Departure' },
    arrivee: { fr: 'Arrivée', en: 'Arrival' },
    duree: { fr: 'Durée', en: 'Duration' },
    semaines: { fr: '12 semaines', en: '12 weeks' },
    poste: { fr: 'Poste', en: 'Role' },
    posteValeur: { fr: 'Développeur logiciel et web', en: 'Software and web developer' },
    rythme: { fr: 'Rythme', en: 'Schedule' },
    rythmeValeur: { fr: 'Temps plein', en: 'Full time' },
    option: { fr: 'Option', en: 'Option' },
    optionValeur: { fr: "Prolongeable jusqu'à fin août 2027", en: 'Can be extended to end of August 2027' },
    mobilite: { fr: 'Mobilité', en: 'Mobility' },
    mobiliteValeur: {
      fr: "Marseille · Provence-Alpes-Côte d'Azur · France",
      en: "Marseille · Provence-Alpes-Côte d'Azur · France",
    },
    qr: { fr: 'Scannez pour ouvrir mon CV', en: 'Scan to open my CV' },
    badge: {
      fr: 'Disponible · stage 2027 · 12 semaines · ',
      en: 'Available · 2027 internship · 12 weeks · ',
    },
    composter: {
      fr: 'Composter le billet et valider ma disponibilité',
      en: 'Stamp ticket and confirm availability',
    },
    tamponTitre: {
      fr: 'COMPOSTÉ · DISPONIBLE',
      en: 'STAMPED · AVAILABLE',
    },
    tamponSousTitre: {
      fr: '29 MARS → 18 JUIN 2027 · PRÊT AU DÉPART',
      en: '29 MAR → 18 JUN 2027 · READY TO BOARD',
    },
    voirCarte: {
      fr: 'Ouvrir sur Google Maps',
      en: 'Open on Google Maps',
    },
    aria: {
      fr: 'Recherche de stage : 12 semaines, du 29 mars au 18 juin 2027, à temps plein, en développement logiciel et web.',
      en: 'Internship search: 12 weeks, 29 March to 18 June 2027, full time, software and web development.',
    },
  },

  particularites: {
    etiquette: { fr: 'Particularités', en: 'What sets me apart' },
    titre: { fr: 'Ce qui me distingue', en: 'What makes me different' },
    intro: {
      fr: 'Trois faits qui résument mon profil.',
      en: 'Three facts that sum up my profile.',
    },
  },

  projets: {
    etiquette: { fr: 'Preuves', en: 'Evidence' },
    titre: { fr: "Ce que j'ai réalisé", en: 'What I have built' },
    intro: {
      fr: "Des projets menés en équipe ou seul, à l'IUT et en dehors. Chaque fiche explique le besoin, mon rôle et le résultat.",
      en: 'Projects carried out in a team or alone, at university and beyond. Each page explains the need, my role and the outcome.',
    },
    autres: { fr: 'Autres réalisations', en: 'Other work' },
    role: { fr: 'Rôle', en: 'Role' },
    equipe: { fr: 'Équipe', en: 'Team' },
    periode: { fr: 'Période', en: 'Period' },
    cadre: { fr: 'Cadre', en: 'Context' },
    technologies: { fr: 'Technologies', en: 'Technologies' },
    competences: { fr: 'Compétences mobilisées', en: 'Skills demonstrated' },
    demo: { fr: 'Ouvrir la démo', en: 'Open the demo' },
    code: { fr: 'Voir le code', en: 'View the code' },
    tous: { fr: 'Tous les projets', en: 'All projects' },
    suivant: { fr: 'Projet suivant', en: 'Next project' },
    besoin: { fr: 'Le besoin', en: 'The need' },
    realisation: { fr: "Ce que j'ai fait", en: 'What I did' },
    resultat: { fr: 'Le résultat', en: 'The outcome' },
    appris: { fr: "Ce que j'ai appris", en: 'What I learned' },
    images: { fr: 'En images', en: 'In pictures' },
    chiffres: { fr: 'En chiffres', en: 'Key figures' },
    agrandirImage: { fr: "Agrandir l'image en plein écran", en: 'View image in full screen' },
    imagePrecedente: { fr: 'Image précédente', en: 'Previous image' },
    imageSuivante: { fr: 'Image suivante', en: 'Next image' },
  },

  competences: {
    etiquette: { fr: 'Compétences', en: 'Skills' },
    titre: { fr: 'Ce que je sais faire', en: 'What I can do' },
    intro: {
      fr: 'Le BUT Informatique évalue six compétences, définies par le programme national. Pour chacune : le niveau atteint et les projets qui le prouvent.',
      en: 'The BUT in Computer Science assesses six skills, set by the French national curriculum. For each one: the level reached and the projects that prove it.',
    },
    niveau1: { fr: 'Niveau 1', en: 'Level 1' },
    niveau1Etat: { fr: 'validé · 1re année', en: 'achieved · year 1' },
    niveau2: { fr: 'Niveau 2', en: 'Level 2' },
    niveau2Etat: { fr: 'en cours · 2e année', en: 'in progress · year 2' },
    preuves: { fr: 'Preuves', en: 'Evidence' },
    outils: { fr: 'Boîte à outils', en: 'Toolbox' },
    outilsIntro: {
      fr: "Les langages et outils que j'ai utilisés dans au moins un projet.",
      en: 'Languages and tools I have used in at least one project.',
    },
    outilsAide: {
      fr: 'Survolez ou touchez un outil pour voir dans quel projet il a servi.',
      en: 'Hover over or tap a tool to see which project it was used in.',
    },
  },

  parcours: {
    etiquette: { fr: 'Parcours', en: 'Journey' },
    titre: { fr: "D'où je viens, où je vais", en: 'Where I come from, where I am going' },
    intro: {
      fr: "Deux lignes et une correspondance : la mécanique à Conakry, puis l'informatique à Arles.",
      en: 'Two lines and one connection: mechanical engineering in Conakry, then computer science in Arles.',
    },
    formation: { fr: 'Formation', en: 'Education' },
    emploi: { fr: 'Emploi', en: 'Work' },
    distinction: { fr: 'Distinction', en: 'Award' },
    objectif: { fr: 'Objectif', en: 'Goal' },
    correspondance: { fr: 'Correspondance', en: 'Connection' },
  },

  atouts: {
    etiquette: { fr: 'Profits', en: 'Benefits' },
    titre: { fr: "Ce que j'apporte à votre équipe", en: 'What I bring to your team' },
    intro: {
      fr: "Quatre points concrets, chacun appuyé sur un fait.",
      en: 'Four concrete points, each backed by a fact.',
    },
    langues: { fr: 'Langues', en: 'Languages' },
    interets: { fr: "Centres d'intérêt", en: 'Interests' },
  },

  contact: {
    etiquette: { fr: 'Terminus', en: 'Last stop' },
    titre: { fr: 'Parlons de votre stage', en: "Let's talk about your internship" },
    texte: {
      fr: 'Je recherche un stage conventionné de 12 semaines, du 29 mars au 18 juin 2027, en développement logiciel ou web.',
      en: 'I am looking for a 12-week internship under a university agreement, from 29 March to 18 June 2027, in software or web development.',
    },
    ecrire: { fr: 'Écrire un e-mail', en: 'Send an email' },
    copier: { fr: "Copier l'adresse", en: 'Copy address' },
    copie: { fr: 'Adresse copiée', en: 'Address copied' },
    appeler: { fr: 'Appeler', en: 'Call' },
    cvFr: { fr: 'CV en français (PDF)', en: 'CV in French (PDF)' },
    cvEn: { fr: 'CV en anglais (PDF)', en: 'CV in English (PDF)' },
    cvPage: { fr: 'Voir le CV en ligne', en: 'View the CV online' },
    faqTitre: { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
    objetMail: {
      fr: 'Stage du 29 mars au 18 juin 2027',
      en: 'Internship 29 March – 18 June 2027',
    },
  },

  pied: {
    colophon: {
      fr: 'Site statique construit avec Astro, TypeScript et du CSS natif. Aucun cookie, aucun traceur.',
      en: 'Static site built with Astro, TypeScript and native CSS. No cookies, no trackers.',
    },
    maj: { fr: 'Dernière mise à jour', en: 'Last updated' },
    haut: { fr: 'Haut de page', en: 'Back to top' },
    source: { fr: 'Code source', en: 'Source code' },
    coulisses: { fr: 'Comment ce site est fait', en: 'How this site is made' },
    localisationEtiquette: { fr: 'Localisation & mobilité', en: 'Location & mobility' },
    localisationTitre: { fr: 'Basé à Marseille · Études à Arles', en: 'Based in Marseille · Studying in Arles' },
    localisationNote: {
      fr: "Mobile dans toute la région Provence-Alpes-Côte d'Azur et partout en France.",
      en: 'Available across the Provence-Alpes-Côte d’Azur region and anywhere in France.',
    },
    heureLocale: { fr: 'Heure locale', en: 'Local time' },
    domicile: { fr: 'Domicile · Marseille', en: 'Home · Marseille' },
    campus: { fr: "Campus · IUT d'Arles", en: 'Campus · IUT Arles' },
    centrerCarte: { fr: 'Voir sur la carte', en: 'Center on map' },
    afficherCarte: { fr: 'Afficher la carte', en: 'Show the map' },
    noteCarte: {
      fr: 'Elle se charge depuis openstreetmap.org.',
      en: 'It loads from openstreetmap.org.',
    },
    titreIframe: { fr: 'Carte interactive OpenStreetMap (Marseille et Arles)', en: 'Interactive OpenStreetMap (Marseille and Arles)' },
    ouvrirMaps: { fr: 'Google Maps', en: 'Google Maps' },
    ouvrirOsm: { fr: 'OpenStreetMap', en: 'OpenStreetMap' },
  },

  palette: {
    placeholder: { fr: 'Chercher une page, un projet, une action…', en: 'Search a page, a project, an action…' },
    aller: { fr: 'Aller à', en: 'Go to' },
    projets: { fr: 'Projets', en: 'Projects' },
    reglages: { fr: 'Réglages', en: 'Settings' },
    actions: { fr: 'Actions', en: 'Actions' },
    vide: { fr: 'Aucun résultat.', en: 'No results.' },
    aide: { fr: '↑ ↓ pour choisir · Entrée pour valider · Échap pour fermer', en: '↑ ↓ to move · Enter to select · Esc to close' },
    theme: { fr: 'Thème', en: 'Theme' },
    passerEn: { fr: 'Switch to English', en: 'Passer en français' },
    lectureSimple: { fr: 'Lecture simple', en: 'Plain reading' },
    lectureTechnique: { fr: 'Lecture technique', en: 'Technical reading' },
    copierMail: { fr: "Copier l'adresse e-mail", en: 'Copy email address' },
    telechargerCv: { fr: 'Télécharger le CV (PDF)', en: 'Download the CV (PDF)' },
    carteMarseille: { fr: 'Voir Marseille sur Google Maps', en: 'View Marseille on Google Maps' },
    carteArles: { fr: "Voir l'IUT d'Arles sur Google Maps", en: 'View IUT Arles on Google Maps' },
    ouvrirAssistant: { fr: "Poser une question à l'assistant IA", en: 'Ask the AI assistant a question' },
    ouvrirAssistantVoix: { fr: "Parler à l'assistant IA à voix haute", en: 'Talk to the AI assistant out loud' },
  },

  assistant: {
    bouton: { fr: 'Parler à mon IA', en: 'Talk to my AI' },
    titre: { fr: 'Assistant du portfolio', en: 'Portfolio assistant' },
    sousTitre: {
      fr: 'Répond sur mon parcours, mes projets et mon stage',
      en: 'Answers about my background, projects and internship',
    },
    accueil: {
      fr: "Bonjour ! Je suis l'assistant de ce portfolio. Posez-moi une question sur le parcours de Mamadou, ses projets ou son stage, par écrit ou à voix haute.",
      en: "Hello! I'm this portfolio's assistant. Ask me about Mamadou's background, projects or internship, by typing or out loud.",
    },
    placeholder: { fr: 'Votre question…', en: 'Your question…' },
    envoyer: { fr: 'Envoyer', en: 'Send' },
    suggestions: { fr: 'Exemples de questions', en: 'Example questions' },
    micro: { fr: 'Parler à voix haute', en: 'Speak out loud' },
    microStop: { fr: 'Terminer la conversation vocale', en: 'End the voice conversation' },
    vous: { fr: 'Vous', en: 'You' },
    ia: { fr: 'Assistant', en: 'Assistant' },
    reflexion: { fr: 'Rédaction de la réponse…', en: 'Writing the answer…' },
    connexion: { fr: 'Connexion…', en: 'Connecting…' },
    ecoute: { fr: 'Je vous écoute, parlez.', en: 'Listening, go ahead.' },
    parle: { fr: "L'assistant répond…", en: 'The assistant is speaking…' },
    fin: { fr: 'Conversation vocale terminée.', en: 'Voice conversation ended.' },
    consentement: {
      fr: "Avant de commencer : pendant la conversation, votre voix est envoyée directement à Google (Gemini). Ce site utilise l'offre gratuite de Gemini : Google peut utiliser ces échanges pour améliorer ses produits. Ne donnez pas d'informations personnelles.",
      en: "Before you start: during the conversation, your voice is sent directly to Google (Gemini). This site uses Gemini's free tier, so Google may use these exchanges to improve its products. Don't share personal information.",
    },
    commencer: { fr: 'Activer le micro', en: 'Turn on the microphone' },
    annuler: { fr: 'Annuler', en: 'Cancel' },
    note: {
      fr: "Réponses générées par Gemini (Google) à partir du contenu de ce site. Elles peuvent contenir des erreurs : en cas de doute, le site fait foi.",
      en: "Answers generated by Gemini (Google) from this site's content. They may contain mistakes: if in doubt, the site is the reference.",
    },
    erreurs: {
      reseau: { fr: "L'assistant ne répond pas pour le moment. Réessayez dans un instant.", en: "The assistant isn't responding right now. Please try again shortly." },
      limite: { fr: 'Trop de questions en peu de temps. Réessayez dans une minute.', en: 'Too many questions in a short time. Please try again in a minute.' },
      micro: { fr: "L'accès au micro a été refusé.", en: 'Microphone access was denied.' },
      robot: { fr: "La vérification anti-robot a échoué. Réessayez.", en: 'The bot check failed. Please try again.' },
      navigateur: { fr: 'Votre navigateur ne permet pas la conversation vocale. Écrivez votre question.', en: "Your browser doesn't support voice chat. Please type your question." },
      horsLigne: {
        fr: "L'assistant fonctionne seulement sur le site en ligne (hébergé sur Cloudflare).",
        en: 'The assistant only works on the live site (hosted on Cloudflare).',
      },
    },
  },

  cv: {
    titrePage: { fr: 'CV — Mamadou Bailo Barry', en: 'CV — Mamadou Bailo Barry' },
    imprimer: { fr: 'Imprimer', en: 'Print' },
    telecharger: { fr: 'Télécharger en PDF', en: 'Download as PDF' },
    retour: { fr: 'Retour au portfolio', en: 'Back to portfolio' },
    autreLangue: { fr: 'English version', en: 'Version française' },
  },

  erreur: {
    titre: { fr: 'Terminus. Cette page n\'existe pas.', en: 'End of the line. This page does not exist.' },
    texte: {
      fr: "L'adresse est peut-être mal écrite, ou la page a été déplacée.",
      en: 'The address may be mistyped, or the page has moved.',
    },
  },
} satisfies Record<string, unknown>;

/** Petit utilitaire : renvoie le texte dans la bonne langue. */
export const tr = (texte: Texte, l: keyof Texte): string => texte[l];

typographier(ui);
