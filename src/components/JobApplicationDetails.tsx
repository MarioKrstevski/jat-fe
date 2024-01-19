import { JobApplication } from "@/types";
import { Textarea } from "./ui/textarea";
import { dateDistance } from "@/lib/utils";
import { Button } from "./ui/button";
import { Undo2Icon, UndoIcon } from "lucide-react";
import { format } from "date-fns";
interface JobApplicationDetailsProps {
  jobApplication: JobApplication;
}
export default function JobApplicationDetails({
  jobApplication,
}: JobApplicationDetailsProps) {
  const ja = jobApplication;
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {!ja.isArchived && (
        <div className=" flex items-center gap-2 px-6 py-2 text-lg align-bottom">
          <span> This job was archived </span>
          <Button variant={"outline"} size={"sm"}>
            Undo <Undo2Icon className="ml-1 h-3 w-3" />
          </Button>{" "}
        </div>
      )}
      <main className="flex-1 overflow-y-auto p-6 pt-0">
        <section className=" flex justify-between items-start mb-2 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
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
              Salary $400 {ja.salaryDetails}
            </div>
            <div className="text-sm font-semibold">
              Priority {ja.interestLevel}/5
            </div>
          </div>
          <div className="text-right text-sm">
            <div>Posted {dateDistance(ja.postedDate)}</div>
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
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Important information
          </h2>
          <div className="flex gap-1 justify-between items-start">
            <div className="text-gray-700 dark:text-gray-400">
              <div>Current status: {ja.status}</div>
              <div>Next step: {ja.waitingFor}</div>
              <div>
                Application deadline:{" "}
                {format(ja.applicationDeadline, "dd.MM.yyyy HH:mm")}
                {" ("}
                {dateDistance(ja.applicationDeadline)}
                {")"}
              </div>
              <div>
                Next Interview:{" "}
                {format(ja.nextInterviewDate, "dd.MM.yyyy HH:mm")}
                {" ("}
                {dateDistance(ja.nextInterviewDate)}
                {")"}
              </div>
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
            Phone Interview: January 10, 2024
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Onsite Interview: January 20, 2024
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
            </code>
          </div>
        </section>
        <section className="mb-6 bg-white rounded-lg shadow p-4 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
            Referral Information
          </h2>
          <div className="text-gray-600 dark:text-gray-400">
            <div>Referred by {ja.refferedBy}</div>
            <div>Was referred: {ja.wasReffered ? "Yes" : "No"}</div>
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
