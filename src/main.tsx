import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "./index.css";

import { ThemeContextProvider } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext.tsx";

import { queryClient } from "./lib/queryClient.ts";
import { router } from "./router.tsx";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </QueryClientProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
