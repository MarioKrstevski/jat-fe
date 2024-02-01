import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ArchivedPage from "./pages/ArchivedPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SingleApplicationPage from "./pages/SingleApplicationPage";
import Applications from "./pages/dashboard-links/Applications";
import Contacts from "./pages/dashboard-links/Contacts";
import Dashboard from "./pages/dashboard-links/Dashboard";
import Interviews from "./pages/dashboard-links/Interviews";
import Resume from "./pages/dashboard-links/Resume";
import DashboardLayout from "./route-setup/layouts/DashboardLayout";
import RootLayout from "./route-setup/layouts/RootLayout";
import ApplicationsLayout from "./route-setup/layouts/ApplicationsLayout";

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
              element: <ApplicationsLayout />,
              path: "applications",
              children: [
                {
                  element: <Applications />,
                  // path: "",
                  index: true,
                },
                {
                  element: <SingleApplicationPage />,
                  path: ":applicationId",
                },
                {
                  element: <ArchivedPage />,
                  path: "archived",
                },
              ],
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
