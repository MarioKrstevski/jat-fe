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
import { cn, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { useInterviewDateChangeModal } from "@/hooks/useInterviewDateChangeModal";

export default function JATable({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const statusChangeModal = useStatusChangeModal();
  const interviewDateChangeModal = useInterviewDateChangeModal();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  if (jobApplications.length === 0) {
    return (
      <div>No job applications found. Create your first one</div>
    );
  }

  function navgiateToJob(jobId: string) {
    navigate("/jobs/" + jobId);
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

  function handleInterviewDate(ja: JobApplication) {
    interviewDateChangeModal.setData({
      ja: ja,
      date: ja.nextInterviewDate,
    });
    setTimeout(() => {
      interviewDateChangeModal.onOpen();
    }, 100);
  }

  function handleSelectRow(id: string) {
    // add id to array or remove it if its there
    if (selectedRows.includes(id)) {
      // remove id from array
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows((prev) => [...prev, id]);
    }
  }

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
        selectedCount={selectedRows.length}
        setSearchKeyword={setSearchKeyword}
        jobApplications={jobApplications}
      />
      <div className="mt-4 w-full ">
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="text-sm">
                  <TableHead className="min-w-[30px]">#</TableHead>
                  <TableHead className="w-[260px]">
                    Position
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Step</TableHead>
                  <TableHead>Interview Date</TableHead>
                  <TableHead>Created At</TableHead>
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
                  const isRowSelected = selectedRows.includes(ja.id);
                  return (
                    <TableRow
                      key={ja.id}
                      data-state={isRowSelected ? "selected" : ""}
                    >
                      <TableCell className="font-bold pl-1 ">
                        <div className="flex flex-col gap-0.5 text-center">
                          {idx + 1}
                          <Checkbox
                            className="mx-auto h-5 w-5"
                            onClick={() => {
                              handleSelectRow(ja.id);
                            }}
                            name={"row-" + ja.id}
                            id={"row-checked-" + ja.id}
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium job-title cursor-pointer"
                        onClick={() => navgiateToJob(ja.id)}
                      >
                        {ja.jobTitle}
                      </TableCell>
                      <TableCell
                        className="company-name cursor-pointer"
                        onClick={() => navgiateToJob(ja.id)}
                      >
                        {ja.companyName}
                      </TableCell>
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
                        <button
                          onClick={() => handleInterviewDate(ja)}
                        >
                          {nextInterviewDateFormatted}
                        </button>
                      </TableCell>
                      <TableCell>{createdAtFormatted}</TableCell>

                      {/* <TableCell>{ja.userId}</TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        {jobApplicationsToShow.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full mt-5 py-2">
            You have no job applications created
            <Button className="w-max my-2">Add new</Button>
          </div>
        )}
      </div>
    </div>
  );
}