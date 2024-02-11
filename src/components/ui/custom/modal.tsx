import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  className = "",
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} modal onOpenChange={onChange}>
      <DialogContent
        className={cn(
          "overflow-y-auto max-h-[95dvh] transition-all duration-700",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="">{children}</div>
        {onConfirm && (
          <DialogFooter>
            <Button type="submit" onClick={onConfirm}>
              Save
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
