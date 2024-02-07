import Upcomming from "@/components/Upcomming";
import CompaniesList from "./components/CompaniesList";
import { useEffect } from "react";
import { api } from "@/api/backend";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";

export default function Companies() {
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
      <CompaniesList companies={companiesStore.companies} />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ojnrQwztSA67wK9sDdtTkw.png" />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/gJP2ygtcQ4eRD4haIUhASQ.png" />
    </>
  );
}
