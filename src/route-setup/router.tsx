import { Navigate, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard-links/dashboard/Dashboard";
import ApplicationsLayout from "./layouts/ApplicationsLayout";
import ActiveApplications from "@/pages/dashboard-links/applications/ActiveApplications";
import SingleApplicationView from "@/pages/dashboard-links/applications/SingleApplicationView";
import ArchivedApplications from "@/pages/dashboard-links/applications/ArchivedApplications";
import WishlistApplications from "@/pages/dashboard-links/applications/WishlistApplications";
import ImportApplications from "@/pages/dashboard-links/applications/ImportApplications";
import KanbanView from "@/pages/dashboard-links/applications/KanbanView";
import JobApplicationSettings from "@/pages/dashboard-links/applications/components/JobApplicationSettings";
import ResumeLayout from "./layouts/ResumeLayout";
import ResumeList from "@/pages/dashboard-links/resume/ResumeList";
import ResumeEditor from "@/pages/dashboard-links/resume/ResumeEditor";
import Interviews from "@/pages/dashboard-links/interviews/Interviews";
import Reminders from "@/pages/dashboard-links/reminders/Reminders";
import Companies from "@/pages/dashboard-links/companies/Companies";
import Linkedin from "@/pages/dashboard-links/linkedin/Linkedin";
import Communities from "@/pages/dashboard-links/communities/Communities";
import Tools from "@/pages/dashboard-links/tools/Tools";
import Contacts from "@/pages/dashboard-links/contacts/Contacts";
import JobBoard from "@/pages/dashboard-links/job-board/JobBoard";
import Support from "@/pages/dashboard-links/support/Support";
import Onboarding from "@/pages/Onboarding";
import AboutUs from "@/pages/AboutUs";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import CompanyInfoPage from "@/pages/dashboard-links/companies/CompanyInfoPage";
import CompaniesLayout from "./layouts/CompaniesLayout";
import SavedCompanies from "@/pages/dashboard-links/companies/SavedCompanies";
import Documents from "@/pages/dashboard-links/documents/Documents";
import Settings from "@/pages/dashboard-links/settings/Settings";
import SettingsLayout from "./layouts/SettingsLayout";
import Profile from "@/pages/dashboard-links/profile/Profile";
import Account from "@/pages/dashboard-links/settings/Account";
import Billing from "@/pages/dashboard-links/settings/Billing";
import Integrations from "@/pages/dashboard-links/settings/Integrations";
import More from "@/pages/dashboard-links/settings/More";
import Preferences from "@/pages/dashboard-links/settings/Preferences";
import Referrals from "@/pages/dashboard-links/settings/Referrals";
import Security from "@/pages/dashboard-links/settings/Security";
import Subscriptions from "@/pages/dashboard-links/settings/Subscriptions";
import Notifications from "@/pages/dashboard-links/settings/Notifications";
import Templates from "@/pages/dashboard-links/templates/Templates";
import MyResources from "@/pages/dashboard-links/my-resources/MyResources";

function HandleRedirect({ to = "/" }: { to: string }) {
  return <Navigate to={to} />;
}
export const router = createBrowserRouter([
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
              {
                element: <JobApplicationSettings />,
                path: "settings",
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
            element: <Interviews />,
            path: "interviews",
          },
          {
            element: <Reminders />,
            path: "reminders",
          },

          {
            element: <CompaniesLayout />,
            path: "companies",
            children: [
              {
                element: <Companies />,
                index: true,
              },
              {
                element: <CompanyInfoPage />,
                path: ":companyId",
              },
              {
                element: <SavedCompanies />,
                path: "saved",
              },
            ],
          },
          {
            element: <Contacts />,
            path: "contacts",
          },
          {
            element: <Documents />,
            path: "documents",
          },
          {
            element: <Templates />,
            path: "templates",
          },
          {
            element: <MyResources />,
            path: "my-resources",
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
            element: <JobBoard />,
            path: "job-board",
          },
          {
            element: <Profile />,
            path: "Profile",
          },
          {
            element: <SettingsLayout />,
            path: "settings",
            children: [
              {
                element: <Settings />,
                index: true,
              },
              {
                element: <Account />,
                path: "account",
              },
              {
                element: <Billing />,
                path: "billing",
              },
              {
                element: <Integrations />,
                path: "integrations",
              },
              {
                element: <More />,
                path: "more",
              },
              {
                element: <Notifications />,
                path: "notifications",
              },
              {
                element: <Preferences />,
                path: "preferences",
              },
              {
                element: <Referrals />,
                path: "referrals",
              },
              {
                element: <Security />,
                path: "security",
              },
              {
                element: <Subscriptions />,
                path: "subscriptions",
              },
            ],
          },
          {
            element: <Support />,
            path: "support",
          },
        ],
      },
      { path: "onboarding", element: <Onboarding /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  { path: "*", element: <HandleRedirect to="/d" /> },
]);
