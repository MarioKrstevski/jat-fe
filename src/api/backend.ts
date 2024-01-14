import { backendURL } from "@/global/variables";
import { JobApplication, JobApplicationGenerated } from "@/types";
import axios, { AxiosResponse } from "axios";

const jatbe = axios.create({
  baseURL: backendURL,
  //   timeout: 4000,
  headers: {},
});

async function be_getJobApplications(
  userId: string | null | undefined
): Promise<AxiosResponse<JobApplication[]>> {
  return jatbe.post("jobApplications", {
    userId,
  });
}

async function be_createJobApplications(
  jobApplications: JobApplicationGenerated[],
  userId: string | null | undefined
) {
  return jatbe.post("createJobApplications", {
    jobApplications,
    userId,
  });
}
export const api = {
  be_getJobApplications,
  be_createJobApplications,
};
