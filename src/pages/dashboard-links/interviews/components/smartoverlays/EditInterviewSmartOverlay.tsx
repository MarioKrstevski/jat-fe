import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditInterviewForm from "../forms/EditInterviewForm";

export default function EditInterviewSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editInterview"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editInterview");
  function onConfirm() {
    dialogControl.modals.editInterview?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit interview"
      description={`Update the interview details. Add notes for what happened in the interview.`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditInterviewForm />
    </SmartOverlay>
  );
}
