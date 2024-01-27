import { useNavigate } from "react-router-dom";
import { useStatusChangeModal } from "@/hooks/modals/useStatusChangeModal";
import { useInterviewDateChangeModal } from "@/hooks/modals/useInterviewDateChangeModal";

import { JobApplication } from "@/types";
import { formatDate } from "@/lib/utils";
import { useDialogControl } from "@/hooks/useDialogControl";

export function CompanyNameField({ ja }: { ja: JobApplication }) {
  const navigate = useNavigate();
  function navgiateToJob(jobId: string) {
    navigate("/jobs/" + jobId);
  }
  return (
    <div
      className=" p-2 font-medium"
      onClick={() => navgiateToJob(ja.id)}
    >
      {ja.companyName}
    </div>
  );
}

export function JobTitleField({ ja }: { ja: JobApplication }) {
  const navigate = useNavigate();
  function navgiateToJob(jobId: string) {
    navigate("/jobs/" + jobId);
  }
  return (
    <div className="  p-2 " onClick={() => navgiateToJob(ja.id)}>
      {ja.jobTitle}
    </div>
  );
}

export function InterviewDateField({ ja }: { ja: JobApplication }) {
  const dialogControl = useDialogControl();

  function handleInterviewDate(ja: JobApplication) {
    dialogControl.openModal("editInterviewDate", { value: ja });
  }

  const nextInterviewDateFormatted = ja.nextInterviewDate
    ? formatDate(ja.nextInterviewDate, "MMMM dd, yyyy HH:mm")
    : "N/A";
  return (
    <span
      className="cursor-pointer text-center"
      onClick={() => handleInterviewDate(ja)}
    >
      {nextInterviewDateFormatted}
    </span>
  );
}

export function StatusField({
  ja,
  label,
}: {
  ja: JobApplication;
  label: any;
}) {
  const statusChangeModal = useStatusChangeModal();
  function handleChangeStatus(ja: JobApplication) {
    statusChangeModal.setData({
      ja: ja,
      status: ja.status,
      nextStep: ja.waitingFor,
      statusOptions: ja.statusOptions,
    });
    setTimeout(() => {
      statusChangeModal.onOpen();
    }, 100);
  }
  return (
    <div
      className="cursor-pointer"
      onClick={() => handleChangeStatus(ja)}
    >
      {/* @ts-ignore */}
      {ja[label]}
    </div>
  );
}
