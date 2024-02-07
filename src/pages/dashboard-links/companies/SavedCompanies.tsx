import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useEffect } from "react";
import SaveCustomCompanyModal from "./components/modals/SaveCustomCompanyModal";
import NoteForm from "@/components/NoteForm";

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
      <Button
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
            <div
              key={company.id}
              className="p-4 m-2 border shadow bg-slate-50"
            >
              <p>{company.name}</p>
              <p>{company.description}</p>
              <p>{company.industry}</p>
              <p>{company.companySize}</p>
              <p>{company.website}</p>
              <p>{company.linkedin} </p>

              {savedCompany.note && (
                <div>
                  <NoteForm note={savedCompany.note} />
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div className="m-2 border p-4 shadow bg-slate-50">
              <p>{savedCompany.name}</p>
              <p>{savedCompany.linkedin}</p>
              <div>
                <NoteForm note={savedCompany.note} />
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
