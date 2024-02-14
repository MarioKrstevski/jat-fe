import { api } from "@/api/backend";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import DrawerProvider from "@/providers/DrawerProvider";
import ModalProvider from "@/providers/ModalProvider";
import SmartOverlayProvider from "@/providers/SmartOverlayProvider";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";
import { smallScreenWidth } from "@/global/variables";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const sideMenuControl = useSideMenuControl();

  useEffect(() => {
    const handleResize = () => {
      // logic to handle screen width change
      if (window.innerWidth > smallScreenWidth) {
        sideMenuControl.makeSideMenu("open");
      } else {
        sideMenuControl.makeSideMenu("hidden");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    } else {
      // navigate("/d");
    }
  }, [userId, isLoaded]);

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
