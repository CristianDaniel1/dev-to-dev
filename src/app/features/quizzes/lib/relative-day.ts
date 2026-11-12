import { DAY_MS } from '@/core/constants/progress.constants';

/**
 * Describes when a future time happens, in days from now.
 *
 * @param time - Future time, in milliseconds.
 * @param now - Current time, in milliseconds.
 * @returns "hoje", "amanhã" or "em N dias".
 */
export const relativeDay = (time: number, now: number): string => {
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);
  const days = Math.floor((new Date(time).setHours(0, 0, 0, 0) - startOfToday) / DAY_MS);
  if (days <= 0) return 'hoje';
  return days === 1 ? 'amanhã' : `em ${days} dias`;
};
