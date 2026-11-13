import { SITE_URL } from '@/core/constants/site.constants';
import type { Resource } from '@/shared/interfaces/resource.interface';
import { resourceListJsonLd } from './resource-list-json-ld';

const RESOURCES = [
  { name: 'MDN', url: 'https://developer.mozilla.org/' },
  { name: 'web.dev', url: 'https://web.dev/' },
] as Resource[];

const PAGE = { name: 'Documentação', description: 'Docs.', path: '/recursos/documentacao' };

describe('resourceListJsonLd', () => {
  it('lists the resources in order, linking to their own sites', () => {
    const [list] = resourceListJsonLd(PAGE, RESOURCES);

    expect(list).toMatchObject({
      '@type': 'CollectionPage',
      url: `${SITE_URL}/recursos/documentacao`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 2,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'MDN', url: 'https://developer.mozilla.org/' },
          { '@type': 'ListItem', position: 2, name: 'web.dev', url: 'https://web.dev/' },
        ],
      },
    });
  });

  it('ends the breadcrumb at the page', () => {
    const [, breadcrumb] = resourceListJsonLd(PAGE, RESOURCES);

    expect(breadcrumb).toMatchObject({
      itemListElement: [{ name: 'Recursos' }, { name: 'Documentação', position: 2 }],
    });
  });
});
