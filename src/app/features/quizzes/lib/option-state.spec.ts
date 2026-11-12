import type { AnswerRecord } from '../interfaces/scoring.interface';
import { makeQuestion } from '../testing/question.factory';
import { optionStateFor } from './option-state';

const QUESTION = makeQuestion({ kind: 'multiple', correct: ['a', 'b'] });
const optionById = (id: string) => {
  const option = QUESTION.options.find((candidate) => candidate.id === id);
  if (!option) throw new Error(`Missing option ${id}`);
  return option;
};
const OPTION_A = optionById('a');
const OPTION_B = optionById('b');
const OPTION_C = optionById('c');

describe('optionStateFor', () => {
  it('shows only the selection while answering', () => {
    expect(optionStateFor(QUESTION, OPTION_A, ['a'], null)).toBe('selected');
    expect(optionStateFor(QUESTION, OPTION_B, ['a'], null)).toBe('idle');
  });

  it('marks right, missed, wrong and untouched options after the answer', () => {
    const answer: AnswerRecord = {
      questionId: QUESTION.id,
      selected: ['a', 'c'],
      correct: false,
      confidence: 'sure',
    };
    expect(optionStateFor(QUESTION, OPTION_A, [], answer)).toBe('correct');
    expect(optionStateFor(QUESTION, OPTION_B, [], answer)).toBe('missed');
    expect(optionStateFor(QUESTION, OPTION_C, [], answer)).toBe('wrong');
  });

  it('dims wrong options the user did not pick', () => {
    const answer: AnswerRecord = {
      questionId: QUESTION.id,
      selected: ['a', 'b'],
      correct: true,
      confidence: 'sure',
    };
    expect(optionStateFor(QUESTION, OPTION_C, [], answer)).toBe('dimmed');
  });
});
