import { Button } from "@/components/ui/button";
import { Contact } from "@/types";
import CreateContactSmartOverlay from "./components/modals/CreateContactSmartOverlay";
import { useDialogControl } from "@/hooks/useDialogControl";

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
      <p>ContactList</p>

      <Button onClick={handleCreateContact}>Add Contact</Button>
      {contacts.length === 0 && <div>No contacts</div>}
      <div>
        {contacts.map((contact) => {
          return <div key={contact.id}>{contact.name}</div>;
        })}
      </div>
    </div>
  );
}
