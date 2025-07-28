import express from "express";
import {
  accountRegistration,
  authCheck,
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
  verifyResetOtp,
} from "../../../controllers/auth/authController";
import { auth } from "../../../middlewares/auth";
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/account-registration", accountRegistration);

router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgetPassword);
router.post("/verify-reset-password-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

router.get("/auth-check", auth, authCheck);

export default router;
