import { SITE_LANGUAGE } from '@/core/constants/site.constants';
import type { JsonLdNode } from '@/core/interfaces/json-ld.interface';
import { breadcrumbJsonLd } from '@/core/lib/json-ld';
import { toAbsoluteUrl } from '@/core/lib/seo-url';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { QUIZ_BREADCRUMB } from '../data/quiz-breadcrumb.data';

/**
 * Describes a tech page as a free quiz about that tech, plus its breadcrumb trail.
 *
 * @param tech - Tech of the page.
 * @param description - Page description, reused in the quiz node.
 * @returns The page's structured data nodes.
 */
export const techJsonLd = (tech: TechSummary, description: string): readonly JsonLdNode[] => {
  const path = `/quizzes/${tech.slug}`;
  return [
    {
      '@type': 'Quiz',
      name: `Quiz de ${tech.name}`,
      description,
      url: toAbsoluteUrl(path),
      inLanguage: SITE_LANGUAGE,
      isAccessibleForFree: true,
      about: { '@type': 'Thing', name: tech.name },
    },
    breadcrumbJsonLd(QUIZ_BREADCRUMB, tech.name, path),
  ];
};
