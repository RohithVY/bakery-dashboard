import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/index.css";
import store from "./app/store.jsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
