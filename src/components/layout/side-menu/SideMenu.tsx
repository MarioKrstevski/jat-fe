import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MountainIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { smallScreenWidth } from "@/global/variables";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  sideNavBottomLinks,
  sidenav,
} from "../../../route-setup/sidenav-links";
import SideMenuLink from "./components/SideMenuLink";

export default function SideMenu() {
  const sideMenuControl = useSideMenuControl();
  const sideMenuRef = useRef<HTMLElement>(null);
  const sideMenuControlButtonRef = useRef<HTMLDivElement>(null);
  const { width = 0 } = useWindowSize();
  const smState = sideMenuControl.state;
  useEffect(() => {
    function handleOutsideClick(e: any) {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(e.target) &&
        sideMenuControlButtonRef.current &&
        !sideMenuControlButtonRef.current.contains(e.target) &&
        window.innerWidth <= 768
      ) {
        sideMenuControl.makeSideMenu("hidden");
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const isSmallScreen = width <= smallScreenWidth;
  function handleToggleSideMenu() {
    if (smState === "open") {
      sideMenuControl.makeSideMenu("hidden");
    }

    if (smState === "hidden") {
      sideMenuControl.makeSideMenu("open");
    }
  }
  const toggleButton = (
    <div
      ref={sideMenuControlButtonRef}
      className={cn(
        "fixed top-4 left-0 z-30 transition-all duration-300",
        smState === "open" && "left-48",
        smState === "hidden" && "left-0"
      )}
    >
      {isSmallScreen && (
        <Button
          size={"icon"}
          className="p-0 ml-1 w-8 h-8 mr-1 rounded-full"
          onClick={handleToggleSideMenu}
        >
          {smState === "hidden" ? (
            <ChevronRightIcon size={15} className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon size={15} className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
  return (
    <>
      {toggleButton}
      <aside
        ref={sideMenuRef}
        className={cn(
          "flex flex-col h-screen shadow-md  bg-[#212421] text-slate-300 dark:bg-gray-800 transition-all duration-300",
          isSmallScreen ? "fixed left-0 z-30" : "sticky left-0 top-0",
          smState === "open" && "w-48",
          // smState === "minimized" && "w-10",
          smState === "hidden" && "w-0 overflow-hidden"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between min-h-16 border-b border-b-gray-400 dark:border-gray-700 "
            // smState === "minimized" && "justify-center"
          )}
        >
          {smState === "open" && (
            <Link to={"/"} className="flex-1 flex justify-center">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only lg:hidden">Acme Inc</span>
            </Link>
          )}
        </div>
        <nav
          className={cn(
            "flex flex-col gap-1 px-2  py-1 overflow-y-auto "
            // smState === "minimized" && "px-1"
          )}
        >
          {sidenav.map((item) => {
            if (item.section) {
              return (
                <p
                  key={item.label}
                  className="pt-5 pl-2 text-sm whitespace-nowrap"
                >
                  {item.label}
                </p>
              );
            }

            return (
              <SideMenuLink
                key={item.label}
                to={item.to}
                label={item.label}
                icon={item.icon}
                children={item.children}
              />
            );
          })}
        </nav>
        <div
          className={cn(
            "flex flex-col items-start justify-center  mt-auto py-1 px-2 border-t-2 border-t-gray-400 dark:border-gray-700"
          )}
        >
          {sideNavBottomLinks.map((item) => {
            return (
              <SideMenuLink
                key={item.label}
                to={item.to}
                label={item.label}
                icon={item.icon}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
}
