import type { AnswerRecord } from '../interfaces/scoring.interface';
import type { SessionItem } from '../interfaces/session.interface';
import { makeQuestion } from '../testing/question.factory';
import { correctOptions, feedbackGroups, pickedOptions } from './answer-options';

const QUESTION = makeQuestion({ correct: ['b'] });
const ITEM: SessionItem = { question: QUESTION, options: [...QUESTION.options].reverse() };
const ANSWER: AnswerRecord = {
  questionId: QUESTION.id,
  selected: ['a'],
  correct: false,
  confidence: 'sure',
};

const ids = (options: { id: string }[]) => options.map((option) => option.id);

describe('answer options', () => {
  it('keeps the display order', () => {
    expect(ids(correctOptions(ITEM))).toEqual(['b']);
    expect(ids(pickedOptions(ITEM, ANSWER))).toEqual(['a']);
    expect(pickedOptions(ITEM, undefined)).toEqual([]);
  });

  it('splits wrong picks, correct options and the rest', () => {
    const groups = feedbackGroups(ITEM, ANSWER);
    expect(ids(groups.wrongPicks)).toEqual(['a']);
    expect(ids(groups.correct)).toEqual(['b']);
    expect(ids(groups.others)).toEqual(['c']);
  });
});
