import type { JsonLdNode } from './json-ld.interface';

/** SEO data accepted in each route's `data.seo` (static or resolved). */
export interface RouteSeo {
  description?: string;
  noIndex?: boolean;
  /** Structured data written to the page as JSON-LD. */
  jsonLd?: readonly JsonLdNode[];
}
