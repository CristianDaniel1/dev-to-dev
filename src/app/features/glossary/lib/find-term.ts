import { GLOSSARY } from '@/shared/generated/glossary';
import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';

/**
 * Finds a glossary term.
 *
 * @param slug - Term slug from the URL.
 * @returns The term, or `undefined` when the slug is unknown.
 */
export const findTerm = (slug: string | null | undefined): GlossaryTerm | undefined =>
  GLOSSARY.terms.find((term) => term.slug === slug);
