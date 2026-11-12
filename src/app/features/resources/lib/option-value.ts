import type { FilterOption } from '../interfaces/filter-option.interface';

/**
 * Maps the raw value of a `<select>` back to the option value (`''` stands for "any").
 *
 * @param options - Options of the control.
 * @param raw - `value` of the select element.
 * @returns The chosen value, or `null` for "any" and unknown values.
 */
export const optionValue = <T extends string>(
  options: readonly FilterOption<T>[],
  raw: string,
): T | null => options.find((option) => (option.value ?? '') === raw)?.value ?? null;
