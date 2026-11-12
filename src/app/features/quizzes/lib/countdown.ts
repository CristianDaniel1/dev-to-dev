/**
 * Formats a duration as a countdown, rounding up so it shows 0:00 only when time is over.
 *
 * @param milliseconds - Remaining time.
 * @returns "m:ss", e.g. "9:05".
 */
export const formatCountdown = (milliseconds: number): string => {
  const totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Picks the announcement for the last minutes of an exam.
 *
 * @param milliseconds - Remaining time.
 * @returns A pt-BR warning, or an empty string when there is plenty of time.
 */
export const timerWarning = (milliseconds: number): string => {
  if (milliseconds <= 0) return 'O tempo acabou.';
  if (milliseconds <= 60_000) return 'Falta 1 minuto.';
  if (milliseconds <= 300_000) return 'Faltam 5 minutos.';
  return '';
};
