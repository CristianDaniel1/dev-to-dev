import { MAX_LEITNER_BOX } from '../constants/progress.constants';
import { nextBox, nextReviewAt } from './leitner';

describe('nextBox', () => {
  it('moves a confident right answer up one box, capped at the maximum', () => {
    expect(nextBox(0, true, 'sure')).toBe(1);
    expect(nextBox(2, true, 'sure')).toBe(3);
    expect(nextBox(MAX_LEITNER_BOX, true, 'sure')).toBe(MAX_LEITNER_BOX);
  });

  it('keeps an unsure right answer in place (at least box 1)', () => {
    expect(nextBox(3, true, 'unsure')).toBe(3);
    expect(nextBox(0, true, 'unsure')).toBe(1);
  });

  it('sends wrong answers and lucky guesses back to box 1', () => {
    expect(nextBox(4, false, 'sure')).toBe(1);
    expect(nextBox(4, true, 'guess')).toBe(1);
  });
});

describe('nextReviewAt', () => {
  it('schedules by the box interval in days', () => {
    const now = Date.UTC(2026, 0, 1);
    expect(nextReviewAt(1, now) - now).toBe(24 * 60 * 60 * 1000);
    expect(nextReviewAt(3, now) - now).toBe(7 * 24 * 60 * 60 * 1000);
  });
});
