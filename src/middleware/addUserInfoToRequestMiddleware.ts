import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

interface IDecodedToken {
  email: string;
  sub: string;
}

export function addUserInfoToRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "token not present",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = decode(token) as IDecodedToken;
    req.user_email = decoded.email;
    req.user_id = decoded.sub;
    console.log("Decoded", decoded);
    return next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Invalid bearer token",
    });
  }
}
