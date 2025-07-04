import api, { authApi } from "@/api";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const response = await api.get("dashboard/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("Error login:", error);
  }
};

export const verifyOtpLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== "verify-otp") {
    return redirect("/register");
  }

  return null;
};
