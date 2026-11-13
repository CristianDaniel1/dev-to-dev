import type { ResolveFn } from '@angular/router';
import { findPath } from '../lib/find-path';

/**
 * Resolves the page title of a learning path.
 *
 * @param route - Route with the `trilha` param.
 * @returns "Trilha: <name>", or a not-found title.
 */
export const pathTitleResolver: ResolveFn<string> = (route) => {
  const path = findPath(route.paramMap.get('trilha'));
  return path ? `Trilha: ${path.name}` : 'Trilha não encontrada';
};
