import { useAuth, useUser } from "@clerk/clerk-react";
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
import Footer from "./components/Footer";
import DrawerProvider from "./providers/DrawerProvider";
import SmartOverlayProvider from "./providers/SmartOverlayProvider";

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
  const { user } = useUser();
  const navigate = useNavigate();
  const jobApplicationStore = useJobApplicationsStore();

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    } else {
      navigate("/jobs");
    }

    // if (!user?.unsafeMetadata?.isPaidUser) {
    //   user?.update({
    //     unsafeMetadata: {
    //       isPaidUser: true,
    //     },
    //   });
    // }
  }, [userId, isLoaded]);
  function handleFetchingJobApplications() {
    // you can paste a user id here to act as a different user 'user_2bJezVDasGIrggX7u8VJdByDo4y' ducho
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
      <DrawerProvider />
      <SmartOverlayProvider />
      <Header />
      <Outlet />
      <Footer />
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
