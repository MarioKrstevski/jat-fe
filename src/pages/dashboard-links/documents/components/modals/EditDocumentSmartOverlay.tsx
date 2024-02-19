import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditDocumentForm from "../forms/EditDocumentForm";

export default function EditDocumentSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editDocument"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editDocument");
  function onConfirm() {
    dialogControl.modals.editDocument?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit document"
      description={`Edit details`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditDocumentForm />
    </SmartOverlay>
  );
}
