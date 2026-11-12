/**
 * Fiche de l'assistant IA, fabriquée à la construction à partir des données du site.
 * Lue par le Worker Cloudflare (worker/index.js), qui la donne à Gemini comme consigne.
 */
import type { APIRoute } from 'astro';
import { connaissances } from '@/data/assistant';

export const GET: APIRoute = () =>
  new Response(connaissances(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
