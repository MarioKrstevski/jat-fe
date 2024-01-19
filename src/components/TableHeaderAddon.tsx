import { JobApplication } from "@/types";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, PlusIcon, SearchIcon } from "lucide-react";
import ColumnSelector from "./ColumnSelector";
import { Button } from "./ui/button";
import AddNewButton from "./AddNewButton";

export default function TableHeaderAddon({
  setSearchKeyword,
  selectedCount,
  jobApplications,
}: {
  selectedCount: number;
  setSearchKeyword: any;
  jobApplications: JobApplication[];
}) {
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
            {selectedCount === 1 && (
              <Button variant={"default"}> Status </Button>
            )}
            {selectedCount === 1 && (
              <Button variant={"default"}> Edit </Button>
            )}
            <Button variant={"destructive"}> Delete </Button>
            <Button variant={"outline"}> Archive </Button>
          </div>
        )}
        {/* <ColumnSelector jobApplications={jobApplications} /> */}
      </div>
    </>
  );
}
