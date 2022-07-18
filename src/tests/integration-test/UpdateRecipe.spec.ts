import { requestAPI } from '../integration-setup';
import { createdRecipeObject } from './CreateRecipe.spec';
// import { app } from "../../app";

describe('Update Recipe', () => {
  it('Should be able to update a recipe', async () => {
    const newRecipe = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    createdRecipeObject.title = 'Bolo de Cenoura';
    const response = await requestAPI
      .put(`/recipes/${newRecipe.body.id}`)
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(200);
  });

  it("Should not be able to update a recipe because there's no item with the informed id", async () => {
    const response = await requestAPI
      .put('/recipes/0')
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(400);
    expect(response.text).toBe('"Recipe does not exists."');
  });
});
