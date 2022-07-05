import request from "supertest";
import { createdRecipeObject } from "./CreateRecipe.spec";
// import { app } from "../../app";

describe("Delete Recipe", () => {

    it("Should be able to delete a recipe", async () => {

        const newRecipe = await request('http://localhost:4000')
                                        .post('/recipes')
                                        .send(createdRecipeObject);

        const response = await request('http://localhost:4000')
                                .delete(`/recipes/${newRecipe.body.id}`);
        
        expect(response.statusCode).toEqual(204);
    });

    it("Should not be able to delete a recipe because there's no item with the informed id", async () => {
        const response = await request('http://localhost:4000')
                                .delete('/recipes/0');
        
        expect(response.statusCode).toEqual(400);
        expect(response.text).toBe("\"Recipe does not exists\"");
    });

});