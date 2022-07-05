import request from "supertest";
import { createdRecipeObject } from "./CreateRecipe.spec";
// import { app } from "../../app";

describe("Get All Recipes", () => {

    it("Should be able to get all recipes", async () => {

        await request('http://localhost:4000')
                        .post('/recipes')
                        .send(createdRecipeObject);

        const response = await request('http://localhost:4000')
                                .get(`/recipes`)
                                .expect("Content-Type", /json/);
        
        expect(response.statusCode).toEqual(200);
    });

});