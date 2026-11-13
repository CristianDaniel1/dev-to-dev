const GRADE_FORMAT = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * Converts a score into a grade from 0 to 10, as in Brazilian schools.
 *
 * @param correct - Right answers.
 * @param total - Questions in the session.
 * @returns The grade with one decimal, e.g. "7,5".
 */
export const toGrade = (correct: number, total: number): string =>
  GRADE_FORMAT.format(total ? (correct / total) * 10 : 0);
