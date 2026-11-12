import type { SearchEntry } from '@/shared/interfaces/search.interface';
import { normalizeText } from '@/shared/lib/normalize-text';
import { SEARCH_KIND_RANK } from '../data/search-labels.data';

const scoreEntry = (entry: SearchEntry, query: string, words: readonly string[]): number => {
  if (!words.every((word) => entry.terms.includes(word))) return 0;
  const titleWords = entry.titleTerms.split(/\s+/);
  let score = 1;
  if (entry.titleTerms === query) score += 100;
  else if (entry.titleTerms.startsWith(query)) score += 50;
  for (const word of words) {
    if (titleWords.some((titleWord) => titleWord.startsWith(word))) score += 10;
    else if (entry.titleTerms.includes(word)) score += 5;
  }
  return score;
};

/**
 * Ranks the entries that contain every word of the query. Title matches weigh more, and ties
 * go to the more important kind (pages and quizzes before resources and questions).
 *
 * @param entries - Searchable entries.
 * @param rawQuery - Text typed by the user.
 * @param limit - Maximum number of results.
 * @returns The best matches, best first; empty for a blank query.
 */
export const searchEntries = (
  entries: readonly SearchEntry[],
  rawQuery: string,
  limit: number,
): SearchEntry[] => {
  const query = normalizeText(rawQuery);
  if (!query) return [];
  const words = query.split(/\s+/);
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query, words) }))
    .filter((result) => result.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        SEARCH_KIND_RANK[left.entry.kind] - SEARCH_KIND_RANK[right.entry.kind],
    )
    .slice(0, limit)
    .map((result) => result.entry);
};
