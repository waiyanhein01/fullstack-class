import { Request, Response, NextFunction } from "express";

interface userIdRequest extends Request {
  userId?: number;
}

const healthController = (req: userIdRequest, res: Response) => {
  res
    .status(200)
    .json({ message: "Server response is running", userId: req.userId });
};

export default healthController;
