import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Contacts from "./pages/dashboard-links/contacts/Contacts";
import Dashboard from "./pages/dashboard-links/dashboard/Dashboard";
import Interviews from "./pages/dashboard-links/interviews/Interviews";
import Resume from "./pages/dashboard-links/resume/Resume";
import ActiveApplications from "./pages/dashboard-links/applications/ActiveApplications";
import ArchivedApplications from "./pages/dashboard-links/applications/ArchivedApplications";
import SingleApplicationView from "./pages/dashboard-links/applications/SingleApplicationView";
import ApplicationsLayout from "./route-setup/layouts/ApplicationsLayout";
import DashboardLayout from "./route-setup/layouts/DashboardLayout";
import RootLayout from "./route-setup/layouts/RootLayout";
import WishlistApplications from "./pages/dashboard-links/applications/WishlistApplications";

function HandleRedirect({ to = "/" }: { to: string }) {
  return <Navigate to={to} />;
}

export default function JobBuddy() {
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
                  element: <ActiveApplications />,
                  // path: "",
                  index: true,
                },
                {
                  element: <SingleApplicationView />,
                  path: ":applicationId",
                },
                {
                  element: <ArchivedApplications />,
                  path: "archived",
                },
                {
                  element: <WishlistApplications />,
                  path: "wishlist",
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
