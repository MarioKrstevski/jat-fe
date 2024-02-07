import { api } from "@/api/backend";
import SecondaryNav from "@/components/SecondaryNav";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
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
  const companiesStore = useCompaniesStore();
  //Load Companies
  useEffect(() => {
    api.companies
      .getCompanies()
      .then((response) => {
        console.log(response.data);
        companiesStore.setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      })
      .finally(() => {});
  }, []);
  return (
    <>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </>
  );
}
