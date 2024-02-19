import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditTemplateForm from "../forms/EditTemplateForm";

export default function EditTemplateSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editTemplate"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editTemplate");
  function onConfirm() {
    dialogControl.modals.editTemplate?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit template"
      description={`Edit details`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditTemplateForm />
    </SmartOverlay>
  );
}
