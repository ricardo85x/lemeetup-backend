import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserUseController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const result = await authenticateUserUseCase.execute({ email, password });

    return res.json(result);
  }
}
