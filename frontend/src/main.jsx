import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// redux store
import { store } from "./redux/store";

// styles
import "./index.css";

// chakra ui
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

// pages
import HomePage from "@pages/home";
import ErrorPage from "@pages/error";
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
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/add",
    element: <App />,
    children: [
      {
        path: "/products/add",
        element: <AddProductPage />,
      },
    ],
  },
  {
    path: "/products/detail/:id",
    element: <App />,
    children: [
      {
        path: "/products/detail/:id",
        element: <DetailProductPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
