import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ArchivedPage from "./pages/ArchivedPage";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SingleJobPage from "./pages/SingleJobPage";
import DashboardLayout from "./route-setup/layouts/DashboardLayout";
import RootLayout from "./route-setup/layouts/RootLayout";
import Applications from "./pages/dashboard-links/Applications";
import Dashboard from "./pages/dashboard-links/Dashboard";
import Resume from "./pages/dashboard-links/Resume";
import Contacts from "./pages/dashboard-links/Contacts";
import Interviews from "./pages/dashboard-links/Interviews";

function HandleRedirect({ to = "/" }: { to: string }) {
  return <Navigate to={to} />;
}

export default function JAT() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      path: "",
      children: [
        {
          element: <Navigate to="/dashboard" replace />,
          index: true,
        },
        {
          element: <DashboardLayout />,
          path: "dashboard",
          children: [
            {
              element: <Dashboard />,
              path: "",
            },
          ],
        },
        {
          element: <DashboardLayout />,
          path: "d",
          children: [
            {
              element: <Dashboard />,
              path: "",
            },
            {
              element: <Applications />,
              path: "applications",
            },
            {
              element: <Resume />,
              path: "resume",
            },
            {
              element: <Interviews />,
              path: "interviews",
            },
            {
              element: <Contacts />,
              path: "contacts",
            },
            {
              element: <SingleJobPage />,
              path: "jobs/:jobId",
            },
            {
              element: <ArchivedPage />,
              path: "archived",
            },
          ],
        },
        { path: "signin", element: <SignInPage /> },
        { path: "signup", element: <SignUpPage /> },
      ],
    },
    { path: "*", element: <HandleRedirect to="/d" /> },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
