import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkHealth } from "./services";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: async (failureCount, error) => {
        if (failureCount < 3) {
          return true;
        }

        const healthCheck = await checkHealth();

        if (healthCheck.message === "OK") {
          return true;
        }

        toast.error(
          "Our services are not working right now. Please stay on this page until services are back up."
        );
        return false;
      },
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <App />
  </QueryClientProvider>
);
