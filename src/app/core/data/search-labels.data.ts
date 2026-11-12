import type { SearchKind } from '@/shared/interfaces/search.interface';

/** Order of importance of each kind, used to break ties (lower comes first). */
export const SEARCH_KIND_RANK: Record<SearchKind, number> = {
  page: 0,
  tech: 1,
  topic: 2,
  category: 3,
  collection: 4,
  resource: 5,
  question: 6,
};

/** pt-BR label shown next to each result. */
export const SEARCH_KIND_LABELS: Record<SearchKind, string> = {
  page: 'Página',
  tech: 'Quiz',
  topic: 'Tópico',
  category: 'Categoria',
  collection: 'Coleção',
  resource: 'Recurso',
  question: 'Pergunta',
};
