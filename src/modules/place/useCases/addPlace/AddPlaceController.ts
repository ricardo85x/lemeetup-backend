import { Request, Response } from "express";

export class AddPlaceController {
  handle(req: Request, res: Response) {
    return res
      .status(201)
      .json({ message: "Place created", email: req.user_email });
  }
}
