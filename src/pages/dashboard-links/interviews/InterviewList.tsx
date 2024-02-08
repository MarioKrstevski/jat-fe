import NoteForm from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import { formatDate } from "@/lib/utils";
import { Interview } from "@/types";

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
  return (
    <div>
      <h2>InterviewList</h2>
      <Button onClick={handleCreateInterview}>Add interview</Button>
      {interviews.length === 0 && <div>No interviews</div>}
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
