import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router";
import router from "./routes/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
