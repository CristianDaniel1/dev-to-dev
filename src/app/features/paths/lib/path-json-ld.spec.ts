import { SITE_URL } from '@/core/constants/site.constants';
import type { LearningPath } from '@/shared/interfaces/path.interface';
import { pathJsonLd, pathsJsonLd } from './path-json-ld';

const PATH = {
  slug: 'git-do-zero',
  name: 'Git do zero',
  description: 'Do primeiro commit ao pull request.',
  steps: [{ title: 'Primeiros commits', description: 'Staging area e commits.' }],
} as LearningPath;

describe('pathJsonLd', () => {
  it('describes the path as a free course with one syllabus section per step', () => {
    const [course, breadcrumb] = pathJsonLd(PATH);

    expect(course).toMatchObject({
      '@type': 'Course',
      name: 'Git do zero',
      url: `${SITE_URL}/trilhas/git-do-zero`,
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', url: SITE_URL },
      syllabusSections: [{ '@type': 'Syllabus', name: 'Primeiros commits' }],
    });
    expect(breadcrumb).toMatchObject({ '@type': 'BreadcrumbList' });
  });
});

describe('pathsJsonLd', () => {
  it('lists the paths in order', () => {
    const [list] = pathsJsonLd([PATH]);

    expect(list).toMatchObject({
      '@type': 'ItemList',
      itemListElement: [
        { position: 1, name: 'Git do zero', url: `${SITE_URL}/trilhas/git-do-zero` },
      ],
    });
  });
});
