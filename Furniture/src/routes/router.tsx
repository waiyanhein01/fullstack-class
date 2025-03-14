import MainLayoutPage from "@/components/layout/pages/MainLayoutPage";
import { createBrowserRouter } from "react-router";
import HomePage from "@/features/home/pages/HomePage";
import ServicesPage from "@/features/services/pages/ServicesPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import AboutUs from "@/features/about-us/components/AboutUs";
import BlogDetailPage from "@/features/blog/pages/BlogDetailPage";
import MainBlogLayoutPage from "@/features/blog/pages/MainBlogLayoutPage";
import NotFoundPage from "@/features/not-found/pages/NotFoundPage";
import ProductsPage from "@/features/products/pages/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
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
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
