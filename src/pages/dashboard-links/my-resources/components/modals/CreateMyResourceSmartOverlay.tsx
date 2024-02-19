import SmartOverlay from "@/components/ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateMyResourceForm from "../forms/CreateMyResourceForm";

export default function CreateMyResourceSmartOverlay({}) {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["createMyResource"]?.isOpen!;
  const onClose = () => dialogControl.closeModal("createMyResource");
  function onConfirm() {
    dialogControl.modals.createMyResource?.data?.onConfirm();
  }
  return (
    <SmartOverlay
      title="Add a myResource"
      description={`Helpful for applying`}
      isOpen={isOpen}
      onClose={onClose}
      //   onConfirm={onConfirm}
    >
      <CreateMyResourceForm />
    </SmartOverlay>
  );
}
