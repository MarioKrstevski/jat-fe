import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { Column, JobApplication } from "@/types";
import { useEffect, useMemo, useState } from "react";
import TableHeaderAddon from "./TableHeaderAddon";

import { DateTime } from "luxon";
import { useStatusChangeModal } from "@/hooks/useStatusChangeModal";
import { cn, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { useInterviewDateChangeModal } from "@/hooks/useInterviewDateChangeModal";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import AddNewButton from "./AddNewButton";

const mustShowColumns = ["jobTitle", "companyName"];
const startingSelectedKeys = [
  "status",
  "waitingFor",
  "nextInterviewDate",
  "createdAt",
];
export default function JATable() {
  const jobApplications = useJobApplicationsStore(
    (state) => state.jobApplications
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const statusChangeModal = useStatusChangeModal();

  const [selectedColumns, setSelectedColumns] = useState(
    startingSelectedKeys
  );

  const usedColumns = [...mustShowColumns, ...selectedColumns];

  const interviewDateChangeModal = useInterviewDateChangeModal();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    setSelectedRows([]);
  }, [jobApplications]);

  //effect description

  function navgiateToJob(jobId: string) {
    navigate("/jobs/" + jobId);
  }
  const jobApplicationsToShow = jobApplications
    .filter((ja) => {
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
    })
    .filter((ja) => !ja.isArchived)
    // sort by created time
    .sort((a, b) => {
      return (
        DateTime.fromISO(b.createdAt.toString()).toMillis() -
        DateTime.fromISO(a.createdAt.toString()).toMillis()
      );
    });

  function handleInterviewDate(ja: JobApplication) {
    interviewDateChangeModal.setData({
      ja: ja,
      nextInterviewDate: ja.nextInterviewDate,
    });
    setTimeout(() => {
      console.log("here", {
        ja: ja,
        nextInterviewDate: ja.nextInterviewDate,
      });
      console.log("intem", interviewDateChangeModal.data);
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

  function handleSelectedChangeStatus() {
    const ja = jobApplications.find(
      (ja) => ja.id === selectedRows[0]
    )!;
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

  function determineHeaders(selectedColumns: string[]): Column[] {
    return [
      {
        isVisible: selectedColumns.includes("jobTitle"),
        label: "Position",
        key: "jobTitle",
        headerCustomCss: "w-[260px]",
        cell: {
          customCss: "font-medium job-title cursor-pointer",
          events: {
            onClick(ja) {
              navgiateToJob(ja.id);
            },
          },
        },
      },
      {
        isVisible: selectedColumns.includes("companyName"),
        label: "Company",
        key: "companyName",
        headerCustomCss: "",
        cell: {
          customCss: "company-name cursor-pointer",
          events: {
            onClick(ja) {
              navgiateToJob(ja.id);
            },
          },
        },
      },
      {
        isVisible: selectedColumns.includes("status"),
        label: "Status",
        key: "status",
        headerCustomCss: "",
        cell: {
          customCss: "text-left cursor-pointer",
          events: {
            onClick(ja) {
              handleChangeStatus(ja);
            },
          },
        },
      },
      {
        isVisible: selectedColumns.includes("waitingFor"),
        label: "Next Step",
        key: "waitingFor",
        headerCustomCss: "",
        cell: {
          customCss: "text-left cursor-pointer",
          events: {
            onClick(ja) {
              handleChangeStatus(ja);
            },
          },
        },
      },
      {
        isVisible: selectedColumns.includes("nextInterviewDate"),
        label: "Interview Date",
        key: "nextInterviewDate",
        headerCustomCss: "",
        cell: {
          customCss: "text-center ",
          events: {
            onClick(ja) {
              handleInterviewDate(ja);
            },
          },
          row(ja) {
            const nextInterviewDateFormatted = ja.nextInterviewDate
              ? formatDate(
                  ja.nextInterviewDate,
                  "MMMM dd, yyyy HH:mm"
                )
              : "N/A";
            return (
              <span className="cursor-pointer">
                {nextInterviewDateFormatted}
              </span>
            );
          },
        },
      },
      {
        isVisible: selectedColumns.includes("createdAt"),
        label: "Created At",
        key: "createdAt",
        headerCustomCss: "",
        cell: {
          customCss: "",
          events: {},
          row(ja) {
            const createdAtFormatted = formatDate(
              ja.createdAt,
              "MMMM dd, yyyy HH:mm:ss"
            );

            return <>{createdAtFormatted}</>;
          },
        },
      },
    ];
  }
  const columnData = useMemo(() => {
    return determineHeaders(usedColumns);
  }, [usedColumns]);

  const visibleColumns: Column[] = columnData.filter(
    (column) => column.isVisible
  );

  const headers = visibleColumns.map((column) => {
    return (
      <TableHead
        key={column.key}
        className={cn("", column.headerCustomCss)}
      >
        {column.label}
      </TableHead>
    );
  });

  function generateCells(
    ja: JobApplication,
    visibleFields: Column[]
  ) {
    return (
      <>
        {visibleFields.map((header: Column) => {
          return (
            <TableCell
              key={header.key}
              className={cn("", header.cell.customCss)}
              onClick={() => {
                if (header.cell.events.onClick) {
                  header.cell.events.onClick(ja);
                }
              }}
            >
              {header.cell.row ? (
                header.cell.row(ja)
              ) : (
                <>{ja[header.key]}</>
              )}
            </TableCell>
          );
        })}
      </>
    );
  }
  return (
    <div className="w-full p-2 relative">
      <div className="flex flex-row flex-wrap items-center">
        <TableHeaderAddon
          handleSelectedChangeStatus={handleSelectedChangeStatus}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          setSearchKeyword={setSearchKeyword}
          jobApplications={jobApplications}
        />
      </div>

      <div className="mt-4 w-full h-[60vh] overflow-y-auto">
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="text-sm">
                  <TableHead className="min-w-[30px]">#</TableHead>
                  {headers}
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobApplicationsToShow.map((ja, idx) => {
                  const isRowSelected = selectedRows.includes(ja.id);
                  const key = ja.id + ja.updatedAt.toString();
                  return (
                    <TableRow
                      key={key}
                      data-state={isRowSelected ? "selected" : ""}
                    >
                      <TableCell className="font-bold  sticky left-[-2px] pl-0 z-10 bg-white border-r ">
                        <div className="flex flex-col gap-0.5 text-center px-1 border-r h-full justify-stretch">
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
                      {generateCells(ja, visibleColumns)}
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
            <AddNewButton />
          </div>
        )}
      </div>
    </div>
  );
}
