import { Request, Response } from "express";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { user_email, user_id } = req;
    const { refresh_token } = req.body;

    const refreshTokenUseCase = new RefreshTokenUseCase();

    const result = await refreshTokenUseCase.execute({
      email: user_email,
      refresh_token,
      subject: user_id,
    });

    return res.json({
      refresh_token: result.refresh_token,
      token: result.token,
    });
  }
}
