import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor} from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import logo from './logo1.png';

document.querySelector('link[rel="icon"]').href = logo;

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  // </React.StrictMode>
);
