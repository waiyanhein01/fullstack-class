import MainLayoutPage from "@/components/layout/pages/MainLayoutPage";
import { createBrowserRouter } from "react-router";
import HomePage from "@/features/home/pages/HomePage";
import ServicesPage from "@/features/services/pages/ServicesPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import AboutUs from "@/features/about-us/components/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
