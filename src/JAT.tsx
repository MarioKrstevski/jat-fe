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
import { Toaster } from "./components/ui/sonner";
import ModalProvider from "./providers/ModalProvider";
import SingleJobPage from "./pages/SingleJobPage";
import { api } from "./api/backend";
import { useJobApplicationsStore } from "./hooks/useJobApplicationsStore";

function HandleRedirect() {
  return <Navigate to={"/jobs"} />;
}

function RootLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  //effect description
  useEffect(() => {
    if (isLoaded && userId) {
      // console.log("recorded", window.location.href);
      // navigate("/jobs");
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
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const jobApplicationStore = useJobApplicationsStore();

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);
  function handleFetchingJobApplications() {
    api
      .be_getJobApplications(userId)
      .then((res) => {
        // addCustomKeyValue

        jobApplicationStore.setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    handleFetchingJobApplications();
  }, []);
  return (
    <div>
      <Toaster richColors closeButton position="top-center" />
      <ModalProvider />
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
              path: "/jobs",
            },
            {
              element: <SingleJobPage />,
              index: true,
              path: "/jobs/:jobId",
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
