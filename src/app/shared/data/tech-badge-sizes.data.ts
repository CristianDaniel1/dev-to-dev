import type { TechBadgeSize } from '../interfaces/tech-badge.interface';

/** Tailwind classes for each tech badge size. */
export const TECH_BADGE_SIZE_CLASSES: Record<TechBadgeSize, string> = {
  sm: 'size-8 text-[0.6875rem] rounded-md',
  md: 'size-11 text-xs rounded-control',
  lg: 'size-16 text-base rounded-card',
};
