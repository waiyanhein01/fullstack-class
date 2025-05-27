import { Request, Response, NextFunction } from "express";
import { getSettingStatus } from "../services/systemService";
import { errorCode } from "../../config/errorCode";
import { createError } from "../utils/errorUtil";

const whiteList = ["127.0.0.1"];

export const maintenance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip: any = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (whiteList.includes(ip)) {
    return next();
  } else {
    const setting = await getSettingStatus("maintenance");
    if (setting && setting.value === "true") {
      return next(
        createError("Service is under maintenance.", 503, errorCode.maintenance)
      );
    }
    next();
  }
};
