import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateDocumentForm from "../forms/CreateDocumentForm";

export default function CreateDocumentSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createDocument"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createDocument");
  function onConfirm() {
    dialogControl.modals.createDocument?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Add a document"
      description={`Helpful for applying`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateDocumentForm />
    </SmartOverlay>
  );
}
