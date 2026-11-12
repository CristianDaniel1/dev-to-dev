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
      'Cada alternativa tem explicação, inclusive as erradas, com links para se aprofundar.',
  },
  {
    title: 'Revise',
    description: 'O que você errou ou acertou no chute volta para revisão nos dias seguintes.',
  },
];

/** Technologies planned for launch, shown on the home page. */
export const LAUNCH_TECHS: readonly string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Angular',
  'Git',
  'SQL',
];

/** Initial resource hub categories, shown on the home page. */
export const RESOURCE_CATEGORIES: readonly string[] = [
  'Documentações oficiais',
  'Cursos e plataformas',
  'Ferramentas de dev',
  'Design e UI',
  'Deploy e hospedagem',
  'IA para devs',
];
