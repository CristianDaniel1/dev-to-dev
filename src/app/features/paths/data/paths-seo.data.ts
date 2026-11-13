import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { LEARNING_PATHS } from '@/shared/generated/paths';
import { pathsJsonLd } from '../lib/path-json-ld';

/** SEO data of the learning paths index. */
export const PATHS_SEO: RouteSeo = {
  description:
    'Trilhas de estudo em etapas: cada uma junta um tópico de quiz para praticar, termos do glossário e materiais para estudar.',
  jsonLd: pathsJsonLd(LEARNING_PATHS),
};
