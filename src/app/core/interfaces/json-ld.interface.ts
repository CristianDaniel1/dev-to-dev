/** One schema.org node of a page's structured data. */
export interface JsonLdNode {
  '@type': string;
  [property: string]: unknown;
}
