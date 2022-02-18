import { Router } from "express";

import { RegisterUserController } from "./modules/users/useCases/registerUser/RegisterUserController";

const routes = Router();

const registerUserController = new RegisterUserController();

routes.post("/users", registerUserController.handle);

export { routes };
