import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-tables/JobApplicationsTable/components/data-table-view-options";
import AlertModal from "@/components/modals/AlertModal";
import EditButton from "@/components/EditButton";
import { useState } from "react";
import { JobApplication } from "@/types";
import { api } from "@/api/backend";
import { useAuth } from "@clerk/clerk-react";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { toast } from "sonner";
import { useDialogControl } from "@/hooks/useDialogControl";

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
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jobApplicationStore = useJobApplicationsStore();
  const dialogControl = useDialogControl();

  const statusChangeModal = dialogControl.modals["editStatus"];

  //   const isFiltered = table.getState().columnFilters.length > 0;
  const selectedCount = table.getSelectedRowModel().rows.length;
  const ja = table.getSelectedRowModel().rows[0]
    ?.original as JobApplication;

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

    setIsLoading(true);
    api.applications
      .archiveJobApplications(selectedApplicationsIds, userId!, true)
      .then((res) => {
        console.log("res", res.data);

        if (res.data?.count === 0) {
          toast.warning(
            "Nothing has been archived in the database, probably id didn't match/ doesnt exist in db"
          );
          return;
        }

        const updatedJobApplications =
          jobApplicationStore.jobApplications.map((ja) => {
            if (selectedApplicationsIds.includes(ja.id)) {
              return {
                ...ja,
                isArchived: true,
                updatedAt: new Date(),
              };
            } else {
              return ja;
            }
          });

        jobApplicationStore.setData(updatedJobApplications);
        table.toggleAllPageRowsSelected(false);
        toast.success("Job Application Archived");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onDelete() {
    const selectedApplicationsIds = table
      .getSelectedRowModel()
      .rows.map((row) => {
        return (row.original as JobApplication).id;
      });
    setIsLoading(true);
    api.applications
      .deleteJobApplication(selectedApplicationsIds, userId!)
      .then((res) => {
        console.log("res", res.data);

        // if nothing has been delted
        if (res.data?.count === 0) {
          toast.warning(
            "Nothing has been deleted in the database, probably id didn't match"
          );
          return;
        }

        const updatedJobApplications =
          jobApplicationStore.jobApplications.filter(
            (ja) => !selectedApplicationsIds.includes(ja.id)
          );

        jobApplicationStore.setData(updatedJobApplications);
        table.toggleAllPageRowsSelected(false);
        toast.success("Job Application Deleted");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <AlertModal
            isOpen={isOpen}
            isLoading={isLoading}
            onConfirm={onDelete}
            onClose={() => {
              if (!isLoading) {
                setIsOpen(false);
              }
            }}
          />
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
              setIsOpen(true);
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
