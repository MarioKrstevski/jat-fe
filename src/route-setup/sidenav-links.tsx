import { PersonIcon } from "@radix-ui/react-icons";
import {
  ArchiveIcon,
  ArchiveXIcon,
  BookTemplateIcon,
  FileIcon,
  HelpCircleIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  PackageIcon,
  PenIcon,
  SaveAllIcon,
  SendIcon,
  SettingsIcon,
  UserIcon,
  Users2Icon,
  UsersIcon,
} from "lucide-react";

const current = undefined;
export const sidenav = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
  },
  {
    section: "Other",
    label: "Main Features",
  },
  {
    to: "/d/applications",
    label: "Applications",
    icon: <HomeIcon className="h-4 w-4" />,
    children: [
      {
        to: "/d/applications/archived",
        label: "Archived",
        icon: <ArchiveIcon className="h-4 w-4" />,
      },
      {
        to: "/d/applications/wishlist",
        label: "Wishlist",
        icon: <PenIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    to: "/d/companies",
    label: "Companies",
    icon: <PackageIcon className="h-4 w-4" />,
    children: [
      {
        to: "/d/companies/saved",
        label: "Saved",
        icon: <SaveAllIcon className="h-4 w-4" />,
      },
    ],
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
    to: "/d/documents",
    label: "Documents",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    to: "/d/templates",
    label: "Templates",
    icon: <BookTemplateIcon className="h-4 w-4" />,
  },
  {
    section: true,
    label: "Comming Soon",
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
    section: true,
    label: "Backlog",
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
export const sideNavBottomLinks = [
  {
    to: "/d/settings",
    label: "Settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
  {
    to: "/d/profile",
    label: "Profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    to: "/d/support",
    label: "Support",
    icon: <HelpCircleIcon className="h-4 w-4" />,
  },
];
