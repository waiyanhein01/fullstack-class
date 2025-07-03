import MainLayoutPage from "@/components/layout/pages/MainLayoutPage";
import { createBrowserRouter, redirect } from "react-router";
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
import LoginPage from "@/components/auth/login/pages/LoginPage";
import RegisterPage from "@/components/auth/register/pages/RegisterPage";
import { homeLoader, loginLoader } from "./loader/loader";
import { loginAction, logoutAction, registerAction } from "./action/action";
import RegisterMainLayout from "@/components/auth/register/components/RegisterMainLayout";
import VerifyOtpPage from "@/components/auth/register/pages/VerifyOtpPage";
import ConfirmPasswordPage from "@/components/auth/register/pages/ConfirmPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "products",
        element: <ProductsMainLayout />,
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":productId", element: <ProductsDetailPage /> },
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
          { index: true, element: <BlogPage /> },
          { path: ":blogId", element: <BlogDetailPage /> },
        ],
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction, // for submission and mutation
    loader: loginLoader, // for preloading before render login page
  },
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
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "confirm-password", element: <ConfirmPasswordPage /> },
    ],
  },
  { path: "/logout", action: logoutAction, loader: () => redirect("/login") },
]);

export default router;
