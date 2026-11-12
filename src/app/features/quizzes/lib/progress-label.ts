/**
 * Converts a count into a percentage of a total, capped at 100.
 *
 * @param value - Part of the total.
 * @param total - Whole amount.
 * @returns The percentage, 0 when the total is 0.
 */
export const toPercent = (value: number, total: number): number =>
  total ? Math.min(100, (value / total) * 100) : 0;

/**
 * Describes the user's progress in words, for screen readers and the visible caption.
 *
 * @param answered - Questions answered at least once.
 * @param mastered - Questions mastered.
 * @param total - Questions available.
 * @returns A short pt-BR sentence.
 */
export const progressLabel = (answered: number, mastered: number, total: number): string =>
  answered
    ? `${mastered} dominadas, ${answered} de ${total} respondidas`
    : 'Nenhuma pergunta respondida ainda';
