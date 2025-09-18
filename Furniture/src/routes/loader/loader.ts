import api, { authApi } from "@/api";
import {
  categoryTypeQuery,
  postDetailQuery,
  postsInfiniteQuery,
  postsQuery,
  productDetailQuery,
  productsInfiniteQuery,
  productsQuery,
  productsQueryForAdmin,
  queryClient,
  userProfileQuery,
} from "@/api/query";
import { Status, useAuthStore } from "@/store/authStore";
import { LoaderFunctionArgs, redirect } from "react-router";

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

export const adminAuthLoader = async () => {
  try {
    const response = await api.get("dashboard/profile");
    const userRole = response.data.user.role;
    if (userRole === "USER" || userRole === "AUTHOR") {
      return redirect("/");
    }
    return null;
  } catch (error) {
    console.log("Error login:", error);
  }
};

// register
export const verifyOtpLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== Status.verify_register_otp) {
    return redirect("/register");
  }

  return null;
};

export const accountRegistrationLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== Status.account_registration) {
    return redirect("/register/verify-otp");
  }

  return null;
};

// forgot password
export const verifyForgotPasswordOtpLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== Status.verify_forgot_password_otp) {
    return redirect("/forgot-password");
  }

  return null;
};

export const resetPasswordLoader = async () => {
  const authCheck = useAuthStore.getState();

  if (authCheck.status !== Status.reset_password) {
    return redirect("/forgot-password/verify-forgot-password-otp");
  }

  return null;
};

// this is method 1
// export const homeLoader = async () => {
//   try {
//     const products = await api.get("dashboard/products?limit=8");
//     const posts = await api.get("dashboard/posts/infinite?limit=3");

//     return { productsData: products.data, postsData: posts.data };
//   } catch (error) {
//     console.error("Error fetching home data:", error);
//   }
// };

// this is method 3
export const homeLoader = async () => {
  await queryClient.ensureQueryData(productsQuery("limit=8"));
  await queryClient.ensureQueryData(postsQuery("limit=3"));
  return null;
};

export const postsInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postsInfiniteQuery());
  return null;
};

export const postDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.blogId) {
    throw new Error("No Post ID provided");
  }
  await queryClient.ensureQueryData(postsQuery("limit=6"));
  await queryClient.ensureQueryData(postDetailQuery(Number(params.blogId)));
  return { blogId: params.blogId };
};

export const productsInfiniteLoader = async () => {
  await queryClient.ensureQueryData(categoryTypeQuery());
  await queryClient.prefetchInfiniteQuery(productsInfiniteQuery());
  return null;
};

export const productsLoaderForAdmin = async () => {
  await queryClient.prefetchQuery(
    productsQueryForAdmin({
      pageIndex: 0,
      pageSize: 5,
    }),
  );
  return null;
};

export const productDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.productId) {
    throw new Error("No Product ID provided");
  }
  await queryClient.ensureQueryData(productsQuery("limit=4"));
  await queryClient.ensureQueryData(
    productDetailQuery(Number(params.productId)),
  );
  return { productId: params.productId };
};

//noted ensureQueryData
// ensureQueryData is used to make sure that the data is fetched before rendering the component
// if the data is already in the cache, it will not fetch it again
// if the data is not in the cache, it will fetch it and cache it

export const profileLoader = async () => {
  await queryClient.ensureQueryData(userProfileQuery());
  return null;
};
