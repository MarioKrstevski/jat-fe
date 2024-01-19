"use client";

import CreateNewJobApplicationModal from "@/components/modals/CreateNewJobApplicationModal";
import InterviewDateChangeModal from "@/components/modals/InterviewDateChangeModal";
import StatusChangeModal from "@/components/modals/StatusChangeModal";

export default function ModalProvider() {
  return (
    <>
      <CreateNewJobApplicationModal />
      <StatusChangeModal />
      <InterviewDateChangeModal />
    </>
  );
}
