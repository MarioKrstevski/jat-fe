import { Link } from "react-router-dom";
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
import { sidenav } from "./routes-nav-links";
interface SideMenuLinkWithoutChildrenProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  parent?: boolean;
}
interface SideMenuLinkProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  parent?: boolean;
  children?: SideMenuLinkWithoutChildrenProps[];
}
function SideMenuLink({
  to = window.location.pathname,
  icon,
  label,
  indented,
  parent,
  children,
}: SideMenuLinkProps) {
  const sideMenuControl = useSideMenuControl();
  const smState = sideMenuControl.state;

  if (children?.length) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <div className="flex items-center   hover:bg-red-500 rounded-lg transition-all duration-300 ">
            <AccordionTrigger className="py-2 pl-1 flex w-6 flex-row-reverse justify-end gap-1"></AccordionTrigger>
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
        "flex items-center gap-3 w-full py-2 px-1 text-base cursor-default transition-all duration-300 hover:text-white ",
        smState === "minimized" && "w-8 justify-center",
        !parent && " rounded-lg hover:bg-red-500 "
      )}
      to={to}
    >
      {indented && <span className="w-4"></span>}
      <span className="transition-none">{icon}</span>
      <span
        className={cn(
          "overflow-x-hidden whitespace-nowrap",
          smState === "minimized" ? "w-0 hidden" : "w-full block"
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
  const smState = sideMenuControl.state;
  function handleToggleSideMenu() {
    if (smState === "open") {
      sideMenuControl.makeSideMenu("minimized");
    }

    if (smState === "minimized") {
      sideMenuControl.makeSideMenu("open");
    }
  }
  return (
    <aside
      className={cn(
        "sticky top-0 flex flex-col h-screen shadow-md  bg-[#212421] text-slate-300 dark:bg-gray-800 transition-all duration-300",
        smState === "open" && "w-48",
        smState === "minimized" && "w-10",
        smState === "hidden" && "hidden"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between h-16 border-b dark:border-gray-700 ",
          smState === "minimized" && "justify-center"
        )}
      >
        {smState === "open" && (
          <Link to={"/"} className="flex-1 flex justify-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only lg:hidden">Acme Inc</span>
          </Link>
        )}
        <Button
          size={"icon"}
          className="p-0 w-8 h-8 mr-1 rounded-full"
          onClick={handleToggleSideMenu}
        >
          {smState === "open" ? (
            <ChevronLeftIcon size={15} className="h-4 w-4" />
          ) : (
            <ChevronRightIcon size={15} className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav
        className={cn(
          "flex flex-col gap-1 px-2  py-1 overflow-y-auto ",
          smState === "minimized" && "px-1"
        )}
      >
        {sidenav.map((item) => (
          <SideMenuLink
            key={item.label}
            to={item.to}
            label={item.label}
            icon={item.icon}
            children={item.children}
          />
        ))}
      </nav>
      <div
        className={cn(
          "flex flex-col items-start justify-center h-20 mt-auto border-t dark:border-gray-700"
        )}
      >
        <SideMenuLink
          // to={current}
          icon={<SettingsIcon className="h-4 w-4 ml-2" />}
          label="Settings"
        />
        <SideMenuLink
          to="/d/support"
          icon={<HelpCircleIcon className="h-4 w-4 ml-2" />}
          label="Support"
        />
      </div>
    </aside>
  );
}
