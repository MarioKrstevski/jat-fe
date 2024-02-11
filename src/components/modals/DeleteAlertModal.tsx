import { useEffect, useState } from "react";
import { Modal } from "../ui/custom/modal";
import { Button } from "../ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function DeleteAlertModal() {
  const dialogControl = useDialogControl();
  const deleteAlertModal = dialogControl.modals["deleteAlert"];

  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = deleteAlertModal?.data.onConfirm;
  function onClose() {
    dialogControl.closeModal("deleteAlert");
  }
  const isOpen = dialogControl.modals["deleteAlert"]?.isOpen!;

  if (!deleteAlertModal) {
    return null;
  }
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
      className="w-11/12 rounded p-4"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end  ">
        <Button
          disabled={isLoading}
          variant={"ghost"}
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
