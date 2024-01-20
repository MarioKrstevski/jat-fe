import { JobApplication } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Edit,
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import ColumnSelector from "./ColumnSelector";
import { Button } from "./ui/button";
import AddNewButton from "./AddNewButton";
import EditButton from "./EditButton";
import AlertModal from "./modals/AlertModal";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "date-fns";

export default function TableHeaderAddon({
  handleSelectedChangeStatus,
  setSearchKeyword,
  selectedRows,
  jobApplications,
}: {
  handleSelectedChangeStatus: () => void;
  selectedRows: string[];
  setSearchKeyword: any;
  jobApplications: JobApplication[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Id copied to clipboard");
  }

  function onDelete() {
    toast.success("Job Application Deleted");
    setIsOpen(false);
  }

  function handleArchiving() {
    toast.success("Job Application Archived");
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
                setIsOpen(false);
              }}
            />
            {selectedCount === 1 && (
              <Button
                variant={"default"}
                onClick={handleSelectedChangeStatus}
              >
                Status
              </Button>
            )}
            {selectedCount === 1 && <EditButton ja={ja} />}

            <Button
              variant={"destructive"}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              {" "}
              Delete{" "}
            </Button>
            <Button variant={"outline"} onClick={handleArchiving}>
              {" "}
              Archive{" "}
            </Button>
          </div>
        )}
        {/* <ColumnSelector jobApplications={jobApplications} /> */}
      </div>
    </>
  );
}
