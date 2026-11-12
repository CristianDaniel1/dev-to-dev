/** A function returning a pseudo-random number in [0, 1). */
export type RandomFn = () => number;

/**
 * Creates a seeded pseudo-random generator (mulberry32), so a session can be reproduced.
 *
 * @param seed - Any 32-bit integer.
 * @returns The generator.
 */
export const createRandom = (seed: number): RandomFn => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Returns a shuffled copy of a list (Fisher–Yates). The input is not mutated.
 *
 * @param list - Items to shuffle.
 * @param random - Source of randomness; a seeded one gives reproducible results.
 * @returns A new, shuffled array.
 */
export const shuffle = <T>(list: readonly T[], random: RandomFn): T[] => {
  const result = [...list];
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = result[index] as T;
    result[index] = result[swapIndex] as T;
    result[swapIndex] = current;
  }
  return result;
};
