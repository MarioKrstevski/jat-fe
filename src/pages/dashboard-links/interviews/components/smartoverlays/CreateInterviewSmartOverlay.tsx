import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateInterviewForm from "../forms/CreateInterviewForm";

export default function CreateInterviewSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createInterview"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createInterview");
  function onConfirm() {
    dialogControl.modals.createInterview?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Create an interview"
      description={`We highly suggest to create a job application first. So that you can link it to the interview.`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateInterviewForm />
    </SmartOverlay>
  );
}
