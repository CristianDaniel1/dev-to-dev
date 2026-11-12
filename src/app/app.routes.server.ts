import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Every route is prerendered at build time (static output for Vercel).
 * Parameterized routes will declare `getPrerenderParams` from the generated content.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
