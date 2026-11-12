/**
 * Parses a comma-separated list of tech slugs, keeping only the known ones in catalog order.
 *
 * @param param - `techs` query value, e.g. 'css,html'.
 * @param available - Published tech slugs, in catalog order.
 * @returns The chosen techs; every tech when none is valid.
 */
export const techListFromParam = (
  param: string | undefined,
  available: readonly string[],
): string[] => {
  const wanted = new Set(param?.split(',').map((slug) => slug.trim()));
  const chosen = available.filter((slug) => wanted.has(slug));
  return chosen.length ? chosen : [...available];
};
