import { NOT_FOUND_RESPONSE_ERROR, STRING_CONCAT_QUESTION_ID } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';
import { seriousViolations } from '../helpers/accessibility';

const STATIC_PAGES = [
  '/',
  '/quizzes',
  '/quizzes/css',
  '/recursos',
  '/recursos/acessibilidade',
  '/recursos/colecoes/interface-acessivel',
  '/sobre',
];

test.describe('Accessibility', () => {
  for (const path of STATIC_PAGES) {
    test(`${path} has no serious violations`, async ({ page, layout }) => {
      await layout.open(path);
      await expect(layout.mainHeading).toBeVisible();

      expect(await seriousViolations(page)).toEqual([]);
    });
  }

  test.describe('not-found page', () => {
    test.use({ allowedConsoleErrors: NOT_FOUND_RESPONSE_ERROR });

    test('has no serious violations', async ({ page, layout }) => {
      await layout.open('/nao-existe');
      await expect(layout.mainHeading).toBeVisible();

      expect(await seriousViolations(page)).toEqual([]);
    });
  });

  test('a revealed answer in dark mode has no serious violations', async ({ page, session }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await session.open('javascript', `ids=${STRING_CONCAT_QUESTION_ID}`);
    await session.answerWithKeyboard();

    expect(await seriousViolations(page)).toEqual([]);
  });
});
