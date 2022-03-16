import { Router } from "express";

import { addUserInfoToRequestMiddleware } from "./middleware/addUserInfoToRequestMiddleware";
import { ensureUserAuthenticationMiddleware } from "./middleware/ensureUserAuthenticationMiddleware";
import { AddPlaceController } from "./modules/place/useCases/addPlace/AddPlaceController";
import { ListPlaceController } from "./modules/place/useCases/listPlace/ListPlaceController";
import { ListUserPlacesController } from "./modules/place/useCases/listUserPlaces/ListUserPlacesController";
import { AuthenticateUserUseController } from "./modules/users/useCases/authenticateUser/AuthenticateUserUseController";
import { RefreshTokenController } from "./modules/users/useCases/refreshToken/RefreshTokenController";
import { RegisterUserController } from "./modules/users/useCases/registerUser/RegisterUserController";

const routes = Router();

const registerUserController = new RegisterUserController();

const authenticateUserController = new AuthenticateUserUseController();

const addPlaceController = new AddPlaceController();

const refreshTokenController = new RefreshTokenController();

const listPlaceController = new ListPlaceController();

const listUserPlacesController = new ListUserPlacesController();

routes.post("/users", registerUserController.handle);
routes.post("/authenticate", authenticateUserController.handle);
routes.post(
  "/place",
  ensureUserAuthenticationMiddleware,
  addPlaceController.handle
);
routes.post(
  "/refresh_token",
  addUserInfoToRequestMiddleware,
  refreshTokenController.handle
);
routes.get(
  "/place",
  ensureUserAuthenticationMiddleware,
  listPlaceController.handle
);

routes.get(
  "/user/:user_id/places",
  ensureUserAuthenticationMiddleware,
  listUserPlacesController.handle
);

export { routes };
