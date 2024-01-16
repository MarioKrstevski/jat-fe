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
import { DateTime } from "luxon";
import { DateTimePicker } from "./DateTimePicker";
import { useStatusChangeModal } from "@/hooks/useStatusChangeModal";
import { formatDate } from "@/lib/utils";

export default function JATable({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const statusChangeModal = useStatusChangeModal();
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="w-full p-2  overflow-x-auto">
      <TableHeaderAddon
        setSearchKeyword={setSearchKeyword}
        jobApplications={jobApplications}
      />
      <div className="mt-4 w-full ">
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
                        {ja.jobTitle}
                      </TableCell>
                      <TableCell>{ja.companyName}</TableCell>
                      <TableCell>
                        <button
                          className="text-left"
                          onClick={() => handleChangeStatus(ja)}
                        >
                          {ja.status}
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="text-left"
                          onClick={() => handleChangeStatus(ja)}
                        >
                          {ja.waitingFor}
                        </button>
                      </TableCell>
                      <TableCell>
                        {nextInterviewDateFormatted}

                        <DateTimePicker
                          date={undefined}
                          setDate={() => {}}
                        />
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
