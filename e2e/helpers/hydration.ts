import { expect, type Page } from '@playwright/test';

/**
 * Waits until Angular has hydrated the prerendered page. The theme toggle only gets
 * `aria-pressed` after hydration, so it is a reliable signal.
 *
 * @param page - Page with the app open.
 */
export const waitForHydration = async (page: Page): Promise<void> => {
  await expect(page.getByRole('button', { name: 'Tema escuro' })).toHaveAttribute(
    'aria-pressed',
    /^(true|false)$/,
  );
};
