import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoQuestionCard } from './demo-question/demo-question';

interface Step {
  title: string;
  description: string;
}

/** Practice mode steps, in order. */
const STEPS: readonly Step[] = [
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

/** Technologies planned for launch. */
const LAUNCH_TECHS: readonly string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Angular',
  'Git',
  'SQL',
];

/** Initial resource hub categories. */
const RESOURCE_CATEGORIES: readonly string[] = [
  'Documentações oficiais',
  'Cursos e plataformas',
  'Ferramentas de dev',
  'Design e UI',
  'Deploy e hospedagem',
  'IA para devs',
];

@Component({
  selector: 'app-home',
  imports: [RouterLink, DemoQuestionCard],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly steps = STEPS;
  protected readonly techs = LAUNCH_TECHS;
  protected readonly categories = RESOURCE_CATEGORIES;
}
