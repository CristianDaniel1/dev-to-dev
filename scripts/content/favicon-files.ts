import { readdir } from 'node:fs/promises';
import { extname } from 'node:path';
import { FAVICON_DIR, FAVICON_PUBLIC_PATH } from './content.constants';

/**
 * Lists the downloaded favicons by domain.
 *
 * @returns Public path of each domain's icon, e.g. 'react.dev' → '/favicons/react.dev.png'.
 */
export const readFaviconFiles = async (): Promise<Map<string, string>> => {
  const files = await readdir(FAVICON_DIR).catch(() => []);
  return new Map(
    files.map((file) => [file.slice(0, -extname(file).length), `${FAVICON_PUBLIC_PATH}${file}`]),
  );
};
