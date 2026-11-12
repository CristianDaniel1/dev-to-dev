import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = ['/', '/quizzes', '/recursos', '/sobre'];

test.describe('prerendered pages', () => {
  for (const path of PAGES) {
    test(`${path} renders content without JavaScript`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(path);

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\//);
      await context.close();
    });

    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );
      expect(serious).toEqual([]);
    });
  }

  test('unknown URL gets the 404 page', async ({ page }) => {
    const response = await page.goto('/nao-existe');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página não existe');
  });
});

test.describe('sample question', () => {
  test('shows the explanation after a wrong answer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /"null"/ }).click();

    await expect(page.getByText('Não foi dessa vez.')).toBeVisible();
    await expect(page.getByText(/bug da primeira versão do JavaScript/)).toBeVisible();

    await page.getByRole('button', { name: 'Responder de novo' }).click();
    await expect(page.getByText('Não foi dessa vez.')).toBeHidden();
  });
});

test.describe('theme', () => {
  test('switches to dark and keeps it after reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: 'Tema escuro' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('navigation', () => {
  test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Only exists on small screens.');
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.getByRole('link', { name: 'Recursos' }).click();
    await expect(page).toHaveURL(/\/recursos$/);
    await expect(dialog).toBeHidden();
  });
});
