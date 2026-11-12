/**
 * Assistant IA du portfolio (chat écrit + conversation vocale).
 *
 * Ce que l'assistant sait de moi n'est PAS écrit à la main : `connaissances()` le fabrique
 * à partir des mêmes fichiers de données que le site (profil, projets, compétences, parcours,
 * CV). Quand je modifie le site, l'assistant suit automatiquement : il ne peut pas raconter
 * autre chose que ce qui est publié.
 *
 * Le texte est publié à la construction dans `dist/assistant/connaissances.txt`, puis lu
 * par le Worker Cloudflare (worker/index.js) qui le donne à Gemini comme consigne.
 */
import type { Langue } from '@/i18n';
import { profil, stage, languesParlees, centresInteret, particularites, atouts, faq } from './profil';
import { projets } from './projets';
import { competences, boiteAOutils } from './competences';
import { etapes } from './parcours';

/** Questions proposées en un clic dans le panneau de l'assistant. */
export const suggestions: Record<Langue, string[]> = {
  fr: [
    'Quelles sont les dates de son stage ?',
    "Qu'a-t-il fait sur ArchiSim ?",
    'Quels langages utilise-t-il ?',
    'Comment le contacter ?',
  ],
  en: [
    'When is his internship?',
    'What did he do on ArchiSim?',
    'Which languages does he use?',
    'How can I contact him?',
  ],
};

/** Règles de comportement de l'assistant (en tête de la consigne donnée à Gemini). */
const regles = `Tu es l'assistant du portfolio de ${profil.nomComplet}, étudiant en 2e année de BUT Informatique.
Tu réponds aux questions des recruteurs et des visiteurs sur son parcours, ses projets, ses compétences et sa recherche de stage.

Règles :
- Parle de lui à la troisième personne (« Il a… », « Mamadou recherche… »). Présente-toi comme « l'assistant de ce portfolio ».
- Réponds dans la langue du visiteur : français par défaut, anglais si on te parle en anglais.
- Utilise UNIQUEMENT les informations de la fiche ci-dessous. Si une information n'y est pas, dis simplement que tu ne la connais pas et propose de le contacter par e-mail. N'invente jamais un chiffre, une date, une note, un outil ou une expérience.
- Reste sobre et factuel : pas de superlatifs (« exceptionnel », « expert », « passionné »).
- À l'écrit : 2 à 5 phrases courtes, sans markdown (pas d'astérisques, pas de #). Une courte liste avec des tirets est acceptée si on te demande une liste.
- À l'oral : 2 ou 3 phrases naturelles. Ne lis pas les adresses web caractère par caractère et ne dicte pas le numéro de téléphone : dis qu'il est sur la page Contact.
- Si on te demande autre chose que le portfolio (devoirs, code à écrire, sujets sans rapport), explique poliment que tu réponds seulement sur le profil de ${profil.prenom}.
- Ne donne jamais d'avis sur sa personnalité au-delà des faits listés.`;

const t = (x: { fr: string } | string) => (typeof x === 'string' ? x : x.fr);

/** La fiche complète, en texte simple, construite à partir des données du site. */
export function connaissances(): string {
  const l: string[] = [];
  const titre = (s: string) => l.push('', `## ${s}`);

  l.push(regles, '', '# FICHE (seule source autorisée)');

  titre('Identité et contact');
  l.push(
    `- Nom : ${profil.nomComplet}`,
    `- Ville : ${profil.ville} (France)`,
    `- E-mail : ${profil.email}`,
    `- Téléphone : visible sur la page Contact du site`,
    `- LinkedIn : ${profil.liens.linkedin}`,
    `- GitHub : ${profil.liens.github}`,
  );

  titre('Recherche de stage');
  l.push(
    `- Stage obligatoire de 2e année de BUT Informatique, ${stage.semaines} semaines à temps plein, du ${stage.debut} au ${stage.fin} (dates au format année-mois-jour).`,
    `- Prolongeable jusqu'au ${stage.prolongeableJusqua}.`,
  );
  faq.forEach((q) => l.push(`- Q : ${t(q.question)} R : ${t(q.reponse)}`));

  titre('Ce qui le distingue');
  particularites.forEach((p) => l.push(`- ${t(p.titre)} : ${t(p.texte)} Preuve : ${t(p.preuve)}`));

  titre('Ce qu\'il apporte à une équipe');
  atouts.forEach((a) => l.push(`- ${t(a.titre)} : ${t(a.texte)} Preuve : ${t(a.preuve)}`));

  titre('Parcours (du plus ancien au plus récent)');
  etapes.forEach((e) =>
    l.push(`- ${t(e.dates)} · ${t(e.titre)} · ${t(e.lieu)}${e.texte ? ` · ${t(e.texte)}` : ''}${e.futur ? ' (à venir)' : ''}`),
  );

  titre('Projets');
  projets.forEach((p) => {
    l.push('', `### ${t(p.titre)} — ${t(p.genre)} (${t(p.periode)})`);
    l.push(`- Cadre : ${t(p.cadre)}`, `- Rôle : ${t(p.role)}`, `- Équipe : ${t(p.equipe)}`);
    if (p.distinction) l.push(`- Distinction : ${t(p.distinction)}`);
    l.push(`- Technologies : ${p.technologies.join(', ')}`);
    l.push(`- Résumé : ${p.accroche.technique.fr}`);
    if (p.besoin) l.push(`- Le besoin : ${p.besoin.technique.fr}`);
    p.realisations?.forEach((r) => l.push(`- Réalisation${p.collectif ? " (travail de l'équipe)" : ''} : ${r.technique.fr}`));
    if (p.resultat) l.push(`- Résultat : ${p.resultat.technique.fr}`);
    p.chiffres?.forEach((c) => l.push(`- Chiffre : ${c.valeur} ${t(c.libelle)}`));
    if (p.appris) l.push(`- Ce qu'il a appris : ${t(p.appris)}`);
    p.liens?.forEach((x) => l.push(`- ${x.type === 'demo' ? 'Démo en ligne' : 'Code source'} : ${x.href}`));
    if (p.note) l.push(`- Note : ${t(p.note)}`);
  });

  titre('Compétences du BUT Informatique (référentiel national)');
  competences.forEach((c) =>
    l.push(`- C${c.numero} ${t(c.intitule)} : niveau 1 validé en 1re année, niveau 2 en cours en 2e année.`),
  );

  titre('Outils et langages utilisés dans au moins un projet');
  boiteAOutils.forEach((g) => l.push(`- ${t(g.titre)} : ${g.outils.map((o) => o.nom).join(', ')}`));

  titre('Langues');
  languesParlees.forEach((x) => l.push(`- ${t(x.nom)} : ${t(x.niveau)}`));

  titre("Centres d'intérêt");
  centresInteret.forEach((c) => l.push(`- ${t(c.titre)} : ${t(c.texte)}`));

  return l
    .join('\n')
    .replace(/ /g, ' ')
    .trim();
}
