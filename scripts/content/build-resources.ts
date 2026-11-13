import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  Resource,
  ResourceCollection,
  ResourceIndex,
  ResourceLibrary,
} from '../../src/app/shared/interfaces/resource.interface';
import { CATEGORIES_FILE, COLLECTIONS_FILE, RESOURCE_CONTENT_DIR } from './content.constants';
import { readFaviconFiles } from './favicon-files';
import { readYaml } from './read-yaml';
import {
  categoriesFileSchema,
  collectionsFileSchema,
  resourceFileSchema,
  type AuthoredResource,
} from './resource-schema';
import { assertCategoryFiles, assertCollections, assertUniqueResource } from './validate-resources';

/** The resource hub after validation: the small index and the full library. */
export interface BuiltResources {
  index: ResourceIndex;
  library: ResourceLibrary;
}

const toResource = (
  authored: AuthoredResource,
  category: string,
  favicons: ReadonlyMap<string, string>,
): Resource => {
  const domain = new URL(authored.url).hostname.replace(/^www\./, '');
  const favicon = favicons.get(domain);
  return { ...authored, domain, category, ...(favicon ? { favicon } : {}) };
};

const listCategoryFiles = async (): Promise<string[]> => {
  const files = await readdir(RESOURCE_CONTENT_DIR);
  return files.filter(
    (file) => file.endsWith('.yaml') && file !== CATEGORIES_FILE && file !== COLLECTIONS_FILE,
  );
};

/**
 * Reads, validates and converts the categories, resources and collections.
 *
 * @returns The built resource hub.
 */
export const buildResources = async (): Promise<BuiltResources> => {
  const { categories } = await readYaml(
    join(RESOURCE_CONTENT_DIR, CATEGORIES_FILE),
    categoriesFileSchema,
  );
  assertCategoryFiles(RESOURCE_CONTENT_DIR, categories, await listCategoryFiles());

  const favicons = await readFaviconFiles();
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();
  const resources: Resource[] = [];
  const counts = new Map<string, number>();
  for (const category of categories) {
    const file = join(RESOURCE_CONTENT_DIR, `${category.slug}.yaml`);
    const content = await readYaml(file, resourceFileSchema);
    for (const authored of content.resources) {
      assertUniqueResource(file, authored, seenIds, seenUrls);
      resources.push(toResource(authored, category.slug, favicons));
    }
    counts.set(category.slug, content.resources.length);
  }

  const collectionsFile = join(RESOURCE_CONTENT_DIR, COLLECTIONS_FILE);
  const authoredCollections = (await readYaml(collectionsFile, collectionsFileSchema)).collections;
  assertCollections(collectionsFile, authoredCollections, seenIds);
  const collections: ResourceCollection[] = authoredCollections.map((collection) => ({
    slug: collection.slug,
    name: collection.name,
    description: collection.description,
    items: collection.items.map((item) => ({ resourceId: item.resource, note: item.note })),
  }));

  return {
    index: {
      categories: categories.map((category) => ({
        ...category,
        resourceCount: counts.get(category.slug) ?? 0,
      })),
      collections: collections.map(({ items, ...summary }) => ({
        ...summary,
        itemCount: items.length,
      })),
    },
    library: { resources, collections },
  };
};
