import { JobApplication } from "@/types";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ColumnSelector from "./ColumnSelector";

export default function TableHeaderAddon({
  setSearchKeyword,
  jobApplications,
}: {
  setSearchKeyword: any;
  jobApplications: JobApplication[];
}) {
  return (
    <div className="flex items-start mt-4 gap-4">
      <div className="">
        <h1 className="text-2xl font-bold">Job Applications</h1>
      </div>
      <div className="flex-1">
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
      <ColumnSelector jobApplications={jobApplications} />
    </div>
  );
}
