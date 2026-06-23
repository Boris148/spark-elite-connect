import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

function getRouterBaseName() {
  const baseUrl = import.meta.env.BASE_URL;
  if (!baseUrl || baseUrl === "/") {
    return undefined;
  }

  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={getRouterBaseName()}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
