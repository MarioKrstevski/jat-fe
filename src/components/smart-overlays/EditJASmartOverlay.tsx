import EditJAForm from "../forms/EditJAForm";
import SmartOverlay from "../ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function EditJASmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editJA"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editJA");
  function onConfirm() {
    dialogControl.modals.editJA?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit data for this job application"
      description={`Change what you need`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditJAForm />
    </SmartOverlay>
  );
}
