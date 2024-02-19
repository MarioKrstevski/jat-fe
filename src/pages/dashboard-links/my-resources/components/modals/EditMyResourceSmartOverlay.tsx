import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditMyResourceForm from "../forms/EditMyResourceForm";

export default function EditMyResourceSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editMyResource"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("editMyResource");
  function onConfirm() {
    dialogControl.modals.editMyResource?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Edit myResource"
      description={`Edit details`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <EditMyResourceForm />
    </SmartOverlay>
  );
}
