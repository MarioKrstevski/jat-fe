import { api } from "@/api/backend";
import Upcomming from "@/components/Upcomming";
import { useQuery } from "@tanstack/react-query";
import CompaniesList from "./components/CompaniesList";

export default function Companies() {
  const { data: companies } = useQuery({
    initialData: [],
    queryKey: ["companies"],
    queryFn: api.companies.getCompanies,
    // staleTime: 1000 * 60 * 2,
    refetchOnMount: true,
  });

  return (
    <>
      <CompaniesList companies={companies} />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ojnrQwztSA67wK9sDdtTkw.png" />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/gJP2ygtcQ4eRD4haIUhASQ.png" />
    </>
  );
}
