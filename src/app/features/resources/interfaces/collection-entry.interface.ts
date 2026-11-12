import type { Resource } from '@/shared/interfaces/resource.interface';

/** A collection item with its resource resolved. */
export interface CollectionEntry {
  resource: Resource;
  note: string;
}
