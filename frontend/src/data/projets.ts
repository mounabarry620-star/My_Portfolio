/**
 * Les projets (les « preuves »).
 *
 * POUR AJOUTER UN PROJET : copier un bloc ci-dessous, changer le `slug` (identifiant
 * dans l'adresse), remplir les textes en français et en anglais, mettre les images
 * dans `src/assets/projets/` et les importer en haut de ce fichier.
 *  - `vedette: true`  → grande carte sur l'accueil + page dédiée ;
 *  - `vedette: false` → simple ligne dans « Autres réalisations ».
 *
 * Chaque texte existe en deux niveaux : `simple` (tout public) et `technique`.
 * Règle : uniquement des faits vérifiables (dépôts Git, notices, CV).
 */
import type { ImageMetadata } from 'astro';
import type { DeuxNiveaux, Texte } from '@/i18n';
import type { CompetenceId } from './competences';
import { typographier } from '@/i18n/typo';

import archisimBus from '@/assets/projets/archisim-bus.webp';
import archisimCalcul from '@/assets/projets/archisim-calcul.webp';
import hypoxiaScene from '@/assets/projets/hypoxia-scene.webp';
import hypoxiaAccueil from '@/assets/projets/hypoxia-accueil.webp';
import devartEquipe from '@/assets/projets/devart-equipe.jpg';
import devartPrix from '@/assets/projets/devart-prix.jpg';
import devartStand from '@/assets/projets/devart-stand.jpg';
import devartTravail from '@/assets/projets/devart-travail.jpg';
import devartAffiche from '@/assets/projets/devart-affiche.jpg';
import parcoursupCarte from '@/assets/projets/parcoursup-carte.webp';
import parcoursupHistorique from '@/assets/projets/parcoursup-historique.webp';
import parcoursupSombre from '@/assets/projets/parcoursup-sombre.webp';
import parcoursupListe from '@/assets/projets/parcoursup-liste.webp';
import immatUml from '@/assets/projets/immat-uml.webp';
import portfolioV1 from '@/assets/projets/portfolio-v1.webp';
import portfolioV2 from '@/assets/projets/portfolio-v2.webp';
import portfolioV2Themes from '@/assets/projets/portfolio-v2-themes.webp';
import siteBut from '@/assets/projets/site-but.webp';

export interface Illustration {
  image: ImageMetadata;
  alt: Texte;
  legende?: Texte;
}

export interface Projet {
  slug: string;
  vedette: boolean;
  annee: number;
  periode: Texte;
  enCours?: boolean;
  titre: Texte;
  /** Nature du projet en deux ou trois mots. */
  genre: Texte;
  accroche: DeuxNiveaux;
  cadre: Texte;
  role: Texte;
  equipe: Texte;
  distinction?: Texte;
  technologies: string[];
  competences: CompetenceId[];
  couverture?: Illustration;
  chiffres?: { valeur: string; libelle: Texte }[];
  besoin?: DeuxNiveaux;
  /** `true` si les réalisations décrivent le travail de toute l'équipe. */
  collectif?: boolean;
  realisations?: DeuxNiveaux[];
  resultat?: DeuxNiveaux;
  appris?: Texte;
  galerie?: Illustration[];
  liens?: { type: 'demo' | 'code'; href: string }[];
  note?: Texte;
}

const codePrive: Texte = {
  fr: 'Code non public · démonstration possible en entretien.',
  en: 'Code not public · demo available during an interview.',
};

