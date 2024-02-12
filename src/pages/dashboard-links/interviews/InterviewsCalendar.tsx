import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Interview } from "@/types";
import { format } from "date-fns";

function renderEventContent(eventInfo: any) {
  console.log(eventInfo);
  console.log(eventInfo.event);
  return (
    <>
      <div
        className="flex flex-col gap-1 overflow-hidden"
        onClick={() => alert(eventInfo.timeText)}
      >
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <i>{eventInfo.event.company}</i>
      </div>
    </>
  );
}
export default function InterviewsCalendar({
  interviews,
}: {
  interviews: Interview[];
}) {
  //callendar initiate
  // a custom render function
  const events = interviews.map((interview) => {
    return {
      title: "Netcetera-" + interview.format,
      start: new Date(interview.date),
    };
  });

  return (
    <div id="calendar" className="">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}
