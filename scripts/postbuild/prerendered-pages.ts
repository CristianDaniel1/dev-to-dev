import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { BROWSER_DIR, NOINDEX_MARKER } from './postbuild.constants';

const findIndexFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findIndexFiles(fullPath);
      files.push(...nested);
    } else if (entry.name === 'index.html') {
      files.push(fullPath);
    }
  }
  return files;
};

const toRoutePath = (indexFile: string): string => {
  const folder = relative(BROWSER_DIR, indexFile).split(sep).slice(0, -1).join('/');
  return folder ? `/${folder}` : '/';
};

const isIndexable = async (file: string): Promise<boolean> => {
  const html = await readFile(file, 'utf8');
  return !html.includes(NOINDEX_MARKER);
};

/**
 * Lists the routes of every prerendered page that search engines may index.
 *
 * @returns Route paths such as '/' and '/quizzes/html', sorted.
 */
export const listIndexableRoutes = async (): Promise<string[]> => {
  const files = await findIndexFiles(BROWSER_DIR);
  const routes: string[] = [];
  for (const file of files) {
    const indexable = await isIndexable(file);
    if (indexable) routes.push(toRoutePath(file));
  }
  return routes.sort();
};
