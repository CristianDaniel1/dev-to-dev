import type { RouteSeo } from '@/core/interfaces/route-seo.interface';

/** SEO data of the quiz catalog page. */
export const QUIZ_CATALOG_SEO: RouteSeo = {
  description:
    'Quizzes comentados de HTML, CSS, JavaScript, React e mais, com explicação para cada alternativa e revisão do que você errou.',
};

/** SEO data of practice sessions, which are app screens and stay out of search results. */
export const QUIZ_SESSION_SEO: RouteSeo = { noIndex: true };

/** SEO data of the spaced review page. */
export const REVIEW_SEO: RouteSeo = {
  description:
    'Revisão espaçada das perguntas que você errou ou acertou no chute, no dia certo para fixar.',
};

/** SEO data of the random mode setup. */
export const RANDOM_SEO: RouteSeo = {
  description:
    'Rodadas com perguntas de várias tecnologias misturadas, no nível que você escolher.',
};
