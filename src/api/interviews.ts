import { Interview } from "@/types";
import { jatbe } from "./instance";

async function getInterviews(): Promise<Interview[]> {
  return jatbe.get("interviews").then((response) => response.data);
}
async function createInterview(
  interviewDetails: any
): Promise<Interview> {
  return jatbe
    .post("interviews", {
      interviewDetails,
    })
    .then((response) => response.data);
}

async function editInterview({
  interviewDetails,
  interviewId,
}: {
  interviewDetails: any;
  interviewId: string;
}): Promise<Interview> {
  return jatbe
    .patch("interviews/" + interviewId, {
      interviewDetails,
    })
    .then((response) => response.data);
}

async function deleteInterview(
  interviewId: string
): Promise<Interview> {
  return jatbe
    .delete("interviews/" + interviewId)
    .then((response) => response.data);
}

export const interviews = {
  getInterviews,
  createInterview,
  editInterview,
  deleteInterview,
};
