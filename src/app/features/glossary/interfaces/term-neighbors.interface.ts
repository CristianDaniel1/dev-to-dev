import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';

/** The terms right before and after one term, in alphabetical order. */
export interface TermNeighbors {
  previous?: GlossaryTerm;
  next?: GlossaryTerm;
}
