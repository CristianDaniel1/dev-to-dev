import { STRING_CONCAT_QUESTION_ID } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';
import { waitForHydration } from '../helpers/hydration';
import { dueProgress, seedProgress } from '../helpers/progress-data';

test.describe('Home sample question', () => {
  test('explains a wrong answer and can be answered again', async ({ home }) => {
    await home.open();
    await home.answer('"null"');

    await expect(home.wrongFeedback).toBeVisible();
    await expect(
      home.sampleQuestion.getByText(/bug da primeira versão do JavaScript/),
    ).toBeVisible();

    await home.answerAgainButton.click();
    await expect(home.wrongFeedback).toBeHidden();
  });

  test('confirms a right answer', async ({ home }) => {
    await home.open();
    await home.answer('"object"');

    await expect(home.rightFeedback).toBeVisible();
  });
});

test.describe('Returning visitor', () => {
  test('first visits show no resume block', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    await expect(page.getByRole('heading', { name: 'Continuar de onde parou' })).toBeHidden();
  });

  test('offers the due reviews and the last session', async ({ page }) => {
    await seedProgress(page, dueProgress([STRING_CONCAT_QUESTION_ID]));
    await page.goto('/');

    const resume = page.getByRole('region', { name: 'Continuar de onde parou' });
    await expect(resume).toContainText('1 pergunta para revisar hoje');
    await expect(resume.getByRole('link', { name: 'Continuar' })).toHaveAttribute(
      'href',
      '/quizzes/javascript',
    );
  });
});
