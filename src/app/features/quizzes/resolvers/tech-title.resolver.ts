import type { ResolveFn } from '@angular/router';
import { findTech } from '@/shared/lib/find-tech';

/**
 * Resolves the page title of a tech page.
 *
 * @param route - Route with the `tech` param.
 * @returns "Quiz de <tech>", or a not-found title.
 */
export const techTitleResolver: ResolveFn<string> = (route) => {
  const tech = findTech(route.paramMap.get('tech'));
  return tech ? `Quiz de ${tech.name}` : 'Quiz não encontrado';
};
