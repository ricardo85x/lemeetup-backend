import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  email: string;
  sub: string;
}

export async function ensureUserAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({
      message: "Token missing from request",
    });
  }

  const [, token] = authHeaders.split(" ");

  try {
    const payload = verify(
      token,
      process.env.USER_AUTH_SECRET || ""
    ) as IPayload;

    const { email, sub } = payload;

    req.user_email = email;
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      code: "token.expired",
    });
  }
}
