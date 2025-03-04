import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Timer from "./pages/Timer/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Timer />
    </Provider>
  </StrictMode>
);
