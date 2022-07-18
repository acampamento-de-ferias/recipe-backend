import { requestAPI } from '../integration-setup';
import { createdRecipeObject } from './CreateRecipe.spec';
// import { app } from "../../app";

describe('Get All Recipes', () => {
  it('Should be able to get all recipes', async () => {
    await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    const response = await requestAPI.get('/recipes').expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(200);
  });
});
