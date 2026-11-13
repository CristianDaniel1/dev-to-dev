import { SITE_LANGUAGE } from '@/core/constants/site.constants';
import type { JsonLdNode } from '@/core/interfaces/json-ld.interface';
import { breadcrumbJsonLd } from '@/core/lib/json-ld';
import { toAbsoluteUrl } from '@/core/lib/seo-url';
import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import { GLOSSARY_SET_NAME } from '../constants/glossary.constants';
import { GLOSSARY_BREADCRUMB } from '../data/glossary-breadcrumb.data';

const GLOSSARY_PATH = '/glossario';

const termPath = (term: GlossaryTerm): string => `${GLOSSARY_PATH}/${term.slug}`;

const definedTermSet = (): JsonLdNode => ({
  '@type': 'DefinedTermSet',
  name: GLOSSARY_SET_NAME,
  url: toAbsoluteUrl(GLOSSARY_PATH),
});

/**
 * Describes the glossary index as a set of defined terms.
 *
 * @param terms - Every term.
 * @returns The page's structured data nodes.
 */
export const glossaryJsonLd = (terms: readonly GlossaryTerm[]): readonly JsonLdNode[] => [
  {
    ...definedTermSet(),
    inLanguage: SITE_LANGUAGE,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      url: toAbsoluteUrl(termPath(term)),
    })),
  },
];

/**
 * Describes a term page as a defined term of the glossary, plus its breadcrumb trail.
 *
 * @param term - Term of the page.
 * @returns The page's structured data nodes.
 */
export const termJsonLd = (term: GlossaryTerm): readonly JsonLdNode[] => [
  {
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortText,
    url: toAbsoluteUrl(termPath(term)),
    inLanguage: SITE_LANGUAGE,
    ...(term.aka.length ? { alternateName: term.aka } : {}),
    inDefinedTermSet: definedTermSet(),
  },
  breadcrumbJsonLd(GLOSSARY_BREADCRUMB, term.term, termPath(term)),
];
