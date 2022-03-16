import { Request, Response } from "express";

import { AddPlaceUseCase } from "./AddPlaceUseCase";

export class AddPlaceController {
  async handle(req: Request, res: Response) {
    const { name, description, latitude, longitude } = req.body;
    const addPlaceUseCase = new AddPlaceUseCase();

    const result = await addPlaceUseCase.handle({
      name,
      description,
      latitude,
      longitude,
      email: req.user_email,
    });

    return res
      .status(201)
      .json({ message: "Place created", place_id: result.id });
  }
}
