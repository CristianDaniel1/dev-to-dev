const FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Formats when a session finished.
 *
 * @param time - Time in milliseconds.
 * @returns A short pt-BR date and time, e.g. "12 de nov., 14:30".
 */
export const formatSessionDate = (time: number): string => FORMATTER.format(time);

/**
 * Formats a time for the `datetime` attribute.
 *
 * @param time - Time in milliseconds.
 * @returns An ISO 8601 string.
 */
export const toIsoDate = (time: number): string => new Date(time).toISOString();
