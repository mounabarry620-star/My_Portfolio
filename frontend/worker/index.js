/**
 * Worker Cloudflare du portfolio : il sert le site (dossier dist/) ET l'assistant IA.
 *
 *   POST /api/chat  → réponse écrite de Gemini, envoyée au fur et à mesure (texte brut).
 *   POST /api/voix  → jeton Gemini Live à usage unique (5 minutes) : le navigateur parle
 *                     ensuite directement à Gemini en temps réel, sans jamais voir la clé.
 *   tout le reste   → fichiers du site.
 *
 * La clé GEMINI_API_KEY ne quitte jamais ce Worker. Protections, de la moins chère à la plus
 * chère : même origine que le site, limite de requêtes par adresse IP, anti-robot Turnstile
 * (si TURNSTILE_SECRET est configuré), taille des messages bornée, consigne verrouillée.
 *
 * Ce que l'assistant sait de moi = /assistant/connaissances.txt, fabriqué à la construction
 * du site à partir de src/data/ (voir src/data/assistant.ts).
 */
import { GoogleGenAI, Modality } from '@google/genai';

// Si un modèle est saturé (erreur 503/429/500), on passe au suivant de la liste.
const MODELES_CHAT = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
const MODELE_VOIX = 'gemini-3.8-live';
const VOIX = 'Aoede';
const MINUTES_VOIX = 5; // durée maximale d'une conversation vocale
const SECONDES_CONNEXION = 60; // délai pour ouvrir la conversation après avoir reçu le jeton
const API = 'https://generativelanguage.googleapis.com/v1beta';

export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(requete);

    if (requete.method !== 'POST') return json({ erreur: 'methode' }, 405);
    if (!origineAutorisee(requete, url, env)) return json({ erreur: 'origine' }, 403);
    if (!env.GEMINI_API_KEY) return json({ erreur: 'non_configure' }, 503);

    try {
      if (url.pathname === '/api/chat') return await chat(requete, env, url);
      if (url.pathname === '/api/voix') return await voix(requete, env, url);
    } catch (err) {
      console.error(url.pathname, err);
      return json({ erreur: 'serveur' }, 502);
    }
    return json({ erreur: 'introuvable' }, 404);
  },
};

