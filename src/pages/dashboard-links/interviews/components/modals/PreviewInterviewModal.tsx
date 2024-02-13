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
      title="Interview Details"
      description={``}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("previewInterview");
      }}
      className="w-[88%] sm:w-full overflow-y-auto max-h-[90%] sm:max-h-[90%]"
    >
      <InterviewDetails />
    </Modal>
  );
}
