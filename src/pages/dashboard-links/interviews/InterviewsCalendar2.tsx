import { isSameDate } from "@/lib/utils";
import { Interview } from "@/types";
import Calendar from "react-calendar";
interface InterviewsCalendarProps {
  interviews: Interview[];
}

export default function InterviewsCalendar2({
  interviews,
}: InterviewsCalendarProps) {
  return (
    <div>
      InterviewsCalendar works
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
    </div>
  );
}
