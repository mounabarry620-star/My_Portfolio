# Le train du parcours

Modèle : « Tangara Sydney Trains T set » par TheOminousDuck, licence CC BY 4.0
https://sketchfab.com/3d-models/07d7a69ffb544ec48442ae3448ee6f1f
(fichier .glb de 10 Mo, non versionné : le retélécharger au format GLB)

1. `blender -b --factory-startup -P rendu-train.py -- modele.glb rendus 1500 160`
   → 3 rendus : base (livrée en noir), blanc (livrée en blanc), allume (lumières allumées)
2. `node couches.mjs rendus ../../public/img 700`
   → train-base.webp, train-livree.webp (masque de la couleur du thème), train-lumiere.webp

Sur le site (src/components/sections/Parcours.astro), la livrée est remplie avec `--accent`
et les lumières s'ajoutent quand le train roule entre deux gares.
