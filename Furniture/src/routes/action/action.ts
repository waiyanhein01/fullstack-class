import api, { authApi } from "@/api";
import { queryClient } from "@/api/query";
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

export const verifyOtpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    token: authStore.token,
    otp: formData.get("otp"),
  };

  try {
    const response = await authApi.post("verify-otp", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Verifying Otp failed" };
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.confirm_password,
    );

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Verifying Otp failed" };
    }
  }
};

export const confirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    token: authStore.token,
    password: formData.get("password"),
  };

  try {
    const response = await authApi.post("confirm-password", credentials);
    // always care and check here status code is backend response
    if (response.status !== 201) {
      return { error: response.data || "Registration failed" };
    }

    authStore.resetAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Registration failed" };
    }
  }
};

export const favouriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    productId: params.productId,
    favourite: formData.get("favourite") === "true" ? true : false,
  };

  try {
    const response = await api.patch(
      "dashboard/products/favourite-toggle",
      data,
    );
    if (response.status !== 200) {
      return { error: response.data || "Toggling favourite failed" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", params.productId],
    });

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Toggling favourite failed" };
    }
  }
};
