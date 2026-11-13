import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';

/** Terms that start with the same letter. */
export interface LetterSection {
  letter: string;
  terms: GlossaryTerm[];
}
