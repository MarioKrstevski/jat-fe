import { useDialogControl } from "@/hooks/useDialogControl";
import { Modal } from "@/components/ui/custom/modal";
import RequestCompanyForm from "../forms/RequestCompanyForm";

export default function RequestCompanyModal() {
  const dialogControl = useDialogControl();
  const isOpen = dialogControl.modals["requestCompany"]?.isOpen!;

  return (
    <Modal
      title="Request Company"
      description={`We will add the company as soon as possible. For now create a saved company directly`}
      isOpen={isOpen}
      onClose={() => {
        dialogControl.closeModal("requestCompany");
      }}
    >
      <RequestCompanyForm />
    </Modal>
  );
}
