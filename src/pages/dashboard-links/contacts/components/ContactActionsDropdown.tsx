import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/api/backend";
import { Contact } from "@/types";
import { toast } from "sonner";

import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { MoreVerticalIcon } from "lucide-react";

interface ContactActionsDropdownProps {
  contact: Contact;
}
export default function ContactActionsDropdown({
  contact,
}: ContactActionsDropdownProps) {
  const companiesStore = useCompaniesStore();
  const dialogControl = useDialogControl();
  function handleDeleteContact() {
    api.contacts
      .deleteContact(contact.id)
      .then((response) => {
        console.log(response.data);
        const newSavedCompanies =
          companiesStore.savedCompanies.filter(
            (c) => c.id !== contact.id
          );
        companiesStore.setSavedCompanies(newSavedCompanies);
        toast.success("Contact deleted");
        dialogControl.closeModal("deleteAlert");
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        toast.error("Failed to delete company");
      })
      .finally(() => {});
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={"outline"}
            size={"icon"}
            className=" h-6 w-6"
          >
            <MoreVerticalIcon size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-right-3 top-0 absolute">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!contact.company && (
            <DropdownMenuItem
              onClick={() => {
                dialogControl.openModal("editContact", {
                  contact: contact,
                });
              }}
            >
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: handleDeleteContact,
              });
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
