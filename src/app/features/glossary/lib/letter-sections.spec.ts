import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import { letterAnchor, letterSections, termInitial } from './letter-sections';

const term = (name: string) => ({ slug: name, term: name }) as GlossaryTerm;

describe('termInitial', () => {
  it('ignores accents and case', () => {
    expect(termInitial('Índice')).toBe('I');
    expect(termInitial('rem')).toBe('R');
  });

  it('puts terms that start with a symbol under "#"', () => {
    expect(termInitial('===')).toBe('#');
  });
});

describe('letterSections', () => {
  it('groups consecutive terms by letter, keeping their order', () => {
    const sections = letterSections([term('API'), term('ARIA'), term('Branch'), term('Índice')]);

    expect(sections.map((section) => section.letter)).toEqual(['A', 'B', 'I']);
    expect(sections[0]?.terms.map((entry) => entry.term)).toEqual(['API', 'ARIA']);
  });
});

describe('letterAnchor', () => {
  it('builds a lowercase id, with a word for the symbol section', () => {
    expect(letterAnchor('A')).toBe('letra-a');
    expect(letterAnchor('#')).toBe('letra-outros');
  });
});
