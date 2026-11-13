import { expect, test } from '../fixtures/test';

test.describe('Learning paths', () => {
  test('lists the paths and opens one', async ({ page, paths }) => {
    await paths.open();

    await page.getByRole('link', { name: 'Git do zero' }).click();

    await expect(page).toHaveURL(/\/trilhas\/git-do-zero$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Git do zero' })).toBeVisible();
  });

  test('marks a step as done and keeps it after a reload', async ({ page, paths }) => {
    await paths.open('/trilhas/git-do-zero');
    const step = paths.step(1, 'Primeiros commits');

    await paths.doneToggle(step).click();

    await expect(paths.doneToggle(step)).toHaveAttribute('aria-pressed', 'true');
    await expect(paths.progress).toHaveText('1 de 5 etapas concluídas');

    await page.reload();
    await expect(paths.progress).toHaveText('1 de 5 etapas concluídas');

    await paths.open();
    await expect(page.getByRole('listitem').filter({ hasText: 'Git do zero' })).toContainText(
      '1 de 5 etapas concluídas',
    );
  });

  test('a step links to practice its quiz topic and to glossary terms', async ({ paths }) => {
    await paths.open('/trilhas/git-do-zero');
    const step = paths.step(2, 'Trabalhando com branches');

    await expect(step.getByRole('link', { name: 'Praticar Branches' })).toHaveAttribute(
      'href',
      '/quizzes/git/praticar?topico=branches',
    );
    await expect(step.getByRole('link', { name: 'Merge', exact: true })).toHaveAttribute(
      'href',
      '/glossario/merge',
    );
  });
});
