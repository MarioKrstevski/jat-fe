import SecondaryNav from "@/components/SecondaryNav";
import { Outlet } from "react-router-dom";

interface SettingsLayoutProps {}

const secondaryNavLinks = [
  {
    to: "/d/settings",
    label: "Settings",
  },
  {
    to: "/d/settings/profile",
    label: "Profile",
  },
];

export default function SettingsLayout({}: SettingsLayoutProps) {
  return (
    <div>
      SettingsLayout works
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
