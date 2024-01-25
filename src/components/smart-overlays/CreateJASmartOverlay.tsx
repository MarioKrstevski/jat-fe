import { useCreateNewModal } from "@/hooks/modals/useCreateNewModal";
import CreateJAForm from "../forms/CreateJAForm";
import SmartOverlay from "../ui/custom/smart-overlay";
import { useDialogControl } from "@/hooks/smart-overlays/useDialogControl";

export default function CreateJASmartOverlay({}) {
  const createNewModal = useCreateNewModal((state) => state.onClose);

  const modalControl = useDialogControl();
  const isOpen = modalControl.modals["createJA"]?.isOpen!;
  const onClose = () => modalControl.closeModal("createJA");
  return (
    <SmartOverlay
      title="Add a new job application entry"
      description={`You don't have to fill out everything, just the first three fields are required.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateJAForm />
    </SmartOverlay>
  );
}
