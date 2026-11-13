import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import type { TermNeighbors } from '../interfaces/term-neighbors.interface';

/**
 * Finds the terms before and after one term, to browse the glossary in order.
 *
 * @param terms - Every term, in alphabetical order.
 * @param slug - Slug of the current term.
 * @returns The neighbors; empty when the slug is unknown.
 */
export const termNeighbors = (terms: readonly GlossaryTerm[], slug: string): TermNeighbors => {
  const index = terms.findIndex((term) => term.slug === slug);
  if (index < 0) return {};
  return { previous: terms[index - 1], next: terms[index + 1] };
};