/* ------------------------------------------------------------------ Chat écrit */
async function chat(requete, env, url) {
  if (!(await limite(env.LIMITE_CHAT, requete))) return json({ erreur: 'trop_de_requetes' }, 429);

  const corps = await requete.json().catch(() => null);
  const message = typeof corps?.message === 'string' ? corps.message.trim().slice(0, 600) : '';
  if (!message) return json({ erreur: 'message_vide' }, 400);
  const langue = corps.langue === 'en' ? 'en' : 'fr';

  // Les 8 derniers échanges, nettoyés (le navigateur ne peut pas changer la consigne).
  const historique = (Array.isArray(corps.historique) ? corps.historique : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.texte === 'string')
    .slice(-8)
    .map((m) => ({ role: m.role, parts: [{ text: m.texte.slice(0, 1200) }] }));

  const corpsGemini = JSON.stringify({
    systemInstruction: { parts: [{ text: await consigne(env, url, langue) }] },
    contents: [...historique, { role: 'user', parts: [{ text: message }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
  });
  // Deux tours : si tous les modèles sont saturés, on réessaie une fois après une courte pause.
  const essais = [...MODELES_CHAT, 'pause', ...MODELES_CHAT];
  let reponse = null;
  for (const modele of essais) {
    if (modele === 'pause') {
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }
    reponse = await fetch(`${API}/models/${modele}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: corpsGemini,
    });
    if (reponse.ok) break;
    console.error('gemini chat', modele, reponse.status);
    if (![429, 500, 503].includes(reponse.status)) break; // autre erreur : inutile d'insister
  }
  if (!reponse?.ok || !reponse.body) return json({ erreur: 'gemini' }, 502);

  // Gemini envoie des événements « data: {…} » ; on ne renvoie que le texte, au fil de l'eau.
  const decodeur = new TextDecoder();
  const encodeur = new TextEncoder();
  let reste = '';
  const flux = reponse.body.pipeThrough(
    new TransformStream({
      transform(morceau, controleur) {
        reste += decodeur.decode(morceau, { stream: true });
        const lignes = reste.split('\n');
        reste = lignes.pop() ?? '';
        for (const ligne of lignes) {
          if (!ligne.startsWith('data:')) continue;
          try {
            const evt = JSON.parse(ligne.slice(5));
            const texte = (evt.candidates?.[0]?.content?.parts ?? [])
              .filter((p) => !p.thought)
              .map((p) => p.text ?? '')
              .join('');
            if (texte) controleur.enqueue(encodeur.encode(texte));
          } catch {
            /* ligne incomplète : ignorée */
          }
        }
      },
    }),
  );
  return new Response(flux, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

/* ------------------------------------------------------- Conversation vocale */
async function voix(requete, env, url) {
  if (!(await limite(env.LIMITE_VOIX, requete))) return json({ erreur: 'trop_de_requetes' }, 429);

  const formulaire = await requete.formData().catch(() => null);
  const langue = formulaire?.get('langue') === 'en' ? 'en' : 'fr';
  if (env.TURNSTILE_SECRET && !(await turnstile(formulaire?.get('turnstile'), requete, env, url))) {
    return json({ erreur: 'anti_robot' }, 403);
  }

  const ia = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  const maintenant = Date.now();
  const jeton = await ia.authTokens.create({
    config: {
      uses: 1,
      expireTime: new Date(maintenant + MINUTES_VOIX * 60_000).toISOString(),
      newSessionExpireTime: new Date(maintenant + SECONDES_CONNEXION * 1000).toISOString(),
      // La consigne est verrouillée dans le jeton : le navigateur ne peut pas la remplacer,
      // donc le jeton ne peut pas servir d'assistant gratuit pour autre chose.
      liveConnectConstraints: {
        model: MODELE_VOIX,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: await consigne(env, url, langue),
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOIX } } },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
      },
      lockAdditionalFields: [],
      httpOptions: { apiVersion: 'v1beta' },
    },
  });
  return json({ jeton: jeton.name, modele: MODELE_VOIX, secondes: MINUTES_VOIX * 60 }, 200, { 'Cache-Control': 'no-store' });
}

/* ------------------------------------------------------------------ Outils */
let fiche = null;
/** Consigne = fiche publiée par le site + langue de départ. Lue une fois puis gardée en mémoire. */
async function consigne(env, url, langue) {
  if (!fiche) {
    const r = await env.ASSETS.fetch(new URL('/assistant/connaissances.txt', url));
    if (!r.ok) throw new Error('fiche introuvable');
    fiche = await r.text();
  }
  const debut =
    langue === 'en'
      ? '\n\nThe visitor is reading the English version of the site: answer in English unless they write or speak French.'
      : '\n\nLe visiteur lit la version française du site : réponds en français sauf s\'il écrit ou parle anglais.';
  return fiche + debut;
}

function origineAutorisee(requete, url, env) {
  const origine = requete.headers.get('Origin');
  if (!origine) return false;
  if (origine === url.origin) return true;
  return (env.ORIGINES_AUTORISEES || '').split(',').map((o) => o.trim()).filter(Boolean).includes(origine);
}

async function limite(limiteur, requete) {
  if (!limiteur) return true; // pas de limiteur en local (wrangler dev)
  const ip = requete.headers.get('CF-Connecting-IP') || 'inconnue';
  const { success } = await limiteur.limit({ key: ip });
  return success;
}

async function turnstile(jeton, requete, env, url) {
  if (typeof jeton !== 'string' || !jeton || jeton.length > 2048) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: jeton, remoteip: requete.headers.get('CF-Connecting-IP') || '' }),
      signal: AbortSignal.timeout(10_000),
    });
    const resultat = await r.json();
    return resultat.success === true && resultat.action === 'voix' && resultat.hostname === url.hostname;
  } catch {
    return false; // en cas de doute, on refuse
  }
}

function json(corps, statut, entetes = {}) {
  return new Response(JSON.stringify(corps), { status: statut, headers: { 'Content-Type': 'application/json; charset=utf-8', ...entetes } });
}
