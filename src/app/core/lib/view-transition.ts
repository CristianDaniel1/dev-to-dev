import type { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';
import { deepestChild } from './seo-url';

const pagePath = (route: ActivatedRouteSnapshot): string =>
  deepestChild(route)
    .pathFromRoot.flatMap((snapshot) => snapshot.url.map((segment) => segment.path))
    .join('/');

/**
 * Skips the route view transition when only the query string changes, such as when a filter
 * is applied, so the page does not cross-fade on every click.
 *
 * @param info - View transition created by the router.
 */
export const skipSamePageTransition = ({ transition, from, to }: ViewTransitionInfo): void => {
  if (pagePath(from) === pagePath(to)) transition.skipTransition();
};
