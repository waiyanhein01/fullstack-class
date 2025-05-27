import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { createOrUpdateSettingStatus } from "../../services/systemService";
import { createError } from "../../utils/errorUtil";
import { errorCode } from "../../../config/errorCode";

export const setMaintenanceMode = [
  body("mode", "Maintenance must be boolean.").isBoolean(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { mode } = req.body;
    const value = mode ? "true" : "false";
    const message = mode
      ? "Maintenance mode enabled"
      : "Maintenance mode disabled";
    await createOrUpdateSettingStatus("maintenance", value);
    res.status(200).json({ message });
  },
];
