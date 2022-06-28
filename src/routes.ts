import { Router } from "express";
import { CreateRecipeController } from "./controllers/CreateRecipeController";
import { DeleteRecipeController } from "./controllers/DeleteRecipeController";
import { GetAllRecipesController } from "./controllers/GetAllRecipesController";

const routes = Router();

routes.post('/recipes', new CreateRecipeController().handle)
routes.get('/recipes', new GetAllRecipesController().handle)
routes.delete('/recipes/:id', new DeleteRecipeController().handle)

export default routes;