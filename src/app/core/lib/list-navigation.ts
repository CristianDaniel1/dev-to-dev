/**
 * Moves the active item of a list in response to a navigation key, wrapping around the ends.
 *
 * @param key - Pressed key.
 * @param index - Current active index.
 * @param count - Number of items.
 * @returns The new index, or `null` when the key does not navigate.
 */
export const nextListIndex = (key: string, index: number, count: number): number | null => {
  if (!count) return null;
  switch (key) {
    case 'ArrowDown':
      return (index + 1) % count;
    case 'ArrowUp':
      return (index - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
};
