import { createRandom, shuffle } from './random';

describe('createRandom', () => {
  it('produces the same sequence for the same seed', () => {
    const first = createRandom(42);
    const second = createRandom(42);
    const sequence = Array.from({ length: 5 }, () => first());

    expect(Array.from({ length: 5 }, () => second())).toEqual(sequence);
    expect(sequence.every((value) => value >= 0 && value < 1)).toBe(true);
  });

  it('produces different sequences for different seeds', () => {
    expect(createRandom(1)()).not.toBe(createRandom(2)());
  });
});

describe('shuffle', () => {
  it('keeps every item and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = shuffle(input, createRandom(7));

    expect(input).toEqual([1, 2, 3, 4, 5, 6]);
    expect([...result].sort()).toEqual(input);
  });

  it('is reproducible with the same seed', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    expect(shuffle(input, createRandom(99))).toEqual(shuffle(input, createRandom(99)));
  });
});
