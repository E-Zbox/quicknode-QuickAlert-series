import { NextFunction, Request, Response } from "express";

export const webhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);

  return res.status(200).json({ data: null, error: "", success: true });
};
