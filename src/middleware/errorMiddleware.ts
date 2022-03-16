import { NextFunction, Request, Response } from "express";

import { CustomError } from "../modules/error/CustomError";

export function errorMiddleware(
  error: CustomError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (error instanceof CustomError) {
    return res.status(error.code).json({ message: error.message });
  }

  return res
    .status(500)
    .json({ status: "Error", message: "Internal server error" });
}
