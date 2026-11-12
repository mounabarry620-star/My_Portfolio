/**
 * Conversation vocale en temps réel avec Gemini Live.
 *
 * Déroulé : clic sur le micro → (1re fois) message de consentement → vérification anti-robot
 * Turnstile si elle est activée → /api/voix renvoie un jeton à usage unique → le navigateur
 * ouvre une connexion WebSocket directement chez Google → le micro est envoyé en PCM 16 bits,
 * la réponse audio est jouée au fil de l'eau, et les transcriptions s'affichent dans le fil.
 * La consigne (ce que l'assistant sait de moi) est verrouillée dans le jeton par le serveur.
 *
 * Inspiré de l'assistant vocal du portfolio d'Aldo Alex Nganji (github.com/Bakame03/portfolioX).
 */

type Options = {
  racine: HTMLElement;
  textes: Record<string, string>;
  langue: 'fr' | 'en';
  bulle: (auteur: 'vous' | 'ia', texte?: string) => HTMLElement;
  ecrire: (p: HTMLElement, texte: string) => void;
  afficherEtat: (cle?: string) => void;
  micro: HTMLButtonElement;
  suggestions: HTMLElement;
  defiler: () => void;
};
type Session = {
  ctx: AudioContext;
  ws: WebSocket | null;
  flux: MediaStream | null;
  sources: Set<AudioBufferSourceNode>;
  tete: number;
  fermeture: boolean;
  sortie: AnalyserNode;
  niveauMicro: number;
};

const URL_LIVE =
  'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained';
const URL_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

class ErreurVoix extends Error {}

