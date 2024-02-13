import { api } from "@/api/backend";
import Upcomming from "@/components/Upcomming";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";

import { useQuery } from "@tanstack/react-query";
import InterviewList from "./InterviewList";
import CreateInterviewSmartOverlay from "./components/smartoverlays/CreateInterviewSmartOverlay";

import InterviewsCalendar from "./InterviewsCalendar";
import EditInterviewSmartOverlay from "./components/smartoverlays/EditInterviewSmartOverlay";
import PreviewInterviewModal from "./components/modals/PreviewInterviewModal";

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
      <EditInterviewSmartOverlay />
      <PreviewInterviewModal />
      {/* TODO: implement preview modal, and on edit button goes to edit smart overlay */}

      <Button onClick={handleCreateInterview} className="mt-2">
        Add interview
      </Button>
      <h2>You have {interviews.length} total events</h2>

      <InterviewsCalendar interviews={interviews} />

      {/* <InterviewList interviews={interviews} /> */}

      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ViQbwJ8lRJe8sCGJtHVZcw.png" />
    </>
  );
}
