import { deepCloneNative } from '../../util';
import { requestAPI } from '../integration-setup';
// import { app } from "../../app";

export const createdRecipeObject = {
  title: 'Bolo de Laranja',
  description: 'Como fazer um bolo de Laranja top',
  serving_size: 12,
  preparation_time: '40:00',
  ingredients: [
    {
      name: '4 ovos',
    },
    {
      name: '2 xícaras (chá) de açúcar',
    },
    {
      name: '1 xícara (chá) de óleo',
    },
    {
      name: 'suco de 2 laranjas',
    },
    {
      name: 'casca de 1 laranja',
    },
    {
      name: '2 xícaras (chá) de farinha de trigo',
    },
    {
      name: '1 colher (sopa) de fermento',
    },
  ],
  instructions: [
    {
      name: 'Bata no liquidificador os ovos, o açúcar, o óleo, o suco e a casca da laranja.',
    },
    {
      name: 'Passe para uma tigela e acrescente a farinha de trigo e o fermento.',
    },
    {
      name: 'Leve para assar em uma forma com furo central, untada e enfarinhada, por mais ou menos 30 minutos.',
    },
    {
      name: 'Desenforme o bolo e molhe com suco de laranja.',
    },
  ],
};

describe('Create Recipe', () => {
  it('Should be able to create a new recipe', async () => {
    const response = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(createdRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to create a new recipe without image', async () => {
    const response = await requestAPI.post('/recipes').field('data', JSON.stringify(createdRecipeObject));

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create a new recipe because validation in recipe', async () => {
    // Force error in recipe
    const cloneRecipeObject = deepCloneNative(createdRecipeObject);
    cloneRecipeObject.title = 'O';

    const response = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(cloneRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(400);
    expect(response.text).toBe(
      '"Validation failed: An instance of Recipe has failed the validation:\\n - property title has failed the following constraints: isLength \\n"',
    );
  });

  it('Should not be able to create a new recipe because validation in ingredient', async () => {
    // Force error in ingredients
    const cloneRecipeObject = deepCloneNative(createdRecipeObject);
    cloneRecipeObject.ingredients[0].name = '4';

    const response = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(cloneRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(400);
    expect(response.text).toBe(
      '"Validation failed: An instance of Ingredient has failed the validation:\\n - property name has failed the following constraints: isLength \\n"',
    );
  });

  it('Should not be able to create a new recipe because validation in instruction', async () => {
    // Force error in instructions
    const cloneRecipeObject = deepCloneNative(createdRecipeObject);
    cloneRecipeObject.instructions[0].name = 'B';

    const response = await requestAPI
      .post('/recipes')
      .field('data', JSON.stringify(cloneRecipeObject))
      .attach('file', 'src/tests/images/bolo-de-laranja.jpg');

    expect(response.statusCode).toEqual(400);
    expect(response.text).toBe(
      '"Validation failed: An instance of Instruction has failed the validation:\\n - property name has failed the following constraints: isLength \\n"',
    );
  });
});
