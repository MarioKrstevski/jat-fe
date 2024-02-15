import { Link, useMatch } from "react-router-dom";
import {
  MountainIcon,
  SettingsIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";
import { sideNavBottomLinks, sidenav } from "./routes-nav-links";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { smallScreenWidth } from "@/global/variables";
interface SideMenuLinkWithoutChildrenProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  section?: boolean;
  parent?: boolean;
}
interface SideMenuLinkProps {
  to?: string | undefined;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  parent?: boolean;
  section?: boolean;
  children?: SideMenuLinkWithoutChildrenProps[];
}
function SideMenuLink({
  to,
  icon,
  label,
  indented,
  parent,
  section,
  children,
}: SideMenuLinkProps) {
  const sideMenuControl = useSideMenuControl();
  const smState = sideMenuControl.state;
  const isActive = to && useMatch(to);

  if (children?.length) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <div
            className={cn(
              "flex items-center rounded-lg transition-all duration-300 ",
              isActive && "bg-red-500"
            )}
          >
            <AccordionTrigger className="py-2 pl-1 flex w-6 flex-row-reverse justify-end gap-0.5"></AccordionTrigger>
            <SideMenuLink
              parent
              key={label}
              to={to}
              label={label}
              icon={icon}
            />
          </div>
          <AccordionContent className="border-none pb-0.5 ">
            {children.map((child) => {
              return (
                <SideMenuLink
                  key={child.label}
                  to={child.to}
                  label={child.label}
                  icon={child.icon}
                  indented
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Link
      className={cn(
        "flex items-center gap-2.5 w-full py-1.5 px-1 text-sm cursor-default transition-all duration-300 hover:text-white ",
        smState === "minimized" && "w-8 justify-center",
        !parent && isActive && " rounded-lg bg-red-500 "
      )}
      to={to || window.location.pathname}
    >
      {indented && <span className="w-4"></span>}
      <span className="transition-none">{icon}</span>
      <span
        className={cn(
          "overflow-x-hidden whitespace-nowrap"
          // smState === "minimized" ? "w-0 hidden" : "w-full block"
        )}
      >
        {/* Add a hashtag to know its not defined  */}
        {!to && "#"}
        {label}
      </span>
    </Link>
  );
}

export default function SideMenu() {
  const sideMenuControl = useSideMenuControl();
  const sideMenuRef = useRef<HTMLElement>(null);
  const sideMenuControlButtonRef = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useWindowSize();
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
  return (
    <>
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
            "flex items-center justify-between h-16 border-b border-b-gray-400 dark:border-gray-700 "
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
