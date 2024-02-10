import NoteForm from "@/components/NoteForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Contact } from "@/types";
import ContactActionsDropdown from "./ContactActionsDropdown";
import { LinkedinIcon, MailPlusIcon, PhoneIcon } from "lucide-react";
import {
  EnvelopeClosedIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
interface ContactCardProps {
  contact: Contact;
}
export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <div
      className="p-4 pb-2 border  shadow bg-slate-50 w-full relative"
      key={contact.id}
    >
      <div className="absolute top-2 right-2">
        <ContactActionsDropdown contact={contact} />
      </div>
      <div>
        <div className="flex  justify-start items-start gap-4">
          <div className="flex-1">
            <p className="text-base font-semibold">{contact.name}</p>
            <p className="text-sm">{contact.positionOrDepartment}</p>
            <p className="text-sm text-slate-500 relative -top-1.5">
              {contact.company
                ? contact.company.name
                : contact.companyName}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-1 pt-1">
            {contact.phone && (
              <p className="flex items-center gap-1 text-sm">
                <PhoneIcon size={16} />{" "}
                <span>
                  <a href={"tel:" + contact.phone}>{contact.phone}</a>
                </span>
              </p>
            )}
            {contact.linkedin && (
              <p className="flex items-center gap-1 text-sm">
                <LinkedInLogoIcon className="min-w-5" />{" "}
                <span className="hover:text-blue-600">
                  <a href={contact.linkedin} target="_blank">
                    Open linkedin
                  </a>
                </span>
              </p>
            )}

            {contact.email && (
              <p className="flex items-center gap-1 text-sm">
                <EnvelopeClosedIcon className="min-w-5" />{" "}
                <span className="hover:text-blue-600">
                  <a href={"mailto:" + contact.email}>
                    {contact.email}
                  </a>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="text-sm py-0.5 mt-1"
      >
        {contact.note && (
          <AccordionItem
            value="note"
            className="bg-slate-100 px-3 rounded"
          >
            <AccordionTrigger className="py-2 pl-1 w-full h-8 ">
              <div>View note</div>
            </AccordionTrigger>
            <AccordionContent className="border-none pb-0.5 ">
              <div>
                <NoteForm note={contact.note} />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
