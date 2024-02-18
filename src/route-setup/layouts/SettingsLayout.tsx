import SecondaryNav from "@/components/SecondaryNav";
import { Outlet } from "react-router-dom";

interface SettingsLayoutProps {}

const secondaryNavLinks = [
  {
    to: "/d/settings",
    label: "Settings",
  },
  {
    to: "/d/settings/account",
    label: "My Account",
  },
  {
    to: "/d/settings/billing",
    label: "Billing",
  },
  {
    to: "/d/settings/integrations",
    label: "Integrations",
  },
  {
    to: "/d/settings/preferences",
    label: "Preferences",
  },
  {
    to: "/d/settings/referrals",
    label: "Referrals",
  },
  {
    to: "/d/settings/security",
    label: "Security",
  },
  {
    to: "/d/settings/subscriptions",
    label: "Subscriptions",
  },
  {
    to: "/d/settings/more",
    label: "More",
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
