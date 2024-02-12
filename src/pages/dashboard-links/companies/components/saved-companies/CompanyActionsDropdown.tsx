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
import { SavedCompany } from "@/types";
import { toast } from "sonner";

import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";

interface CompanyActionsDropdownProps {
  savedCompany: SavedCompany;
}
export default function CompanyActionsDropdown({
  savedCompany,
}: CompanyActionsDropdownProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSavedCompany } = useMutation({
    mutationFn: api.companies.deleteSavedCompany,
    onSuccess: (deletedSavedCompany) => {
      queryClient.setQueryData(
        ["savedCompanies"],
        (oldData: SavedCompany[]) => {
          return oldData.filter(
            (sc) => sc.id !== deletedSavedCompany.id
          );
        }
      );
      toast.success("Company deleted");
      dialogControl.closeModal("deleteAlert");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDeleteSavedCompany() {
    deleteSavedCompany(savedCompany.id);
  }
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
          {!savedCompany.company && (
            <DropdownMenuItem
              onClick={() => {
                dialogControl.openModal("editSavedCustomCompany", {
                  savedCompany: savedCompany,
                });
              }}
            >
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: handleDeleteSavedCompany,
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
