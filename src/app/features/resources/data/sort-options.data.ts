import type { FilterOption } from '../interfaces/filter-option.interface';
import type { ResourceSort } from '../interfaces/resource-filters.interface';
import { SORT_LABELS } from './resource-labels.data';

/** Choices of the order control. */
export const SORT_OPTIONS: readonly FilterOption<ResourceSort>[] = [
  { value: 'curated', label: SORT_LABELS.curated },
  { value: 'name', label: SORT_LABELS.name },
];
