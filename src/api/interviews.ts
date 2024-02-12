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

export const interviews = {
  getInterviews,
  createInterview,
};
