import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateTemplateForm from "../forms/CreateTemplateForm";

export default function CreateTemplateSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createTemplate"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createTemplate");
  function onConfirm() {
    dialogControl.modals.createTemplate?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Add a template"
      description={`Helpful for applying`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateTemplateForm />
    </SmartOverlay>
  );
}
