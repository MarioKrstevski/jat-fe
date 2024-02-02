import { JobApplication, TimelineEntry } from "@/types";
import { Textarea } from "../../../components/ui/textarea";
import { dateDistance } from "@/lib/utils";
import { Button } from "../../../components/ui/button";
import {
  DeleteIcon,
  EditIcon,
  TrashIcon,
  Undo2Icon,
  UndoIcon,
} from "lucide-react";
import { format, set } from "date-fns";
import EditButton from "./components/EditButton";
import { useState } from "react";
import AlertModal from "../../../components/modals/AlertModal";
import { api } from "@/api/backend";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useNavigate } from "react-router-dom";
interface JobApplicationDetailsProps {
  jobApplication: JobApplication;
}
export default function JobApplicationDetails({
  jobApplication,
}: JobApplicationDetailsProps) {
  const ja = jobApplication;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jobApplicationStore = useJobApplicationsStore();

  function onDelete() {
    setIsLoading(true);
    api.applications
      .deleteJobApplication([ja.id])
      .then((res) => {
        console.log("res", res.data);

        if (res.data?.count === 0) {
          toast.warning(
            "Nothing has been deleted in the database, probably id didn't match"
          );
          return;
        }
        const updatedJobApplications =
          jobApplicationStore.jobApplications.filter(
            (ja) => ja.id !== jobApplication.id
          );

        jobApplicationStore.setData(updatedJobApplications);
        toast.success("Job Application Deleted");
        setIsOpen(false);
        navigate("/d/applications");
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUnarchiving() {
    setIsLoading(true);
    api.applications
      .archiveJobApplications([jobApplication.id], false)
      .then((res) => {
        console.log("res", res.data);

        if (res.data?.count === 0) {
          toast.warning(
            "Nothing has been archived in the database, probably id didn't match/ doesnt exist in db"
          );
          return;
        }

        const updatedJobApplications =
          jobApplicationStore.jobApplications.map((ja) => {
            if (jobApplication.id === ja.id) {
              return {
                ...ja,
                isArchived: false,
                updatedAt: new Date(),
              };
            } else {
              return ja;
            }
          });

        jobApplicationStore.setData(updatedJobApplications);
        toast.success("Job Application Archived");
        navigate("/d/applications/archived");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const applicationDeadline = ja.applicationDeadline
    ? format(ja.applicationDeadline, "dd.MM.yyyy HH:mm") +
      " (" +
      dateDistance(ja.applicationDeadline) +
      ")"
    : "N/A";

  const nextInterviewDate = ja.nextInterviewDate
    ? format(ja.nextInterviewDate, "dd.MM.yyyy HH:mm") +
      " (" +
      dateDistance(ja.nextInterviewDate) +
      ")"
    : "N/A";

  const appliedDate = ja.appliedDate
    ? format(ja.appliedDate, "dd.MM.yyyy HH:mm") +
      " (" +
      dateDistance(ja.appliedDate) +
      ")"
    : "N/A";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
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
      <div className="flex items-center my-2">
        <div className=" flex items-center gap-2 px-6  text-lg align-bottom">
          {ja.isArchived && (
            <>
              <span> This job was archived </span>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={handleUnarchiving}
              >
                Undo <Undo2Icon className="ml-1 h-3 w-3" />
              </Button>{" "}
            </>
          )}
        </div>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          variant={"destructive"}
          size={"sm"}
          className="ml-auto mr-6 bg-red-300 text-black hover:text-white border border-red-500"
        >
          Delete <TrashIcon className="ml-1 h-3 w-3" />
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6 pt-0">
        <section className="  mb-2 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className=" flex justify-between text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            <div>Important information</div>
            <EditButton
              ja={ja}
              icon
              className="px-1.5 h-6"
              variant={"outline"}
            />
          </h2>
          <div className="flex justify-between items-start">
            <div className="  text-gray-800 dark:text-gray-100">
              <div className="text-xl font-semibold">
                {ja.companyName}
              </div>
              <div>
                {ja.jobTitle}
                <span>
                  {ja.isRemote ? " - Remote" : " - On-Site"}
                </span>{" "}
              </div>
              <div className="text-sm text-slate-600 my-1">
                {ja.salaryDetails
                  ? ja.salaryDetails
                  : "No salary info"}
              </div>
              <div className="text-sm font-semibold">
                Priority {ja.interestLevel}/5
              </div>
            </div>
            <div className="text-right text-sm">
              <div>
                Posted{" "}
                {ja.postedDate ? dateDistance(ja.postedDate) : "N/A"}
              </div>
              <div>Saved {dateDistance(ja.createdAt)}</div>
              <div>Laste Update {dateDistance(ja.updatedAt)}</div>
              <div>
                Posting Link:{" "}
                <a className="text-blue-500" href={ja.link}>
                  {ja.link}
                </a>
              </div>
              <div>
                Apply here:{" "}
                <a className="text-blue-500" href={ja.link}>
                  {ja.applylink}
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Important information
          </h2>
          <div className="flex gap-1 justify-between items-start">
            <div className="text-gray-700 dark:text-gray-400">
              <div>Current status: {ja.status}</div>
              <div>Next step: {ja.nextStep}</div>
              <div>Application deadline: {applicationDeadline}</div>
              <div>Next Interview: {nextInterviewDate}</div>
              <div>Applied Date: {appliedDate}</div>
            </div>
            <div className="text-slate-700 text-right">
              <div>
                Status Options:
                <select
                  name="status-options"
                  id="status-options"
                  className="border text-sm"
                >
                  {ja.statusOptions.split(",").map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>Resume used: {ja.resumeUsed}</div>
              <div>Motivational letter: {ja.motivationalLetter}</div>
              <div>Applied from: {ja.appliedFrom}</div>
            </div>
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Upcoming Deadlines
          </h2>
          <div className="text-gray-600 dark:text-gray-400">
            Important info here
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Job Description
          </h2>
          <div className="text-gray-600 dark:text-gray-400">
            {ja.jobDescription}
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Todos
          </h2>
          <div>{ja.todos}</div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Notes
          </h2>
          <Textarea
            className="w-full h-24 p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            id="notes"
            readOnly
            value={ja.notes}
            placeholder="Add your notes here"
          />
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Timeline
          </h2>
          <div>
            <code>
              <pre>Timeline Component</pre>
              <pre>
                {ja.timeline && (
                  <ul>
                    {JSON.parse(ja.timeline).map(
                      (e: TimelineEntry, idx: number) => {
                        return (
                          <li key={idx}>
                            {format(
                              new Date(Number(e.date)),
                              "dd.MM.yyyy HH:mm"
                            )}{" "}
                            - {e.status}
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}
              </pre>
            </code>
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Referral Information
          </h2>
          <div className="text-gray-600 dark:text-gray-400">
            <div>Referred by {ja.referredBy}</div>
            <div>Was referred: {ja.wasReferred ? "Yes" : "No"}</div>
          </div>
        </section>

        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Company Location
          </h2>
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              alt="Map"
              className="object-cover w-full h-full"
              src="/placeholder.svg"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
