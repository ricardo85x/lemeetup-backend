import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }

  return res
    .status(500)
    .json({ status: "Error", message: "Internal server error" });
}