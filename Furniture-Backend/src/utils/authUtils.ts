export const checkUserExist = (user: any) => {
  if (user) {
    const error: any = new Error("Phone number already exists");
    error.status = 409;
    error.code = "Error_AlreadyExists";
    throw error;
  }
};

export const checkOtpErrorIfSameDate = (
  isSameDate: boolean,
  errorCount: any
) => {
  if (isSameDate && errorCount === 5) {
    const error: any = new Error(
      "OTP is wrong for 5 times.Please try tomorrow"
    );
    error.status = 401;
    error.errorCode = "Error_OverLimit";
    throw error;
  }
};
