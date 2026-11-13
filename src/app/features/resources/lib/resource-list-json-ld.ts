import { SITE_LANGUAGE } from '@/core/constants/site.constants';
import type { JsonLdNode } from '@/core/interfaces/json-ld.interface';
import { breadcrumbJsonLd } from '@/core/lib/json-ld';
import { toAbsoluteUrl } from '@/core/lib/seo-url';
import type { Resource } from '@/shared/interfaces/resource.interface';
import { RESOURCE_BREADCRUMB } from '../data/resource-breadcrumb.data';
import type { ListingPage } from '../interfaces/listing-page.interface';

/**
 * Describes a category or collection page as a list of the resources it recommends, plus its
 * breadcrumb trail.
 *
 * @param page - Name, description and path of the page.
 * @param resources - Resources in the order the page shows them.
 * @returns The page's structured data nodes.
 */
export const resourceListJsonLd = (
  page: ListingPage,
  resources: readonly Resource[],
): readonly JsonLdNode[] => [
  {
    '@type': 'CollectionPage',
    name: page.name,
    description: page.description,
    url: toAbsoluteUrl(page.path),
    inLanguage: SITE_LANGUAGE,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: resources.length,
      itemListElement: resources.map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: resource.name,
        url: resource.url,
      })),
    },
  },
  breadcrumbJsonLd(RESOURCE_BREADCRUMB, page.name, page.path),
];
