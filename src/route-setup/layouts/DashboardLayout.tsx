import { api } from "@/api/backend";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import DrawerProvider from "@/providers/DrawerProvider";
import ModalProvider from "@/providers/ModalProvider";
import SmartOverlayProvider from "@/providers/SmartOverlayProvider";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const jobApplicationStore = useJobApplicationsStore();

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    } else {
      // navigate("/jobs");
    }
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

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div>
      <Toaster richColors closeButton position="top-center" />
      <ModalProvider />
      <DrawerProvider />
      <SmartOverlayProvider />
      <main className="flex  overflx">
        <SideMenu />
        <section className="flex-1 overflow-x-auto overflow-y-auto">
          <Header />
          <div className="mx-3 ">
            <Outlet />
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
