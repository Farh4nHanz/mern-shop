import { createBrowserRouter } from "react-router-dom";

import App from "../App";

// pages
import HomePage from "@pages/home";
import ErrorPage from "@pages/error";
import ProductPage from "@pages/products";
import AddProductPage from "@pages/products/add";
import DetailProductPage from "@pages/products/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
        children: [
          {
            path: "add",
            element: <AddProductPage />,
          },
          {
            path: "detail/:slug",
            element: <DetailProductPage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
