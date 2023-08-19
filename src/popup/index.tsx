import React from "react";
import ReactDOM from "react-dom";
import App from "../popup/App";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
