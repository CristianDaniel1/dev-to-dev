import type { Area, TechSummary } from '@/shared/interfaces/content.interface';

/** A catalog area with its techs. */
export interface CatalogArea {
  slug: Area;
  label: string;
  techs: TechSummary[];
}
