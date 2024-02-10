import NoteForm from "@/components/NoteForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Contact, Note, SavedCompany } from "@/types";
import { GlobeIcon, LinkedinIcon } from "lucide-react";
import CompanyActionsDropdown from "./CompanyActionsDropdown";
interface SavedCustomCompanyCardProps {
  name: string;
  savedCompany: SavedCompany;
  link: string;
  note: Note;
  contacts: Contact[];
}

export default function SavedCustomCompanyCard({
  savedCompany,
  name,
  note,
  contacts,
  link,
}: SavedCustomCompanyCardProps) {
  const isLinkedin = link?.includes("linkedin");
  return (
    <div className="p-4 m-2 border shadow-md bg-white rounded  relative">
      <div className="absolute top-2 right-2 ">
        <CompanyActionsDropdown savedCompany={savedCompany} />
      </div>
      <div className="flex gap-4 p-4 items-center   ">
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{name}</p>
          {link && (
            <p className="w-64 text-slate-600 ">
              <a
                href={link}
                target="_blank"
                className="text-blue-400 flex gap-1 items-end w-fit  hover:underline hover:underline-offset-4"
              >
                {" "}
                {isLinkedin ? (
                  <LinkedinIcon size={16} />
                ) : (
                  <GlobeIcon size={16} />
                )}
                <span className="relative -bottom-1 text-sm">
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
