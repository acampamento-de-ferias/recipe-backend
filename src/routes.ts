import { Router } from "express";
import { upload } from './storage/config';

import { CreateRecipeController } from "./controllers/CreateRecipeController";
import { DeleteRecipeController } from "./controllers/DeleteRecipeController";
import { GetAllRecipesController } from "./controllers/GetAllRecipesController";
import { UpdateRecipeController } from "./controllers/UpdateRecipeController";

const routes = Router();

routes.post('/recipes', upload.single('file'), new CreateRecipeController().handle)
routes.get('/recipes', new GetAllRecipesController().handle)
routes.delete('/recipes/:id', new DeleteRecipeController().handle)
routes.put('/recipes/:id', upload.single('file'), new UpdateRecipeController().handle)

export default routes;