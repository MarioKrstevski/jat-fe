import CreateNewJobApplicationModal from "@/components/modals/CreateNewJobApplicationModal";
import EditJobApplicationModal from "@/components/modals/EditJobApplicationModal";
import InterviewDateChangeModal from "@/components/modals/InterviewDateChangeModal";
import StatusChangeModal from "@/components/modals/StatusChangeModal";

export default function ModalProvider() {
  return (
    <>
      <EditJobApplicationModal />
      {/* <CreateNewJobApplicationModal /> */}
      <StatusChangeModal />
      <InterviewDateChangeModal />
    </>
  );
}
