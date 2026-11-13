import type { PathChecklist } from '../interfaces/path-checklist.interface';

/**
 * Checks the stored shape of the learning path checklist.
 *
 * @param value - Parsed value from storage.
 * @returns True when it maps path slugs to arrays of step ids.
 */
export const isPathChecklist = (value: unknown): value is PathChecklist =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every(
    (steps) => Array.isArray(steps) && steps.every((step) => typeof step === 'string'),
  );
