/** Plan du site pour les moteurs de recherche, avec les versions française et anglaise de chaque page. */
import type { APIRoute } from 'astro';
import { routes } from '@/i18n';
import { projetsVedettes } from '@/data/projets';

export const GET: APIRoute = ({ site }) => {
  const absolu = (chemin: string) => new URL(chemin, site).href;
  const pages = [
    { fr: routes.accueil('fr'), en: routes.accueil('en') },
    { fr: routes.cv('fr'), en: routes.cv('en') },
    ...projetsVedettes.map((p) => ({ fr: routes.projet('fr', p.slug), en: routes.projet('en', p.slug) })),
  ];
  const entree = (adresse: string, p: { fr: string; en: string }) => `  <url>
    <loc>${absolu(adresse)}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${absolu(p.fr)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${absolu(p.en)}"/>
  </url>`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((p) => [entree(p.fr, p), entree(p.en, p)]).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
