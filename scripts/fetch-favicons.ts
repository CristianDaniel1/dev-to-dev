import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildResources } from './content/build-resources';
import { FAVICON_DIR } from './content/content.constants';
import { readFaviconFiles } from './content/favicon-files';
import {
  FAVICON_CONCURRENCY,
  FAVICON_MAX_BYTES,
  FAVICON_SOURCE_URLS,
} from './favicons/favicons.constants';
import { imageExtension } from './favicons/image-extension';

interface Icon {
  bytes: Uint8Array;
  extension: string;
}

const fetchIcon = async (url: string): Promise<Icon | undefined> => {
  const response = await fetch(url);
  if (!response.ok) return undefined;
  const bytes = new Uint8Array(await response.arrayBuffer());
  const extension = imageExtension(bytes);
  if (!extension || bytes.length > FAVICON_MAX_BYTES) return undefined;
  return { bytes, extension };
};

const downloadFavicon = async (domain: string): Promise<string> => {
  for (const template of FAVICON_SOURCE_URLS) {
    const icon = await fetchIcon(template.replace('{domain}', encodeURIComponent(domain)));
    if (icon) {
      await writeFile(join(FAVICON_DIR, `${domain}.${icon.extension}`), icon.bytes);
      return `saved as ${icon.extension} (${icon.bytes.length} bytes)`;
    }
  }
  return 'no icon found; the page shows the first letter of the name';
};

const downloadAll = async (domains: readonly string[]): Promise<void> => {
  const queue = [...domains];
  const worker = async (): Promise<void> => {
    for (let domain = queue.shift(); domain; domain = queue.shift()) {
      try {
        const result = await downloadFavicon(domain);
        console.log(`  ${domain}: ${result}`);
      } catch (error) {
        console.log(`  ${domain}: failed (${error instanceof Error ? error.message : error})`);
      }
    }
  };
  await Promise.all(Array.from({ length: FAVICON_CONCURRENCY }, worker));
};

const main = async (): Promise<void> => {
  const force = process.argv.includes('--force');
  if (force) await rm(FAVICON_DIR, { recursive: true, force: true });
  await mkdir(FAVICON_DIR, { recursive: true });
  const existing = await readFaviconFiles();
  const { library } = await buildResources();
  const domains = [...new Set(library.resources.map((resource) => resource.domain))].filter(
    (domain) => !existing.has(domain),
  );
  console.log(`favicons: ${domains.length} to download into ${FAVICON_DIR}`);
  await downloadAll(domains);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
