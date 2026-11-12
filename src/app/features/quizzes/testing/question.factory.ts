import type { Question } from '@/shared/interfaces/content.interface';

/**
 * Builds a minimal valid question for tests.
 *
 * @param overrides - Fields to replace.
 * @returns The question.
 */
export const makeQuestion = (overrides: Partial<Question> = {}): Question => ({
  id: 'html-fundamentos-001',
  tech: 'html',
  topic: 'fundamentos',
  level: 'beginner',
  kind: 'single',
  promptHtml: 'Prompt',
  options: [
    { id: 'a', html: 'A', explanationHtml: 'Why A' },
    { id: 'b', html: 'B', explanationHtml: 'Why B' },
    { id: 'c', html: 'C', explanationHtml: 'Why C' },
  ],
  correct: ['a'],
  explanationHtml: 'General explanation',
  tags: [],
  ...overrides,
});
