export const createError = (message: string, status: number, code: string) => {
  const error: any = new Error(message);
  error.status = status; // Default status code
  error.errorCode = code;
  throw error;
};
