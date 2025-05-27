import { errorCode } from "../../config/errorCode";

export const checkImageFromMulterSupport = (image: any) => {
  if (!image) {
    const error: any = new Error("Image must be png, jpg or jpeg.");
    error.status = 409;
    error.errorCode = errorCode.invalid;
    throw error;
  }
};
