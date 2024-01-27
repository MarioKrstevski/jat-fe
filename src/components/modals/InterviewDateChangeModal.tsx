import EditJANextInterviewDateForm from "../forms/EditJANextInterviewDateForm";
import { Modal } from "../ui/custom/modal";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function InterviewDateChangeModal() {
  const dialogControl = useDialogControl();
  const interviewDateChangeModal =
    dialogControl.modals["editInterviewDate"];

  const activeJobApplication = interviewDateChangeModal?.data.value;
  const isOpen = dialogControl.modals["editInterviewDate"]?.isOpen!;

  if (!activeJobApplication) {
    return null;
  }

  return (
    <Modal
      title="Interview Date Update"
      description={`Set the next interview date to be reminded about it`}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("editInterviewDate");
      }}
    >
      <EditJANextInterviewDateForm />
    </Modal>
  );
}
