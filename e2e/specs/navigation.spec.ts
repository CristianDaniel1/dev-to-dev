import { MOBILE_TAG } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';

test.describe('Navigation', () => {
  test('the catalog links to each tech page', async ({ page, catalog }) => {
    await catalog.open();
    await catalog.techCard('JavaScript').click();

    await expect(page).toHaveURL(/\/quizzes\/javascript$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Quiz de JavaScript');
  });

  test('the header marks the current section', async ({ page, layout }) => {
    test.skip(test.info().project.name === 'mobile', 'The header links are in the menu on mobile.');
    await layout.open('/quizzes/html');

    await expect(page.getByRole('link', { name: 'Quizzes', exact: true }).first()).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test(
    'the mobile menu opens, navigates and closes',
    { tag: MOBILE_TAG },
    async ({ page, layout }) => {
      await layout.open('/');
      await layout.navigateWithMobileMenu('Recursos');

      await expect(page).toHaveURL(/\/recursos$/);
      await expect(layout.mobileMenu).toBeHidden();
      await expect(layout.mainHeading).toHaveText('Recursos');
    },
  );
});
