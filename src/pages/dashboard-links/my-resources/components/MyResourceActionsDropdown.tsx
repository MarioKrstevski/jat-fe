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
import { MyResource } from "@/types";
import { toast } from "sonner";

import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";

interface MyResourceActionsDropdownProps {
  myResource: MyResource;
}
export default function MyResourceActionsDropdown({
  myResource,
}: MyResourceActionsDropdownProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMyResource } = useMutation({
    mutationFn: api.myResources.deleteMyResource,
    onSuccess: () => {
      toast.success("MyResource deleted");
      dialogControl.closeModal("deleteAlert");
      queryClient.invalidateQueries({ queryKey: ["myResources"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDeleteMyResource() {
    // @ts-ignore
    deleteMyResource(myResource.id);
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
              dialogControl.openModal("editMyResource", {
                myResource: myResource,
              });
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: handleDeleteMyResource,
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
