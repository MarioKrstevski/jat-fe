import { JobApplication } from "@/types";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ColumnSelector from "./ColumnSelector";
import { Button } from "./ui/button";
import AddNewButton from "./AddNewButton";
import EditButton from "./EditButton";
import AlertModal from "./modals/AlertModal";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "date-fns";
import { api } from "@/api/backend";
import { useAuth } from "@clerk/clerk-react";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";

export default function TableHeaderAddon({
  handleSelectedChangeStatus,
  setSearchKeyword,
  selectedRows,
  setSelectedRows,
  jobApplications,
}: {
  handleSelectedChangeStatus: () => void;
  selectedRows: string[];
  setSelectedRows: any;
  setSearchKeyword: any;
  jobApplications: JobApplication[];
}) {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jobApplicationStore = useJobApplicationsStore();

  function onDelete() {
    setIsLoading(true);
    api
      .be_deleteJobApplication(selectedRows, userId!)
      .then((res) => {
        console.log("res", res.data);

        const updatedJobApplications = jobApplications.filter(
          (ja) => !selectedRows.includes(ja.id)
        );

        jobApplicationStore.setData(updatedJobApplications);
        setSelectedRows([]);
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

  function handleArchiving() {
    setIsLoading(true);
    api
      .be_archiveJobApplication(selectedRows, userId!, true)
      .then((res) => {
        console.log("res", res.data);

        const updatedJobApplications = jobApplications.map((ja) => {
          if (selectedRows.includes(ja.id)) {
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
        setSelectedRows([]);
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
  const selectedCount = selectedRows.length;
  const ja = jobApplications.find((ja) => ja.id === selectedRows[0])!;
  return (
    <>
      <h1 className="text-2xl font-bold">
        Job Applications <AddNewButton />
      </h1>
      <div className="flex items-start mt-4 gap-4">
        <div className="min-w-[300px]">
          <form>
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 max-w-[350px] dark:bg-gray-950"
                placeholder="Search by company or by status..."
                type="search"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </form>
        </div>
        {selectedCount > 0 && (
          <div className="flex gap-1">
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
        {/* <ColumnSelector jobApplications={jobApplications} /> */}
      </div>
    </>
  );
}
