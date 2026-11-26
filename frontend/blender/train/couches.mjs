// Transforme les 3 rendus de Blender en 3 images légères pour le site :
//   train-base.webp     la carrosserie et son ombre
//   train-livree.webp   masque (blanc + transparence) des parties qui prennent la couleur du thème
//   train-lumiere.webp  la lumière seule (fenêtres, phares), à ajouter par-dessus quand il roule
// node blender/train/couches.mjs dossier_rendus public/img hauteur
import { createRequire } from 'node:module';
const sharp = createRequire(new URL('../../package.json', import.meta.url))('sharp');
const [, , dossier, sortie, hauteur = '700'] = process.argv;
const lire = (n) => sharp(`${dossier}/${n}.png`).raw().toBuffer({ resolveWithObject: true });
const [base, blanc, allume] = await Promise.all([lire('base'), lire('blanc'), lire('allume')]);
const { width: W, height: H } = base.info;
// Cadre : centré sur le train lui-même (pixels opaques), avec une marge pour son ombre.
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (base.data[(y * W + x) * 4 + 3] > 240) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
const marge = Math.round((x1 - x0) * 0.35);
const cx = (x0 + x1) / 2, demi = (x1 - x0) / 2 + marge;
const gauche = Math.max(0, Math.round(cx - demi)), droite = Math.min(W - 1, Math.round(cx + demi));
const haut = Math.max(0, y0 - marge), bas = Math.min(H - 1, y1 + marge);
// L'ombre s'efface doucement vers les bords du cadre (pas de bord coupé net).
for (let y = haut; y <= bas; y++) for (let x = gauche; x <= droite; x++) {
  const k = (y * W + x) * 4;
  if (base.data[k + 3] > 240) continue;
  const bord = Math.min(x - gauche, droite - x, y - haut, bas - y) / marge;
  const f = Math.max(0, Math.min(1, bord));
  base.data[k + 3] = Math.round(base.data[k + 3] * f * f * (3 - 2 * f) * 0.8);
}
x0 = gauche; x1 = droite; y0 = haut; y1 = bas;
const masque = Buffer.alloc(W * H * 4), lumiere = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const k = i * 4;
  // livrée : différence de luminosité entre livrée blanche et livrée noire
  const d = (blanc.data[k] - base.data[k] + blanc.data[k + 1] - base.data[k + 1] + blanc.data[k + 2] - base.data[k + 2]) / 3;
  masque[k] = masque[k + 1] = masque[k + 2] = 255;
  masque[k + 3] = Math.max(0, Math.min(255, d * 1.05));
  // lumière : ce qui s'ajoute quand on allume (en « lumière additive » : couleur + intensité)
  const r = Math.max(0, allume.data[k] - base.data[k]), g = Math.max(0, allume.data[k + 1] - base.data[k + 1]), b = Math.max(0, allume.data[k + 2] - base.data[k + 2]);
  const m = Math.max(r, g, b);
  if (m > 2) { lumiere[k] = Math.min(255, (r * 255) / m); lumiere[k + 1] = Math.min(255, (g * 255) / m); lumiere[k + 2] = Math.min(255, (b * 255) / m); lumiere[k + 3] = m; }
}
const cadre = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
// Où est l'avant du train dans l'image (pour placer le faisceau des phares) : le pixel opaque le plus bas.
let avant = 0;
for (let y = H - 1; y >= 0 && !avant; y--) for (let x = 0; x < W; x++) if (base.data[(y * W + x) * 4 + 3] > 240) { avant = y; break; }
console.log('train centré : largeur du cadre', x1 - x0 + 1, 'px');
console.log('avant du train à', ((avant - y0) / cadre.height * 100).toFixed(1), '% de la hauteur');
const H2 = +hauteur;
const ecrire = (donnees, nom) =>
  sharp(donnees, { raw: { width: W, height: H, channels: 4 } }).extract(cadre).resize({ height: H2 }).webp({ quality: 86, alphaQuality: 92, effort: 6 }).toFile(`${sortie}/${nom}`);
const infos = await Promise.all([ecrire(base.data, 'train-base.webp'), ecrire(masque, 'train-livree.webp'), ecrire(lumiere, 'train-lumiere.webp')]);
console.log('taille', infos[0].width, '×', infos[0].height, '— poids', infos.map((i) => Math.round(i.size / 1024) + ' Ko').join(', '));
