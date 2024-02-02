import { EditIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { JobApplication } from "@/types";
import { cn } from "@/lib/utils";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function EditButton({
  ja,
  className,
  icon,
  size = "default",
  variant = "default",
  disabled,
}: {
  ja: JobApplication;
  className?: string;
  icon?: boolean;
  disabled?: boolean;
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
  const dialogControl = useDialogControl();
  function handleEditJobApplication() {
    dialogControl.openModal("editJA", {
      value: ja,
    });
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("", className)}
      onClick={handleEditJobApplication}
      disabled={disabled}
    >
      Edit
      {icon && <EditIcon className="ml-1 h-3 w-3" />}
    </Button>
  );
}
