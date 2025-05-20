import { Request, Response, NextFunction } from "express";

interface UserIdRequest extends Request {
  userId?: number;
}

export const getAllUsers = (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.userId;

  res.status(200).json({
    message: "List of users",
    currentUserId: id,
  });
};
