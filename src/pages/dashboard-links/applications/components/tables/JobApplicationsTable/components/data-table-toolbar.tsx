import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/global/variables";
import { useDialogControl } from "@/hooks/useDialogControl";
import EditButton from "@/pages/dashboard-links/applications/components/EditButton";
import { DataTableViewOptions } from "@/pages/dashboard-links/applications/components/tables/JobApplicationsTable/components/data-table-view-options";
import { JobApplication } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder: string;
  searchKey: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  placeholder,
}: DataTableToolbarProps<TData>) {
  const [isLoading, setIsLoading] = useState(false);
  const dialogControl = useDialogControl();

  //   const isFiltered = table.getState().columnFilters.length > 0;
  const selectedCount = table.getSelectedRowModel().rows.length;
  const ja = table.getSelectedRowModel().rows[0]
    ?.original as JobApplication;

  const { mutateAsync: unarchiveJobApplications } = useMutation({
    mutationFn: api.applications.archiveJobApplications,
    onSuccess: (archivedCount: { count: number }) => {
      if (archivedCount.count === 0) {
        toast.warning(
          "Nothing has been archived in the database, probably id didn't match/ doesnt exist in db"
        );
        return;
      }
      const selectedApplicationsIds = table
        .getSelectedRowModel()
        .rows.map((row) => {
          return (row.original as JobApplication).id;
        });
      queryClient.invalidateQueries({
        queryKey: ["jobApplications"],
      });
      queryClient.setQueryData(
        ["jobApplications"],
        (oldData: JobApplication[]) => {
          return oldData.map((j) => {
            if (selectedApplicationsIds.includes(j.id)) {
              return {
                ...ja,
                isArchived: true,
                updatedAt: new Date(),
              };
            } else {
              return j;
            }
          });
        }
      );
      table.toggleAllPageRowsSelected(false);
      toast.success("Job Application Archived");
    },
    onError: (error: any) => {
      toast.error(error.data.response.message);
    },
  });

  const { mutateAsync: deleteJobApplications } = useMutation({
    mutationFn: api.applications.deleteJobApplications,
    onSuccess: (deletedCount: { count: number }) => {
      if (deletedCount.count === 0) {
        toast.warning(
          "Nothing has been deleted in the database, probably id didn't match"
        );
        return;
      }

      const selectedApplicationsIds = table
        .getSelectedRowModel()
        .rows.map((row) => {
          return (row.original as JobApplication).id;
        });

      queryClient.invalidateQueries({
        queryKey: ["jobApplications"],
      });

      table.toggleAllPageRowsSelected(false);
      toast.success("Job Application Deleted");
      dialogControl.closeModal("deleteAlert");
    },
    onError: (error: any) => {
      toast.error(error.data.response.message);
    },
  });

  function handleSelectedChangeStatus() {
    const ja = table.getSelectedRowModel().rows[0]
      .original as JobApplication;

    dialogControl.openModal("editStatus", { value: ja });
  }

  function handleArchiving() {
    const selectedApplicationsIds = table
      .getSelectedRowModel()
      .rows.map((row) => {
        return (row.original as JobApplication).id;
      });

    unarchiveJobApplications({
      ids: selectedApplicationsIds,
      isArchived: true,
    });
  }

  function onDelete() {
    const selectedApplicationsIds = table
      .getSelectedRowModel()
      .rows.map((row) => {
        return (row.original as JobApplication).id;
      });
    deleteJobApplications(selectedApplicationsIds);
  }

  return (
    <div className="flex items-center justify-start my-2 mt-4">
      <div className="flex min-w-72 items start space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table
              .getColumn(searchKey)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(searchKey)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      {selectedCount > 0 && (
        <div className="flex gap-1 ml-2">
          {selectedCount === 1 && (
            <Button
              disabled={isLoading}
              variant={"default"}
              onClick={handleSelectedChangeStatus}
            >
              Status
            </Button>
          )}
          {selectedCount === 1 && (
            <EditButton disabled={isLoading} ja={ja} />
          )}

          <Button
            variant={"outline"}
            disabled={isLoading}
            onClick={handleArchiving}
          >
            Archive
          </Button>
          <Button
            disabled={isLoading}
            variant={"destructive"}
            onClick={() => {
              dialogControl.openModal("deleteAlert", {
                onConfirm: onDelete,
              });
            }}
          >
            Delete
          </Button>
        </div>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
