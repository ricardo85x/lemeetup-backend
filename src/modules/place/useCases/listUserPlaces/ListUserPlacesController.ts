import { Request, Response } from "express";

import { ListUserPlacesUseCase } from "./ListUserPlacesUseCase";

export class ListUserPlacesController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.params;
    const listUserPlacesUseCase = new ListUserPlacesUseCase();

    const result = await listUserPlacesUseCase.execute(user_id);

    return res.json(result);
  }
}
