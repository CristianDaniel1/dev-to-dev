import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { findPath } from '../lib/find-path';
import { pathJsonLd } from '../lib/path-json-ld';

/**
 * Resolves the SEO data of a learning path.
 *
 * @param route - Route with the `trilha` param.
 * @returns The path description and its structured data, or `noIndex` for unknown paths.
 */
export const pathSeoResolver: ResolveFn<RouteSeo> = (route) => {
  const path = findPath(route.paramMap.get('trilha'));
  return path
    ? { description: `${path.description} ${path.steps.length} etapas.`, jsonLd: pathJsonLd(path) }
    : { noIndex: true };
};
