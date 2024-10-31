import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import appReducer from "./components/reducer.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appReducer}>
      <App />
    </Provider>
  </StrictMode>
);
