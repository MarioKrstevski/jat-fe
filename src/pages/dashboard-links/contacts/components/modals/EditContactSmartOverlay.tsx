import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditContactForm from "../forms/EditContactForm";

export default function EditContactSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editContact"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editContact");
  function onConfirm() {
    dialogControl.modals.createJA?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit contact"
      description={`Change the contact's details`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditContactForm />
    </SmartOverlay>
  );
}
