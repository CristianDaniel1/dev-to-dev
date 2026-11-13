import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import { termNeighbors } from './term-neighbors';

const TERMS = ['api', 'aria', 'branch'].map((slug) => ({ slug, term: slug }) as GlossaryTerm);

describe('termNeighbors', () => {
  it('returns the terms around the current one', () => {
    const { previous, next } = termNeighbors(TERMS, 'aria');

    expect(previous?.slug).toBe('api');
    expect(next?.slug).toBe('branch');
  });

  it('has no previous term for the first one and nothing for an unknown slug', () => {
    expect(termNeighbors(TERMS, 'api').previous).toBeUndefined();
    expect(termNeighbors(TERMS, 'nada')).toEqual({});
  });
});
