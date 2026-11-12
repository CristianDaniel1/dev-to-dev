/** One choice of a filter control; a `null` value means "any". */
export interface FilterOption<T extends string> {
  value: T | null;
  label: string;
}
