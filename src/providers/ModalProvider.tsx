import InterviewDateChangeModal from "@/components/modals/InterviewDateChangeModal";
import StatusChangeModal from "@/components/modals/StatusChangeModal";

export default function ModalProvider() {
  return (
    <>
      <StatusChangeModal />
      <InterviewDateChangeModal />
    </>
  );
}
