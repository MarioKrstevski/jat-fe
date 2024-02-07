import { useDialogControl } from "@/hooks/useDialogControl";
import { Modal } from "@/components/ui/custom/modal";
import RequestCompanyForm from "../forms/RequestCompanyForm";
import SaveCustomCompanyForm from "../forms/SaveCustomCompanyForm";

export default function SaveCustomCompanyModal() {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["saveCustomCompany"]?.isOpen!;

  return (
    <Modal
      title="Save New Company"
      description={`Will be added to your saved colletion with a note attached to it`}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("saveCustomCompany");
      }}
    >
      <SaveCustomCompanyForm />
    </Modal>
  );
}
