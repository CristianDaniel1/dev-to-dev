import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import { normalizeText } from '@/shared/lib/normalize-text';
import { GLOSSARY_SYMBOL_SECTION } from '../constants/glossary.constants';
import type { LetterSection } from '../interfaces/letter-section.interface';

/**
 * Finds the index letter of a term, ignoring accents and case.
 *
 * @param term - Term name, e.g. 'Índice'.
 * @returns The uppercase letter, e.g. 'I', or '#' when the term does not start with a letter.
 */
export const termInitial = (term: string): string => {
  const letter = normalizeText(term).charAt(0).toUpperCase();
  return /^[A-Z]$/.test(letter) ? letter : GLOSSARY_SYMBOL_SECTION;
};

/**
 * Groups terms already in alphabetical order by their first letter.
 *
 * @param terms - Terms in alphabetical order.
 * @returns One section per letter that has terms, in the order of the terms.
 */
export const letterSections = (terms: readonly GlossaryTerm[]): LetterSection[] => {
  const sections = new Map<string, GlossaryTerm[]>();
  for (const term of terms) {
    const letter = termInitial(term.term);
    sections.set(letter, [...(sections.get(letter) ?? []), term]);
  }
  return [...sections].map(([letter, sectionTerms]) => ({ letter, terms: sectionTerms }));
};

/**
 * Builds the id of a letter section, used as the URL fragment.
 *
 * @param letter - Section letter, or '#'.
 * @returns The element id, e.g. 'letra-a'.
 */
export const letterAnchor = (letter: string): string =>
  `letra-${letter === GLOSSARY_SYMBOL_SECTION ? 'outros' : letter.toLowerCase()}`;
