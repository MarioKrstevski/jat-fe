import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useEffect } from "react";
import SaveCustomCompanyModal from "./components/modals/SaveCustomCompanyModal";

import EditCustomCompanyModal from "./components/modals/EditCustomCompanyModal";
import SavedCustomCompanyCard from "./components/saved-companies/SavedCustomCompanyCard";
import SavedExistingCompanyCard from "./components/saved-companies/SavedExistingCompanyCard";

export default function SavedCompanies() {
  const companiesStore = useCompaniesStore();
  const dialogControl = useDialogControl();
  //load saved companies

  useEffect(() => {
    api.companies
      .getSavedCompanies()
      .then((response) => {
        console.log(response.data);
        companiesStore.setSavedCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      })
      .finally(() => {});
  }, []);

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

      {companiesStore.savedCompanies.length === 0 && (
        <p>No saved companies</p>
      )}
      {companiesStore.savedCompanies.map((savedCompany) => {
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
