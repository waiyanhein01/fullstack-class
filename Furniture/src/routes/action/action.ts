import api, { authApi } from "@/api";
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
