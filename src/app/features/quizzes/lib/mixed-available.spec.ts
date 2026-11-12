import { makeTech, makeTopic } from '../testing/tech.factory';
import { countMixedAvailable } from './mixed-available';

describe('countMixedAvailable', () => {
  const html = makeTech([makeTopic('a', { beginner: 2, intermediate: 1, advanced: 0 })]);
  const css = makeTech([makeTopic('b', { beginner: 1, intermediate: 0, advanced: 4 })]);

  it('adds up every level or one level', () => {
    expect(countMixedAvailable([html, css], null)).toBe(8);
    expect(countMixedAvailable([html, css], 'beginner')).toBe(3);
  });
});
