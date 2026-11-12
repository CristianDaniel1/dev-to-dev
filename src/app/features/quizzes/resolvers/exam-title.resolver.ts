import type { ResolveFn } from '@angular/router';
import { findTech } from '@/shared/lib/find-tech';

/**
 * Resolves the page title of an exam.
 *
 * @param route - Route with the `tech` param.
 * @returns "Simulado de <tech>", or a not-found title.
 */
export const examTitleResolver: ResolveFn<string> = (route) => {
  const tech = findTech(route.paramMap.get('tech'));
  return tech ? `Simulado de ${tech.name}` : 'Quiz não encontrado';
};
