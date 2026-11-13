import type { TechBadgeSize } from '../interfaces/tech-badge.interface';

/** Tailwind classes for each tech badge size (fixed widths keep names aligned in lists). */
export const TECH_BADGE_SIZE_CLASSES: Record<TechBadgeSize, string> = {
  sm: 'h-7 w-11 text-[0.6875rem]',
  md: 'h-9 w-14 text-xs',
  lg: 'h-14 w-24 text-lg',
};
