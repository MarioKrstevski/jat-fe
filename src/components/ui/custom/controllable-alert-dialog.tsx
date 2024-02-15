import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ControllableAlertDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  className?: string;
  informativeOnly?: boolean; // Goal is to just show a message
  children?: React.ReactNode;
}
export default function ControllableAlertDialog({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  className = "",
  children,
  informativeOnly, // if this is used, children will be ignored
}: ControllableAlertDialogProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          "overflow-y-auto max-h-[95dvh] transition-all duration-700",
          className
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onConfirm ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                Continue
              </AlertDialogAction>
            </>
          ) : informativeOnly ? (
            <AlertDialogCancel>OK</AlertDialogCancel>
          ) : (
            children
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
