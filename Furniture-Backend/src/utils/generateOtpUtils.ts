import { randomBytes } from "crypto";

export const generateOtp = () => {
  return (parseInt(randomBytes(3).toString("hex"), 16) % 900000) + 100000;
};

export const generateRememberToken = () => {
  return randomBytes(32).toString("hex");
};
