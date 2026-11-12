/**
 * Haut de page : compte à rebours avant le stage, billet qui s'incline sous le pointeur,
 * et chargement différé du fond animé (WebGL).
 */

const moinsDeMouvement = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ----------------------------------------- Compte à rebours « J-… » */
function majJours() {
  const cas = document.querySelector<HTMLElement>('[data-jours]');
  if (!cas) return;
  const debut = Date.parse(`${cas.dataset.jours}T00:00:00`);
  const jours = Math.max(0, Math.ceil((debut - Date.now()) / 86_400_000));
  const texte = `${cas.dataset.prefixe ?? 'J-'}${jours}`;
  const volets = cas.querySelector<HTMLElement>('[data-volets]');
  const cases = volets ? [...volets.querySelectorAll('b')] : [];
  // On ne touche à la page que si le nombre a changé depuis la construction du site.
  if (volets && cases.map((b) => b.textContent).join('') !== texte) {
    const modele = cases[0];
    volets.replaceChildren(
      ...texte.split('').map((c, i) => {
        // Copie d'une case existante : elle garde ainsi les attributs dont le style a besoin.
        const b = (modele?.cloneNode(false) as HTMLElement | undefined) ?? document.createElement('b');
        b.textContent = c;
        b.style.setProperty('--i', String(i));
        return b;
      }),
    );
  }
  const lisible = cas.querySelector('[data-jours-texte]');
  if (lisible) lisible.textContent = String(jours);
}

/* ------------------------------- Billet : inclinaison + reflet (pointeur) */
function inclinerBillet() {
  const billet = document.querySelector<HTMLElement>('[data-billet]');
  if (!billet || moinsDeMouvement || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // Position visée et position affichée : la carte rejoint le pointeur avec un effet de ressort.
  const vise = { x: 0, y: 0 };
  const affiche = { x: 0, y: 0 };
  const vitesse = { x: 0, y: 0 };
  let image = 0;

  const animer = () => {
    const raideur = 0.09;
    const frein = 0.78;
    vitesse.x = (vitesse.x + (vise.x - affiche.x) * raideur) * frein;
    vitesse.y = (vitesse.y + (vise.y - affiche.y) * raideur) * frein;
    affiche.x += vitesse.x;
    affiche.y += vitesse.y;
    billet.style.setProperty('--inclinaison-y', `${(affiche.x * 9).toFixed(2)}deg`);
    billet.style.setProperty('--inclinaison-x', `${(-affiche.y * 7).toFixed(2)}deg`);
    const immobile =
      Math.abs(vitesse.x) + Math.abs(vitesse.y) < 0.0004 && Math.abs(vise.x - affiche.x) + Math.abs(vise.y - affiche.y) < 0.0004;
    image = immobile ? 0 : requestAnimationFrame(animer);
  };
  const relancer = () => {
    if (!image) image = requestAnimationFrame(animer);
  };

  billet.addEventListener('pointermove', (e) => {
    const r = billet.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    vise.x = px - 0.5;
    vise.y = py - 0.5;
    billet.style.setProperty('--reflet-x', `${(px * 100).toFixed(1)}%`);
    billet.style.setProperty('--reflet-y', `${(py * 100).toFixed(1)}%`);
    billet.setAttribute('data-actif', '');
    relancer();
  });
  billet.addEventListener('pointerleave', () => {
    vise.x = 0;
    vise.y = 0;
    billet.removeAttribute('data-actif');
    relancer();
  });
}

/* ------------------------------------------- Fond animé, chargé plus tard */
function chargerFond() {
  const toile = document.querySelector<HTMLCanvasElement>('[data-fond-gl]');
  if (!toile || moinsDeMouvement) return;
  const connexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connexion?.saveData) return;
  const lancer = () => import('./fond-gl').then((m) => m.demarrerFond(toile)).catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(lancer, { timeout: 1800 });
  else setTimeout(lancer, 600);
}

majJours();
inclinerBillet();
chargerFond();
