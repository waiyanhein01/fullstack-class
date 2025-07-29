import api, { authApi } from "@/api";
import { queryClient } from "@/api/query";
import { Status, useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";
import { toast } from "sonner";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  //   const loginData = {
  //     phone: formData.get("phone"),
  //     password: formData.get("password"),
  //   };

  try {
    const response = await authApi.post("login", credentials);
    console.log(response, "response");
    if (response.status === 200) {
      return toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }
    const redirectUrl =
      new URL(request.url).searchParams.get("redirect") || "/";
    redirect(redirectUrl);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.message, {
        style: {
          borderLeft: "10px solid #f44336",
          background: "#ffffff",
          color: "#f44336",
        },
      });
    }
  }
};

export const logoutAction = async () => {
  try {
    const response = await api.post("logout");
    if (response.status === 200) {
      return toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.message, {
        style: {
          borderLeft: "10px solid #f44336",
          background: "#ffffff",
          color: "#f44336",
        },
      });
    }
  }
};

// register
export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  try {
    const response = await authApi.post("register", credentials);
    if (response.status !== 200) {
      return { error: response.data.message || "Sending Otp failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.verify_register_otp,
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
      return { error: response.data.message || "Verifying Otp failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.account_registration,
    );

    return redirect("/register/account-registration");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Verifying Otp failed" };
    }
  }
};

export const accountRegistrationAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    token: authStore.token,
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  };

  try {
    const response = await authApi.post("account-registration", credentials);
    // always care and check here status code is backend response
    if (response.status !== 201) {
      return { error: response.data.message || "Registration failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.resetAuth();

    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Registration failed" };
    }
  }
};

// forgot password
export const forgotPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  try {
    const response = await authApi.post("forgot-password", credentials);
    if (response.status !== 200) {
      return { error: response.data.message || "Sending Otp failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.verify_forgot_password_otp,
    );

    return redirect("/forgot-password/verify-forgot-password-otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Sending Otp failed" };
    }
  }
};

export const verifyForgotPasswordOtpAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    token: authStore.token,
    otp: formData.get("otp"),
  };

  try {
    const response = await authApi.post(
      "verify-reset-password-otp",
      credentials,
    );
    if (response.status !== 200) {
      return { error: response.data.message || "Verifying Otp failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.setAuth(
      response.data.phone,
      response.data.token,
      Status.reset_password,
    );

    return redirect("/forgot-password/reset-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Verifying Otp failed" };
    }
  }
};

export const resetPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    token: authStore.token,
    password: formData.get("password"),
  };

  try {
    const response = await authApi.post("reset-password", credentials);
    // always care and check here status code is backend response
    if (response.status !== 200) {
      return { error: response.data.message || "Resetting Password failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    authStore.resetAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Resetting Password failed" };
    }
  }
};

export const changePasswordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData); // Convert FormData to an object if u have too many input fields

  try {
    const response = await authApi.patch(
      "dashboard/change-password",
      credentials,
    );
    // always care and check here status code is backend response
    if (response.status !== 200) {
      return { error: response.data.message || "Changing Password failed" };
    } else {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "Changing Password failed" };
    }
  }
};

// favourite
export const favouriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    productId: Number(params.productId),
    favourite: formData.get("favourite") === "true",
  };

  try {
    const response = await api.patch(
      "dashboard/products/favourite-toggle",
      data,
    );
    if (response.status !== 200) {
      return { error: response.data.message || "Toggling favourite failed" };
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
