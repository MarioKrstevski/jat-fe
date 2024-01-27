import { ColumnDef } from "@tanstack/react-table";

import { JobApplication } from "@/types";
import { useNavigate } from "react-router-dom";
import { useStatusChangeModal } from "@/hooks/modals/useStatusChangeModal";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatDate } from "@/lib/utils";
import { useInterviewDateChangeModal } from "@/hooks/modals/useInterviewDateChangeModal";

export type JobApplicationColumn = JobApplication;
type ExtendedColumnDef<T> = ColumnDef<T> & {
  cellClassName?: string;
};

function CompanyNameField({ ja }: { ja: JobApplication }) {
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

function JobTitleField({ ja }: { ja: JobApplication }) {
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

function InterviewDateField({ ja }: { ja: JobApplication }) {
  const interviewDateChangeModal = useInterviewDateChangeModal();
  function handleInterviewDate(ja: JobApplication) {
    interviewDateChangeModal.setData({
      ja: ja,
      nextInterviewDate: ja.nextInterviewDate,
    });
    setTimeout(() => {
      console.log("here", {
        ja: ja,
        nextInterviewDate: ja.nextInterviewDate,
      });
      console.log("intem", interviewDateChangeModal.data);
      interviewDateChangeModal.onOpen();
    }, 100);
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

function StatusField({
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

export const columns: ExtendedColumnDef<JobApplicationColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px] mr-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <JobTitleField ja={row.original} />,
    cellClassName: "job-title p-0 cursor-pointer",
    enableHiding: true,
  },
  {
    accessorKey: "companyName",
    cellClassName: "company-name p-0 cursor-pointer",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => <CompanyNameField ja={row.original} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <StatusField ja={row.original} label="status" />
    ),
  },
  {
    accessorKey: "waitingFor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Step" />
    ),
    cell: ({ row }) => (
      <StatusField ja={row.original} label="waitingFor" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    cellClassName: "text-center",
    accessorKey: "nextInterviewDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Interview" />
    ),
    cell: ({ row }) => <InterviewDateField ja={row.original} />,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    enableSorting: true,
    enableHiding: false,
  },
];
