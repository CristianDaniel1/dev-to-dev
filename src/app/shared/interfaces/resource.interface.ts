import type {
  PRICINGS,
  RESOURCE_LANGUAGES,
  RESOURCE_TECHS,
  RESOURCE_TYPES,
} from '../constants/resource.constants';

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export type Pricing = (typeof PRICINGS)[number];

export type ResourceLanguage = (typeof RESOURCE_LANGUAGES)[number];

export type ResourceTech = (typeof RESOURCE_TECHS)[number];

export interface Resource {
  /** Stable id; favorites and collections reference it. */
  id: string;
  name: string;
  url: string;
  /** Host name without `www.`, shown under the name and used for the favicon. */
  domain: string;
  /** Slug of the category the resource belongs to. */
  category: string;
  /** What the resource is, in one sentence. */
  description: string;
  /** Why it is recommended, in one sentence. */
  why: string;
  type: ResourceType;
  pricing: Pricing;
  languages: ResourceLanguage[];
  techs: ResourceTech[];
  /** Highlighted first in the curated order. */
  featured: boolean;
}

export interface ResourceCategory {
  slug: string;
  name: string;
  description: string;
  resourceCount: number;
}

export interface CollectionSummary {
  slug: string;
  name: string;
  description: string;
  itemCount: number;
}

export interface CollectionItem {
  resourceId: string;
  /** Why the resource is in this collection, or how to use it there. */
  note: string;
}

export interface ResourceCollection extends Omit<CollectionSummary, 'itemCount'> {
  items: CollectionItem[];
}

/** Small index of the hub, cheap enough for any page to import. */
export interface ResourceIndex {
  categories: ResourceCategory[];
  collections: CollectionSummary[];
}

/** Every resource and collection, imported only by the pages that list them. */
export interface ResourceLibrary {
  resources: Resource[];
  collections: ResourceCollection[];
}
