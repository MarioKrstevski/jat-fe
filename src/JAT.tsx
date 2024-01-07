import { useAuth } from "@clerk/clerk-react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ArchivedPage from "./pages/ArchivedPage";
import Header from "./components/Header";
import { useEffect } from "react";

function HandleRedirect() {
  return <Navigate to={"/"} />;
}

function RootLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  console.log("userId", userId);

  //effect description
  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    } else if (isLoaded && !userId) {
      navigate("/signin");
    }
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return <div>Navigating</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
function DashboardLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
export default function JAT() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      path: "/",
      children: [
        {
          path: "/",
          element: <DashboardLayout />,
          children: [
            {
              element: <DashboardPage />,
              index: true,
              path: "/dashboard",
            },
            {
              element: <ArchivedPage />,
              path: "/archived",
            },
          ],
        },
        { path: "signin", element: <SignInPage /> },
        { path: "signup", element: <SignUpPage /> },
      ],
    },
    { path: "*", element: <HandleRedirect /> },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
