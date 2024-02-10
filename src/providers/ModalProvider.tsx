import DeleteAlertModal from "@/components/modals/DeleteAlertModal";
import InterviewDateChangeModal from "@/components/modals/InterviewDateChangeModal";
import StatusChangeModal from "@/components/modals/StatusChangeModal";

export default function ModalProvider() {
  return (
    <>
      <DeleteAlertModal />
      <StatusChangeModal />
      <InterviewDateChangeModal />
    </>
  );
}
