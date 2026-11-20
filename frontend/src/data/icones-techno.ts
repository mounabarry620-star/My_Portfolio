/**
 * Icônes des technologies, dans le style de Yaroslav Lebedenko : carrés arrondis pleins
 * du jeu « Skill Icons » (https://github.com/tandpfun/skill-icons, licence MIT,
 * fichiers copiés dans src/assets/skill-icons/). Variante sombre ou claire selon le thème.
 * Pour un outil absent de Skill Icons : tuile pleine à la couleur de la marque, logo en blanc (TUILES).
 */
import { logosDe } from './logos';

/** Noms (sans version, en minuscules) → icônes Skill Icons, seulement celles qui ont déjà un fond plein. */
const CORRESPONDANCES: Record<string, string[]> = {
  'c++': ['CPP'],
  javascript: ['JavaScript'],
  typescript: ['TypeScript'],
  c: ['C'],
  html: ['HTML'],
  css: ['CSS'],
  'css natif': ['CSS'],
  'html · css': ['HTML', 'CSS'],
  astro: ['Astro'],
  sass: ['Sass'],
  git: ['Git'],
};

const normaliser = (nom: string) =>
  nom
    .toLowerCase()
    .replace(/\s+\d+$/, '') // « Vue 3 », « Qt 6 », « Debian 12 »
    .replace(/^c\+\+\d+$/, 'c++') // « C++17 »
    .trim();

/**
 * Les autres : une tuile pleine à la couleur de la marque, logo en blanc (comme C++, JS, TS).
 * « si: » = Simple Icons (CC0), « lu: » = Lucide (ISC), « dv: » = Devicon (MIT), « perso: » = dessiné ici.
 */
type Tuile = { glyphe: string; fond: string; encre?: string };
const T = {
  python: { glyphe: 'si:python', fond: '#3776AB' },
  java: { glyphe: 'dv:java', fond: '#E76F00' },
  bash: { glyphe: 'si:gnubash', fond: '#2F7D1F' },
  vue: { glyphe: 'si:vuedotjs', fond: '#3FA877' },
  react: { glyphe: 'si:react', fond: '#20232A', encre: '#61DAFB' },
  next: { glyphe: 'si:nextdotjs', fond: '#000000' },
  three: { glyphe: 'si:threedotjs', fond: '#000000' },
  tailwind: { glyphe: 'si:tailwindcss', fond: '#0B8FB3' },
  linux: { glyphe: 'si:linux', fond: '#FCC624', encre: '#1B1B1B' },
  debian: { glyphe: 'si:debian', fond: '#A81D33' },
  ubuntu: { glyphe: 'si:ubuntu', fond: '#E95420' },
  windows: { glyphe: 'perso:windows', fond: '#0078D4' },
  qt: { glyphe: 'si:qt', fond: '#2E9E3E' },
  vite: { glyphe: 'si:vite', fond: '#646CFF' },
  webpack: { glyphe: 'si:webpack', fond: '#1C78C0' },
  vitest: { glyphe: 'si:vitest', fond: '#5C7F12' },
  postgresql: { glyphe: 'si:postgresql', fond: '#336791' },
} satisfies Record<string, Tuile>;

const TUILES: Record<string, Tuile[]> = {
  python: [T.python],
  java: [T.java],
  bash: [T.bash],
  vue: [T.vue],
  react: [T.react],
  'next.js': [T.next],
  'react · next.js': [T.react, T.next],
  'three.js': [T.three],
  'react three fiber': [T.three],
  'tailwind css': [T.tailwind],
  'linux (debian, ubuntu)': [T.linux, T.debian, T.ubuntu],
  linux: [T.linux],
  debian: [T.debian],
  ubuntu: [T.ubuntu],
  windows: [T.windows],
  qt: [T.qt],
  vite: [T.vite],
  webpack: [T.webpack],
  'vite · webpack': [T.vite, T.webpack],
  vitest: [T.vitest],
  postgresql: [T.postgresql],
  'pl/pgsql': [T.postgresql],
  sql: [{ glyphe: 'lu:database', fond: '#00618A' }],
  windesign: [{ glyphe: 'lu:workflow', fond: '#6A3FB5' }],
  'api rest': [{ glyphe: 'lu:webhook', fond: '#E8542A' }],
  postfix: [{ glyphe: 'lu:mail', fond: '#B83B2E' }],
  virtualbox: [{ glyphe: 'si:virtualbox', fond: '#2F61B4' }],
  leaflet: [{ glyphe: 'si:leaflet', fond: '#199900' }],
  'chart.js': [{ glyphe: 'si:chartdotjs', fond: '#FF6384' }],
  'leaflet · chart.js': [
    { glyphe: 'si:leaflet', fond: '#199900' },
    { glyphe: 'si:chartdotjs', fond: '#FF6384' },
  ],
  json: [{ glyphe: 'si:json', fond: '#1B1B1B' }],
  xml: [{ glyphe: 'si:xml', fond: '#005FAD' }],
  'json · xml': [
    { glyphe: 'si:json', fond: '#1B1B1B' },
    { glyphe: 'si:xml', fond: '#005FAD' },
  ],
  scrum: [{ glyphe: 'si:scrumalliance', fond: '#009FDA' }],
  uml: [{ glyphe: 'si:uml', fond: '#FABD14', encre: '#1B1B1B' }],
  sage: [{ glyphe: 'si:sage', fond: '#00A82D' }],
  webgl: [{ glyphe: 'si:webgl', fond: '#990000' }],
  handlebars: [{ glyphe: 'si:handlebarsdotjs', fond: '#1B1B1B' }],
  'view transitions': [{ glyphe: 'lu:layers', fond: '#5B5BD6' }],
  zustand: [{ glyphe: 'lu:box', fond: '#443E38' }],
};

export type Icone =
  | { skill: string; double: boolean }
  | { glyphe: string; fond: string; encre: string }
  | { logo: string };

/** Les icônes d'une technologie ou d'un outil (une ou plusieurs). Liste vide si rien ne correspond. */
export function iconesDe(nom: string): Icone[] {
  const cle = normaliser(nom);
  const skills = CORRESPONDANCES[cle];
  if (skills) return skills.map((s) => ({ skill: s, double: false }));
  const tuiles = TUILES[cle];
  if (tuiles) return tuiles.map((t) => ({ glyphe: t.glyphe, fond: t.fond, encre: t.encre ?? '#ffffff' }));
  return logosDe(nom).map((logo) => ({ logo }));
}
