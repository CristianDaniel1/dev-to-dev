import { ContentError } from './content-error';
import type { AuthoredCategories, AuthoredCollections, AuthoredResource } from './resource-schema';

/**
 * Checks that every category has exactly one file and that no other file exists.
 *
 * @param dir - Resource content folder.
 * @param categories - Categories declared in categories.yaml.
 * @param files - Category file names found in the folder.
 */
export const assertCategoryFiles = (
  dir: string,
  categories: AuthoredCategories['categories'],
  files: readonly string[],
): void => {
  const expected = new Set(categories.map((category) => `${category.slug}.yaml`));
  const missing = [...expected].filter((file) => !files.includes(file));
  const unknown = files.filter((file) => !expected.has(file));
  if (missing.length) throw new ContentError(`${dir}: missing ${missing.join(', ')}`);
  if (unknown.length) {
    throw new ContentError(`${dir}: ${unknown.join(', ')} not listed in categories.yaml`);
  }
};

/**
 * Checks that a resource id and URL were not used before.
 *
 * @param file - File the resource comes from.
 * @param resource - Authored resource.
 * @param seenIds - Ids used so far.
 * @param seenUrls - URLs used so far.
 */
export const assertUniqueResource = (
  file: string,
  resource: AuthoredResource,
  seenIds: Set<string>,
  seenUrls: Set<string>,
): void => {
  if (seenIds.has(resource.id)) throw new ContentError(`${file}: duplicated id ${resource.id}`);
  const url = resource.url.replace(/\/$/, '');
  if (seenUrls.has(url)) throw new ContentError(`${file}: duplicated url ${resource.url}`);
  if (new Set(resource.techs).size !== resource.techs.length) {
    throw new ContentError(`${file}: ${resource.id} repeats a tech`);
  }
  seenIds.add(resource.id);
  seenUrls.add(url);
};

/**
 * Checks that collections have unique slugs and only reference existing resources, once each.
 *
 * @param file - collections.yaml path.
 * @param collections - Authored collections.
 * @param resourceIds - Ids of every resource.
 */
export const assertCollections = (
  file: string,
  collections: AuthoredCollections['collections'],
  resourceIds: ReadonlySet<string>,
): void => {
  const slugs = new Set<string>();
  for (const collection of collections) {
    if (slugs.has(collection.slug)) {
      throw new ContentError(`${file}: duplicated collection ${collection.slug}`);
    }
    slugs.add(collection.slug);
    const items = collection.items.map((item) => item.resource);
    const unknown = items.filter((id) => !resourceIds.has(id));
    if (unknown.length) {
      throw new ContentError(`${file}: ${collection.slug} references ${unknown.join(', ')}`);
    }
    if (new Set(items).size !== items.length) {
      throw new ContentError(`${file}: ${collection.slug} repeats a resource`);
    }
  }
};
