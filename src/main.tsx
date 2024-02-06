import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/global.css";
import "react-quill/dist/quill.snow.css";

import { ClerkProvider } from "@clerk/clerk-react";
import Clerk from "@clerk/clerk-js";

const CLERK_PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
// const clerk = new Clerk(CLERK_PUBLISHABLE_KEY);
// await clerk
//   .load({

//     // Set load options here...
//   })
//   .then((res) => {
//     console.log("Clerk loaded", res);
//   });

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
