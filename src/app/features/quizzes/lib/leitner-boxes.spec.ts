import type { QuestionProgress } from '@/core/interfaces/progress.interface';
import { leitnerBoxes } from './leitner-boxes';

const inBox = (box: number) => ({ box }) as QuestionProgress;

describe('leitnerBoxes', () => {
  it('lists five boxes with intervals and counts', () => {
    const boxes = leitnerBoxes({ a: inBox(1), b: inBox(1), c: inBox(5) });
    expect(boxes.map((view) => view.days)).toEqual([1, 3, 7, 14, 30]);
    expect(boxes.map((view) => view.count)).toEqual([2, 0, 0, 0, 1]);
  });

  it('leaves the counts out when only explaining', () => {
    expect(leitnerBoxes(null).every((view) => view.count === null)).toBe(true);
  });
});
