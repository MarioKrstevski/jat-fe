import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { JobApplication } from "@/types";
import AlertModal from "./modals/AlertModal";
import { useState } from "react";
import { set } from "date-fns";

export default function ActionList({
  data,
}: {
  data: JobApplication;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Id copied to clipboard");
  }

  function onDelete() {
    toast.success("Job Application Deleted");
    setIsOpen(false);
  }

  return (
    <>
      {/* we use isOpen conditional to not have multiple alert modals that are not rendered altough its not hurting it */}
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          isLoading={isLoading}
          onConfirm={onDelete}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <EditIcon className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
