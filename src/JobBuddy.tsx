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
import Resume from "./pages/dashboard-links/resume/ResumeList";
import ActiveApplications from "./pages/dashboard-links/applications/ActiveApplications";
import ArchivedApplications from "./pages/dashboard-links/applications/ArchivedApplications";
import SingleApplicationView from "./pages/dashboard-links/applications/SingleApplicationView";
import ApplicationsLayout from "./route-setup/layouts/ApplicationsLayout";
import DashboardLayout from "./route-setup/layouts/DashboardLayout";
import RootLayout from "./route-setup/layouts/RootLayout";
import WishlistApplications from "./pages/dashboard-links/applications/WishlistApplications";
import ImportApplications from "./pages/dashboard-links/applications/ImportApplications";
import KanbanView from "./pages/dashboard-links/applications/KanbanView";
import ResumeLayout from "./route-setup/layouts/ResumeLayout";
import ResumeList from "./pages/dashboard-links/resume/ResumeList";
import ResumeEditor from "./pages/dashboard-links/resume/ResumeEditor";
import Notes from "./pages/dashboard-links/notes/Notes";
import Communities from "./pages/dashboard-links/communities/Communities";
import JobBoard from "./pages/dashboard-links/job-board/JobBoard";
import Reminders from "./pages/dashboard-links/reminders/Reminders";
import Companies from "./pages/dashboard-links/companies/Companies";
import Linkedin from "./pages/dashboard-links/linkedin/Linkedin";
import Tools from "./pages/dashboard-links/tools/Tools";
import Support from "./pages/dashboard-links/support/Support";
import Onboarding from "./pages/Onboarding";

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
                {
                  element: <ImportApplications />,
                  path: "import",
                },
                {
                  element: <KanbanView />,
                  path: "kanban",
                },
              ],
            },
            {
              element: <ResumeLayout />,
              path: "resume",
              children: [
                {
                  element: <ResumeList />,
                  // path: "",
                  index: true,
                },
                {
                  element: <ResumeEditor />,
                  path: "editor",
                },
              ],
            },
            {
              element: <Notes />,
              path: "notes",
            },
            {
              element: <Interviews />,
              path: "interviews",
            },
            {
              element: <Reminders />,
              path: "reminders",
            },
            {
              element: <Companies />,
              path: "companies",
            },
            {
              element: <Linkedin />,
              path: "linkedin",
            },
            {
              element: <Communities />,
              path: "communities",
            },
            {
              element: <Tools />,
              path: "tools",
            },
            {
              element: <Contacts />,
              path: "contacts",
            },
            {
              element: <JobBoard />,
              path: "job-board",
            },
            {
              element: <Support />,
              path: "support",
            },
          ],
        },
        { path: "onboarding", element: <Onboarding /> },
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
