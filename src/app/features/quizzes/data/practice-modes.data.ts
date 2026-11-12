import type { PracticeMode } from '../interfaces/practice-mode.interface';

/** Modes listed under the catalog, in display order. */
export const PRACTICE_MODES: readonly PracticeMode[] = [
  {
    title: 'Revisão',
    description: 'O que você errou ou chutou volta no dia certo, até ficar na memória.',
    link: '/revisao',
  },
  {
    title: 'Aleatório',
    description: 'Perguntas de várias tecnologias misturadas, para testar o que ficou.',
    link: '/aleatorio',
  },
  {
    title: 'Seu progresso',
    description: 'Respondidas, dominadas, caixas de revisão e o histórico das sessões.',
    link: '/progresso',
  },
];
