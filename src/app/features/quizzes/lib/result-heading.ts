import { RESULT_BANDS } from '../data/session-choices.data';

/**
 * Picks the results headline for a score.
 *
 * @param percentage - Score from 0 to 100.
 * @returns The headline of the highest band reached.
 */
export const resultHeadingFor = (percentage: number): string =>
  RESULT_BANDS.find((band) => percentage >= band.minPercentage)?.heading ?? '';
