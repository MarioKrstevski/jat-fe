import { api } from "@/api/backend";
import NoteForm from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { Company, Contact, Note } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveCustomCompanyModal from "./components/modals/SaveCustomCompanyModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GlobeIcon,
  LinkedinIcon,
  LucideCircleEllipsis,
  MoreVerticalIcon,
} from "lucide-react";

interface SavedExistingCompanyCardProps {
  company: Company;
  note?: Note;
  contacts: Contact[];
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
      <div className=" absolute top-2 right-2 flex items-start gap-0.5">
        <Button
          variant={"outline"}
          size={"sm"}
          className="h-8"
          onClick={() => {
            navigate(`/d/companies/${company.id}`);
          }}
        >
          Company Details
        </Button>
        <CompanyActionsDropdown />
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
interface SavedCustomCompanyCardProps {
  name: string;
  link: string;
  note: Note;
  contacts: Contact[];
}

function CompanyActionsDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={"outline"}
            size={"icon"}
            className=" h-8 w-8"
          >
            <MoreVerticalIcon size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-right-4 top-2 absolute">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
function SavedCustomCompanyCard({
  name,
  note,
  contacts,
  link,
}: SavedCustomCompanyCardProps) {
  const isLinkedin = link?.includes("linkedin");
  return (
    <div className="p-4 m-2 border shadow-md bg-white rounded  relative">
      <div className="absolute top-2 right-2 ">
        <CompanyActionsDropdown />
      </div>
      <div className="flex gap-4 p-4 items-center   ">
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{name}</p>
          {link && (
            <p className="w-64 text-slate-600">
              <a
                href={link}
                target="_blank"
                className="text-blue-400 flex gap-1 items-end hover:underline hover:underline-offset-4"
              >
                {" "}
                {isLinkedin ? <LinkedinIcon /> : <GlobeIcon />}
                <span className="relative -bottom-1">
                  Open {isLinkedin ? "linkedin" : "website"}
                </span>
              </a>
            </p>
          )}
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
