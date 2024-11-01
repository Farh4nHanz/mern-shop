import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// redux store
import { store } from "./redux/store";

// styles
import "./index.css";

// chakra ui
import { ChakraProvider } from "@chakra-ui/react";

// routes
import router from "./routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);