import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { findTech } from '@/shared/lib/find-tech';

/**
 * Resolves the SEO data of a tech page from the catalog.
 *
 * @param route - Route with the `tech` param.
 * @returns A description listing the topics, or `noIndex` for unknown techs.
 */
export const techSeoResolver: ResolveFn<RouteSeo> = (route) => {
  const tech = findTech(route.paramMap.get('tech'));
  if (!tech) return { noIndex: true };
  const topics = tech.topics.map((topic) => topic.name.toLowerCase()).join(', ');
  return {
    description: `${tech.questionCount} perguntas comentadas de ${tech.name}, de iniciante a avançado: ${topics}.`,
  };
};
