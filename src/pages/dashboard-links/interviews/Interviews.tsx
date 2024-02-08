import Upcomming from "@/components/Upcomming";
import InterviewList from "./InterviewList";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateInterviewSmartOverlay from "./components/smartoverlays/CreateInterviewSmartOverlay";
import { useInterviewsStore } from "@/hooks/useInterviewsStore";

export default function Interviews() {
  const interviewsStore = useInterviewsStore();

  return (
    <>
      <CreateInterviewSmartOverlay />
      <InterviewList interviews={interviewsStore.interviews} />

      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ViQbwJ8lRJe8sCGJtHVZcw.png" />
    </>
  );
}
