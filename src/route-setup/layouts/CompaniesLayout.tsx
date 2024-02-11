import { api } from "@/api/backend";
import SecondaryNav from "@/components/SecondaryNav";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const secondaryNavLinks = [
  {
    to: "/d/companies",
    label: "Browse Companies",
  },
  {
    to: "/d/companies/saved",
    label: "Saved Companies",
  },
];

export default function CompaniesLayout() {
  //Load Companies
  return (
    <>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </>
  );
}
