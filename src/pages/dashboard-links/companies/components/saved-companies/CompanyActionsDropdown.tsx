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

import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useDialogControl } from "@/hooks/useDialogControl";
import { MoreVerticalIcon } from "lucide-react";

interface CompanyActionsDropdownProps {
  savedCompany: SavedCompany;
}
export default function CompanyActionsDropdown({
  savedCompany,
}: CompanyActionsDropdownProps) {
  const companiesStore = useCompaniesStore();
  const dialogControl = useDialogControl();
  function handleDeleteSavedCompany() {
    api.companies
      .deleteCustomCompany(savedCompany.id)
      .then((response) => {
        console.log(response.data);
        const newSavedCompanies =
          companiesStore.savedCompanies.filter(
            (c) => c.id !== savedCompany.id
          );
        companiesStore.setSavedCompanies(newSavedCompanies);
        toast.success("Company deleted");
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
                dialogControl.openModal("editCustomCompany", {
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
