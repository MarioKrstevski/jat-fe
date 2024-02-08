import NoteForm from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import { formatDate } from "@/lib/utils";
import { Interview } from "@/types";
import Calendar from "react-calendar";

interface InterviewListProps {
  interviews: Interview[];
}
export default function InterviewList({
  interviews,
}: InterviewListProps) {
  const dialogControl = useDialogControl();

  function handleCreateInterview() {
    dialogControl.openModal("createInterview");
  }
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  return (
    <div>
      <h2>InterviewList</h2>
      <Button onClick={handleCreateInterview}>Add interview</Button>
      {interviews.length === 0 && <div>No interviews</div>}
      <div>
        <p>Calendar</p>
        <div>
          <Calendar
            value={new Date()}
            tileContent={({ date, view }) => {
              //   console.log("yo", date, view);
              const interviewExists = interviews.find((i) =>
                isSameDate(new Date(i.date), date)
              );
              if (interviewExists) {
                console.log("interviewExists", interviewExists);
                return (
                  <div>
                    {interviewExists?.jobApplication?.companyName}
                    {interviewExists?.jobApplication?.company?.name}

                    <div className="h-6 w-6 rounded-full bg-red-400 border mx-auto"></div>
                  </div>
                );
              }
            }}
            // tileClassName="text-red-500"
          />
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-2">
        {interviews.map((interview) => {
          return (
            <div
              className="p-4 border shadow bg-slate-50 max-w-96"
              key={interview.id}
            >
              <h3>{interview.type}</h3>
              <p>{interview.format}</p>
              <p>
                {formatDate(interview.date, "MMMM dd, yyyy HH:mm")}
              </p>
              {interview.note && <NoteForm note={interview.note} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
