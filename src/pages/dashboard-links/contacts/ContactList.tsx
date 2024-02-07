import { Button } from "@/components/ui/button";
import { Contact } from "@/types";
import CreateContactSmartOverlay from "./components/modals/CreateContactSmartOverlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import NoteForm from "@/components/NoteForm";

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
      <div className="flex flex-col flex-wrap gap-2">
        {contacts.map((contact) => {
          return (
            <div
              className="p-4 border shadow bg-slate-50 max-w-96"
              key={contact.id}
            >
              <div>{contact.name}</div>
              {contact.note && <NoteForm note={contact.note} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
