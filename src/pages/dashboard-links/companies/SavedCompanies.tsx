import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useEffect } from "react";
import SaveCustomCompanyModal from "./components/modals/SaveCustomCompanyModal";
import NoteForm from "@/components/NoteForm";
import { Company, Contact, Note } from "@/types";
import { useNavigate } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SavedExistingCompanyCardProps {
  company: Company;
  note?: Note;
  contacts?: Contact[];
}
function SavedExistingCompanyCard({
  company,
  note,
  contacts,
}: SavedExistingCompanyCardProps) {
  const navigate = useNavigate();
  return (
    <div
      key={company.id}
      className="p-4 m-2 border shadow-md bg-white rounded  relative"
    >
      <Button
        variant={"outline"}
        size={"sm"}
        className=" absolute top-2 right-2"
        onClick={() => {
          navigate(`/d/companies/${company.id}`);
        }}
      >
        Company Details
      </Button>
      <div
        className="flex gap-4 p-4 items-center   "
        key={company.id}
      >
        <div className="h-24 w-24">
          <img
            src={company.logo}
            alt={company.name + " logo"}
            className="w-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{company.name}</p>
          <p className="w-64 text-slate-600">
            {company.shortDescription}
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible>
        {note && (
          <AccordionItem
            value="note"
            className="bg-slate-100 px-3 rounded"
          >
            <AccordionTrigger className="py-2 pl-1 w-full ">
              <div>View your note</div>
            </AccordionTrigger>
            <AccordionContent className="border-none pb-0.5 ">
              <div>
                <NoteForm note={note} />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        {contacts && (
          <AccordionItem
            value="contacts"
            className="bg-slate-100 px-3 rounded"
          >
            <AccordionTrigger className="py-2 pl-1 w-full ">
              <div>View your contacts here</div>
            </AccordionTrigger>
            <AccordionContent className="border-none pb-0.5 ">
              <div>{/* <NoteForm note={note} /> */}</div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}

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
            <SavedExistingCompanyCard
              company={company}
              note={savedCompany.note}
              contacts={[
                ...(savedCompany?.contacts ?? []),
                ...company.contacts,
              ]}
            />
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
