import type { SearchKind } from '@/shared/interfaces/search.interface';

/** Order of importance of each kind, used to break ties (lower comes first). */
export const SEARCH_KIND_RANK: Record<SearchKind, number> = {
  page: 0,
  tech: 1,
  topic: 2,
  term: 3,
  category: 4,
  collection: 5,
  resource: 6,
  question: 7,
};

/** pt-BR label shown next to each result. */
export const SEARCH_KIND_LABELS: Record<SearchKind, string> = {
  page: 'Página',
  tech: 'Quiz',
  topic: 'Tópico',
  term: 'Glossário',
  category: 'Categoria',
  collection: 'Coleção',
  resource: 'Recurso',
  question: 'Pergunta',
};
