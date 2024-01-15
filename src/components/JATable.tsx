import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { JobApplication, JobApplicationStatus } from "@/types";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import TableHeaderAddon from "./TableHeaderAddon";
import ActionList from "./ActionList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import StateSelector from "./StateSelector";
import { Button } from "./ui/button";
function formatDate(date: Date, formatString: string) {
  const dateParsed = parseISO(date.toString());
  return format(dateParsed, formatString);
}
function StatusChanger2({ ja }: { ja: JobApplication }) {
  const statusOptions = ja.statusOptions.split(
    ","
  ) as JobApplicationStatus[];
  return (
    <Dialog>
      <DialogTrigger>
        {ja.waitingFor ? ja.waitingFor : "Add What's next"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your status</DialogTitle>
          <DialogDescription>
            <StatusChanger ja={ja} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatusChanger({ ja }: { ja: JobApplication }) {
  const statusOptions = ja.statusOptions.split(
    ","
  ) as JobApplicationStatus[];
  return (
    <div className="">
      <div className="flex  gap-2 ">
        <div>
          Current Status:
          <br />
          <StateSelector
            current={ja.waitingFor}
            states={statusOptions}
          />
        </div>
        <div>
          Next Step: <br />{" "}
          <StateSelector
            current={ja.waitingFor}
            states={statusOptions}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="mt-4 "> Save Changes </Button>
      </div>
    </div>
  );
}
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
    <div className="w-full m-2  overflow-x-auto">
      <TableHeaderAddon
        setSearchKeyword={setSearchKeyword}
        jobApplications={jobApplications}
      />
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
                  <TableHead>Next Step</TableHead>
                  <TableHead>Interview Date</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                  {/* <TableHead>User ID</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobApplicationsToShow.map((ja, idx) => {
                  const nextInterviewDateFormatted = formatDate(
                    ja.nextInterviewDate,
                    "MMMM dd, yyyy HH:mm"
                  );

                  const createdAtFormatted = formatDate(
                    ja.createdAt,
                    "MMMM dd, yyyy HH:mm:ss"
                  );
                  return (
                    <TableRow key={ja.id}>
                      <TableCell className="font-bold">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {ja.jobPositionTitle}
                      </TableCell>
                      <TableCell>{ja.companyName}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger className="text-left w-min">
                            {ja.status}
                          </PopoverTrigger>
                          <PopoverContent className="w-full shadow-2xl">
                            <StatusChanger ja={ja} />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <StatusChanger2 ja={ja} />
                      </TableCell>
                      <TableCell>
                        {nextInterviewDateFormatted}
                      </TableCell>
                      <TableCell>{createdAtFormatted}</TableCell>
                      <TableCell>
                        <ActionList data={ja} />
                      </TableCell>
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
