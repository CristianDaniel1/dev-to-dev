import { expect, test } from '../fixtures/test';

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
