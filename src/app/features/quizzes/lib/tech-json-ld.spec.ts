import { SITE_URL } from '@/core/constants/site.constants';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { techJsonLd } from './tech-json-ld';

const TECH = { slug: 'css', name: 'CSS' } as TechSummary;

describe('techJsonLd', () => {
  it('describes the page as a quiz about the tech, followed by the breadcrumb', () => {
    const [quiz, breadcrumb] = techJsonLd(TECH, '31 perguntas de CSS.');

    expect(quiz).toMatchObject({
      '@type': 'Quiz',
      name: 'Quiz de CSS',
      description: '31 perguntas de CSS.',
      url: `${SITE_URL}/quizzes/css`,
      about: { '@type': 'Thing', name: 'CSS' },
    });
    expect(breadcrumb).toMatchObject({ '@type': 'BreadcrumbList' });
  });
});
