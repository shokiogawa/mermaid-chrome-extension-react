import React from "react";
import { createRoot } from "react-dom/client";
import Sidepanel from "./Sidepanel";
import "../../styles/sidepanel/style.scss";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Sidepanel />
  </React.StrictMode>
);
