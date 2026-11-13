import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ContentError } from './content-error';
import { TECH_ICON_FILE } from './content.constants';

/**
 * Reads the optional icon of a tech and returns its path data.
 *
 * @param techDir - Content folder of the tech.
 * @returns The `d` attribute of the icon's single path, or `undefined` when there is no icon.
 */
export const readTechIcon = async (techDir: string): Promise<string | undefined> => {
  const file = join(techDir, TECH_ICON_FILE);
  const source = await readFile(file, 'utf8').catch(() => undefined);
  if (source === undefined) return undefined;
  if (!source.includes('viewBox="0 0 24 24"')) {
    throw new ContentError(`${file}: the viewBox must be "0 0 24 24"`);
  }
  const paths = [...source.matchAll(/<path\b[^>]*\sd="([^"]+)"/g)];
  const pathData = paths.length === 1 ? paths[0]?.[1] : undefined;
  if (!pathData)
    throw new ContentError(`${file}: the icon must have exactly one <path> with a d attribute`);
  return pathData;
};
