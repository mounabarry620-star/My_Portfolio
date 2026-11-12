# Portfolio de Mamadou Bailo Barry — version 2

Site personnel : qui je suis, ce que je cherche (un stage du 29 mars au 18 juin 2027),
mes projets, mes compétences et mon CV. En français et en anglais.

- **En ligne** : <https://portfolio-1-gamma-azure.vercel.app>
- **Version 1** (1re année, Next.js) : dans l'historique Git, avant la branche `refonte-2026`.

## Lancer le site sur son ordinateur

Il faut Node.js 22 ou plus récent. Le projet télécharge lui-même la version de Node dont
Astro a besoin (paquet `node` dans les dépendances) : rien à installer sur le système.

```bash
npm install        # une seule fois
npm run dev        # site en direct sur http://localhost:4321 (se recharge à chaque modification)
npm run build      # fabrique le site final dans dist/
npm run preview    # montre le site final, tel qu'il sera en ligne
npm run check      # vérifie le code (TypeScript)
```

## Modifier le contenu

Tout le contenu est dans `src/data/` et `src/i18n/`. Chaque texte a une version `fr` et une version `en`.

| Je veux changer… | Fichier |
|---|---|
| mes coordonnées, les dates du stage, la FAQ, mes atouts | `src/data/profil.ts` |
| un projet (ou en ajouter un) | `src/data/projets.ts` |
| les compétences du BUT et la boîte à outils | `src/data/competences.ts` |
| mon parcours (formations, emplois) | `src/data/parcours.ts` |
| le CV | `src/data/cv.ts` |
| un bouton, un titre, un menu | `src/i18n/ui.ts` |

### Ajouter un projet

1. Mettre les images dans `src/assets/projets/`.
2. Dans `src/data/projets.ts` : importer les images en haut du fichier, puis copier un bloc
   de projet et le remplir. `vedette: true` crée une grande carte et une page ; `vedette: false`
   ajoute une ligne dans « Autres réalisations ».
3. Relier le projet à une compétence dans `src/data/competences.ts` (liste `preuves`).

### Après une modification : tout mettre à jour

```bash
npm run maj
```

Cette commande construit le site, puis refait toutes les images tirées du site lui-même :
captures de la fiche « Ce portfolio », images de partage (`public/og/`) et CV en PDF
(`public/cv/`), puis reconstruit le site avec ces nouvelles images. Il faut Google Chrome ou
Chromium. **À lancer avant chaque mise en ligne.**

## Règles de rédaction

Elles viennent du cours de communication professionnelle (« Le CV, quelques rappels ») :

- le projet se lit au premier coup d'œil : poste visé et dates en haut de page ;
- des faits vérifiables, pas d'adjectifs ni d'adverbes qui se jugent soi-même ;
- pas de « phrases bateau » (motivé, ponctuel, esprit d'équipe) : une preuve à la place ;
- les sigles sont écrits en toutes lettres la première fois ;
- méthode des « 3 P » pour l'ordre des sections : **P**articularités, **P**reuves, **P**rofits.

Chaque texte important existe en deux niveaux de lecture : `simple` (tout public) et
`technique` (développeurs). Le visiteur choisit avec l'interrupteur « Simple / Technique ».

## Comment c'est fait, et pourquoi

| Choix | Pourquoi |
|---|---|
| **Astro 7** (site statique) | Un portfolio, c'est surtout du texte et des images. Astro fabrique des pages HTML prêtes à l'avance et n'envoie du JavaScript que là où il y a de l'interaction. |
| **CSS natif** (pas de bibliothèque) | Les quatre thèmes sont de simples variables CSS (couleurs en OKLCH). Animations au défilement et transitions entre pages gérées par le navigateur. |
| **TypeScript** | Les données (projets, CV) sont vérifiées : un champ oublié est signalé avant la mise en ligne. |
| **Polices hébergées sur le site** | Une famille par thème, téléchargée seulement quand le thème est affiché. Aucun appel à un service extérieur. |
| **WebGL écrit à la main** | Le fond en courbes de niveau tient dans un seul shader, sans bibliothèque 3D. Il est coupé si le visiteur demande moins d'animations. |
| **Application web progressive** | Le site s'installe comme une application et reste consultable hors connexion (service worker). |
| **Icônes et logos** | Icônes de l'interface : [Lucide](https://lucide.dev) (licence ISC). Logos des technologies : [Devicon](https://devicon.dev) (licence MIT), comme sur mon CV. Polices : Fontsource (licences libres). |
| **Activité GitHub** | Lue une fois à la construction du site ; le navigateur du visiteur ne contacte aucun service extérieur. |
| **Aucun cookie, aucun traceur** | Rien à accepter, rien à déclarer. |

Mesures Lighthouse (mobile, novembre 2026) : voir la page « Ce portfolio » du site.

## Organisation des dossiers

```
src/
  pages/        une page par adresse : accueil, projets/…, cv, 404 (et leurs versions /en/)
  components/   les morceaux de page (en-tête, billet de stage, sections, fiche projet, CV)
  layouts/      le gabarit commun (balises <head>, en-tête, pied de page)
  data/         LE CONTENU : profil, projets, compétences, parcours, CV
  i18n/         langues, textes de l'interface, typographie française
  scripts/      le peu de JavaScript : thèmes, palette de commandes, billet, fond WebGL
  styles/       les jetons de design et les quatre thèmes
  assets/       images sources (optimisées automatiquement à la construction)
  sw.js         modèle du service worker (mode hors connexion)
public/         fichiers copiés tels quels : icônes, CV en PDF, images de partage
scripts/        outil pour fabriquer les PDF du CV
```

## Mise en ligne

Le site est déployé par Vercel à chaque `git push` sur la branche `main`. Dans les réglages
du projet Vercel, le dossier racine (« Root Directory ») doit être `frontend`. Le fichier
`vercel.json` indique à Vercel qu'il s'agit d'un site Astro. Le résultat (`dist/`) est un simple dossier de fichiers : il fonctionne chez
n'importe quel hébergeur statique.
