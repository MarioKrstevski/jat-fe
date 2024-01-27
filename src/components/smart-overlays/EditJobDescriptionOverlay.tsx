import SmartOverlay from "../ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
// import { WysiwygEditor } from "../WysiwygEditor"; // Import your WysiwygEditor component

export default function EditJobDescriptionModal({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editJobDescription"]?.isOpen!;
  const onClose = () =>
    dialogControl.closeModal("editJobDescription");
  function onConfirm() {
    dialogControl.modals.editJobDescription?.data?.onConfirm();
  }

  return (
    <SmartOverlay
      title="Edit job description"
      description={`Change the job description here`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <form action="">Form</form>
      {/* <WysiwygEditor /> Use your WysiwygEditor component here */}
    </SmartOverlay>
  );
}
