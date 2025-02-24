import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/shop",
        element: <div>Shop</div>,
      },
      {
        path: "/cart",
        element: <div>Cart</div>,
      },
    ],
  },
]);

export default router;
