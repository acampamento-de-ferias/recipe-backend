import { Router } from "express";
import { CreateRecipeController } from "./controller/CreateRecipeController";

const routes = Router();

routes.post('/recipes', new CreateRecipeController().handle)

export default routes;