import { NOT_FOUND_RESPONSE_ERROR, PRERENDERED_PAGES, SMOKE_TAG } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';

test.describe('Prerendered pages', { tag: SMOKE_TAG }, () => {
  test.use({ javaScriptEnabled: false });

  for (const path of PRERENDERED_PAGES) {
    test(`${path} ships its content and SEO tags without JavaScript`, async ({ page, layout }) => {
      await layout.open(path);

      await expect(layout.mainHeading).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\//);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
    });
  }

  test('a tech page is titled after the tech', async ({ page, layout }) => {
    await layout.open('/quizzes/html');

    await expect(page).toHaveTitle('Quiz de HTML | Dev to Dev');
    await expect(page.getByRole('heading', { name: 'Semântica' })).toBeVisible();
  });

  test.describe('unknown URL', () => {
    test.use({ allowedConsoleErrors: NOT_FOUND_RESPONSE_ERROR });

    test('answers 404 with the not-found page', async ({ page, layout }) => {
      const response = await page.goto('/nao-existe');

      expect(response?.status()).toBe(404);
      await expect(layout.mainHeading).toHaveText('Esta página não existe');
    });
  });
});
