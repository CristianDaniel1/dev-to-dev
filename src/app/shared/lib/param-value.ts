/**
 * Finds the value whose URL query value matches a param.
 *
 * @param values - Every possible value.
 * @param params - URL query value of each value.
 * @param param - Raw query value from the URL.
 * @returns The matching value, or `null` when the param is missing or unknown.
 */
export const valueFromParam = <T extends string>(
  values: readonly T[],
  params: Readonly<Record<T, string>>,
  param: string | null | undefined,
): T | null => values.find((value) => params[value] === param) ?? null;
