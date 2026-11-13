import type { NavLink } from '../interfaces/nav-link.interface';
import { UI_TEXT } from './ui-text.data';

/** Main navigation links, in display order. */
export const NAV_LINKS: readonly NavLink[] = [
  { path: '/quizzes', label: UI_TEXT.nav.quizzes },
  { path: '/recursos', label: UI_TEXT.nav.resources },
  { path: '/glossario', label: UI_TEXT.nav.glossary },
  { path: '/progresso', label: UI_TEXT.nav.progress },
  { path: '/sobre', label: UI_TEXT.nav.about },
];
