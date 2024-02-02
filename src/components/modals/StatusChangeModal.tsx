import { useDialogControl } from "@/hooks/useDialogControl";
import EditJAStatusForm from "../forms/applications/EditJAStatusForm";
import { Modal } from "../ui/custom/modal";

export default function StatusChangeModal() {
  const dialogControl = useDialogControl();
  const statusChangeModal = dialogControl.modals["editStatus"];
  const isOpen = dialogControl.modals["editStatus"]?.isOpen!;
  // console.log("isOpen", isOpen);

  const activeJobApplication = statusChangeModal?.data.value;
  // console.log("activeJobApplication", activeJobApplication);

  if (!activeJobApplication) {
    return null;
  }

  return (
    <Modal
      title="Status update"
      description={`Update the status of your job application, you can also change the next step and add a date for this event in your timeline. So that later on you can have a
      an overview of the time it took you to get a job. You can add custom status if you want to.
      `}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("editStatus");
      }}
    >
      <EditJAStatusForm />
    </Modal>
  );
}
