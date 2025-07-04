import api, { authApi } from "@/api";
import { Status, useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  //   const loginData = {
  //     phone: formData.get("phone"),
  //     password: formData.get("password"),
  //   };

  try {
    const response = await authApi.post("login", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Login failed" };
    }
    const redirectUrl =
      new URL(request.url).searchParams.get("redirect") || "/";

    return redirect(redirectUrl);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Login failed" };
    }
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Logout failed" };
    }
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  try {
    const response = await authApi.post("register", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Sending Otp failed" };
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.verify_otp,
    );

    return redirect("/register/verify-otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Sending Otp failed" };
    }
  }
};
