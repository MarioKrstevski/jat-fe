import { api } from "@/api/backend";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { useContactsStore } from "@/hooks/useContactsStore";
import { useInterviewsStore } from "@/hooks/useInterviewsStore";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import usePutTokenInInterceptor from "@/hooks/usePutTokenInInterceptor";
import DrawerProvider from "@/providers/DrawerProvider";
import ModalProvider from "@/providers/ModalProvider";
import SmartOverlayProvider from "@/providers/SmartOverlayProvider";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";

export default function DashboardLayout() {
  usePutTokenInInterceptor();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const jobApplicationStore = useJobApplicationsStore();
  const contactsStore = useContactsStore();
  const interviewsStore = useInterviewsStore();

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
        jobApplicationStore.setJobApplications(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function handleFetchingInterviews() {
    api.interviews
      .getInterviews()
      .then((res) => {
        // console.log("interviews", res.data);
        interviewsStore.setInterviews(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function handleFetchingContacts() {
    api.contacts
      .getContacts()
      .then((res) => {
        contactsStore.setContacts(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    handleFetchingJobApplications();
    handleFetchingTags();
    handleFetchingContacts();
    handleFetchingInterviews();
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
          <div className="px-0.5 sm:px-2">
            <Outlet />
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
