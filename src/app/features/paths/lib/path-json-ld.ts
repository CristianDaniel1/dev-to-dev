import { SITE_LANGUAGE, SITE_NAME, SITE_URL } from '@/core/constants/site.constants';
import type { JsonLdNode } from '@/core/interfaces/json-ld.interface';
import { breadcrumbJsonLd } from '@/core/lib/json-ld';
import { toAbsoluteUrl } from '@/core/lib/seo-url';
import type { LearningPath } from '@/shared/interfaces/path.interface';
import { PATHS_BREADCRUMB } from '../data/paths-breadcrumb.data';

const pathUrl = (path: LearningPath): string => toAbsoluteUrl(`/trilhas/${path.slug}`);

/**
 * Describes the learning paths index as a list of paths.
 *
 * @param paths - Every path, in display order.
 * @returns The page's structured data nodes.
 */
export const pathsJsonLd = (paths: readonly LearningPath[]): readonly JsonLdNode[] => [
  {
    '@type': 'ItemList',
    name: 'Trilhas de estudo',
    itemListElement: paths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: path.name,
      url: pathUrl(path),
    })),
  },
];

/**
 * Describes a learning path as a free course made of its steps, plus its breadcrumb trail.
 *
 * @param path - Path of the page.
 * @returns The page's structured data nodes.
 */
export const pathJsonLd = (path: LearningPath): readonly JsonLdNode[] => [
  {
    '@type': 'Course',
    name: path.name,
    description: path.description,
    url: pathUrl(path),
    inLanguage: SITE_LANGUAGE,
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    syllabusSections: path.steps.map((step) => ({
      '@type': 'Syllabus',
      name: step.title,
      description: step.description,
    })),
  },
  breadcrumbJsonLd(PATHS_BREADCRUMB, path.name, `/trilhas/${path.slug}`),
];
