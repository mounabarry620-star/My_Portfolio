/**
 * Service worker : rend le site consultable sans connexion.
 *
 * - Les pages (HTML) : « réseau d'abord ». On affiche toujours la version en ligne si elle
 *   répond ; sinon la dernière version gardée en cache.
 * - Les ressources (CSS, JS, polices, images) : « cache d'abord ». Leur nom contient une
 *   empreinte, donc une ressource en cache n'est jamais périmée.
 *
 * Ce fichier est un modèle : à la construction du site, l'intégration « hors-connexion »
 * (astro.config.mjs) remplace les trois valeurs ci-dessous et écrit dist/sw.js.
 */
const VERSION = '__VERSION__';
const BASE = '__BASE__';
const PRECACHE = '__PRECACHE__';

const CACHE_PAGES = `pages-${VERSION}`;
const CACHE_RESSOURCES = `ressources-${VERSION}`;
const EST_RESSOURCE = /\.(?:css|js|woff2|avif|webp|png|jpe?g|svg|ico|pdf|webmanifest)$/i;

self.addEventListener('install', (evenement) => {
  evenement.waitUntil(
    (async () => {
      const pages = await caches.open(CACHE_PAGES);
      const ressources = await caches.open(CACHE_RESSOURCES);
      await Promise.allSettled(
        PRECACHE.map((adresse) => {
          const cache = EST_RESSOURCE.test(adresse) ? ressources : pages;
          return cache.add(new Request(adresse, { cache: 'reload' }));
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(
    (async () => {
      const noms = await caches.keys();
      await Promise.all(noms.filter((n) => n !== CACHE_PAGES && n !== CACHE_RESSOURCES).map((n) => caches.delete(n)));
      await self.clients.claim();
    })(),
  );
});

async function reseauDAbord(requete) {
  const cache = await caches.open(CACHE_PAGES);
  try {
    const reponse = await fetch(requete);
    if (reponse.ok) cache.put(requete, reponse.clone());
    return reponse;
  } catch {
    return (
      (await cache.match(requete, { ignoreSearch: true })) ||
      (await cache.match(`${BASE}/404.html`)) ||
      (await cache.match(`${BASE}/`)) ||
      Response.error()
    );
  }
}

async function cacheDAbord(requete) {
  const cache = await caches.open(CACHE_RESSOURCES);
  const enCache = await cache.match(requete);
  if (enCache) return enCache;
  const reponse = await fetch(requete);
  if (reponse.ok) cache.put(requete, reponse.clone());
  return reponse;
}

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;
  const adresse = new URL(requete.url);
  if (adresse.origin !== self.location.origin) return;

  if (requete.mode === 'navigate') {
    evenement.respondWith(reseauDAbord(requete));
  } else if (EST_RESSOURCE.test(adresse.pathname)) {
    evenement.respondWith(cacheDAbord(requete));
  }
});
