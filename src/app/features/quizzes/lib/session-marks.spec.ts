import type { AnswerRecord } from '../interfaces/scoring.interface';
import { makeQuestion } from '../testing/question.factory';
import { sessionMarks } from './session-marks';

const items = ['q1', 'q2', 'q3'].map((id) => {
  const question = makeQuestion({ id });
  return { question, options: question.options };
});
const answers: AnswerRecord[] = [
  { questionId: 'q1', selected: ['a'], correct: true, confidence: 'sure' },
  { questionId: 'q2', selected: ['b'], correct: false, confidence: 'sure' },
];

describe('sessionMarks', () => {
  it('reveals right and wrong in practice', () => {
    expect(sessionMarks(items, answers, 2, false)).toEqual(['correct', 'wrong', 'current']);
  });

  it('only marks answered questions in an exam', () => {
    expect(sessionMarks(items, answers.slice(0, 1), 1, true)).toEqual([
      'answered',
      'current',
      'pending',
    ]);
  });
});
