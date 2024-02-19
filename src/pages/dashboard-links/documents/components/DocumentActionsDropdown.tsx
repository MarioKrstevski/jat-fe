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
import { Document } from "@/types";
import { toast } from "sonner";

import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";

interface DocumentActionsDropdownProps {
  document: Document;
}
export default function DocumentActionsDropdown({
  document,
}: DocumentActionsDropdownProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: api.documents.deleteDocument,
    onSuccess: () => {
      toast.success("Document deleted");
      dialogControl.closeModal("deleteAlert");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDeleteDocument() {
    // @ts-ignore
    deleteDocument(document.id);
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("editDocument", {
                document: document,
              });
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: handleDeleteDocument,
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
