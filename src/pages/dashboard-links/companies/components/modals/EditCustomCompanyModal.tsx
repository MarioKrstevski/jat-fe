import { useDialogControl } from "@/hooks/useDialogControl";
import { Modal } from "@/components/ui/custom/modal";
import SaveCustomCompanyForm from "../forms/SaveCustomCompanyForm";
import EditCustomCompanyForm from "../forms/EditCustomCompanyForm";

export default function EditCustomCompanyModal() {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["editCustomCompany"]?.isOpen!;

  return (
    <Modal
      title="Edit saved company data"
      description={`Change something or attach it to an existing company.`}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("editCustomCompany");
      }}
    >
      <EditCustomCompanyForm />
    </Modal>
  );
}
