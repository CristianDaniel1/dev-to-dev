/**
 * Writes a resource count in pt-BR.
 *
 * @param count - Number of resources.
 * @returns "Nenhum recurso", "1 recurso" or "N recursos".
 */
export const resourceCountLabel = (count: number): string => {
  if (count === 0) return 'Nenhum recurso';
  return count === 1 ? '1 recurso' : `${count} recursos`;
};
