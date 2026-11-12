import { AREAS } from '@/shared/constants/content.constants';
import { AREA_LABELS } from '@/shared/data/content-labels.data';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import type { CatalogArea } from '../interfaces/catalog-area.interface';

/**
 * Groups techs by area, in area order, leaving out empty areas.
 *
 * @param techs - Every published tech.
 * @returns The non-empty areas.
 */
export const groupByArea = (techs: readonly TechSummary[]): CatalogArea[] =>
  AREAS.map((area) => ({
    slug: area,
    label: AREA_LABELS[area],
    techs: techs.filter((tech) => tech.area === area),
  })).filter((area) => area.techs.length);
