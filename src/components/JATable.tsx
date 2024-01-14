/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NOU6FCUtyFM
 */
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { SearchIcon, TrashIcon, PlusIcon } from "lucide-react";
import { JobApplication } from "@/types";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export default function JATable({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  if (jobApplications.length === 0) {
    return (
      <div>No job applications found. Create your first one</div>
    );
  }

  const jobApplicationsToShow = jobApplications.filter((ja) => {
    if (!searchKeyword) {
      return true;
    }
    return (
      ja.companyName
        .toLocaleLowerCase()
        .includes(searchKeyword.toLocaleLowerCase()) ||
      ja.status
        .toLocaleLowerCase()
        .includes(searchKeyword.toLocaleLowerCase())
    );
  });
  return (
    <div className="w-full m-2 overflow-x-auto">
      <div className="flex items-start gap-4">
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
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select columns" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Columns</SelectLabel> */}
                {Object.keys(jobApplications[0]).map((option) => {
                  return (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  );
                })}
                <SelectItem value="user-id">User ID</SelectItem>
                <SelectItem value="is-archived">
                  Is Archived
                </SelectItem>
                <SelectItem value="is-remote">Is Remote</SelectItem>
                <SelectItem value="was-referred">
                  Was Referred
                </SelectItem>
                <SelectItem value="referred-by">
                  Referred By
                </SelectItem>
                <SelectItem value="company-id">Company ID</SelectItem>
                <SelectItem value="company-name">
                  Company Name
                </SelectItem>
                <SelectItem value="company-info">
                  Company Info
                </SelectItem>
                <SelectItem value="job-position-title">
                  Job Position Title
                </SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="status-options">
                  Status Options
                </SelectItem>
                <SelectItem value="resume-used">
                  Resume Used
                </SelectItem>
                <SelectItem value="motivational-letter">
                  Motivational Letter
                </SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="created-at">Created At</SelectItem>
                <SelectItem value="updated-at">Updated At</SelectItem>
                <SelectItem value="next-interview-date">
                  Next Interview Date
                </SelectItem>
                <SelectItem value="salary-details">
                  Salary Details
                </SelectItem>
                <SelectItem value="applied-from">
                  Applied From
                </SelectItem>
                <SelectItem value="heard-about-from">
                  Heard About From
                </SelectItem>
                <SelectItem value="map-location">
                  Map Location
                </SelectItem>
                <SelectItem value="todos">Todos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 w-full">
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">#</TableHead>
                  <TableHead className="w-[300px]">
                    Position
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  {/* <TableHead>User ID</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobApplicationsToShow.map((ja, idx) => {
                  const createdAtDate = parseISO(
                    ja.createdAt.toString()
                  );
                  const createdAtFormatted = format(
                    createdAtDate,
                    "MMMM dd, yyyy HH:mm:ss"
                  );
                  return (
                    <TableRow key={ja.id}>
                      <TableCell className="font-bold">
                        {idx}
                      </TableCell>
                      <TableCell className="font-medium">
                        {ja.jobPositionTitle}
                      </TableCell>
                      <TableCell>{ja.companyName}</TableCell>
                      <TableCell>{ja.status}</TableCell>
                      <TableCell>{createdAtFormatted}</TableCell>
                      {/* <TableCell>{ja.userId}</TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
