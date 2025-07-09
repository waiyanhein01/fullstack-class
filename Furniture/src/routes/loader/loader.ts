import api, { authApi } from "@/api";
import { Status, useAuthStore } from "@/store/authStore";
import { redirect } from "react-router";

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

  if (authCheck.status !== Status.verify_otp) {
    return redirect("/register");
  }

  return null;
};

export const confirmPasswordLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== Status.confirm_password) {
    return redirect("/register/verify-otp");
  }

  return null;
};

export const homeLoader = async () => {
  try {
    const products = await api.get("dashboard/products?limit=8");
    const posts = await api.get("dashboard/posts/infinite?limit=3");

    return { productsData: products.data, postsData: posts.data };
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
};
