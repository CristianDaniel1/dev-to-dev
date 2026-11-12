const toLinearChannel = (channel: number): number =>
  channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const relativeLuminance = (hex: string): number => {
  const [red, green, blue] = [1, 3, 5].map((start) =>
    toLinearChannel(parseInt(hex.slice(start, start + 2), 16) / 255),
  ) as [number, number, number];
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * Computes the WCAG contrast ratio between two colors.
 *
 * @param first - Hex color, e.g. '#ffffff'.
 * @param second - Hex color.
 * @returns The ratio, from 1 to 21.
 */
export const contrastRatio = (first: string, second: string): number => {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (left, right) => right - left,
  ) as [number, number];
  return (lighter + 0.05) / (darker + 0.05);
};
