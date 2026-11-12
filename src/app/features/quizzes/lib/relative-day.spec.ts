import { DAY_MS } from '@/core/constants/progress.constants';
import { relativeDay } from './relative-day';

describe('relativeDay', () => {
  const now = new Date(2026, 10, 12, 10).getTime();

  it('counts calendar days', () => {
    expect(relativeDay(now + 60_000, now)).toBe('hoje');
    expect(relativeDay(now + DAY_MS, now)).toBe('amanhã');
    expect(relativeDay(now + 3 * DAY_MS, now)).toBe('em 3 dias');
  });
});