export const projets: Projet[] = [
  /* ───────────────────────────── ArchiSim ───────────────────────────── */
  {
    slug: 'archisim',
    vedette: true,
    annee: 2026,
    periode: { fr: 'Octobre 2026 – en cours', en: 'October 2026 – ongoing' },
    enCours: true,
    titre: { fr: 'ArchiSim', en: 'ArchiSim' },
    genre: { fr: "Simulateur d'ordinateur", en: 'Computer simulator' },
    accroche: {
      simple: {
        fr: "Un simulateur qui montre, étape par étape, ce qui se passe à l'intérieur d'un ordinateur quand il exécute un programme.",
        en: 'A simulator that shows, step by step, what happens inside a computer when it runs a program.',
      },
      technique: {
        fr: "Simulateur pédagogique d'une machine de Von Neumann : exécution pas à pas d'un programme assembleur x86-64, avec registres 64 bits, bus et mémoire vive.",
        en: 'Teaching simulator of a Von Neumann machine: step-by-step execution of an x86-64 assembly program, with 64-bit registers, buses and memory.',
      },
    },
    cadre: {
      fr: "Projet noté de 2e année de BUT (SAÉ S3.A.01), commandé par un enseignant de l'IUT",
      en: 'Graded second-year project (SAÉ S3.A.01), commissioned by a lecturer',
    },
    role: {
      fr: 'Product Owner et développeur du module mémoire',
      en: 'Product Owner and developer of the memory module',
    },
    equipe: { fr: '5 étudiants, méthode Scrum', en: '5 students, Scrum' },
    technologies: ['Vue 3', 'JavaScript', 'Vite', 'Vitest', 'Git', 'Scrum'],
    competences: ['c1', 'c5', 'c6'],
    couverture: {
      image: archisimBus,
      alt: {
        fr: "Écran d'ArchiSim : le code assembleur à gauche, le processeur au centre, les trois bus en couleur et la mémoire vive à droite",
        en: 'ArchiSim screen: assembly code on the left, the processor in the middle, the three coloured buses and the memory on the right',
      },
    },
    chiffres: [
      { valeur: '5', libelle: { fr: "personnes dans l'équipe", en: 'people in the team' } },
      { valeur: '20', libelle: { fr: 'récits utilisateur rédigés', en: 'user stories written' } },
      { valeur: '12', libelle: { fr: 'livrés au premier sprint', en: 'delivered in the first sprint' } },
      { valeur: '23', libelle: { fr: 'tests automatisés', en: 'automated tests' } },
    ],
    besoin: {
      simple: {
        fr: "Quand on apprend à programmer au plus près de la machine, on écrit des instructions sans voir ce qu'elles provoquent. Où le programme est-il rangé ? Qu'est-ce qui circule entre le processeur et la mémoire ? Un enseignant de l'IUT nous a demandé un outil qui le montre à l'écran, pour ses cours et pour les révisions des étudiants.",
        en: 'When you learn to program close to the machine, you write instructions without seeing what they cause. Where is the program stored? What travels between the processor and the memory? A lecturer asked us for a tool that shows it on screen, for his lectures and for students revising on their own.',
      },
      technique: {
        fr: "Le client enseigne l'architecture des ordinateurs. Il veut un outil visuel pour l'assembleur x86-64 en syntaxe NASM, celle de son cours. Deux utilisateurs : l'enseignant, qui projette l'outil en cours, et l'étudiant, qui révise seul. Décision validée avec lui : une application 100 % navigateur, sans serveur, livrée sous forme de fichiers statiques.",
        en: 'The client teaches computer architecture. He wants a visual tool for x86-64 assembly in NASM syntax, the one used in his course. Two users: the lecturer, who projects the tool in class, and the student, who revises alone. Decision agreed with him: a browser-only application, with no server, delivered as static files.',
      },
    },
    realisations: [
      {
        simple: {
          fr: "Product Owner : je fais le lien entre le client et l'équipe. J'ai découpé sa demande en 20 petites fonctionnalités, chacune avec une façon de vérifier qu'elle est terminée.",
          en: 'Product Owner: I am the link between the client and the team. I split his request into 20 small features, each with a way to check that it is done.',
        },
        technique: {
          fr: "Product Owner : rédaction du Product Backlog (20 user stories au format « En tant que…, je veux…, afin de… », avec critères d'acceptation), feuille de route et choix du contenu du sprint 1 (US-01 à US-12).",
          en: 'Product Owner: wrote the Product Backlog (20 user stories in the “As a…, I want…, so that…” format, with acceptance criteria), the roadmap and the scope of sprint 1 (US-01 to US-12).',
        },
      },
      {
        simple: {
          fr: "Développeur : j'ai programmé la mémoire de l'ordinateur simulé et le chargement du programme dans cette mémoire.",
          en: 'Developer: I coded the memory of the simulated computer and the loading of the program into that memory.',
        },
        technique: {
          fr: 'Module mémoire : mémoire vive de 512 octets en little-endian, chargeur de programme (code à l\'adresse 0, données à l\'adresse 256), vue mémoire en Vue 3 et registre RIP qui désigne la prochaine instruction (US-05, US-11).',
          en: 'Memory module: 512-byte little-endian memory, program loader (code at address 0, data at address 256), memory view in Vue 3 and RIP register pointing to the next instruction (US-05, US-11).',
        },
      },
      {
        simple: {
          fr: "Qualité : mon module est vérifié par des tests automatiques. Personne n'écrit directement dans la version commune : chaque fonctionnalité passe par sa propre branche.",
          en: 'Quality: my module is checked by automated tests. Nobody writes straight into the shared version: each feature goes through its own branch.',
        },
        technique: {
          fr: "Tests Vitest du moteur, exécutables sans navigateur car le cœur (src/core) ne dépend pas de Vue. Une branche Git par user story, fusion par merge request sur le GitLab de l'université après « npm test » et « npm run build ».",
          en: "Vitest tests for the engine, runnable without a browser because the core (src/core) does not depend on Vue. One Git branch per user story, merged through a merge request on the university's GitLab after “npm test” and “npm run build”.",
        },
      },
      {
        simple: {
          fr: "Présentation : j'ai exposé le besoin, les utilisateurs et le plan de travail lors de la première démonstration, le 23 octobre 2026.",
          en: 'Presentation: I explained the need, the users and the work plan at the first demonstration, on 23 October 2026.',
        },
        technique: {
          fr: 'Revue de sprint du 23 octobre 2026 : présentation du besoin, du Product Backlog et de la feuille de route, puis démonstration commentée de la mémoire et du registre RIP.',
          en: 'Sprint review on 23 October 2026: presented the need, the Product Backlog and the roadmap, then a commented demo of the memory and the RIP register.',
        },
      },
    ],
    resultat: {
      simple: {
        fr: "À la fin de la première étape, on peut écrire ou importer un petit programme, le charger, puis l'exécuter pas à pas ou en continu. Le processeur, les bus et la mémoire s'allument à chaque étape, avec une phrase qui explique ce qui se passe. Chaque valeur s'affiche en décimal et en binaire.",
        en: 'At the end of the first stage, you can write or import a small program, load it, then run it step by step or continuously. The processor, the buses and the memory light up at each step, with a sentence explaining what is happening. Each value is shown in decimal and in binary.',
      },
      technique: {
        fr: "Sprint 1 livré : registres RAX, RBX, RCX, RDX et RIP sur 64 bits ; instructions MOV, ADD, SUB, INC, DEC et MUL ; modes Pas à pas et Exécuter ; animation des bus d'adresses, de données et de contrôle ; affichage décimal et binaire. Calcul exact grâce à BigInt, y compris le résultat sur 128 bits de MUL. Les 23 tests passent.",
        en: 'Sprint 1 delivered: 64-bit RAX, RBX, RCX, RDX and RIP registers; MOV, ADD, SUB, INC, DEC and MUL instructions; Step and Run modes; animated address, data and control buses; decimal and binary display. Exact arithmetic thanks to BigInt, including the 128-bit result of MUL. All 23 tests pass.',
      },
    },
    appris: {
      fr: "Écrire le « contrat » entre les modules avant de coder a permis à cinq personnes d'avancer en parallèle sans se bloquer. Et un besoin rédigé avec des critères vérifiables évite les désaccords le jour de la démonstration.",
      en: 'Writing the “contract” between modules before coding let five people move forward in parallel without blocking each other. And a need written with verifiable criteria avoids disagreements on demo day.',
    },
    galerie: [
      {
        image: archisimBus,
        alt: {
          fr: 'ArchiSim pendant une lecture en mémoire : les trois bus sont colorés et la case mémoire lue est encadrée',
          en: 'ArchiSim during a memory read: the three buses are coloured and the memory cell being read is outlined',
        },
        legende: {
          fr: "Lecture d'une variable : l'adresse part du processeur, la valeur revient par le bus de données.",
          en: 'Reading a variable: the address leaves the processor, the value comes back on the data bus.',
        },
      },
      {
        image: archisimCalcul,
        alt: {
          fr: "ArchiSim pendant un calcul : l'unité arithmétique et logique affiche une addition",
          en: 'ArchiSim during a computation: the arithmetic logic unit shows an addition',
        },
        legende: {
          fr: "Étape de calcul : l'unité arithmétique et logique additionne 5 et 10.",
          en: 'Computation step: the arithmetic logic unit adds 5 and 10.',
        },
      },
    ],
    note: codePrive,
  },

  /* ───────────────────────────── HYPOXIA ───────────────────────────── */
  {
    slug: 'hypoxia',
    vedette: true,
    annee: 2026,
    periode: { fr: '12 et 13 février 2026', en: '12–13 February 2026' },
    titre: { fr: 'HYPOXIA', en: 'HYPOXIA' },
    genre: { fr: 'Expérience web en 3D', en: '3D web experience' },
    accroche: {
      simple: {
        fr: "Une expérience en 3D qui rend visible le coût environnemental de l'intelligence artificielle : plus on écrit, plus la forêt à l'écran se dégrade.",
        en: 'A 3D experience that makes the environmental cost of artificial intelligence visible: the more you type, the more the forest on screen deteriorates.',
      },
      technique: {
        fr: "Expérience WebGL en temps réel (Next.js, React Three Fiber) : la longueur du texte saisi pilote la dégradation d'un écosystème 3D, avec effets de post-traitement et son réactif.",
        en: 'Real-time WebGL experience (Next.js, React Three Fiber): the length of the typed text drives the decay of a 3D ecosystem, with post-processing effects and reactive sound.',
      },
    },
    cadre: {
      fr: "Hackathon Dev'Art 2026 (concours de programmation sur deux jours), IUT d'Arles",
      en: "Dev'Art 2026 hackathon (a two-day coding competition), IUT Arles",
    },
    role: { fr: "Développeur dans l'équipe Nebula", en: 'Developer in team Nebula' },
    equipe: { fr: '4 étudiants', en: '4 students' },
    distinction: { fr: 'Prix du Jury', en: 'Jury Prize' },
    technologies: ['Next.js 16', 'React 19', 'Three.js', 'React Three Fiber', 'Zustand', 'Tailwind CSS 4'],
    competences: ['c1', 'c2', 'c6'],
    couverture: {
      image: hypoxiaScene,
      alt: {
        fr: "Scène 3D d'HYPOXIA : une forêt traversée par une rivière, avec un champ de saisie au centre de l'écran",
        en: 'HYPOXIA 3D scene: a forest crossed by a river, with a text field in the middle of the screen',
      },
    },
    chiffres: [
      { valeur: '2', libelle: { fr: 'jours pour concevoir et livrer', en: 'days to design and deliver' } },
      { valeur: '4', libelle: { fr: "personnes dans l'équipe", en: 'people in the team' } },
      { valeur: '87', libelle: { fr: 'commits sur le dépôt', en: 'commits in the repository' } },
      { valeur: '★', libelle: { fr: 'Prix du Jury', en: 'Jury Prize' } },
    ],
    besoin: {
      simple: {
        fr: "Le thème du concours était « L'Écho, la trace temporelle », avec un sujet sur l'impact environnemental. Notre constat : quand on pose une question à une intelligence artificielle, on ne voit ni l'électricité ni l'eau consommées. Nous avons voulu le faire ressentir, sans afficher de facture carbone.",
        en: 'The theme of the competition was “The Echo, the trace of time”, with a topic on environmental impact. Our observation: when you ask an artificial intelligence a question, you see neither the electricity nor the water it consumes. We wanted people to feel it, without showing a carbon bill.',
      },
      technique: {
        fr: "Thème imposé : « L'Écho / La trace temporelle », sujet « Impact environnemental et identité visuelle ». Contrainte : livrer en deux jours une application web jouable, avec une direction artistique marquée et un message compréhensible sans explication.",
        en: 'Set theme: “The Echo / The trace of time”, topic “Environmental impact and visual identity”. Constraint: deliver in two days a playable web application, with a strong art direction and a message that needs no explanation.',
      },
    },
    collectif: true,
    realisations: [
      {
        simple: {
          fr: "Un paysage vivant en 3D : une forêt, une rivière, le ciel. L'utilisateur tape un texte, comme il le ferait avec un assistant d'intelligence artificielle.",
          en: 'A living 3D landscape: a forest, a river, the sky. The user types a text, as they would with an artificial-intelligence assistant.',
        },
        technique: {
          fr: 'Scène 3D en React Three Fiber (Three.js) : rivière, forêt et ciel, avec un champ de saisie en surimpression.',
          en: 'A 3D scene in React Three Fiber (Three.js): river, forest and sky, with a text field overlaid.',
        },
      },
      {
        simple: {
          fr: "À chaque caractère tapé, la nature se dégrade en direct : la rivière s'éteint, les arbres meurent, le ciel rougit et le battement de cœur s'accélère.",
          en: 'With each character typed, nature deteriorates live: the river fades, the trees die, the sky turns red and the heartbeat speeds up.',
        },
        technique: {
          fr: 'Un état global (Zustand) convertit la longueur du texte en niveau de « stress ». Ce niveau pilote les matériaux, les effets de post-traitement (vignette, bruit, aberration chromatique) et le son (Howler.js).',
          en: 'A global state (Zustand) turns the text length into a “stress” level. That level drives the materials, the post-processing effects (vignette, noise, chromatic aberration) and the sound (Howler.js).',
        },
      },
      {
        simple: {
          fr: "Même si l'on efface le texte, une trace reste à l'écran : c'est « l'écho », la cicatrice.",
          en: 'Even if you delete the text, a mark stays on screen: this is “the echo”, the scar.',
        },
        technique: {
          fr: "Dommage persistant : une part du stress n'est jamais remise à zéro, ce qui traduit le thème de la trace temporelle.",
          en: 'Persistent damage: part of the stress is never reset, which expresses the theme of the trace of time.',
        },
      },
      {
        simple: {
          fr: 'À la fin, un bilan : une note de A+ à F et une estimation du CO₂ émis, avec des équivalences concrètes.',
          en: 'At the end, a summary: a grade from A+ to F and an estimate of the CO₂ emitted, with concrete equivalents.',
        },
        technique: {
          fr: 'Écran de bilan : score écologique, estimation de CO₂ par session et équivalences ; déploiement continu sur Vercel.',
          en: 'Summary screen: ecological score, CO₂ estimate per session and equivalents; continuous deployment on Vercel.',
        },
      },
    ],
    resultat: {
      simple: {
        fr: "Le projet a reçu le Prix du Jury. L'expérience est en ligne et se teste en deux minutes, de préférence avec un casque audio.",
        en: 'The project won the Jury Prize. The experience is online and takes two minutes to try, preferably with headphones.',
      },
      technique: {
        fr: "Prix du Jury du hackathon Dev'Art 2026. Application déployée sur Vercel ; 87 commits sur le dépôt de l'équipe.",
        en: "Jury Prize at the Dev'Art 2026 hackathon. Application deployed on Vercel; 87 commits in the team repository.",
      },
    },
    appris: {
      fr: 'En deux jours, on ne peut pas tout faire. Il faut choisir tôt une seule idée forte, se répartir les rôles et livrer une version qui fonctionne avant de chercher à l\'embellir.',
      en: 'In two days, you cannot do everything. You have to pick one strong idea early, share the roles and deliver a working version before trying to polish it.',
    },
    galerie: [
      {
        image: devartEquipe,
        alt: {
          fr: "Les quatre membres de l'équipe Nebula debout près de leur table de travail, pendant le hackathon Dev'Art 2026",
          en: "The four members of team Nebula standing by their desk during the Dev'Art 2026 hackathon",
        },
        legende: { fr: "L'équipe Nebula à son poste, Dev'Art 2026.", en: "Team Nebula at their station, Dev'Art 2026." },
      },
      {
        image: devartPrix,
        alt: {
          fr: "Remise des prix du hackathon Dev'Art 2026 : l'équipe sur l'estrade",
          en: "Dev'Art 2026 award ceremony: the team on stage",
        },
        legende: { fr: 'La remise des prix.', en: 'The award ceremony.' },
      },
      {
        image: hypoxiaAccueil,
        alt: {
          fr: "Écran d'accueil d'HYPOXIA : « Tapez votre prompt. Observez les conséquences. »",
          en: 'HYPOXIA home screen: “Type your prompt. Watch the consequences.”',
        },
        legende: { fr: "L'écran d'accueil de l'expérience.", en: 'The home screen of the experience.' },
      },
      {
        image: devartTravail,
        alt: {
          fr: "L'équipe au travail sur ses ordinateurs pendant le hackathon",
          en: 'The team working on their laptops during the hackathon',
        },
        legende: { fr: 'Pendant les deux jours de développement.', en: 'During the two days of development.' },
      },
      {
        image: devartStand,
        alt: {
          fr: "La table de l'équipe <Nebula/> (Barry Mamadou Bailo, Camara Aminata Sita B, Nganji Aldo Alex, Toure Hiamou Djawad) pendant le hackathon Dev'Art 2026",
          en: "Team <Nebula/>'s table (Barry Mamadou Bailo, Camara Aminata Sita B, Nganji Aldo Alex, Toure Hiamou Djawad) during the Dev'Art 2026 hackathon",
        },
        legende: {
          fr: 'Le stand <Nebula/> : Mamadou Bailo Barry, Aminata Camara, Aldo Alex Nganji et Djawad Touré.',
          en: 'The <Nebula/> desk: Mamadou Bailo Barry, Aminata Camara, Aldo Alex Nganji and Djawad Touré.',
        },
      },
      {
        image: devartAffiche,
        alt: {
          fr: "Affiche officielle du hackathon Dev'Art 2026 des 12 et 13 février 2026 à l'IUT d'Arles",
          en: "Official poster of the Dev'Art 2026 hackathon on 12 and 13 February 2026 at IUT Arles",
        },
        legende: {
          fr: "L'affiche du concours Dev'Art 2026 (12 et 13 février 2026).",
          en: "The Dev'Art 2026 competition poster (12–13 February 2026).",
        },
      },
    ],
    liens: [
      { type: 'demo', href: 'https://nebula-gray-seven.vercel.app/' },
      { type: 'code', href: 'https://github.com/Bakame03/Nebula_DevArt_2026_Project_-HYPOXIA-' },
    ],
  },

  /* ─────────────────────── Parcoursup Explorer ─────────────────────── */
  {
    slug: 'parcoursup-explorer',
    vedette: true,
    annee: 2026,
    periode: { fr: 'Octobre 2026', en: 'October 2026' },
    titre: { fr: 'Parcoursup Explorer', en: 'Parcoursup Explorer' },
    genre: { fr: 'Application web de données ouvertes', en: 'Open-data web application' },
    accroche: {
      simple: {
        fr: 'Une application qui part d\'une ville et montre toutes les formations autour, sur une carte, avec les chiffres qui aident à choisir.',
        en: 'An application that starts from a town and shows every course around it, on a map, with the figures that help you choose.',
      },
      technique: {
        fr: 'Application web monopage en JavaScript orienté objet : géocodage IGN, données ouvertes Parcoursup et Mon Master, carte Leaflet, graphiques Chart.js, cache et limitation des requêtes.',
        en: 'Single-page web application in object-oriented JavaScript: IGN geocoding, Parcoursup and Mon Master open data, Leaflet map, Chart.js charts, caching and request limiting.',
      },
    },
    cadre: {
      fr: 'Projet individuel du module de développement web (R3.01), 2e année de BUT',
      en: 'Individual project for the web development module (R3.01), second year',
    },
    role: { fr: 'Conception et développement, seul', en: 'Design and development, alone' },
    equipe: { fr: 'Projet individuel', en: 'Individual project' },
    technologies: ['JavaScript', 'Sass', 'webpack', 'Leaflet', 'Chart.js', 'Handlebars', 'API REST'],
    competences: ['c1', 'c2', 'c4'],
    couverture: {
      image: parcoursupCarte,
      alt: {
        fr: 'Parcoursup Explorer : formulaire de recherche et carte centrée sur Arles, avec un cercle de 30 kilomètres et deux groupes de formations',
        en: 'Parcoursup Explorer: search form and map centred on Arles, with a 30-kilometre circle and two clusters of courses',
      },
    },
    chiffres: [
      { valeur: '57', libelle: { fr: 'commits, seul', en: 'commits, alone' } },
      { valeur: '4', libelle: { fr: 'sources de données publiques', en: 'public data sources' } },
      { valeur: '2022-25', libelle: { fr: 'historique affiché', en: 'history displayed' } },
      { valeur: '0', libelle: { fr: "clé d'API nécessaire", en: 'API key required' } },
    ],
    besoin: {
      simple: {
        fr: "Quand on cherche ses études, on se pose toujours la même question : qu'est-ce que je peux faire près de chez moi, et ai-je des chances d'être pris ? Les sites officiels répondent formation par formation. J'ai voulu une application qui part d'une ville et montre tout ce qu'il y a autour.",
        en: 'When you look for a course, you always ask the same question: what can I study near home, and do I stand a chance of getting in? Official sites answer one course at a time. I wanted an application that starts from a town and shows everything around it.',
      },
      technique: {
        fr: "Sujet libre, validé par l'enseignant. Contraintes du module : JavaScript sans framework, programmation orientée objet, deux requêtes enchaînées (la seconde dépend du résultat de la première), webpack et style de code StandardJS.",
        en: 'Free topic, approved by the lecturer. Module constraints: framework-free JavaScript, object-oriented programming, two chained requests (the second depends on the result of the first), webpack and StandardJS code style.',
      },
    },
    realisations: [
      {
        simple: {
          fr: "Après le bac : je tape une ville, je choisis un rayon de 1 à 200 km et une filière. Les formations s'affichent dans une liste et sur une carte.",
          en: 'After secondary school: I type a town, choose a radius from 1 to 200 km and a field. The courses appear in a list and on a map.',
        },
        technique: {
          fr: "Deux requêtes enchaînées : géocodage de la commune par l'API de l'IGN, puis recherche géographique dans le jeu de données ouvert Parcoursup 2025. Carte Leaflet avec regroupement des marqueurs.",
          en: 'Two chained requests: geocoding the town with the IGN API, then a geographic search in the Parcoursup 2025 open dataset. Leaflet map with marker clustering.',
        },
      },
      {
        simple: {
          fr: "Historique : pour chaque formation, un graphique et un tableau montrent l'évolution de 2022 à 2025 (places, candidats, taux d'accès).",
          en: 'History: for each course, a chart and a table show the trend from 2022 to 2025 (places, applicants, admission rate).',
        },
        technique: {
          fr: 'Historique 2022-2025 en graphique Chart.js et en tableau. Le graphique reste lisible sans les couleurs : formes de points et styles de traits différents.',
          en: 'History 2022–2025 as a Chart.js chart and a table. The chart stays readable without colour: different point shapes and line styles.',
        },
      },
      {
        simple: {
          fr: 'Après le BUT ou la licence : les masters de ma région, avec la part des candidats de BUT qui ont reçu une proposition.',
          en: "After a bachelor's degree: the master's programmes in my region, with the share of BUT applicants who received an offer.",
        },
        technique: {
          fr: 'Second parcours sur le jeu de données Mon Master : filtrage par région ou par département, 46 disciplines, taux de proposition comparé entre licence 3 et BUT 3.',
          en: 'Second flow on the Mon Master dataset: filtering by region or département, 46 disciplines, offer rate compared between third-year licence and BUT students.',
        },
      },
      {
        simple: {
          fr: "L'application évite d'envoyer trop de demandes aux services publics qu'elle interroge. Elle s'utilise au clavier, sur téléphone et en mode sombre.",
          en: 'The application avoids sending too many requests to the public services it queries. It works with the keyboard, on a phone and in dark mode.',
        },
        technique: {
          fr: 'Cache des réponses en mémoire, attente de 300 ms après la frappe et à partir de 3 lettres, une seule requête par recherche. Code organisé en services, modèles et vues ; gabarits Handlebars ; classe Application testée avec de fausses vues.',
          en: 'In-memory response cache, 300 ms debounce after typing and from 3 letters, a single request per search. Code organised into services, models and views; Handlebars templates; Application class tested with mock views.',
        },
      },
    ],
    resultat: {
      simple: {
        fr: "Une application complète, livrée avec sa notice et son schéma. Exemple : autour d'Arles, dans un rayon de 30 km, elle trouve 15 formations et les regroupe sur la carte.",
        en: 'A complete application, delivered with its guide and its diagram. Example: around Arles, within 30 km, it finds 15 courses and clusters them on the map.',
      },
      technique: {
        fr: "57 commits, code conforme à StandardJS, diagramme de classes en trois pages, aucune clé d'API. Accessibilité : champs étiquetés, navigation au clavier, contrastes vérifiés, messages d'erreur explicites.",
        en: '57 commits, StandardJS-compliant code, three-page class diagram, no API key. Accessibility: labelled fields, keyboard navigation, checked contrast, explicit error messages.',
      },
    },
    appris: {
      fr: "Les services publics limitent le nombre de demandes : j'ai appris à garder les réponses en mémoire et à n'interroger le réseau que lorsque c'est utile. J'ai aussi changé de sujet en cours de route : ma première idée, en cybersécurité, demandait trop de code pour le temps donné.",
      en: 'Public services limit the number of requests: I learned to keep answers in memory and to query the network only when it is useful. I also changed topic along the way: my first idea, in cybersecurity, needed too much code for the time available.',
    },
    galerie: [
      {
        image: parcoursupHistorique,
        alt: {
          fr: "Fenêtre d'historique du BUT Informatique d'Arles : un graphique à deux courbes et un tableau des sessions 2022 à 2025",
          en: 'History window for the Arles BUT in Computer Science: a two-line chart and a table of the 2022 to 2025 sessions',
        },
        legende: {
          fr: "L'historique d'une formation, en graphique et en tableau.",
          en: 'The history of a course, as a chart and a table.',
        },
      },
      {
        image: parcoursupListe,
        alt: {
          fr: 'Carte et liste des 15 formations trouvées autour d\'Arles',
          en: 'Map and list of the 15 courses found around Arles',
        },
        legende: {
          fr: "La carte et la liste se mettent à jour ensemble pendant qu'on filtre.",
          en: 'The map and the list update together as you filter.',
        },
      },
      {
        image: parcoursupSombre,
        alt: { fr: "L'application en mode sombre", en: 'The application in dark mode' },
        legende: {
          fr: "Le mode sombre suit d'abord le réglage de l'ordinateur, puis le choix de l'utilisateur.",
          en: "Dark mode first follows the computer's setting, then the user's choice.",
        },
      },
    ],
    note: codePrive,
  },

  /* ───────────────────────── Immatriculations ───────────────────────── */
  {
    slug: 'immatriculations',
    vedette: true,
    annee: 2026,
    periode: { fr: 'Juin 2026', en: 'June 2026' },
    titre: { fr: 'Gestion des immatriculations', en: 'Vehicle registration manager' },
    genre: { fr: 'Application de bureau', en: 'Desktop application' },
    accroche: {
      simple: {
        fr: "Un logiciel de bureau pour gérer les cartes grises d'une préfecture : consulter, modifier, rechercher et enregistrer les fiches des véhicules.",
        en: 'Desktop software to manage vehicle registration certificates for a French prefecture: view, edit, search and save vehicle records.',
      },
      technique: {
        fr: 'Application C++17 / Qt 6 en architecture maître-détail : chargement et sauvegarde JSON et XML, filtrage, internationalisation, pour Windows et Linux.',
        en: 'C++17 / Qt 6 application with a master–detail architecture: JSON and XML loading and saving, filtering, internationalisation, for Windows and Linux.',
      },
    },
    cadre: {
      fr: "Projet noté de 1re année de BUT (SAÉ 2.01 : développement d'une application)",
      en: 'Graded first-year project (SAÉ 2.01: developing an application)',
    },
    role: { fr: 'Développeur, en binôme', en: 'Developer, in a pair' },
    equipe: { fr: '2 étudiants', en: '2 students' },
    technologies: ['C++17', 'Qt 6', 'UML', 'JSON', 'XML', 'Git'],
    competences: ['c1', 'c4', 'c6'],
    couverture: {
      image: immatUml,
      alt: {
        fr: "Diagramme de classes UML de l'application : les classes Vehicule, ControleTechnique et MainWindow et leurs relations",
        en: 'UML class diagram of the application: the Vehicule, ControleTechnique and MainWindow classes and their relationships',
      },
    },
    chiffres: [
      { valeur: '8', libelle: { fr: 'fonctionnalités demandées, 8 livrées', en: 'features requested, 8 delivered' } },
      { valeur: '20', libelle: { fr: 'fiches de véhicules illustrées', en: 'illustrated vehicle records' } },
      { valeur: '2', libelle: { fr: 'formats de fichier, 2 langues', en: 'file formats, 2 languages' } },
      { valeur: '2', libelle: { fr: 'systèmes : Windows et Linux', en: 'systems: Windows and Linux' } },
    ],
    besoin: {
      simple: {
        fr: "Le sujet : un outil pour les agents d'une préfecture, qui gèrent les certificats d'immatriculation, appelés « cartes grises ». Ils doivent retrouver une fiche, la corriger et enregistrer leur travail.",
        en: 'The brief: a tool for prefecture staff who manage vehicle registration certificates. They need to find a record, correct it and save their work.',
      },
      technique: {
        fr: "Sujet D2 de la SAÉ 2.01 : application graphique maître-détail avec persistance dans deux formats, jeu de données réaliste d'au moins 20 fiches, diagramme de classes UML, développement collaboratif sous Git, exécution sous Windows et Linux.",
        en: 'Topic D2 of SAÉ 2.01: master–detail graphical application with persistence in two formats, a realistic dataset of at least 20 records, a UML class diagram, collaborative development with Git, running on Windows and Linux.',
      },
    },
    realisations: [
      {
        simple: {
          fr: "Une fenêtre en deux parties : la liste des véhicules d'un côté, la fiche détaillée et modifiable de l'autre.",
          en: 'A window in two parts: the list of vehicles on one side, the detailed, editable record on the other.',
        },
        technique: {
          fr: 'Interface maître-détail en Qt Widgets. Classes Vehicule et ControleTechnique liées par composition ; MainWindow dérivée de QMainWindow.',
          en: 'Master–detail interface in Qt Widgets. Vehicule and ControleTechnique classes linked by composition; MainWindow derived from QMainWindow.',
        },
      },
      {
        simple: {
          fr: "Les données s'ouvrent et s'enregistrent dans deux formats de fichier courants, au choix.",
          en: 'Data can be opened and saved in two common file formats, as you choose.',
        },
        technique: {
          fr: 'Chargement et sauvegarde en JSON et en XML ; suivi des modifications non enregistrées.',
          en: 'Loading and saving in JSON and XML; tracking of unsaved changes.',
        },
      },
      {
        simple: {
          fr: "Un champ de recherche filtre la liste pendant la frappe. L'interface existe en français et en anglais.",
          en: 'A search field filters the list as you type. The interface exists in French and in English.',
        },
        technique: {
          fr: 'Filtrage par motif de recherche ; internationalisation français / anglais avec les fichiers de traduction Qt, compilés automatiquement par qmake.',
          en: 'Filtering by search pattern; French / English internationalisation with Qt translation files, compiled automatically by qmake.',
        },
      },
      {
        simple: {
          fr: 'Le logiciel fonctionne de la même façon sous Windows et sous Linux.',
          en: 'The software works the same way on Windows and on Linux.',
        },
        technique: {
          fr: "Portabilité Windows (MinGW) et Linux (clang++), correction de l'affichage en mode sombre sous Windows, icônes SVG et feuille de style personnalisée.",
          en: 'Portability across Windows (MinGW) and Linux (clang++), fixed dark-mode rendering on Windows, SVG icons and a custom style sheet.',
        },
      },
    ],
    resultat: {
      simple: {
        fr: 'Toutes les fonctionnalités demandées sont livrées, avec un jeu de 20 fiches illustrées pour la démonstration.',
        en: 'All requested features are delivered, with a set of 20 illustrated records for the demonstration.',
      },
      technique: {
        fr: "Fonctionnalités F0 à F5 et exigences E1 à E4 du sujet couvertes. 30 commits à deux sur le GitLab de l'université, dont 17 de ma part.",
        en: "Features F0 to F5 and requirements E1 to E4 of the brief covered. 30 commits between the two of us on the university's GitLab, 17 of them mine.",
      },
    },
    appris: {
      fr: "Un même programme ne s'affiche pas de la même façon sur deux systèmes. J'ai dû tester sous Windows et sous Linux, et corriger des écarts que je n'avais pas prévus.",
      en: 'The same program does not look the same on two systems. I had to test on Windows and on Linux, and fix differences I had not anticipated.',
    },
    galerie: [
      {
        image: immatUml,
        alt: {
          fr: "Diagramme de classes UML de l'application",
          en: 'UML class diagram of the application',
        },
        legende: {
          fr: 'Le diagramme de classes : un véhicule possède une liste de contrôles techniques.',
          en: 'The class diagram: a vehicle owns a list of roadworthiness tests.',
        },
      },
    ],
    note: codePrive,
  },

  /* ─────────────────────────── Ce portfolio ─────────────────────────── */
  {
    slug: 'portfolio',
    vedette: true,
    annee: 2026,
    periode: { fr: 'Novembre 2026', en: 'November 2026' },
    titre: { fr: 'Ce portfolio', en: 'This portfolio' },
    genre: { fr: 'Site web personnel', en: 'Personal website' },
    accroche: {
      simple: {
        fr: 'La deuxième version de mon portfolio : plus légère, en deux langues, avec quatre ambiances et deux niveaux de lecture.',
        en: 'The second version of my portfolio: lighter, in two languages, with four moods and two reading levels.',
      },
      technique: {
        fr: 'Site statique Astro 7 : pas de JavaScript par défaut, CSS natif (thèmes par propriétés personnalisées), shader WebGL écrit à la main et transitions de vue entre les pages.',
        en: 'Astro 7 static site: no JavaScript by default, native CSS (themes through custom properties), a hand-written WebGL shader and view transitions between pages.',
      },
    },
    cadre: {
      fr: 'Projet personnel, présenté en cours de communication professionnelle',
      en: 'Personal project, presented in the professional communication course',
    },
    role: {
      fr: 'Cadrage, contenus et validation ; développement assisté par intelligence artificielle',
      en: 'Brief, content and review; AI-assisted development',
    },
    equipe: { fr: 'Projet individuel', en: 'Individual project' },
    technologies: ['Astro 7', 'TypeScript', 'CSS natif', 'WebGL', 'View Transitions'],
    competences: ['c1', 'c2', 'c5'],
    couverture: {
      image: portfolioV2,
      alt: {
        fr: "Page d'accueil de la version 2 : le nom en grand, le tableau des départs et le billet de stage",
        en: 'Home page of version 2: the name in large type, the departure board and the internship ticket',
      },
    },
    chiffres: [
      { valeur: '÷ 13', libelle: { fr: "poids de la page d'accueil : 4,5 Mo → 0,34 Mo", en: 'home page weight: 4.5 MB → 0.34 MB' } },
      { valeur: '7 Ko', libelle: { fr: 'de JavaScript, au lieu de 498 Ko', en: 'of JavaScript (7 KB), down from 498 KB' } },
      { valeur: '0,8 s', libelle: { fr: 'pour afficher la page sur mobile, au lieu de 13,9 s', en: 'to display the page on mobile (0.8 s), down from 13.9 s' } },
      { valeur: '100', libelle: { fr: 'sur 100 en accessibilité, au lieu de 92', en: 'out of 100 for accessibility, up from 92' } },
    ],
    besoin: {
      simple: {
        fr: "Ma première version, faite en 1re année, était lourde et ne disait pas clairement ce que je cherchais. La deuxième suit les conseils reçus en cours de communication : un projet lisible au premier coup d'œil, des faits plutôt que des adjectifs, et une forme qui se remarque sans en faire trop.",
        en: 'My first version, made in first year, was heavy and did not clearly say what I was looking for. The second follows the advice from my communication course: a goal you can read at a glance, facts rather than adjectives, and a form that stands out without overdoing it.',
      },
      technique: {
        fr: "Version 1 : application Next.js avec React, Three.js et un serveur NestJS, pour un contenu presque entièrement statique. Objectifs de la version 2 : pages HTML générées à l'avance, JavaScript seulement là où il sert, accessibilité, deux langues et fonctionnement hors connexion.",
        en: 'Version 1: a Next.js application with React, Three.js and a NestJS server, for content that was almost entirely static. Goals for version 2: pre-built HTML pages, JavaScript only where it is useful, accessibility, two languages and offline support.',
      },
    },
    realisations: [
      {
        simple: {
          fr: "La structure suit la méthode des « 3 P » vue en cours : mes particularités, les preuves, puis les profits pour l'équipe qui m'accueille.",
          en: 'The structure follows the “3 P” method from my course: what sets me apart, the evidence, then the benefits for the host team.',
        },
        technique: {
          fr: 'Architecture de contenu en trois temps : particularités, preuves (projets reliés aux six compétences du référentiel du BUT), profits. Données typées en TypeScript, une fiche par projet.',
          en: 'Three-part content architecture: distinctive traits, evidence (projects mapped to the six skills of the BUT curriculum), benefits. Data typed in TypeScript, one record per project.',
        },
      },
      {
        simple: {
          fr: 'Chaque thème correspond à un lieu de mon parcours : Arles, Marseille, Conakry, plus un thème « Machine ». Les couleurs et les polices changent ensemble.',
          en: 'Each theme matches a place in my journey: Arles, Marseille, Conakry, plus a “Machine” theme. Colours and typefaces change together.',
        },
        technique: {
          fr: 'Quatre thèmes par propriétés personnalisées CSS, couleurs en OKLCH. Une famille de polices variables par thème, hébergée sur le site, avec polices de secours ajustées pour limiter les sauts de mise en page.',
          en: 'Four themes through CSS custom properties, colours in OKLCH. One variable font family per theme, self-hosted, with metric-adjusted fallback fonts to limit layout shifts.',
        },
      },
      {
        simple: {
          fr: 'Un bouton change le niveau de lecture : « Simple » pour tout le monde, « Technique » pour les développeurs. Le site existe en français et en anglais.',
          en: 'A switch changes the reading level: “Plain” for everyone, “Technical” for developers. The site exists in French and in English.',
        },
        technique: {
          fr: 'Deux niveaux de lecture et deux langues produits à la construction du site : routes traduites, balises hreflang, préférences mémorisées dans le navigateur.',
          en: 'Two reading levels and two languages produced at build time: translated routes, hreflang tags, preferences stored in the browser.',
        },
      },
      {
        simple: {
          fr: "Le site s'installe comme une application et reste consultable sans connexion.",
          en: 'The site can be installed like an app and stays readable offline.',
        },
        technique: {
          fr: "Application web progressive : manifeste et service worker (pages en « réseau d'abord », ressources mises en cache). Transitions de vue natives entre les pages. Fond animé en WebGL, coupé si l'utilisateur demande moins d'animations.",
          en: 'Progressive web app: manifest and service worker (network-first pages, cached assets). Native view transitions between pages. Animated WebGL background, switched off when the user asks for reduced motion.',
        },
      },
    ],
    resultat: {
      simple: {
        fr: "La page d'accueil pèse 13 fois moins que celle de la première version. Sur téléphone, elle s'affiche en moins d'une seconde, au lieu de près de 14 secondes. Le site obtient la note maximale à l'audit d'accessibilité.",
        en: 'The home page weighs 13 times less than in the first version. On a phone, it displays in under one second, instead of nearly 14 seconds. The site gets the top score in the accessibility audit.',
      },
      technique: {
        fr: 'Audit Lighthouse sur mobile, novembre 2026, version 1 puis version 2 : performance 54 → 99 ; accessibilité 92 → 100 ; poids transféré 4 506 Ko → 342 Ko ; requêtes 52 → 12 ; JavaScript 498 Ko → 7 Ko ; affichage du plus grand élément (LCP) 13,9 s → 0,8 s. La version 2 a été mesurée avant sa mise en ligne, sur un serveur local avec compression Brotli.',
        en: 'Lighthouse audit on mobile, November 2026, version 1 then version 2: performance 54 → 99; accessibility 92 → 100; transferred weight 4,506 KB → 342 KB; requests 52 → 12; JavaScript 498 KB → 7 KB; Largest Contentful Paint 13.9 s → 0.8 s. Version 2 was measured before going live, on a local server with Brotli compression.',
      },
    },
    appris: {
      fr: "Choisir l'outil selon le besoin : un portfolio, c'est surtout du texte et des images, il n'a pas besoin de la même machinerie qu'une application. J'ai aussi appris à diriger un assistant d'intelligence artificielle : décrire le besoin, fournir les contenus, relire et corriger.",
      en: 'Pick the tool to fit the need: a portfolio is mostly text and images; it does not need the same machinery as an application. I also learned to direct an artificial-intelligence assistant: describe the need, provide the content, review and correct.',
    },
    galerie: [
      {
        image: portfolioV2Themes,
        alt: {
          fr: "La même page d'accueil dans les quatre thèmes : Arles en crème et jaune, Marseille en bleu, Conakry en indigo et orange, Machine en vert sur noir",
          en: 'The same home page in the four themes: Arles in cream and yellow, Marseille in blue, Conakry in indigo and orange, Machine in green on black',
        },
        legende: {
          fr: 'Les quatre thèmes : Arles, Marseille, Conakry et Machine. Chacun a ses couleurs et sa police.',
          en: 'The four themes: Arles, Marseille, Conakry and Machine. Each has its own colours and typeface.',
        },
      },
      {
        image: portfolioV1,
        alt: {
          fr: "Capture d'écran de la première version du portfolio : fond sombre, photo ronde et grand titre bleu",
          en: 'Screenshot of the first version of the portfolio: dark background, round photo and large blue title',
        },
        legende: {
          fr: 'Avant : la version 1, réalisée en 1re année.',
          en: 'Before: version 1, made in first year.',
        },
      },
    ],
    liens: [{ type: 'code', href: 'https://github.com/mounabarry620-star/My_Portfolio' }],
  },

  /* ─────────────────────── Autres réalisations ─────────────────────── */
  {
    slug: 'base-de-donnees',
    vedette: false,
    annee: 2026,
    periode: { fr: '1re année de BUT', en: 'First year' },
    titre: { fr: 'Base de données relationnelle', en: 'Relational database' },
    genre: { fr: 'Conception de base de données', en: 'Database design' },
    accroche: {
      simple: {
        fr: 'Du besoin à la base en service : schéma des données, création des tables et requêtes pour répondre aux questions des utilisateurs.',
        en: "From the need to a working database: data model, table creation and queries to answer users' questions.",
      },
      technique: {
        fr: 'Modèle conceptuel et modèle logique de données avec WinDesign, implémentation PostgreSQL, requêtes SQL avancées et déclencheurs (triggers).',
        en: 'Conceptual and logical data models with WinDesign, PostgreSQL implementation, advanced SQL queries and triggers.',
      },
    },
    cadre: { fr: 'Projet noté de 1re année (SAÉ)', en: 'Graded first-year project (SAÉ)' },
    role: { fr: 'Conception et requêtes', en: 'Design and queries' },
    equipe: { fr: 'En équipe', en: 'In a team' },
    technologies: ['PostgreSQL', 'SQL', 'WinDesign'],
    competences: ['c4'],
  },
  {
    slug: 'poste-developpement',
    vedette: false,
    annee: 2025,
    periode: { fr: '1re année de BUT', en: 'First year' },
    titre: { fr: 'Poste de développement et services réseau', en: 'Development workstation and network services' },
    genre: { fr: 'Systèmes et réseaux', en: 'Systems and networks' },
    accroche: {
      simple: {
        fr: "Installer un ordinateur prêt pour le développement, avec deux systèmes au choix au démarrage, puis mettre en service un serveur de messagerie.",
        en: 'Set up a computer ready for development, with a choice of two systems at start-up, then bring a mail server into service.',
      },
      technique: {
        fr: 'Double amorçage Debian 12 et Windows 11 sous VirtualBox, outils de développement, configuration réseau ; serveur de messagerie Postfix ; scripts Bash.',
        en: 'Dual-boot Debian 12 and Windows 11 under VirtualBox, development tools, network configuration; Postfix mail server; Bash scripts.',
      },
    },
    cadre: { fr: 'Projet noté de 1re année (SAÉ 1.03)', en: 'Graded first-year project (SAÉ 1.03)' },
    role: { fr: 'Installation et configuration', en: 'Installation and configuration' },
    equipe: { fr: 'Projet de formation', en: 'Course project' },
    technologies: ['Debian 12', 'Windows 11', 'VirtualBox', 'Postfix', 'Bash'],
    competences: ['c3'],
  },
  {
    slug: 'tri',
    vedette: false,
    annee: 2025,
    periode: { fr: '1re année de BUT', en: 'First year' },
    titre: { fr: "Comparaison d'algorithmes de tri", en: 'Comparing sorting algorithms' },
    genre: { fr: 'Algorithmique', en: 'Algorithms' },
    accroche: {
      simple: {
        fr: 'Trois méthodes pour trier des données, programmées puis comparées : laquelle est la plus rapide, et pourquoi ?',
        en: 'Three methods to sort data, coded and then compared: which one is fastest, and why?',
      },
      technique: {
        fr: 'Implémentation en C++ du tri rapide (quicksort), du tri par insertion et du tri par sélection ; mesures de temps et analyse de complexité.',
        en: 'C++ implementation of quicksort, insertion sort and selection sort; timing measurements and complexity analysis.',
      },
    },
    cadre: { fr: 'Projet noté de 1re année (SAÉ 1.02)', en: 'Graded first-year project (SAÉ 1.02)' },
    role: { fr: 'Programmation et analyse', en: 'Coding and analysis' },
    equipe: { fr: 'Projet de formation', en: 'Course project' },
    technologies: ['C++'],
    competences: ['c2'],
  },
  {
    slug: 'bibliotheque',
    vedette: false,
    annee: 2025,
    periode: { fr: '1re année de BUT', en: 'First year' },
    titre: { fr: 'Gestion de bibliothèque en ligne de commande', en: 'Command-line library manager' },
    genre: { fr: 'Programme en ligne de commande', en: 'Command-line program' },
    accroche: {
      simple: {
        fr: "Un programme utilisé au clavier, dans un terminal, pour gérer les livres et les emprunts d'une bibliothèque.",
        en: 'A program driven from the keyboard, in a terminal, to manage the books and loans of a library.',
      },
      technique: {
        fr: 'Application C++ en ligne de commande : recherche multicritère, gestion des emprunts et sauvegarde des données sur disque.',
        en: 'C++ command-line application: multi-criteria search, loan management and saving data to disk.',
      },
    },
    cadre: { fr: 'Projet noté de 1re année (SAÉ 1.01)', en: 'Graded first-year project (SAÉ 1.01)' },
    role: { fr: 'Programmation', en: 'Coding' },
    equipe: { fr: 'Projet de formation', en: 'Course project' },
    technologies: ['C++'],
    competences: ['c1'],
  },
  {
    slug: 'site-web',
    vedette: false,
    annee: 2025,
    periode: { fr: '1re année de BUT', en: 'First year' },
    titre: { fr: 'Site de présentation du BUT Informatique', en: 'Website presenting the BUT in Computer Science' },
    genre: { fr: 'Site web statique', en: 'Static website' },
    accroche: {
      simple: {
        fr: 'Un site web qui présente la formation : les compétences, le parcours, le programme et un glossaire.',
        en: 'A website presenting the degree: the skills, the track, the syllabus and a glossary.',
      },
      technique: {
        fr: "Site statique en HTML et CSS, mise en page adaptative, respect des standards du W3C et des règles d'accessibilité.",
        en: 'Static site in HTML and CSS, responsive layout, compliant with W3C standards and accessibility rules.',
      },
    },
    cadre: { fr: 'Projet de 1re année', en: 'First-year project' },
    role: { fr: 'Intégration HTML et CSS', en: 'HTML and CSS integration' },
    equipe: { fr: 'Projet de formation', en: 'Course project' },
    technologies: ['HTML', 'CSS'],
    competences: ['c1'],
    couverture: {
      image: siteBut,
      alt: {
        fr: "Page d'accueil du site : bandeau bleu, titre « BUT Informatique » et menu Le BUT, Compétences, Parcours A, Programme, Glossaire",
        en: 'Home page of the site: blue banner, “BUT Informatique” title and menu with the degree, skills, track, syllabus and glossary',
      },
    },
  },
];

typographier(projets);

export const projetsVedettes = projets.filter((p) => p.vedette);
export const autresRealisations = projets.filter((p) => !p.vedette);
export const projetParSlug = (slug: string) => projets.find((p) => p.slug === slug);
