/**
 * Reports an error from one place, so a monitoring service can be plugged in later.
 *
 * @param context - Where the error happened, e.g. 'storage: read'.
 * @param error - The caught error.
 */
export const reportError = (context: string, error: unknown): void => {
  console.error(`[d2d] ${context}`, error);
};
