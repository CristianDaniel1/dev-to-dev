import { EXAM_DURATIONS } from '../constants/session.constants';

/**
 * Parses the exam duration from the URL. Only the offered durations are accepted.
 *
 * @param param - `tempo` query value, in minutes.
 * @returns The duration in minutes, or `null` for no timer.
 */
export const examMinutesFromParam = (param: string | undefined): number | null => {
  const minutes = Number(param);
  return EXAM_DURATIONS.includes(minutes) ? minutes : null;
};
