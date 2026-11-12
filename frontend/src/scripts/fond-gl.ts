/**
 * Fond animé du haut de page : des courbes de niveau, comme sur une carte, qui dérivent
 * lentement et se déforment sous le pointeur. Écrit directement en WebGL 2 (un seul
 * shader, aucune bibliothèque). Le module n'est chargé que si le visiteur accepte les
 * animations ; il se met en pause dès que le haut de page sort de l'écran.
 */

const SOMMETS = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENTS = `#version 300 es
precision highp float;

uniform vec2 u_taille;     // taille du dessin, en pixels
uniform float u_temps;     // secondes
uniform vec2 u_pointeur;   // position du pointeur, en pixels
uniform float u_presence;  // 0 = pas de pointeur, 1 = pointeur présent
uniform vec3 u_trait;      // couleur des courbes
uniform vec3 u_accent;     // couleur des courbes maîtresses
out vec4 couleur;

// Bruit « simplex » en 2D (Ian McEwan, Ashima Arts — licence MIT).
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float bruit(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_taille.y;
  float t = u_temps * 0.028;

  // Le « relief » : deux couches de bruit qui glissent doucement.
  float relief = bruit(uv * 1.15 + vec2(t, -t * 0.6)) * 0.62
               + bruit(uv * 2.4 - vec2(t * 0.7, t)) * 0.24;

  // Une colline se forme sous le pointeur.
  float d = distance(uv, u_pointeur / u_taille.y);
  relief += 0.42 * exp(-d * d * 7.0) * u_presence;

  // Courbes de niveau : une ligne chaque fois que le relief franchit un palier.
  float v = relief * 8.0;
  float ecart = abs(fract(v - 0.5) - 0.5) / max(fwidth(v), 1e-4);
  float ligne = 1.0 - smoothstep(0.35, 1.35, ecart);

  // Une courbe sur quatre est « maîtresse » : plus visible et en couleur d'accent.
  float maitresse = 1.0 - step(0.5, mod(floor(v + 0.5), 4.0));
  float opacite = ligne * mix(0.2, 0.5, maitresse);
  vec3 teinte = mix(u_trait, u_accent, maitresse);
  couleur = vec4(teinte * opacite, opacite); // alpha prémultiplié
}`;

function compiler(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
  return shader;
}

/** Convertit n'importe quelle couleur CSS (ici en OKLCH) en rouge-vert-bleu entre 0 et 1. */
function versRvb(couleurCss: string): [number, number, number] {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!ctx) return [0.5, 0.5, 0.5];
  ctx.fillStyle = couleurCss;
  ctx.fillRect(0, 0, 1, 1);
  const [r, v, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, v / 255, b / 255];
}

export function demarrerFond(toile: HTMLCanvasElement) {
  const gl = toile.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return;

  const programme = gl.createProgram()!;
  gl.attachShader(programme, compiler(gl, gl.VERTEX_SHADER, SOMMETS));
  gl.attachShader(programme, compiler(gl, gl.FRAGMENT_SHADER, FRAGMENTS));
  gl.linkProgram(programme);
  if (!gl.getProgramParameter(programme, gl.LINK_STATUS)) return;
  gl.useProgram(programme);

  // Un seul grand triangle qui couvre tout le dessin.
  const tampon = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tampon);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(programme, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const u = (nom: string) => gl.getUniformLocation(programme, nom);
  const uTaille = u('u_taille');
  const uTemps = u('u_temps');
  const uPointeur = u('u_pointeur');
  const uPresence = u('u_presence');
  const uTrait = u('u_trait');
  const uAccent = u('u_accent');

  // Les couleurs viennent du thème en cours.
  const lireCouleurs = () => {
    const style = getComputedStyle(document.documentElement);
    gl.uniform3fv(uTrait, versRvb(style.getPropertyValue('--encre')));
    gl.uniform3fv(uAccent, versRvb(style.getPropertyValue('--accent-encre')));
  };
  lireCouleurs();
  document.addEventListener('theme:change', () => requestAnimationFrame(lireCouleurs));

  // Finesse du dessin : limitée pour rester fluide, réduite encore si l'appareil peine.
  let finesse = Math.min(devicePixelRatio || 1, 1.5);
  const redimensionner = () => {
    const l = Math.max(1, Math.round(toile.clientWidth * finesse));
    const h = Math.max(1, Math.round(toile.clientHeight * finesse));
    if (toile.width === l && toile.height === h) return;
    toile.width = l;
    toile.height = h;
    gl.viewport(0, 0, l, h);
    gl.uniform2f(uTaille, l, h);
  };
  new ResizeObserver(redimensionner).observe(toile);
  redimensionner();

  // Pointeur, lissé pour un mouvement souple.
  const vise = { x: 0, y: 0, presence: 0 };
  const lisse = { x: 0, y: 0, presence: 0 };
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      const r = toile.getBoundingClientRect();
      vise.x = (e.clientX - r.left) * finesse;
      vise.y = (r.height - (e.clientY - r.top)) * finesse;
      vise.presence = e.clientY < r.bottom ? 1 : 0;
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => (vise.presence = 0));

  // Sur téléphone ou petit processeur, 30 images par seconde suffisent pour un fond lent
  // et ménagent la batterie.
  const economie = matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;
  const intervalleMin = economie ? 1000 / 31 : 0;
  let dernierDessin = 0;

  let visible = true;
  let image = 0;
  let dernier = 0;
  let lentes = 0;
  let comptees = 0;
  const debut = performance.now();

  const dessiner = (maintenant: number) => {
    image = 0;
    if (!visible || document.hidden) return;
    if (maintenant - dernierDessin < intervalleMin) {
      image = requestAnimationFrame(dessiner);
      return;
    }
    dernierDessin = maintenant;

    // Mesure des 90 premières images : si l'appareil est lent, on dessine moins fin.
    if (dernier && comptees < 90) {
      comptees++;
      if (maintenant - dernier > 28) lentes++;
      if (comptees === 90 && lentes > 30 && finesse > 0.75) {
        finesse = 0.75;
        redimensionner();
      }
    }
    dernier = maintenant;

    lisse.x += (vise.x - lisse.x) * 0.06;
    lisse.y += (vise.y - lisse.y) * 0.06;
    lisse.presence += (vise.presence - lisse.presence) * 0.05;

    gl.uniform1f(uTemps, (maintenant - debut) / 1000);
    gl.uniform2f(uPointeur, lisse.x, lisse.y);
    gl.uniform1f(uPresence, lisse.presence);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    image = requestAnimationFrame(dessiner);
  };
  const relancer = () => {
    if (!image && visible && !document.hidden) {
      dernier = 0;
      image = requestAnimationFrame(dessiner);
    }
  };

  new IntersectionObserver(([entree]) => {
    visible = entree?.isIntersecting ?? true;
    relancer();
  }).observe(toile);
  document.addEventListener('visibilitychange', relancer);
  toile.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    cancelAnimationFrame(image);
    toile.removeAttribute('data-pret');
  });

  relancer();
  toile.setAttribute('data-pret', '');
}
