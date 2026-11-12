/** What a search entry points to; also its order of importance in results. */
export type SearchKind =
  'page' | 'tech' | 'topic' | 'category' | 'collection' | 'resource' | 'question';

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  /** Short context, e.g. the tech of a topic or the domain of a resource. */
  subtitle: string;
  /** App route, or an absolute URL when `external` is true. */
  link: string;
  queryParams?: Record<string, string>;
  /** Opens outside the app, in a new tab. */
  external?: boolean;
  /** Normalized title, used to rank title matches higher. */
  titleTerms: string;
  /** Normalized text searched by the palette (title, subtitle and keywords). */
  terms: string;
}
