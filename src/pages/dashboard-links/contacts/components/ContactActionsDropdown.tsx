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

import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";

interface ContactActionsDropdownProps {
  contact: Contact;
}
export default function ContactActionsDropdown({
  contact,
}: ContactActionsDropdownProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteContact } = useMutation({
    mutationFn: api.contacts.deleteContact,
    onSuccess: () => {
      toast.success("Contact deleted");
      dialogControl.closeModal("deleteAlert");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDeleteContact() {
    // @ts-ignore
    deleteContact(contact.id);
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={"outline"}
            size={"icon"}
            className=" h-6 w-6 bg-transparent border"
          >
            <MoreVerticalIcon size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-right-3 top-0 absolute p-1">
          <DropdownMenuLabel className="py-1">
            Actions
          </DropdownMenuLabel>
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
