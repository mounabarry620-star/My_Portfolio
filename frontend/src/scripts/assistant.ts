/**
 * Assistant IA (côté navigateur) : ouverture du panneau, chat écrit et lancement de la voix.
 * La partie vocale (plus lourde) n'est chargée qu'au premier clic sur le micro.
 * Aucune clé ici : le navigateur parle à /api/chat et /api/voix (worker/index.js).
 */

type Textes = Record<string, string>;
type Tour = { role: 'user' | 'model'; texte: string };

export function initialiserAssistant() {
  const racine = document.querySelector<HTMLElement>('[data-assistant]');
  if (!racine) return;
  const $ = <T extends Element>(sel: string) => racine.querySelector<T>(sel)!;

  const panneau = $<HTMLElement>('[data-assistant-panneau]');
  const bouton = $<HTMLButtonElement>('.assistant__bouton');
  const fil = $<HTMLOListElement>('[data-assistant-fil]');
  const formulaire = $<HTMLFormElement>('[data-assistant-formulaire]');
  const champ = $<HTMLTextAreaElement>('[data-assistant-champ]');
  const envoyer = $<HTMLButtonElement>('.assistant__envoyer');
  const micro = $<HTMLButtonElement>('[data-assistant-micro]');
  const etat = $<HTMLElement>('[data-assistant-etat]');
  const suggestions = $<HTMLElement>('[data-assistant-suggestions]');
  const textes: Textes = JSON.parse(racine.dataset.textes ?? '{}');
  const langue = racine.dataset.langue === 'en' ? 'en' : 'fr';
  const historique: Tour[] = [];
  let occupe = false;

  /* ---------------------------------------------------- Ouvrir / fermer */
  const ouvrir = (mode: 'chat' | 'voix' = 'chat') => {
    panneau.hidden = false;
    bouton.setAttribute('aria-expanded', 'true');
    if (mode === 'voix') micro.click();
    else champ.focus();
  };
  const fermer = () => {
    voix?.arreter();
    panneau.hidden = true;
    bouton.setAttribute('aria-expanded', 'false');
    bouton.focus();
  };
  // Le bouton flottant et les autres déclencheurs (palette de commandes, liens dans la page).
  document.addEventListener('click', (e) => {
    const d = (e.target as Element).closest<HTMLElement>('[data-ouvrir-assistant]');
    if (d) ouvrir(d.dataset.ouvrirAssistant === 'voix' ? 'voix' : 'chat');
  });
  $<HTMLButtonElement>('[data-assistant-fermer]').addEventListener('click', fermer);
  panneau.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermer();
  });

  /* ------------------------------------------------------- Messages */
  const defiler = () => (fil.scrollTop = fil.scrollHeight);
  /** Ajoute une bulle ; les adresses web et e-mails deviennent des liens (sans HTML injecté). */
  const bulle = (auteur: 'vous' | 'ia', texte = '') => {
    const li = document.createElement('li');
    li.className = `message message--${auteur}`;
    const nom = document.createElement('span');
    nom.className = 'message__auteur';
    nom.textContent = auteur === 'vous' ? textes.vous : textes.ia;
    const p = document.createElement('p');
    li.append(nom, p);
    fil.append(li);
    ecrire(p, texte);
    defiler();
    return p;
  };
  const ecrire = (p: HTMLElement, texte: string) => {
    p.replaceChildren();
    const motif = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;
    let dernier = 0;
    for (const m of texte.matchAll(motif)) {
      p.append(texte.slice(dernier, m.index));
      const a = document.createElement('a');
      const brut = m[0].replace(/[.,;:]+$/, '');
      a.href = brut.includes('@') && !brut.startsWith('http') ? `mailto:${brut}` : brut;
      if (a.href.startsWith('http')) Object.assign(a, { target: '_blank', rel: 'noopener' });
      a.textContent = brut;
      p.append(a, m[0].slice(brut.length));
      dernier = (m.index ?? 0) + m[0].length;
    }
    p.append(texte.slice(dernier));
  };

  const afficherEtat = (cle = '') => (etat.textContent = cle ? (textes[cle] ?? cle) : '');

  /* -------------------------------------------------------- Chat écrit */
  async function poser(question: string) {
    question = question.trim();
    if (!question || occupe) return;
    occupe = true;
    envoyer.disabled = true;
    suggestions.hidden = true;
    bulle('vous', question);
    champ.value = '';
    const p = bulle('ia');
    p.parentElement!.classList.add('message--attente');
    afficherEtat('reflexion');

    let reponse = '';
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, langue, historique: historique.slice(-8) }),
      });
      if (r.status === 429) throw new Error('limite');
      if (r.status === 404 || r.status === 405) throw new Error('horsLigne');
      if (!r.ok || !r.body) throw new Error('reseau');
      const lecteur = r.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { value, done } = await lecteur.read();
        if (done) break;
        reponse += value;
        p.parentElement!.classList.remove('message--attente');
        ecrire(p, reponse);
        defiler();
      }
      if (!reponse.trim()) throw new Error('reseau');
      historique.push({ role: 'user', texte: question }, { role: 'model', texte: reponse });
    } catch (err) {
      const cle = err instanceof Error && err.message in textes ? err.message : 'reseau';
      p.parentElement!.classList.remove('message--attente');
      ecrire(p, textes[cle] ?? textes.reseau);
    } finally {
      occupe = false;
      envoyer.disabled = false;
      afficherEtat();
      champ.focus();
    }
  }

  formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    void poser(champ.value);
  });
  // Entrée envoie, Maj + Entrée va à la ligne.
  champ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      formulaire.requestSubmit();
    }
  });
  suggestions.addEventListener('click', (e) => {
    const q = (e.target as Element).closest<HTMLElement>('[data-question]')?.dataset.question;
    if (q) void poser(q);
  });

  /* ------------------------------------------------- Conversation vocale */
  let voix: { arreter: () => void; basculer: () => void } | null = null;
  micro.addEventListener('click', async () => {
    if (!voix) {
      const module = await import('./assistant-voix');
      voix = module.creerVoix({ racine, textes, langue, bulle, ecrire, afficherEtat, micro, suggestions, defiler });
    }
    voix.basculer();
  });
}
