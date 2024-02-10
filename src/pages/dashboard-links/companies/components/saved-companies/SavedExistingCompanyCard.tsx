import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

import NoteForm from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { Company, Contact, Note, SavedCompany } from "@/types";
import CompanyActionsDropdown from "./CompanyActionsDropdown";
interface SavedExistingCompanyCardProps {
  company: Company;
  savedCompany: SavedCompany;
  note?: Note;
  contacts: Contact[];
}
export default function SavedExistingCompanyCard({
  company,
  note,
  savedCompany,
  contacts,
}: SavedExistingCompanyCardProps) {
  const navigate = useNavigate();
  return (
    <div
      key={company.id}
      className="p-4 m-2 border shadow-md bg-white rounded  relative"
    >
      <div className=" absolute top-2 right-2 flex items-start gap-0.5">
        <Button
          variant={"outline"}
          size={"sm"}
          className="h-8 bg-transparent"
          onClick={() => {
            navigate(`/d/companies/${company.id}`);
          }}
        >
          Company Details
        </Button>
        <CompanyActionsDropdown savedCompany={savedCompany} />
      </div>
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
        {contacts.length > 0 && (
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
