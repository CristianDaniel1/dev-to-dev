import type { ResolveFn } from '@angular/router';
import { findTech } from '@/shared/lib/find-tech';

/**
 * Resolves the page title of a practice session.
 *
 * @param route - Route with the `tech` param.
 * @returns "Praticar <tech>", or a not-found title.
 */
export const sessionTitleResolver: ResolveFn<string> = (route) => {
  const tech = findTech(route.paramMap.get('tech'));
  return tech ? `Praticar ${tech.name}` : 'Quiz não encontrado';
};
