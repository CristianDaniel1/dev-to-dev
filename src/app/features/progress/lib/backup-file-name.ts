import { BACKUP_FILE_PREFIX } from '../constants/progress-page.constants';

/**
 * Names a backup file after the day it was made.
 *
 * @param now - Current time, in milliseconds.
 * @returns e.g. "dev-to-dev-progresso-2026-11-12.json".
 */
export const backupFileName = (now: number): string => {
  const date = new Date(now);
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
  return `${BACKUP_FILE_PREFIX}-${day}.json`;
};
