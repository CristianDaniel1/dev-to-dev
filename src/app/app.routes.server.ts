import { RenderMode, type ServerRoute } from '@angular/ssr';
import { termPrerenderParams } from '@/features/glossary';
import { pathPrerenderParams } from '@/features/paths';
import { categoryPrerenderParams, collectionPrerenderParams } from '@/features/resources';
import { techPrerenderParams } from '@/shared/lib/tech-prerender-params';

/**
 * Every route is prerendered at build time (static output for Vercel). Parameterized routes
 * list their params from the generated content catalog.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'quizzes/:tech',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: techPrerenderParams,
  },
  {
    path: 'quizzes/:tech/praticar',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: techPrerenderParams,
  },
  {
    path: 'quizzes/:tech/simulado',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: techPrerenderParams,
  },
  {
    path: 'recursos/colecoes/:colecao',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: collectionPrerenderParams,
  },
  {
    path: 'recursos/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: categoryPrerenderParams,
  },
  {
    path: 'trilhas/:trilha',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: pathPrerenderParams,
  },
  {
    path: 'glossario/:termo',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: termPrerenderParams,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
