import { TEXT } from '@/core/i18n/pt-br';

export interface NavLink {
  path: string;
  label: string;
}

/** Main navigation links, in display order. */
export const NAV_LINKS: readonly NavLink[] = [
  { path: '/quizzes', label: TEXT.nav.quizzes },
  { path: '/recursos', label: TEXT.nav.resources },
  { path: '/sobre', label: TEXT.nav.about },
];
