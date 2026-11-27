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
    accueil: { fr: 'Accueil', en: 'Home' },
    deplacer: {
      fr: 'Glisser pour déplacer le menu · double-clic pour le remettre en place',
      en: 'Drag to move the menu · double-click to put it back',
    },
    profil: { fr: 'À propos', en: 'About' },
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
    bleu: {
      nom: { fr: 'Bleu', en: 'Blue' },
      note: { fr: 'Bleu clair et blanc', en: 'Light blue and white' },
    },
    sombre: {
      nom: { fr: 'Sombre', en: 'Dark' },
      note: { fr: 'Noir et rose-rouge', en: 'Black and crimson' },
    },
    clair: {
      nom: { fr: 'Clair', en: 'Light' },
      note: { fr: 'Noir sur blanc', en: 'Black on white' },
    },
    vert: {
      nom: { fr: 'Vert', en: 'Green' },
      note: { fr: 'Vert et bleu', en: 'Green and blue' },
    },
  },

  hero: {
    bonjour: { fr: 'Bonjour !', en: 'Hello there!' },
    jeSuis: { fr: 'Je suis', en: "I'm" },
    pcLibelle: {
      fr: "Illustration : un ordinateur. Le bouton rond allume ou éteint l'écran.",
      en: 'Illustration: a computer. The round button turns the screen on or off.',
    },
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
    disponible: { fr: 'Disponible pour un stage de 12 semaines à partir du', en: 'Available for a 12-week internship from' },
    dans: { fr: 'dans', en: 'in' },
    jours: { fr: 'jours', en: 'days' },
    voirProjets: { fr: 'Voir mes projets', en: 'See my projects' },
    telechargerCv: { fr: 'Télécharger mon CV', en: 'Download my CV' },
    contacter: { fr: 'Me contacter', en: 'Contact me' },
    portraitAlt: {
      fr: 'Portrait de Mamadou Bailo Barry',
      en: 'Portrait of Mamadou Bailo Barry',
    },
  },

  billet: {
    cherche: { fr: 'Je recherche', en: "I'm looking for" },
    stageDe: { fr: 'Un stage de développeur logiciel et web', en: 'A software and web developer internship' },
    dates: { fr: 'Dates', en: 'Dates' },
    semaines: { fr: '12 semaines', en: '12 weeks' },
    rythmeValeur: { fr: 'Temps plein', en: 'Full time' },
    option: { fr: 'Prolongation', en: 'Extension' },
    optionValeur: { fr: "Possible jusqu'à fin août 2027", en: 'Possible until the end of August 2027' },
    mobilite: { fr: 'Où', en: 'Where' },
    mobiliteValeur: {
      fr: "Marseille, toute la région Provence-Alpes-Côte d'Azur, ou ailleurs en France",
      en: "Marseille, anywhere in Provence-Alpes-Côte d'Azur, or elsewhere in France",
    },
    voirCv: { fr: 'Voir mon CV', en: 'See my CV' },
    qr: { fr: 'ou scannez le code avec votre téléphone', en: 'or scan the code with your phone' },
  },

  apropos: {
    titre: { fr: 'À propos de', en: 'About' },
    accent: { fr: 'moi', en: 'me' },
    etiquette: { fr: 'Un aperçu de mon parcours', en: 'A glimpse of who I am' },
    sousTitre: {
      fr: "Étudiant en 2e année de BUT Informatique à l'IUT d'Arles, à la recherche d'un stage.",
      en: 'Second-year Computer Science (BUT) student at IUT Arles, looking for an internship.',
    },
    imageAlt: {
      fr: "Illustration choisie pour la section « À propos »",
      en: 'Illustration chosen for the About section',
    },
    /** Mots mis en couleur dans le texte de la tablette. */
    motsCles: {
      fr: ['génie mécanique', 'Conakry', 'contrat à durée indéterminée (CDI)', 'Lidl', 'Pular', 'français', 'anglais', 'allemand'],
      en: ['mechanical engineering', 'Conakry', 'part-time permanent contract', 'Lidl', 'Pular', 'French', 'English', 'German'],
    },
    outils: { fr: 'Mes outils', en: 'My tools' },
    ecole: { fr: "IUT d'Arles · BUT Informatique, 2e année", en: 'IUT Arles · BUT Computer Science, 2nd year' },
    lireGrand: { fr: 'Lire ce texte en grand', en: 'Read this text in large print' },
    messageImage: { fr: "Voici l'image de ma section « À propos ».", en: 'Here is the picture for my About section.' },
  },

  particularites: {
    etiquette: { fr: 'Profil', en: 'Profile' },
    titre: { fr: 'Ce qui me distingue', en: 'What makes me different' },
    intro: {
      fr: 'Trois faits qui résument mon profil.',
      en: 'Three facts that sum up my profile.',
    },
  },

  projets: {
    titreCourt: { fr: 'Mes', en: 'My' },
    accent: { fr: 'projets', en: 'work' },
    sousTitre: { fr: 'Ce que j\'ai réalisé', en: 'What I have built' },
    voirPlus: { fr: 'Voir plus', en: 'See more' },
    voirMoins: { fr: 'Voir moins', en: 'See less' },
    autresTitre: { fr: 'Autres projets', en: 'Other projects' },
    autresIntro: {
      fr: 'Faites tourner le globe et touchez une image pour l’agrandir. Les travaux plus courts sont listés dessous.',
      en: 'Spin the globe and tap a picture to enlarge it. Shorter pieces of work are listed below.',
    },
    fiche: { fr: 'Voir la fiche', en: 'Read more' },
    etiquette: { fr: 'Projets', en: 'Projects' },
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
    titreCourt: { fr: 'Mon', en: 'My' },
    accent: { fr: 'parcours', en: 'journey' },
    sousTitre: {
      fr: "De mon bac à Conakry jusqu'à mon diplôme : faites défiler, le train vous emmène.",
      en: 'From my baccalaureate in Conakry to my degree: scroll down and ride the train.',
    },
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
    etiquette: { fr: 'Atouts', en: 'Strengths' },
    titre: { fr: "Ce que j'apporte à votre équipe", en: 'What I bring to your team' },
    intro: {
      fr: "Quatre points concrets, chacun appuyé sur un fait.",
      en: 'Four concrete points, each backed by a fact.',
    },
    langues: { fr: 'Langues', en: 'Languages' },
    interets: { fr: "Centres d'intérêt", en: 'Interests' },
  },

  contact: {
    titreCourt: { fr: 'Contactez-', en: 'Contact' },
    accent: { fr: 'moi !', en: 'me!' },
    mail: { fr: 'E-mail', en: 'Email' },
    telephone: { fr: 'Téléphone', en: 'Phone' },
    lieu: { fr: 'Lieu', en: 'Location' },
    nom: { fr: 'Votre nom', en: 'Your name' },
    email: { fr: 'Votre e-mail', en: 'Your email' },
    message: { fr: 'Votre message', en: 'Your message' },
    envoyer: { fr: 'Envoyer', en: 'Send' },
    noteEnvoi: {
      fr: 'Le bouton ouvre votre messagerie avec le message prêt à partir. Rien n’est enregistré sur ce site.',
      en: 'The button opens your email app with the message ready to send. Nothing is stored on this site.',
    },
    etiquette: { fr: 'Parlons de votre stage', en: "Let's talk about your internship" },
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
    main: {
      fr: ['Kangourou 3D : ', ' par rt699448, licence ', ', modifié (patte levée, rendu Blender).'],
      en: ['3D kangaroo: ', ' by rt699448, licence ', ', modified (raised paw, Blender render).'],
    },
    train: {
      fr: ['Train 3D : ', ' par TheOminousDuck, licence ', ', modifié (repeint, rendu Blender).'],
      en: ['3D train: ', ' by TheOminousDuck, licence ', ', modified (repainted, Blender render).'],
    },
    faitAvec: { fr: 'Fait avec', en: 'Made with' },
    par: { fr: 'par', en: 'by' },
    amour: { fr: 'amour', en: 'love' },
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
      micro: {
        fr: "L'accès au micro a été refusé. Autorisez le micro pour ce site dans les réglages du navigateur, puis réessayez.",
        en: 'Microphone access was denied. Allow the microphone for this site in your browser settings, then try again.',
      },
      microMuet: {
        fr: "Je n'entends rien : vérifiez que le micro n'est pas coupé ou utilisé par une autre appli.",
        en: "I can't hear anything: check that your microphone isn't muted or used by another app.",
      },
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
