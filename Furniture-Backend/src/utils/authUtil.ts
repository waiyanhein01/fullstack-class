import { errorCode } from "../../config/errorCode";

export const checkUserExist = (user: any) => {
  if (user) {
    const error: any = new Error("User already exists.");
    error.status = 409;
    error.code = errorCode.userExist;
    throw error;
  }
};

export const checkOtpErrorIfSameDate = (
  isSameDate: boolean,
  errorCount: any
) => {
  if (isSameDate && errorCount === 5) {
    const error: any = new Error(
      "OTP is wrong for 5 times. Please try tomorrow."
    );
    error.status = 401;
    error.errorCode = errorCode.overLimit;
    throw error;
  }
};

export const checkOtpExistRow = (isExistOtpRow: any) => {
  if (!isExistOtpRow) {
    const error: any = new Error("Phone number is incorrect.");
    error.status = 401;
    error.errorCode = errorCode.invalid;
    throw error;
  }
};

export const checkUserIfNotExist = (user: any) => {
  if (!user) {
    const error: any = new Error("You have not registered yet.");
    error.status = 401;
    error.errorCode = errorCode.unauthenticated;
    throw error;
  }
};
