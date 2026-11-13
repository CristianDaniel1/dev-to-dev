import type { BreadcrumbLink } from '@/shared/interfaces/breadcrumb.interface';
import { SITE_DESCRIPTION, SITE_LANGUAGE, SITE_NAME, SITE_URL } from '../constants/site.constants';
import type { JsonLdNode } from '../interfaces/json-ld.interface';
import { toAbsoluteUrl } from './seo-url';

/**
 * Describes the site itself, for the home page.
 *
 * @returns A schema.org `WebSite` node.
 */
export const websiteJsonLd = (): JsonLdNode => ({
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: SITE_LANGUAGE,
});

/**
 * Describes a page's breadcrumb trail, ending at the page itself.
 *
 * @param parents - Parent pages, from the top.
 * @param current - Name of the current page.
 * @param path - Router path of the current page.
 * @returns A schema.org `BreadcrumbList` node.
 */
export const breadcrumbJsonLd = (
  parents: readonly BreadcrumbLink[],
  current: string,
  path: string,
): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: [...parents, { label: current, link: path }].map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    item: toAbsoluteUrl(crumb.link),
  })),
});

/**
 * Serializes nodes into one JSON-LD document that is safe inside a `<script>` element.
 *
 * @param nodes - Nodes of the page.
 * @returns The JSON text, with `<` escaped so the content cannot close the script.
 */
export const serializeJsonLd = (nodes: readonly JsonLdNode[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
