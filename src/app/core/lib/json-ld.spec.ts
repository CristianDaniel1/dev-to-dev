import { SITE_URL } from '../constants/site.constants';
import { breadcrumbJsonLd, serializeJsonLd, websiteJsonLd } from './json-ld';

describe('breadcrumbJsonLd', () => {
  it('lists the parents and then the current page, with absolute URLs', () => {
    const node = breadcrumbJsonLd([{ label: 'Quizzes', link: '/quizzes' }], 'CSS', '/quizzes/css');

    expect(node).toEqual({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Quizzes', item: `${SITE_URL}/quizzes` },
        { '@type': 'ListItem', position: 2, name: 'CSS', item: `${SITE_URL}/quizzes/css` },
      ],
    });
  });
});

describe('serializeJsonLd', () => {
  it('wraps the nodes in a schema.org graph', () => {
    const parsed: unknown = JSON.parse(serializeJsonLd([websiteJsonLd()]));

    expect(parsed).toMatchObject({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'WebSite', url: SITE_URL }],
    });
  });

  it('escapes "<" so the text cannot close the script element', () => {
    const text = serializeJsonLd([{ '@type': 'Thing', name: '</script><b>' }]);

    expect(text).not.toContain('<');
    expect(JSON.parse(text)).toMatchObject({ '@graph': [{ name: '</script><b>' }] });
  });
});
