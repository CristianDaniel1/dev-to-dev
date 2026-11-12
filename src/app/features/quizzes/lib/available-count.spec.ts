import { makeTech, makeTopic } from '../testing/tech.factory';
import { countAvailable } from './available-count';

const TECH = makeTech([
  makeTopic('fundamentos', { beginner: 3, intermediate: 2, advanced: 1 }),
  makeTopic('semantica', { beginner: 1, intermediate: 1, advanced: 0 }),
]);

describe('countAvailable', () => {
  it('counts every question without filters', () => {
    expect(countAvailable(TECH, [], null)).toBe(8);
  });

  it('narrows by topic and level', () => {
    expect(countAvailable(TECH, ['semantica'], null)).toBe(2);
    expect(countAvailable(TECH, [], 'beginner')).toBe(4);
    expect(countAvailable(TECH, ['fundamentos'], 'advanced')).toBe(1);
  });
});
