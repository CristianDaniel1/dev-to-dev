import type { Page } from '@playwright/test';
import { PROGRESS_STORAGE_KEY } from '../constants/e2e.constants';

/** Shape of the stored progress the tests read (a subset of the app's). */
export interface StoredProgress {
  questions: Record<string, { attempts: number; lastCorrect: boolean; box: number }>;
  sessions: { tech: string; total: number; correct: number }[];
}

/**
 * Reads the quiz progress the app saved in localStorage.
 *
 * @param page - Page with the app open.
 * @returns The stored progress, or null when nothing was saved.
 */
export const readProgress = async (page: Page): Promise<StoredProgress | null> => {
  const raw = await page.evaluate((key) => localStorage.getItem(key), PROGRESS_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as StoredProgress) : null;
};
