import { CATALOG } from '../generated/catalog';
import type { TechSummary } from '../interfaces/content.interface';

/**
 * Finds a tech in the catalog.
 *
 * @param slug - Tech slug from the URL.
 * @returns The tech summary, or `undefined` when the slug is unknown.
 */
export const findTech = (slug: string | null | undefined): TechSummary | undefined =>
  CATALOG.techs.find((tech) => tech.slug === slug);
