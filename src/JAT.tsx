import { useAuth } from "@clerk/clerk-react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";

function HandleRedirect() {
  const { userId } = useAuth();
  console.log("test", userId);

  if (userId) {
    return <Navigate to={"/dashboard"} />;
  } else {
    return <Navigate to={"/signin"} />;
  }
}

export default function JAT() {
  const router = createBrowserRouter([
    {
      //   element: <RootLayout />,
      children: [
        { path: "/signin", element: <SignInPage /> },
        { path: "/signup", element: <SignUpPage /> },
        {
          element: <DashboardPage />,
          path: "dashboard",
        },
        { path: "/*", element: <HandleRedirect /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
