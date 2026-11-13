import type { PracticeStep } from '../interfaces/practice-step.interface';

/** Practice mode steps, printed as the instructions at the foot of the hero sheet. */
export const PRACTICE_STEPS: readonly PracticeStep[] = [
  { title: 'Responda', hint: 'sem cronômetro' },
  { title: 'Entenda', hint: 'cada alternativa' },
  { title: 'Revise', hint: 'o que errou' },
];

/** Audience written in the "Turma" field of the hero sheet. */
export const HERO_SHEET_CLASS = 'Quem programa';

/** Passing grade written in the hero sheet: there is none. */
export const HERO_SHEET_PASSING_GRADE = 'Nenhuma. É para aprender.';

/** Technologies being written, listed after the published ones. */
export const UPCOMING_TECHS: readonly string[] = [];

/** How many resource categories the home page lists. */
export const HOME_CATEGORY_COUNT = 6;
