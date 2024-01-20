import { EditIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCreateNewModal } from "@/hooks/useCreateNewModal";
import { useEditModal } from "@/hooks/useEditModal";
import { JobApplication } from "@/types";
import { cn } from "@/lib/utils";

export default function EditButton({
  ja,
  className,
  icon,
  size = "default",
  variant = "default",
}: {
  ja: JobApplication;
  className?: string;
  icon?: boolean;
  size?: "icon" | "sm" | "default" | "lg" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}) {
  const editModal = useEditModal();
  function handleEditJobApplication() {
    editModal.setData(ja);
    setTimeout(() => {
      editModal.onOpen();
    }, 100);
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("", className)}
      onClick={handleEditJobApplication}
    >
      Edit
      {icon && <EditIcon className="ml-1 h-3 w-3" />}
    </Button>
  );
}
