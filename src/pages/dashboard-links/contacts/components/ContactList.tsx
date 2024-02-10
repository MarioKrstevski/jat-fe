import { Button } from "@/components/ui/button";
import { Contact } from "@/types";
import CreateContactSmartOverlay from "./modals/CreateContactSmartOverlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import ContactCard from "./ContactCard";
import EditContactSmartOverlay from "./modals/EditContactSmartOverlay";

interface ContactListProps {
  contacts: Contact[];
}
export default function ContactList({ contacts }: ContactListProps) {
  const dialogControl = useDialogControl();

  function handleCreateContact() {
    dialogControl.openModal("createContact");
  }
  return (
    <div>
      <CreateContactSmartOverlay />
      <EditContactSmartOverlay />
      <Button
        onClick={handleCreateContact}
        size={"sm"}
        className="mt-1 text-sm"
      >
        Add Contact
      </Button>
      {contacts.length === 0 && <div>No contacts</div>}

      <p className="my-2 text-2xl font-semibold">Contacts</p>

      <div className="grid md:grid-cols-2  gap-2 mt-1">
        {contacts.map((contact) => {
          return <ContactCard contact={contact} key={contact.id} />;
        })}
      </div>
    </div>
  );
}
