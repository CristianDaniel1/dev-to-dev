import type { FilterOption } from '../interfaces/filter-option.interface';

/**
 * Builds the choices of a filter: "Todos" first, then only the values that some resource has,
 * in the canonical order.
 *
 * @param values - Every possible value, in display order.
 * @param present - Values found in the listed resources.
 * @param labels - Label of each value.
 * @returns The choices of the control.
 */
export const filterOptions = <T extends string>(
  values: readonly T[],
  present: Iterable<T>,
  labels: Readonly<Record<T, string>>,
): FilterOption<T>[] => {
  const found = new Set(present);
  return [
    { value: null, label: 'Todos' },
    ...values.filter((value) => found.has(value)).map((value) => ({ value, label: labels[value] })),
  ];
};
