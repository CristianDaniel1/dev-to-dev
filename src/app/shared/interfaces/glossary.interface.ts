import type { CodeSnippet, ReadingLink } from './content.interface';

/** A glossary term mentioned by another term. */
export interface RelatedTerm {
  slug: string;
  term: string;
}

/** A quiz topic where a term is practiced. */
export interface PracticeTopic {
  techSlug: string;
  techName: string;
  topicSlug: string;
  topicName: string;
}

export interface GlossaryTerm {
  /** Stable id, used in the URL. */
  slug: string;
  term: string;
  /** Other names the term is known by; searched but not shown as headings. */
  aka: string[];
  /** Slug of the group: a tech slug or `geral`. */
  group: string;
  /** One-sentence definition. */
  shortHtml: string;
  /** The definition as plain text, for meta descriptions and search. */
  shortText: string;
  /** Explanation paragraphs. */
  bodyHtml: string[];
  code?: CodeSnippet;
  related: RelatedTerm[];
  practice: PracticeTopic[];
  /** Resources from the hub to study the term. */
  resources: ReadingLink[];
}

/** A group of terms, shown as a filter on the glossary page. */
export interface GlossaryGroup {
  slug: string;
  name: string;
  termCount: number;
}

export interface Glossary {
  groups: GlossaryGroup[];
  /** Every term, in alphabetical order. */
  terms: GlossaryTerm[];
}
