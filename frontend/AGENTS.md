# Consignes pour les assistants de code (et pour moi dans six mois)

Ce dossier contient la version 2 du portfolio de Mamadou Bailo Barry : un site statique
**Astro 7**, en TypeScript et CSS natif, bilingue (français par défaut, anglais sous `/en/`).

## Avant de coder

- Astro 7 a changé plusieurs choses (compilateur strict : toute balise doit être fermée ;
  API de polices `fonts` dans `astro.config.mjs` ; `Astro.glob` supprimé). En cas de doute,
  lire les types dans `node_modules/astro/dist/types/public/config.d.ts` ou la documentation
  <https://docs.astro.build>.
- Le Node du système peut être trop ancien pour Astro : toujours passer par `npm run …`
  (le paquet `node` des dépendances fournit la bonne version).
- Après une modification : `npm run check` puis `npm run build` doivent passer sans erreur.

## Où est le contenu

Tout le contenu est dans `src/data/*.ts` et `src/i18n/ui.ts` (voir le tableau du README).
Ne pas écrire de texte en dur dans les composants.

- Chaque texte est un objet `{ fr, en }`. Les textes importants ont deux niveaux de lecture :
  `{ simple: { fr, en }, technique: { fr, en } }`.
- La typographie française (espaces insécables) est appliquée automatiquement par
  `src/i18n/typo.ts` : écrire les textes normalement, avec une espace simple avant « : ; ? ! ».
- Après TOUTE modification (contenu, design, photo) : `npm run maj`. Les captures de la fiche
  « Ce portfolio », les images de partage et les PDF du CV sont refaits à partir du site.

## Règles de rédaction (cours de communication professionnelle)

1. Des faits vérifiables uniquement. Ne jamais inventer un chiffre, une date ou un rôle :
   en cas de doute, demander à l'auteur.
2. Sobre : pas d'adjectifs ni d'adverbes qui se jugent soi-même (« passionné », « expert »,
   « solide », « rigoureux »…). Pas de « phrases bateau ».
3. Vocabulaire simple dans les versions `simple` ; les termes techniques vont dans `technique`.
4. Sigles en toutes lettres à la première apparition (BUT, SAÉ, CDI…).
5. Structure « 3 P » de l'accueil : Particularités → Preuves → Profits. Ne pas la casser.

## Règles techniques

- JavaScript minimal : préférer le HTML et le CSS natifs (`<dialog>`, `popover`, `<details>`,
  transitions de vue, animations liées au défilement). Pas de framework d'interface.
- Tout doit rester utilisable sans JavaScript et avec `prefers-reduced-motion`.
- Les quatre thèmes (`arles`, `marseille`, `conakry`, `machine`) sont définis dans
  `src/styles/global.css`. Toute couleur passe par une variable de thème. Si une police de
  titre change, re-mesurer `--h1-rapport` et `--nom-rapport` (largeur du nom en « em »).
- Vie privée : pas de traceur, pas de police ou de script chargés depuis un autre site,
  pas d'adresse postale. Ne pas publier le nom d'autres personnes sans leur accord.
- Accessibilité : viser 100 à l'audit Lighthouse ; contrastes AA dans les quatre thèmes.
