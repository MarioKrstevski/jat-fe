import { Outlet } from "react-router-dom";
import SecondaryNav from "@/components/SecondaryNav";

const secondaryNavLinks = [
  {
    to: "/d/resume",
    label: "Your Resumes",
  },
  {
    to: "/d/resume/editor",
    label: "Editor",
  },
];

export default function ResumeLayout() {
  return (
    <div>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
