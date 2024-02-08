import { Interview, JobApplicationTag } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getInterviews(): Promise<AxiosResponse<Interview[]>> {
  return jatbe.get("interviews");
}
async function createInterview(
  interviewDetails: any
): Promise<AxiosResponse<Interview[]>> {
  return jatbe.post("interviews", {
    interviewDetails,
  });
}

export const interviews = {
  getInterviews,
  createInterview,
};
