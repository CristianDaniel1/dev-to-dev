import type { PracticeStep } from '../interfaces/practice-step.interface';

/** Practice mode steps, in the order they happen. */
export const PRACTICE_STEPS: readonly PracticeStep[] = [
  {
    title: 'Responda',
    description: 'Sem cronômetro no modo prática. Escolha tecnologia, tópico e nível.',
  },
  {
    title: 'Entenda',
    description:
      'Cada alternativa tem explicação, inclusive as erradas, e o resultado sai por tópico.',
  },
  {
    title: 'Revise',
    description: 'O que você errou ou acertou no chute volta para revisão nos dias seguintes.',
  },
];

/** Technologies being written, listed after the published ones. */
export const UPCOMING_TECHS: readonly string[] = ['Git', 'SQL'];

/** How many resource categories the home page lists. */
export const HOME_CATEGORY_COUNT = 6;
