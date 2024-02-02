import { Outlet } from "react-router-dom";
import SecondaryNav from "@/components/SecondaryNav";

const secondaryNavLinks = [
  {
    to: "/d/applications",
    label: "Active",
  },
  {
    to: "/d/applications/wishlist",
    label: "Wishlist",
  },
  {
    to: "/d/applications/archived",
    label: "Archived",
  },
  {
    to: "/d/applications/import",
    label: "Import",
  },
  {
    to: "/d/applications/kanban",
    label: "Kanban Board",
  },
];

export default function ApplicationsLayout() {
  return (
    <div>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
