import { nextListIndex } from './list-navigation';

describe('nextListIndex', () => {
  it('moves and wraps around', () => {
    expect(nextListIndex('ArrowDown', 0, 3)).toBe(1);
    expect(nextListIndex('ArrowDown', 2, 3)).toBe(0);
    expect(nextListIndex('ArrowUp', 0, 3)).toBe(2);
    expect(nextListIndex('End', 0, 3)).toBe(2);
    expect(nextListIndex('Home', 2, 3)).toBe(0);
  });

  it('ignores other keys and empty lists', () => {
    expect(nextListIndex('a', 0, 3)).toBeNull();
    expect(nextListIndex('ArrowDown', 0, 0)).toBeNull();
  });
});
