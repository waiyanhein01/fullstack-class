export const checkUserExist = (user: any) => {
  if (user) {
    const error: any = new Error("Phone number already exists");
    error.status = 409;
    error.code = "Error_AlreadyExists";
    throw error;
  }
};
