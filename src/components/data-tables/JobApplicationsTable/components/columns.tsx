import { ColumnDef } from "@tanstack/react-table";

import { JobApplication } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatDate } from "@/lib/utils";
import {
  CompanyNameField,
  InterviewDateField,
  JobTitleField,
  StatusField,
} from "./custom-fields";

export type JobApplicationColumn = JobApplication;
type ExtendedColumnDef<T> = ColumnDef<T> & {
  cellClassName?: string;
};

export const columns: ExtendedColumnDef<JobApplicationColumn>[] = [
  {
    id: "select",
    cellClassName: "sticky left-0 bg-white z-10",
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
        className="translate-y-[2px] mr-3 "
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
    cell: ({ row }) => {
      const createdAtFormatted = formatDate(
        row.original.createdAt,
        "MMMM dd, yyyy"
      );

      return <>{createdAtFormatted}</>;
    },
    enableSorting: true,
    enableHiding: false,
  },
];
