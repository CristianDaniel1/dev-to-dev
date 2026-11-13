import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { GLOSSARY } from '@/shared/generated/glossary';
import { glossaryJsonLd } from '../lib/glossary-json-ld';

/** SEO data of the glossary index. */
export const GLOSSARY_SEO: RouteSeo = {
  description: `${GLOSSARY.terms.length} termos de desenvolvimento explicados em poucas linhas, com exemplos, links para praticar e materiais para estudar.`,
  jsonLd: glossaryJsonLd(GLOSSARY.terms),
};
