# Le kangourou qui salue (accueil)

Modèle : « baby kangaroo 3d model » par rt699448, licence CC BY 4.0
https://sketchfab.com/3d-models/0048d4fce4884357917dc8d3f2bfe684
(fichier .glb de 82 Mo, non versionné : le retélécharger au format glTF/GLB 2K)

1. Réunir les 11 morceaux du modèle dans `kangourou.blend` (un seul objet « Kangourou »).
2. Pour chaque pose (-126, -138, -150, -162, -174 degrés) :
   `blender -b --factory-startup -P 1-lever-la-patte.py -- kangourou.blend pose-150.blend -150 0.075 0.02`
   (l'avant-bras est découpé, pivoté au coude ; le trou est bouché et teinté comme le pelage)
   `blender -b --factory-startup -P 2-rendu.py -- pose-150.blend images/pose-150.png 900 128 -10`
3. `node 3-planche.mjs images ../../public/img/kangourou-salut.webp 300`
   → planche de 5 poses ; l'animation est en CSS dans src/components/Hero.astro.
