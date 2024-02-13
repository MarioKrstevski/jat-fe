import { Modal } from "@/components/ui/custom/modal";
import { useDialogControl } from "@/hooks/useDialogControl";
import InterviewDetails from "../InterviewDetails";

export default function PreviewInterviewModal() {
  const dialogControl = useDialogControl();
  const previewModal = dialogControl.modals["previewInterview"];
  const activeInterview = previewModal?.data.activeInterview;
  const isOpen = dialogControl.modals["previewInterview"]?.isOpen!;

  if (!activeInterview) {
    return null;
  }

  return (
    <Modal
      title="Interview Preview"
      description={``}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("previewInterview");
      }}
    >
      <InterviewDetails />
    </Modal>
  );
}
