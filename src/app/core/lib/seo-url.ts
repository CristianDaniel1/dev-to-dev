import type { ActivatedRouteSnapshot } from '@angular/router';
import { SITE_URL } from '../constants/site.constants';

/**
 * Finds the deepest active route, where page-level data lives.
 *
 * @param route - Root route snapshot.
 * @returns The innermost child snapshot.
 */
export const deepestChild = (route: ActivatedRouteSnapshot): ActivatedRouteSnapshot => {
  let current = route;
  while (current.firstChild) current = current.firstChild;
  return current;
};

/**
 * Builds the absolute public URL of a router path, without query string or fragment.
 *
 * @param path - Router URL, e.g. '/quizzes?nivel=iniciante'.
 * @returns The absolute URL on the public site.
 */
export const toAbsoluteUrl = (path: string): string => {
  const cleanPath = path.split(/[?#]/)[0] ?? '/';
  return cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath}`;
};
