import { useCreateNewModal } from "@/hooks/modals/useCreateNewModal";
import CreateJAForm from "../forms/CreateJAForm";
import SmartOverlay from "../ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/smart-overlays/useDialogControl";

export default function CreateJASmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createJA"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createJA");
  function onConfirm() {
    dialogControl.modals.createJA?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Add a new job application entry"
      description={`You don't have to fill out everything, just the first three fields are required.`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateJAForm />
    </SmartOverlay>
  );
}