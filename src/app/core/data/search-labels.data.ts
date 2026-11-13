import type { SearchKind } from '@/shared/interfaces/search.interface';

/** Order of importance of each kind, used to break ties (lower comes first). */
export const SEARCH_KIND_RANK: Record<SearchKind, number> = {
  page: 0,
  tech: 1,
  path: 2,
  topic: 3,
  term: 4,
  category: 5,
  collection: 6,
  resource: 7,
  question: 8,
};

/** pt-BR label shown next to each result. */
export const SEARCH_KIND_LABELS: Record<SearchKind, string> = {
  page: 'Página',
  tech: 'Quiz',
  path: 'Trilha',
  topic: 'Tópico',
  term: 'Glossário',
  category: 'Categoria',
  collection: 'Coleção',
  resource: 'Recurso',
  question: 'Pergunta',
};
