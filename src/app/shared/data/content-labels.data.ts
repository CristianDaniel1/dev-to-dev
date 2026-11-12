import type { Area, Level } from '../interfaces/content.interface';

/** pt-BR label of each difficulty level. */
export const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

/** URL query value of each level (user-facing, so in pt-BR). */
export const LEVEL_PARAMS: Record<Level, string> = {
  beginner: 'iniciante',
  intermediate: 'intermediario',
  advanced: 'avancado',
};

/** pt-BR heading of each catalog area. */
export const AREA_LABELS: Record<Area, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Bancos de dados',
  engineering: 'Engenharia de software',
};
