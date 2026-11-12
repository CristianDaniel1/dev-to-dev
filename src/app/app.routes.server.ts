import { RenderMode, type ServerRoute } from '@angular/ssr';
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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
