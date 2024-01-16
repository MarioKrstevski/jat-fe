import { useEffect, useState } from "react";
import { Modal } from "../ui/custom/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function AlertModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: AlertModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={isLoading}
          variant={"outline"}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          variant={"destructive"}
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
}
