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
import { Template } from "@/types";
import { toast } from "sonner";

import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";

interface TemplateActionsDropdownProps {
  template: Template;
}
export default function TemplateActionsDropdown({
  template,
}: TemplateActionsDropdownProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTemplate } = useMutation({
    mutationFn: api.templates.deleteTemplate,
    onSuccess: () => {
      toast.success("Template deleted");
      dialogControl.closeModal("deleteAlert");
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDeleteTemplate() {
    // @ts-ignore
    deleteTemplate(template.id);
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
              dialogControl.openModal("editTemplate", {
                template: template,
              });
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: handleDeleteTemplate,
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
