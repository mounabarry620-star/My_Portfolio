/**
 * Haut de page : met à jour le nombre de jours avant le début du stage
 * (le chiffre écrit dans la page date de la construction du site).
 */
const zone = document.querySelector<HTMLElement>('[data-jours]');
const chiffre = zone?.querySelector('[data-jours-texte]');
if (zone && chiffre) {
  const debut = Date.parse(`${zone.dataset.jours}T00:00:00`);
  chiffre.textContent = String(Math.max(0, Math.ceil((debut - Date.now()) / 86_400_000)));
}
