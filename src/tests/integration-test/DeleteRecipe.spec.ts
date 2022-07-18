import request from 'supertest';
import { requestAPI } from '../integration-setup';
import { createdRecipeObject } from './CreateRecipe.spec';
// import { app } from "../../app";

describe('Delete Recipe', () => {
  it('Should be able to delete a recipe', async () => {
    const newRecipe = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    const response = await request('http://localhost:4000').delete(`/recipes/${newRecipe.body.id}`);

    expect(response.statusCode).toEqual(204);
  });

  it("Should not be able to delete a recipe because there's no item with the informed id", async () => {
    const response = await requestAPI.delete('/recipes/0');

    expect(response.statusCode).toEqual(400);
    expect(response.text).toBe('"Recipe does not exists"');
  });
});
