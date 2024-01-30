import { Link } from "react-router-dom";
import {
  FileIcon,
  SendIcon,
  Trash2Icon,
  ArchiveIcon,
  ArchiveXIcon,
  Users2Icon,
  LineChartIcon,
  UsersIcon,
  PackageIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MountainIcon,
  SettingsIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";

interface SideMenuLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}
function SideMenuLink({ to, icon, label }: SideMenuLinkProps) {
  const sideMenuControl = useSideMenuControl();
  const smState = sideMenuControl.state;
  return (
    <Link
      className={cn(
        "flex items-center gap-3 w-full py-2 min-h-4 rounded-lg px-1 text-sm font-medium transition-all text-slate-700 hover:text-slate-950   hover:bg-gray-200 ",
        smState === "minimized" && "w-8 justify-center"
      )}
      to={to}
    >
      {icon}
      {smState === "open" && label}
    </Link>
  );
}

const current = window.location.pathname;

const sidenav = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="h-4 w-4" />,
  },
  {
    to: "/jobs",
    label: "Applications",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    to: "/resume",
    label: "Resume",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    to: "/applications",
    label: "Interviews",
    icon: <SendIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Notes",
    icon: <Trash2Icon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Portfolio",
    icon: <ArchiveIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Career",
    icon: <ArchiveXIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Communities",
    icon: <Users2Icon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Job Board",
    icon: <LineChartIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Mentors",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Projects",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Contacts",
    icon: <PersonIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Companies",
    icon: <PackageIcon className="h-4 w-4" />,
  },
];
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
        "sticky top-0 flex flex-col h-screen bg-gray-100 dark:bg-gray-800 transition-all duration-200",
        smState === "open" && "w-42",
        smState === "minimized" && "w-10",
        smState === "hidden" && "hidden"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between h-20 border-b dark:border-gray-700 ",
          smState === "minimized" && "justify-center"
        )}
      >
        {smState === "open" && (
          <Link to="#" className="flex-1 flex justify-center">
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
          "grid gap-1 px-2 overflow-y-auto",
          smState === "minimized" && "px-1"
        )}
      >
        {smState}
        {sidenav.map((item) => (
          <SideMenuLink
            to={item.to}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>
      <div
        className={cn(
          "flex flex-col items-start justify-center h-20 mt-auto border-t dark:border-gray-700"
        )}
      >
        <SideMenuLink
          to={current}
          icon={<SettingsIcon className="h-4 w-4 ml-2" />}
          label="Settings"
        />
        <SideMenuLink
          to={current}
          icon={<HelpCircleIcon className="h-4 w-4 ml-2" />}
          label="Support"
        />
      </div>
    </aside>
  );
}
