import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Interview } from "@/types";
import { useDialogControl } from "@/hooks/useDialogControl";

// example to follow
//https://stackblitz.com/github/fullcalendar/fullcalendar-examples/tree/main/react?file=src%2FDemoApp.jsx

function Event(eventInfo: any) {
  const interview = eventInfo.event.extendedProps.interview;

  return (
    <>
      <div
        className="flex text-xs leading-3 flex-col gap-1 py-1 "
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
  const dialogControl = useDialogControl();
  //callendar initiate
  // a custom render function
  const events = interviews.map((interview) => {
    const endDateTime = !isNaN(Number(interview.duration))
      ? new Date(
          new Date(interview.date).getTime() +
            Number(interview.duration) * 60 * 1000
        )
      : "";

    return {
      title: interview.title || "No title",
      start: new Date(interview.date),
      end: endDateTime,
      interview,
      // id: interview.id,
      // end: new Date(
      //   new Date(interview.date).getTime() +
      //     Number(interview.duration) * 60000
      // ),
      // allDay: true,
      // backgroundColor: "red",
      // borderColor: "red",
      // textColor: "white",
      // url: "https:/www.google.com",
      // classNames: ["text-white", "hover:text-blue-500"],
      // display: "auto",
    };
  });

  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your interview");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // this puts it on the screen
      calendarApi.addEvent({
        id: "newId" + Math.random(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      // handle create Interview here
    }
  };
  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      dialogControl.openModal("editInterview", {
        activeInterview: clickInfo.event.extendedProps.interview,
      });
      // console.log(clickInfo.event.extendedProps.interview);

      // clickInfo.event.remove();
    }
  };

  const handleEvents = (events: any) => {
    // these are all the events, function is called after setting or deleting an event and
    // here is where we can update the state of the events or send them to the server
  };
  return (
    <div id="calendar" className="">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        selectMirror={true}
        headerToolbar={{
          right: "today prev,next",
          center: "title",
          left: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventsSet={handleEvents}
        eventContent={Event}
        eventClick={handleEventClick}
      />
    </div>
  );
}
