import { api } from "@/api/backend";
import Upcomming from "@/components/Upcomming";
import { useQuery } from "@tanstack/react-query";
import InterviewList from "./InterviewList";
import CreateInterviewSmartOverlay from "./components/smartoverlays/CreateInterviewSmartOverlay";

export default function Interviews() {
  const { data: interviews } = useQuery({
    initialData: [],
    queryKey: ["interviews"],
    queryFn: api.interviews.getInterviews,
  });

  return (
    <>
      <CreateInterviewSmartOverlay />
      <InterviewList interviews={interviews} />

      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/ViQbwJ8lRJe8sCGJtHVZcw.png" />
    </>
  );
}
