/**
 * Shared UI copy (navigation, theme, footer). Page-specific copy lives in its
 * feature; only reused strings belong here. A new language = another `UiText` object.
 */
export const PT_BR = {
  skipToContent: 'Pular para o conteúdo',
  nav: {
    label: 'Navegação principal',
    home: 'Início',
    quizzes: 'Quizzes',
    resources: 'Recursos',
    about: 'Sobre',
  },
  menu: {
    open: 'Abrir menu',
    close: 'Fechar menu',
  },
  theme: {
    toggle: 'Tema escuro',
  },
  footer: {
    tagline: 'Feito por devs, para devs. Conteúdo revisado e aberto a contribuições.',
  },
} as const;

export type UiText = typeof PT_BR;

/** Active UI copy. */
export const TEXT: UiText = PT_BR;
