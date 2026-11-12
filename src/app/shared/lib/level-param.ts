import { LEVELS } from '../constants/content.constants';
import { LEVEL_PARAMS } from '../data/content-labels.data';
import type { Level } from '../interfaces/content.interface';

/**
 * Parses a level from its URL query value.
 *
 * @param param - Query value, e.g. 'iniciante'.
 * @returns The level, or `null` for "all levels" and unknown values.
 */
export const levelFromParam = (param: string | undefined): Level | null =>
  LEVELS.find((level) => LEVEL_PARAMS[level] === param) ?? null;
