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
} from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

const current = undefined;
export const sidenav = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
  },
  {
    to: "/d/applications",
    label: "Applications",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    to: "/d/companies",
    label: "Companies",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    to: "/d/contacts",
    label: "Contacts",
    icon: <PersonIcon className="h-4 w-4" />,
  },
  {
    to: "/d/interviews",
    label: "Interviews",
    icon: <SendIcon className="h-4 w-4" />,
  },
  {
    to: "/d/notes",
    label: "Notes",
    icon: <Trash2Icon className="h-4 w-4" />,
  },
  {
    to: "/d/resume",
    label: "Resume",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Portfolio",
    icon: <ArchiveIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Projects",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    to: "/d/communities",
    label: "Communities",
    icon: <Users2Icon className="h-4 w-4" />,
  },
  {
    to: "/d/reminders",
    label: "Reminders",
    icon: <Users2Icon className="h-4 w-4" />,
  },
  {
    to: "/d/job-board",
    label: "Job Board",
    icon: <LineChartIcon className="h-4 w-4" />,
  },
  {
    to: "/d/tools",
    label: "Tools",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    to: "/d/linkedin",
    label: "LinkedIn",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Career",
    icon: <ArchiveXIcon className="h-4 w-4" />,
  },
  {
    to: current,
    label: "Mentors",
    icon: <PackageIcon className="h-4 w-4" />,
  },
];
