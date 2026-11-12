import type { SearchEntry, SearchKind } from '@/shared/interfaces/search.interface';
import { normalizeText } from '@/shared/lib/normalize-text';
import { searchEntries } from './search';

const make = (kind: SearchKind, title: string, keywords = ''): SearchEntry => ({
  kind,
  title,
  subtitle: '',
  link: '/',
  titleTerms: normalizeText(title),
  terms: normalizeText(`${title} ${keywords}`),
});

const ENTRIES = [
  make('question', 'O que uma função declarada com async retorna?'),
  make('tech', 'Quiz de JavaScript', 'funções closures'),
  make('topic', 'Funções'),
  make('resource', 'MDN Web Docs', 'documentação javascript'),
];

describe('searchEntries', () => {
  it('requires every word and ignores accents and case', () => {
    expect(searchEntries(ENTRIES, 'FUNCOES', 10).map((entry) => entry.title)).toEqual([
      'Funções',
      'Quiz de JavaScript',
    ]);
    expect(searchEntries(ENTRIES, 'async função', 10)).toHaveLength(1);
  });

  it('ranks title prefixes first and breaks ties by kind', () => {
    const titles = searchEntries(ENTRIES, 'javascript', 10).map((entry) => entry.title);
    expect(titles).toEqual(['Quiz de JavaScript', 'MDN Web Docs']);
    expect(searchEntries(ENTRIES, 'fun', 10)[0]?.title).toBe('Funções');
  });

  it('returns nothing for a blank query and respects the limit', () => {
    expect(searchEntries(ENTRIES, '   ', 10)).toEqual([]);
    expect(searchEntries(ENTRIES, 'o', 1)).toHaveLength(1);
  });
});
