import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import SaveCustomCompanyModal from "./components/modals/SaveCustomCompanyModal";

import { useQuery } from "@tanstack/react-query";
import EditCustomCompanyModal from "./components/modals/EditCustomCompanyModal";
import SavedCustomCompanyCard from "./components/saved-companies/SavedCustomCompanyCard";
import SavedExistingCompanyCard from "./components/saved-companies/SavedExistingCompanyCard";

export default function SavedCompanies() {
  const dialogControl = useDialogControl();
  //load saved companies

  const { data: savedCompanies, isLoading } = useQuery({
    initialData: [],
    queryKey: ["savedCompanies"],
    queryFn: api.companies.getSavedCompanies,
    // staleTime: 1000 * 60 * 2,
    refetchOnMount: true,
  });

  if (!savedCompanies) return null;
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <SaveCustomCompanyModal />
      <EditCustomCompanyModal />
      <Button
        className="ml-2"
        onClick={() => {
          dialogControl.openModal("saveCustomCompany");
        }}
      >
        Add company
      </Button>

      {savedCompanies.length === 0 && <p>No saved companies</p>}
      {savedCompanies.map((savedCompany) => {
        if (savedCompany.company) {
          const company = savedCompany.company;

          return (
            <SavedExistingCompanyCard
              savedCompany={savedCompany}
              key={savedCompany.id}
              company={company}
              note={savedCompany.note}
              contacts={[
                ...(savedCompany?.contacts ?? []),
                ...(company?.contacts ?? []),
              ]}
            />
          );
        } else {
          return (
            <SavedCustomCompanyCard
              savedCompany={savedCompany}
              key={savedCompany.id}
              name={savedCompany.name!}
              link={savedCompany.link!}
              note={savedCompany.note}
              contacts={[...(savedCompany?.contacts ?? [])]}
            />
          );
        }
      })}
    </>
  );
}
