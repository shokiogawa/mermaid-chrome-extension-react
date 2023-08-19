import React from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);