export function creerVoix(o: Options) {
  const { racine, textes, langue, micro } = o;
  const consentement = racine.querySelector<HTMLElement>('[data-assistant-consentement]')!;
  const zoneTurnstile = racine.querySelector<HTMLElement>('[data-assistant-turnstile]')!;
  const cleTurnstile = racine.dataset.turnstile ?? '';
  const pris =
    'WebSocket' in window && 'AudioContext' in window && 'AudioWorkletNode' in window && !!navigator.mediaDevices?.getUserMedia;
  const moinsDeMouvement = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let session: Session | null = null;
  let consenti = false;
  let etat: 'repos' | 'connexion' | 'ecoute' | 'parle' = 'repos';

  const changerEtat = (e: typeof etat, message?: string) => {
    etat = e;
    racine.dataset.etat = e;
    micro.setAttribute('aria-pressed', String(e !== 'repos'));
    micro.setAttribute('aria-label', e === 'repos' ? textes.micro : textes.microStop);
    micro.title = micro.getAttribute('aria-label')!;
    o.afficherEtat(message ?? (e === 'repos' ? '' : e));
  };

  /* ---------------------------------------------------- Transcriptions */
  // Les morceaux de texte arrivent un par un : on complète la même bulle tant que
  // la même personne parle.
  let ligne: { auteur: 'vous' | 'ia'; p: HTMLElement; texte: string } | null = null;
  const transcrire = (auteur: 'vous' | 'ia', morceau?: string) => {
    if (!morceau) return;
    if (!ligne || ligne.auteur !== auteur) ligne = { auteur, p: o.bulle(auteur), texte: '' };
    ligne.texte += morceau;
    o.ecrire(ligne.p, ligne.texte.trimStart());
    o.defiler();
  };

  /* --------------------------------------------------------- Démarrage */
  async function demarrer() {
    if (!pris) return changerEtat('repos', textes.navigateur);
    o.suggestions.hidden = true;
    ligne = null;
    changerEtat('connexion');

    // Créé pendant le clic : sinon le navigateur bloque le son.
    const ctx = new AudioContext();
    const sortie = ctx.createAnalyser();
    sortie.fftSize = 512;
    sortie.connect(ctx.destination);
    const s: Session = (session = { ctx, ws: null, flux: null, sources: new Set(), tete: 0, fermeture: false, sortie, niveauMicro: 0 });
    mesurer(s);

    try {
      const [acces, flux] = await Promise.all([antiRobot().then(demanderJeton), ouvrirMicro()]);
      if (session !== s) return flux.getTracks().forEach((p) => p.stop());
      s.flux = flux;
      await ctx.audioWorklet.addModule(`${BASE}/assistant/capture-micro.worklet.js`);
      if (session !== s) return;
      connecter(s, acces);
    } catch (err) {
      if (session !== s) return;
      arreter(err instanceof ErreurVoix ? textes[err.message] : textes.reseau);
    }
  }

  async function demanderJeton(turnstile: string) {
    let r: Response;
    try {
      r = await fetch('/api/voix', { method: 'POST', body: new URLSearchParams({ turnstile, langue }) });
    } catch {
      throw new ErreurVoix('reseau');
    }
    if (r.status === 429) throw new ErreurVoix('limite');
    if (r.status === 403) throw new ErreurVoix('robot');
    if (r.status === 404 || r.status === 405) throw new ErreurVoix('horsLigne');
    if (!r.ok) throw new ErreurVoix('reseau');
    return (await r.json()) as { jeton: string; modele: string };
  }

  async function ouvrirMicro() {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch {
      throw new ErreurVoix('erreurMicro');
    }
  }

  /* ------------------------------------------- Anti-robot (facultatif) */
  // Le script de Cloudflare n'est chargé qu'au premier usage de la voix.
  let widget: string | null = null;
  function antiRobot(): Promise<string> {
    if (!cleTurnstile) return Promise.resolve('');
    type T = { render: (el: Element, o: object) => string; reset: (id: string) => void };
    const w = window as unknown as { turnstile?: T };
    const charge = w.turnstile
      ? Promise.resolve()
      : new Promise<void>((ok, ko) => {
          const script = Object.assign(document.createElement('script'), { src: URL_TURNSTILE, async: true });
          script.onload = () => ok();
          script.onerror = () => ko(new ErreurVoix('reseau'));
          document.head.append(script);
        });
    return charge.then(
      () =>
        new Promise<string>((ok, ko) => {
          const options = {
            sitekey: cleTurnstile,
            action: 'voix',
            appearance: 'interaction-only',
            language: langue,
            callback: ok,
            'error-callback': () => ko(new ErreurVoix('robot')),
          };
          if (widget) {
            zoneTurnstile.replaceChildren();
            widget = null;
          }
          widget = w.turnstile!.render(zoneTurnstile, options);
        }),
    );
  }

  /* -------------------------------------------------- Connexion Gemini */
  function connecter(s: Session, acces: { jeton: string; modele: string }) {
    const ws = (s.ws = new WebSocket(`${URL_LIVE}?access_token=${encodeURIComponent(acces.jeton)}`));
    ws.binaryType = 'arraybuffer';
    const decodeur = new TextDecoder();
    ws.onopen = () => envoyer(s, { setup: { model: `models/${acces.modele}` } });
    ws.onmessage = (e) => {
      if (session !== s) return;
      try {
        recevoir(s, JSON.parse(typeof e.data === 'string' ? e.data : decodeur.decode(e.data)));
      } catch {
        /* message illisible : ignoré */
      }
    };
    ws.onclose = (e) => {
      if (session !== s || s.fermeture) return;
      arreter(e.code === 1000 ? textes.fin : textes.reseau);
    };
  }

  function recevoir(s: Session, msg: any) {
    if (msg.setupComplete) {
      capturer(s);
      // Un premier « Bonjour » pour que l'assistant se présente au lieu d'un silence.
      envoyer(s, {
        clientContent: { turns: [{ role: 'user', parts: [{ text: langue === 'en' ? 'Hello' : 'Bonjour' }] }], turnComplete: true },
      });
      changerEtat('ecoute');
      return;
    }
    const c = msg.serverContent;
    if (!c) return;
    if (c.interrupted) couperLecture(s); // le visiteur a parlé par-dessus
    for (const part of c.modelTurn?.parts ?? []) {
      const donnees = part.inlineData;
      if (donnees && /^audio\/pcm/.test(donnees.mimeType ?? '')) {
        jouer(s, donnees.data, Number(/rate=(\d+)/.exec(donnees.mimeType)?.[1]) || 24000);
      }
    }
    transcrire('vous', c.inputTranscription?.text);
    transcrire('ia', c.outputTranscription?.text);
  }

  const envoyer = (s: Session, msg: object) => {
    if (s.ws?.readyState === WebSocket.OPEN) s.ws.send(JSON.stringify(msg));
  };

  /* --------------------------------------------------------- Micro → Gemini */
  function capturer(s: Session) {
    const noeud = new AudioWorkletNode(s.ctx, 'capture-micro');
    const type = `audio/pcm;rate=${s.ctx.sampleRate}`;
    noeud.port.onmessage = (e: MessageEvent<Float32Array>) => {
      if (session !== s) return;
      s.niveauMicro = volume(e.data);
      envoyer(s, { realtimeInput: { audio: { mimeType: type, data: versPcm16Base64(e.data) } } });
    };
    s.ctx.createMediaStreamSource(s.flux!).connect(noeud);
  }

  function versPcm16Base64(echantillons: Float32Array) {
    const pcm = new Int16Array(echantillons.length);
    for (let i = 0; i < echantillons.length; i++) {
      const v = Math.max(-1, Math.min(1, echantillons[i]!));
      pcm[i] = v < 0 ? v * 0x8000 : v * 0x7fff;
    }
    const octets = new Uint8Array(pcm.buffer);
    let binaire = '';
    for (let i = 0; i < octets.length; i += 0x8000) binaire += String.fromCharCode(...octets.subarray(i, i + 0x8000));
    return btoa(binaire);
  }

  /* ------------------------------------------------------ Gemini → haut-parleur */
  // Chaque morceau devient un AudioBuffer, joué à la suite du précédent, sans trou.
  function jouer(s: Session, base64: string, frequence: number) {
    const binaire = atob(base64);
    const pcm = new Int16Array(binaire.length >> 1);
    for (let i = 0; i < pcm.length; i++) pcm[i] = binaire.charCodeAt(2 * i) | (binaire.charCodeAt(2 * i + 1) << 8);
    if (!pcm.length) return;
    const tampon = s.ctx.createBuffer(1, pcm.length, frequence);
    const canal = tampon.getChannelData(0);
    for (let i = 0; i < pcm.length; i++) canal[i] = pcm[i]! / 32768;
    const src = s.ctx.createBufferSource();
    src.buffer = tampon;
    src.connect(s.sortie);
    const debut = Math.max(s.tete, s.ctx.currentTime + 0.03);
    src.start(debut);
    s.tete = debut + tampon.duration;
    s.sources.add(src);
    src.onended = () => {
      s.sources.delete(src);
      if (!s.sources.size && session === s) changerEtat('ecoute');
    };
    if (etat !== 'parle') changerEtat('parle');
  }

  function couperLecture(s: Session) {
    s.sources.forEach((src) => {
      src.onended = null;
      try {
        src.stop();
      } catch {
        /* déjà arrêtée */
      }
    });
    s.sources.clear();
    s.tete = 0;
    if (session === s) changerEtat('ecoute');
  }

  /* --------------------------------------------------- Anneaux de volume */
  const volume = (x: Float32Array) => {
    let somme = 0;
    for (let i = 0; i < x.length; i++) somme += x[i]! * x[i]!;
    return x.length ? Math.sqrt(somme / x.length) : 0;
  };
  function mesurer(s: Session) {
    if (moinsDeMouvement) return;
    const tampon = new Float32Array(s.sortie.fftSize);
    let niveau = 0;
    const image = () => {
      if (session !== s) return racine.style.removeProperty('--niveau');
      let cible = 0;
      if (etat === 'parle') {
        s.sortie.getFloatTimeDomainData(tampon);
        cible = volume(tampon);
      } else if (etat === 'ecoute') {
        cible = s.niveauMicro;
        s.niveauMicro *= 0.8;
      }
      niveau += (Math.min(1, cible * 6) - niveau) * 0.3;
      racine.style.setProperty('--niveau', niveau.toFixed(3));
      requestAnimationFrame(image);
    };
    requestAnimationFrame(image);
  }

  /* ------------------------------------------------------------- Arrêt */
  function arreter(message?: string) {
    const s = session;
    session = null;
    if (s) {
      s.fermeture = true;
      couperLecture(s);
      if (s.ws && s.ws.readyState <= WebSocket.OPEN) s.ws.close(1000);
      s.flux?.getTracks().forEach((p) => p.stop());
      s.ctx.close().catch(() => {});
    }
    changerEtat('repos', message ?? '');
  }
  // Ne jamais laisser le micro ouvert sur une page quittée.
  addEventListener('pagehide', () => session && arreter());

  /* ------------------------------------------------------- Consentement */
  racine.querySelector('[data-assistant-accepter]')!.addEventListener('click', () => {
    consenti = true;
    consentement.hidden = true;
    void demarrer(); // toujours dans le clic : le son est autorisé
  });
  racine.querySelector('[data-assistant-refuser]')!.addEventListener('click', () => {
    consentement.hidden = true;
    micro.focus();
  });

  return {
    arreter: () => session && arreter(),
    basculer: () => {
      if (etat !== 'repos') return arreter(textes.fin);
      if (consenti) return void demarrer();
      consentement.hidden = false;
      consentement.querySelector<HTMLButtonElement>('[data-assistant-accepter]')!.focus();
    },
  };
}
