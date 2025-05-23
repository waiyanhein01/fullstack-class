import { Request, Response, NextFunction } from "express";

interface UserIdRequest extends Request {
  userId?: number;
}

const authorize = (req: UserIdRequest, res: Response, next: NextFunction) => {
  next();
};

export default authorize;
