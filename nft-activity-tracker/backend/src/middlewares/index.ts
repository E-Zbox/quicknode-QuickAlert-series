import { NextFunction, Request, Response } from "express";
// errors
import { RequestURLError } from "@/utils/errors/controllers";

export const checkForInvalidRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(
    new RequestURLError(`[ ${req.method} ] '${req.originalUrl}' was not found`)
  );
};
