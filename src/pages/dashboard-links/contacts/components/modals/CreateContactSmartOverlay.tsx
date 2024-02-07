import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateContactForm from "../forms/CreateContactForm";

export default function CreateContactSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createContact"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createContact");
  function onConfirm() {
    dialogControl.modals.createJA?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Create a contact"
      description={`You can reach them at any time`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateContactForm />
    </SmartOverlay>
  );
}
