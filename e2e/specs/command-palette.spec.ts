import { expect, test } from '../fixtures/test';
import { seriousViolations } from '../helpers/accessibility';

test.describe('Command palette', () => {
  test('opens with the shortcut and navigates to a page with the keyboard', async ({
    page,
    palette,
  }) => {
    await palette.goto('/sobre');
    await palette.openWithShortcut();
    await expect(palette.input).toBeFocused();

    await palette.search('revisao');
    await expect(palette.options.first()).toContainText('Revisão');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/revisao$/);
    await expect(palette.dialog).toBeHidden();
  });

  test('finds a question and opens a session with it', async ({ page, palette }) => {
    await palette.goto();
    await palette.trigger.click();
    await palette.search('Promise.all');

    const question = palette.option('Promise.all([a, b, c])');
    await expect(question).toContainText('Pergunta');
    await question.click();

    await expect(page).toHaveURL(/\/quizzes\/javascript\/praticar\?ids=javascript-assincrono-003/);
  });

  test('finds a glossary term and opens its page', async ({ page, palette }) => {
    await palette.goto();
    await palette.trigger.click();
    await palette.search('fechamento');

    const term = palette.option('Closure');
    await expect(term).toContainText('Glossário');
    await term.click();

    await expect(page).toHaveURL(/\/glossario\/closure$/);
  });

  test('moves the active result with the arrows and explains empty searches', async ({
    page,
    palette,
  }) => {
    await palette.goto();
    await palette.openWithShortcut();

    await expect(palette.options.first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(palette.options.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(palette.input).toHaveAttribute(
      'aria-activedescendant',
      (await palette.options.nth(1).getAttribute('id')) ?? '',
    );

    await palette.search('zzzz nada');
    await expect(palette.noResults).toBeVisible();
  });

  test('closes with Escape and returns focus to the trigger', async ({ page, palette }) => {
    await palette.goto();
    await palette.trigger.click();
    await expect(palette.dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(palette.dialog).toBeHidden();
    await expect(palette.trigger).toBeFocused();
  });

  test('has no serious accessibility violations when open', async ({ page, palette }) => {
    await palette.goto();
    await palette.openWithShortcut();
    await palette.search('css');
    await expect(palette.options.first()).toBeVisible();

    expect(await seriousViolations(page)).toEqual([]);
  });
});
