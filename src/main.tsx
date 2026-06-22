import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import { ThemeContextProvider } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext.tsx";

import { queryClient } from "./lib/queryClient.ts";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
