import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout";
import ShopPage from "@/pages/ShopPage";
import HomePage from "@/pages/HomePage";
import CartPage from "@/pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
