import type { Resource, ResourceCollection } from '@/shared/interfaces/resource.interface';
import type { CollectionEntry } from '../interfaces/collection-entry.interface';

/**
 * Resolves the resources of a collection, in the collection order. The build guarantees every
 * id exists; unknown ids are skipped anyway.
 *
 * @param collection - Collection with resource ids.
 * @param resources - Every resource.
 * @returns The entries with their resources.
 */
export const collectionEntries = (
  collection: ResourceCollection,
  resources: readonly Resource[],
): CollectionEntry[] => {
  const byId = new Map(resources.map((resource) => [resource.id, resource]));
  return collection.items.flatMap((item) => {
    const resource = byId.get(item.resourceId);
    return resource ? [{ resource, note: item.note }] : [];
  });
};
