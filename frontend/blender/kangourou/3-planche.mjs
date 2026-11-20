import { createRequire } from 'node:module';
const sharp = createRequire('/home/nene_goto/Documents/My_Portfolio/frontend/package.json')('sharp');
const [, , dossier, sortie, hauteurCible] = process.argv;
const noms = ['pose-126', 'pose-138', 'pose-150', 'pose-162', 'pose-174'];
let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0, W, H;
const bruts = [];
for (const n of noms) {
  const { data, info } = await sharp(`${dossier}/${n}.png`).raw().toBuffer({ resolveWithObject: true });
  W = info.width; H = info.height; bruts.push({ data, info });
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 8) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
}
const l = x1 - x0 + 1, h = y1 - y0 + 1;
const H2 = +hauteurCible, L2 = Math.round((l * H2) / h);
const images = await Promise.all(noms.map((n) => sharp(`${dossier}/${n}.png`).extract({ left: x0, top: y0, width: l, height: h }).resize(L2, H2).png().toBuffer()));
await sharp({ create: { width: L2 * noms.length, height: H2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(images.map((input, i) => ({ input, left: i * L2, top: 0 })))
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(sortie);
console.log('image', L2, 'x', H2, 'par pose ; planche', L2 * noms.length, 'x', H2);
