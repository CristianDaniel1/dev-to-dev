import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { findTerm } from '../lib/find-term';
import { termJsonLd } from '../lib/glossary-json-ld';

/**
 * Resolves the SEO data of a glossary term.
 *
 * @param route - Route with the `termo` param.
 * @returns The short definition as description and the structured data, or `noIndex` for
 *   unknown terms.
 */
export const termSeoResolver: ResolveFn<RouteSeo> = (route) => {
  const term = findTerm(route.paramMap.get('termo'));
  return term ? { description: term.shortText, jsonLd: termJsonLd(term) } : { noIndex: true };
};
