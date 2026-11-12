import type { Level } from '@/shared/interfaces/content.interface';

/** Choices made in the random mode setup. */
export interface RandomSetup {
  techs: readonly string[];
  /** Every published tech, to leave the param out when all are chosen. */
  allTechs: readonly string[];
  level: Level | null;
  size: number | null;
  onlyUnanswered: boolean;
}

/** Query params of the random session route. */
export interface RandomQueryParams {
  techs: string | null;
  nivel: string | null;
  qtd: number | 'todas';
  novas: '1' | null;
}
