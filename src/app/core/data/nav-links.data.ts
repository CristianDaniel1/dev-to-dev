import type { NavLink } from '../interfaces/nav-link.interface';
import { UI_TEXT } from './ui-text.data';

/** Header navigation links, in display order. */
export const NAV_LINKS: readonly NavLink[] = [
  { path: '/quizzes', label: UI_TEXT.nav.quizzes },
  { path: '/trilhas', label: UI_TEXT.nav.paths },
  { path: '/glossario', label: UI_TEXT.nav.glossary },
  { path: '/recursos', label: UI_TEXT.nav.resources },
  { path: '/progresso', label: UI_TEXT.nav.progress },
];

/** Every page link, for the mobile menu and the footer, which have room for the about page. */
export const SITE_LINKS: readonly NavLink[] = [
  ...NAV_LINKS,
  { path: '/sobre', label: UI_TEXT.nav.about },
];
