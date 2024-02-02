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
];

export default function ApplicationsLayout() {
  return (
    <div>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
