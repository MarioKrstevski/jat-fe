import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { JobApplication } from "@/types";
import { useState } from "react";

import { DateTime } from "luxon";
import { cn, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function WishlistTable({
  applications,
}: {
  applications: JobApplication[];
}) {
  const navigate = useNavigate();
  const dialogControl = useDialogControl();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  function navigateToApplication(applicationId: string) {
    navigate("/d/applications/" + applicationId);
  }
  // sorty by createdAt desc
  applications.sort((a, b) => {
    // Check if either application is marked as favorite, ensuring these come first
    if (a.isFavorite && !b.isFavorite) {
      return -1; // a comes before b
    } else if (!a.isFavorite && b.isFavorite) {
      return 1; // b comes before a
    } else {
      // If both have the same isFavorite status, then sort by createdAt
      return (
        DateTime.fromISO(b.createdAt.toString()).toMillis() -
        DateTime.fromISO(a.createdAt.toString()).toMillis()
      );
    }
  });

  function handleInterviewDate(ja: JobApplication) {
    dialogControl.openModal("editInterviewDate", { value: ja });
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
    dialogControl.openModal("editStatus", { value: ja });
  }

  return (
    <div className="w-full p-2  overflow-x-auto">
      <h1 className="text-2xl font-bold">
        Archived Applications
        {/* <AddNewButton />{" "} */}
      </h1>

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
                {applications.map((ja, idx) => {
                  const nextInterviewDateFormatted =
                    ja.nextInterviewDate
                      ? formatDate(
                          ja.nextInterviewDate,
                          "MMMM dd, yyyy HH:mm"
                        )
                      : "N/A";

                  const createdAtFormatted = formatDate(
                    ja.createdAt,
                    "MMMM dd, yyyy HH:mm:ss"
                  );
                  const isRowSelected = selectedRows.includes(ja.id);
                  const key = ja.id + ja.updatedAt.toString();
                  return (
                    <TableRow
                      className={cn(
                        "",
                        ja.isFavorite &&
                          "bg-yellow-50 hover:bg-yellow-100"
                      )}
                      key={key}
                      data-state={isRowSelected ? "selected" : ""}
                    >
                      <TableCell className="font-bold pl-1">
                        <div className="flex flex-col gap-0.5 text-center">
                          {idx + 1}
                          {/* No need to have a selection, i dont want to mass unarchive no point in it */}
                          {/* <Checkbox
                              className="mx-auto h-5 w-5"
                              onClick={() => {
                                handleSelectRow(ja.id);
                              }}
                              name={"row-" + ja.id}
                              id={"row-checked-" + ja.id}
                            /> */}
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium job-title cursor-pointer"
                        onClick={() => navigateToApplication(ja.id)}
                      >
                        {ja.jobTitle}
                      </TableCell>
                      <TableCell
                        className="company-name cursor-pointer"
                        onClick={() => navigateToApplication(ja.id)}
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
                          {ja.nextStep}
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
        {applications.length === 0 && (
          <div className="flex justify-center w-full py-2">
            No job applications found that are wishlisted
          </div>
        )}
      </div>
    </div>
  );
}
