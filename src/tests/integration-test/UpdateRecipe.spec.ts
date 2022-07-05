import request from "supertest";
import { createdRecipeObject } from "./CreateRecipe.spec";
// import { app } from "../../app";

describe("Update Recipe", () => {

    it("Should be able to update a recipe", async () => {

        const newRecipe = await request('http://localhost:4000')
                                        .post('/recipes')
                                        .send(createdRecipeObject);

        createdRecipeObject.title = "Bolo de Cenoura";
        const response = await request('http://localhost:4000')
                                .put(`/recipes/${newRecipe.body.id}`)
                                .send(createdRecipeObject);
        
        expect(response.statusCode).toEqual(200);
    });

    it("Should not be able to update a recipe because there's no item with the informed id", async () => {
        const response = await request('http://localhost:4000')
                                .put('/recipes/0')
                                .send(createdRecipeObject);
        
        expect(response.statusCode).toEqual(400);
        expect(response.text).toBe("\"Recipe does not exists.\"");
    });

});