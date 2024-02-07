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
import { useQuery } from "@tanstack/react-query";
import useClerkQuery from "@/hooks/useClerkQuery";
import usePutTokenInInterceptor from "@/hooks/usePutTokenInInterceptor";

export default function DashboardLayout() {
  usePutTokenInInterceptor();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const jobApplicationStore = useJobApplicationsStore();

  // const { isLoading, data, error } = useClerkQuery(
  //   "http://localhost:5050/applications"
  // );
  // const { isLoading, data, error } = useQuery({
  //   queryKey: ["applications"],
  //   queryFn: () =>
  //     api.applications.getJobApplications(userId).then((res) => {
  //       jobApplicationStore.setData(res.data);
  //       return res.data;
  //     }),
  // });

  // console.log(data, isLoading, error);
  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    } else {
      // navigate("/d");
    }
  }, [userId, isLoaded]);
  async function handleFetchingTags() {
    api.tags
      .getTags()
      .then((res) => {
        jobApplicationStore.setTags(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function handleFetchingJobApplications() {
    // you can paste a user id here to act as a different user 'user_2bJezVDasGIrggX7u8VJdByDo4y' ducho
    api.applications
      .getJobApplications()
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
    handleFetchingTags();
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
      <main className="flex overflx  ">
        <SideMenu />
        <section className="flex-1  overflow-x-auto overflow-y-auto">
          <Header />
          <div className="px-2 sm:px-3">
            <Outlet />
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
