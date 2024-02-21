import React from "react";
import ReactDOM from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import App from "./App.tsx";
import "./assets/tailwind.css";
import "./assets/global.css";

import { ClerkProvider } from "@clerk/clerk-react";
const CLERK_PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
