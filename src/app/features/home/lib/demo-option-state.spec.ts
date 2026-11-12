import { demoOptionState } from './demo-option-state';

describe('demoOptionState', () => {
  it('is idle before answering', () => {
    expect(demoOptionState('a', 'b', null)).toBe('idle');
  });

  it('marks the right option, the wrong pick and dims the rest', () => {
    expect(demoOptionState('b', 'b', 'a')).toBe('correct');
    expect(demoOptionState('a', 'b', 'a')).toBe('wrong');
    expect(demoOptionState('c', 'b', 'a')).toBe('dimmed');
  });
});
