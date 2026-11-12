import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import type { ZodType } from 'zod';
import { ContentError, schemaError } from './content-error';

/**
 * Reads a YAML file and validates it against a schema.
 *
 * @param file - Path of the YAML file.
 * @param schema - Zod schema of the expected content.
 * @returns The parsed and validated content.
 */
export const readYaml = async <T>(file: string, schema: ZodType<T>): Promise<T> => {
  let raw: unknown;
  try {
    const text = await readFile(file, 'utf8');
    raw = parse(text);
  } catch (error) {
    throw new ContentError(`${file}: invalid YAML (${(error as Error).message})`);
  }
  const result = schema.safeParse(raw);
  if (!result.success) throw schemaError(file, result.error);
  return result.data;
};
