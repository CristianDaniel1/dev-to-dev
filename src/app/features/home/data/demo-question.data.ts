import type { DemoQuestion } from '../interfaces/demo-question.interface';

/** Sample question answered right on the home page. */
export const DEMO_QUESTION: DemoQuestion = {
  tech: 'JavaScript',
  techSlug: 'javascript',
  level: 'Intermediário',
  prompt: 'O que este código imprime no console?',
  code: 'console.log(typeof null);',
  options: [
    {
      id: 'a',
      text: '"null"',
      explanation: 'Seria o mais intuitivo, mas typeof nunca devolve "null" para nenhum valor.',
    },
    {
      id: 'b',
      text: '"object"',
      explanation:
        'É um bug da primeira versão do JavaScript: null usava a mesma marcação interna dos objetos, e a correção quebraria sites existentes.',
    },
    {
      id: 'c',
      text: '"undefined"',
      explanation: '"undefined" é o resultado para variáveis sem valor atribuído, não para null.',
    },
    {
      id: 'd',
      text: 'Um TypeError',
      explanation: 'typeof não lança erro nem com variáveis que nunca foram declaradas.',
    },
  ],
  correctId: 'b',
  takeaway: 'Para saber se algo é null, compare direto: valor === null.',
};
