import { api } from "@/api/backend";
import Upcomming from "@/components/Upcomming";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";

import { useQuery } from "@tanstack/react-query";
import InterviewList from "./InterviewList";
import CreateInterviewSmartOverlay from "./components/smartoverlays/CreateInterviewSmartOverlay";
import InterviewsCalendar2 from "./InterviewsCalendar2";
import InterviewsCalendar from "./InterviewsCalendar";

export default function Interviews() {
  const { data: interviews } = useQuery({
    initialData: [],
    queryKey: ["interviews"],
    queryFn: api.interviews.getInterviews,
  });
  const dialogControl = useDialogControl();

  function handleCreateInterview() {
    dialogControl.openModal("createInterview");
  }

  return (
    <>
      <CreateInterviewSmartOverlay />
      <Button onClick={handleCreateInterview}>Add interview</Button>
      <InterviewsCalendar interviews={interviews} />
      {/* <InterviewsCalendar2 interviews={interviews} /> */}
      {/* <InterviewList interviews={interviews} /> */}

      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ViQbwJ8lRJe8sCGJtHVZcw.png" />
    </>
  );
}
