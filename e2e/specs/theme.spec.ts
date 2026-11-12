import { THEME_STORAGE_KEY } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';

test.describe('Theme', () => {
  test('follows the system preference on the first visit', async ({ page, layout }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await layout.open('/');

    await expect(layout.html).toHaveAttribute('data-theme', 'dark');
  });

  test('switches to dark and keeps it after reloading', async ({ page, layout }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await layout.open('/');
    await expect(layout.html).toHaveAttribute('data-theme', 'light');

    await layout.themeToggle.click();
    await expect(layout.html).toHaveAttribute('data-theme', 'dark');
    await expect(layout.themeToggle).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(layout.html).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY)).toBe('dark');
  });
});
