import {
  EN_PRACTICE_RESOURCE,
  MOBILE_TAG,
  PT_PRACTICE_RESOURCE,
  SMOKE_TAG,
} from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';
import { waitForHydration } from '../helpers/hydration';
import { readFavorites } from '../helpers/storage';

test.describe('Resource hub filters', () => {
  test(
    'filters by price and search, keeping both in the URL',
    { tag: SMOKE_TAG },
    async ({ page, resources }) => {
      await resources.open();
      const total = await resources.cards.count();

      await test.step('keep only paid resources', async () => {
        await resources.choose('Preço', 'Pago');
        await expect(page).toHaveURL(/preco=pago/);
        await expect(resources.cards.filter({ hasNotText: 'Pago' })).toHaveCount(0);
        expect(await resources.cards.count()).toBeLessThan(total);
      });

      await test.step('search inside the paid resources', async () => {
        await resources.searchBox.fill('css');
        await expect(page).toHaveURL(/q=css/);
        await expect(resources.card('CSS for JavaScript Developers')).toBeVisible();
        await expect(resources.status).toHaveText(/\d+ recursos?/);
      });
    },
  );

  test('restores the filters of a shared link and undoes a filter with the back button', async ({
    page,
    resources,
  }) => {
    await resources.open('/recursos?tipo=pratica&idioma=pt');

    await resources.revealFilters();
    await expect(resources.selectedOption('Tipo')).toHaveText('Prática');
    await expect(resources.card(PT_PRACTICE_RESOURCE)).toBeVisible();
    await expect(resources.card(EN_PRACTICE_RESOURCE)).toBeHidden();

    await resources.choose('Idioma', 'Todos');
    await expect(resources.card(EN_PRACTICE_RESOURCE)).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/idioma=pt/);
    await expect(resources.card(EN_PRACTICE_RESOURCE)).toBeHidden();
  });

  test('explains when nothing matches and clears the filters', async ({ resources }) => {
    await resources.open();

    await resources.searchBox.fill('nada-corresponde-a-isto');
    await expect(resources.emptyHeading).toBeVisible();

    await resources.clearButton.click();
    await expect(resources.emptyHeading).toBeHidden();
    await expect(resources.searchBox).toHaveValue('');
  });
});

test.describe('Favorites', () => {
  test('keeps saved resources after a reload and filters by them', async ({ page, resources }) => {
    await resources.open();
    const favorite = resources.favoriteButton('Squoosh');

    await favorite.click();
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    expect(await readFavorites(page)).toEqual(['squoosh']);

    await page.reload();
    await waitForHydration(page);
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');

    await resources.showOnlyFavorites();
    await expect(resources.cards).toHaveCount(1);
    await expect(resources.card('Squoosh')).toBeVisible();
  });
});

test.describe('Resource pages', () => {
  test('a category page lists only its own resources', async ({ page, resources }) => {
    await resources.open('/recursos/git-e-github');

    await expect(page.getByRole('heading', { level: 1, name: 'Git e GitHub' })).toBeVisible();
    await expect(resources.card('Pro Git')).toBeVisible();
    await expect(resources.card('Figma')).toBeHidden();
  });

  test('a collection lists its resources in order', async ({ page, resources }) => {
    await resources.open('/recursos/colecoes/primeiro-projeto-frontend');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Kit do primeiro projeto frontend' }),
    ).toBeVisible();
    await expect(resources.cards.first()).toContainText('Visual Studio Code');
  });

  test('a quiz page links to the resources of its tech', async ({ page, resources }) => {
    await resources.open('/quizzes/css');

    const section = page.getByRole('region', { name: 'Para estudar CSS' });
    await expect(section.getByRole('article').first()).toBeVisible();

    await section.getByRole('link', { name: 'Ver todos os recursos de CSS' }).click();
    await expect(page).toHaveURL(/\/recursos\?tech=css/);
    await resources.revealFilters();
    await expect(resources.selectedOption('Tecnologia')).toHaveText('CSS');
  });
});

test.describe('Filters on a small screen', () => {
  test(
    'start collapsed and show how many are active',
    { tag: MOBILE_TAG },
    async ({ resources }) => {
      await resources.open('/recursos?preco=gratuito&idioma=pt');

      await expect(resources.filters.getByRole('group', { name: 'Preço' })).toBeHidden();
      await expect(resources.showFiltersButton).toHaveAttribute('aria-expanded', 'false');
      await expect(resources.showFiltersButton).toContainText('2');

      await resources.revealFilters();
      await expect(resources.filters.getByRole('group', { name: 'Preço' })).toBeVisible();
    },
  );
});
