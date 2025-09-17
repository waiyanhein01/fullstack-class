import HomePage from "@/features/home/pages/HomePage";
import ServicesPage from "@/features/services/pages/ServicesPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import BlogDetailPage from "@/features/blog/pages/BlogDetailPage";
import MainBlogLayoutPage from "@/features/blog/pages/MainBlogLayoutPage";
import NotFoundPage from "@/features/not-found/pages/NotFoundPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import ProductsMainLayout from "@/features/products/components/ProductsMainLayout";
import ProductsDetailPage from "@/features/products/pages/ProductsDetailPage";
import AboutUsPage from "@/features/about-us/pages/AboutUsPage";
import LoginPage from "@/features/auth/login/pages/LoginPage";
import RegisterPage from "@/features/auth/register/pages/RegisterPage";
import RegisterMainLayout from "@/features/auth/register/components/RegisterMainLayout";
import VerifyOtpPage from "@/features/auth/register/pages/VerifyOtpPage";

import { createBrowserRouter, redirect } from "react-router";
import {
  accountRegistrationLoader,
  // homeLoader,
  loginLoader,
  postDetailLoader,
  postsInfiniteLoader,
  productDetailLoader,
  productsInfiniteLoader,
  productsInfiniteLoaderForAdmin,
  profileLoader,
  resetPasswordLoader,
  verifyForgotPasswordOtpLoader,
  verifyOtpLoader,
} from "./loader/loader";
import {
  accountRegistrationAction,
  // adminLoginAction,
  // adminLoginAction,
  // adminLoginAction,
  changePasswordAction,
  forgotPasswordAction,
  // favouriteAction,
  loginAction,
  logoutAction,
  registerAction,
  resetPasswordAction,
  verifyForgotPasswordOtpAction,
  verifyOtpAction,
} from "./action/action";
import FavouritePage from "@/features/favourite/pages/FavouritePage";
import ForgotPasswordMainLayout from "@/features/auth/forgot-password/components/ForgotPasswordMainLayout";
import ForgotPasswordPage from "@/features/auth/forgot-password/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/forgot-password/pages/ResetPasswordPage";
import VerifyForgotPasswordOtpPage from "@/features/auth/forgot-password/pages/VerifyForgotPasswordOtpPage";
import AccountRegistrationPage from "@/features/auth/register/pages/AccountRegistrationPage";
import ChangePasswordPage from "@/features/auth/change-password/pages/ChangePasswordPage";
import MainLayoutPage from "@/features/layout/pages/MainLayoutPage";
import AdminPage from "@/features/admin/pages/AdminPage";
import MainAdminLayout from "@/features/admin/components/MainAdminLayout";
import AdminProductsPage from "@/features/admin/features/products/pages/AdminProductsPage";
import AddNewProductPage from "@/features/admin/features/products/pages/AddNewProductPage";
import { createProductAction } from "./action/adminAction";

const router = createBrowserRouter([
  // dashboard routes
  {
    path: "/",
    element: <MainLayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        // loader: homeLoader, // this is method 1 and 3
      },
      {
        path: "products",
        element: <ProductsMainLayout />,
        loader: productsInfiniteLoader,
        children: [
          { index: true, element: <ProductsPage /> },
          {
            path: ":productId",
            element: <ProductsDetailPage />,
            loader: productDetailLoader,
            // action: favouriteAction, if u want to do optimistic with react router uncomment this line
          },
          {
            path: "favourite",
            element: <FavouritePage />,
            loader: profileLoader,
          },
        ],
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "blogs",
        element: <MainBlogLayoutPage />,
        children: [
          { index: true, element: <BlogPage />, loader: postsInfiniteLoader },
          {
            path: ":blogId",
            element: <BlogDetailPage />,
            loader: postDetailLoader,
          },
        ],
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },

      {
        path: "admin",
        element: <MainAdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
            // action: adminLoginAction,
          },
          {
            path: "products",
            element: <AdminProductsPage />,
            // loader: productsInfiniteLoaderForAdmin,
          },
          {
            path: "products/add-new-product",
            element: <AddNewProductPage />,
            // action: createProductAction,
          },
        ],
      },
    ],
  },

  // login route
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction, // for submission and mutation
    loader: loginLoader, // for preloading before render login page
  },

  // register route
  {
    path: "/register",
    element: <RegisterMainLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
        loader: verifyOtpLoader,
        action: verifyOtpAction,
      },
      {
        path: "account-registration",
        element: <AccountRegistrationPage />,
        loader: accountRegistrationLoader,
        action: accountRegistrationAction,
      },
    ],
  },

  // forgot password route
  {
    path: "/forgot-password",
    element: <ForgotPasswordMainLayout />,
    children: [
      {
        index: true,
        element: <ForgotPasswordPage />,
        action: forgotPasswordAction,
      },
      {
        path: "verify-forgot-password-otp",
        element: <VerifyForgotPasswordOtpPage />,
        loader: verifyForgotPasswordOtpLoader,
        action: verifyForgotPasswordOtpAction,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
        loader: resetPasswordLoader,
        action: resetPasswordAction,
      },
    ],
  },

  //change password
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
    action: changePasswordAction,
  },

  // admin dashboard routes

  // logout
  { path: "/logout", action: logoutAction, loader: () => redirect("/login") },
]);

export default router;
