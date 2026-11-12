/** Manifeste d'application web : permet d'installer le site comme une application. */
import type { APIRoute } from 'astro';
import { routes, url } from '@/i18n';
import { ui } from '@/i18n/ui';
import { profil } from '@/data/profil';

export const GET: APIRoute = () => {
  const manifeste = {
    name: `${profil.nomComplet} — Portfolio`,
    short_name: 'M. B. Barry',
    description: ui.meta.description.fr,
    lang: 'fr',
    dir: 'ltr',
    id: routes.accueil('fr'),
    start_url: routes.accueil('fr'),
    scope: url('/'),
    display: 'standalone',
    background_color: '#f8f0e1',
    theme_color: '#f8f0e1',
    categories: ['portfolio', 'education'],
    icons: [
      { src: url('/icone-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: url('/icone-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: url('/icone-masque-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: ui.nav.projets.fr, url: routes.section('fr', 'projets') },
      { name: 'CV', url: routes.cv('fr') },
      { name: ui.nav.contact.fr, url: routes.section('fr', 'contact') },
    ],
  };
  return new Response(JSON.stringify(manifeste, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
