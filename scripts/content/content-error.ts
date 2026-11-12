import type { ZodError } from 'zod';

/** Invalid authored content; the message points to the file and the problem. */
export class ContentError extends Error {}

/**
 * Builds a content error listing every schema issue of a file.
 *
 * @param file - File that failed validation.
 * @param error - Zod validation error.
 * @returns The error to throw.
 */
export const schemaError = (file: string, error: ZodError): ContentError => {
  const issues = error.issues.map(
    (issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`,
  );
  return new ContentError(`${file}\n${issues.join('\n')}`);
};
