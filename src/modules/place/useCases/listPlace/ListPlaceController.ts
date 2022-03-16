import { Request, Response } from "express";

import { ListPlaceUseCase } from "./ListPlaceUseCase";

export class ListPlaceController {
  async handle(_req: Request, res: Response) {
    const listPlaceUseCase = new ListPlaceUseCase();
    const result = await listPlaceUseCase.execute();
    return res.json(result);
  }
}
