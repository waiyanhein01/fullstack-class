import { Request, Response, NextFunction } from "express";

interface userIdRequest extends Request {
  userId?: number;
}

export const healthController = (
  req: userIdRequest,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ message: "Server response is running.", userId: req.userId });
};
