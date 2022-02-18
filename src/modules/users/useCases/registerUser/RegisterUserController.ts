import { Request, Response } from "express";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

export class RegisterUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const registerUserUseCase = new RegisterUserUseCase();

    const result = await registerUserUseCase.execute({ email, password });

    return res.status(201).json(result);
  }
}
