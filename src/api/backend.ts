import { backendURL } from "@/global/variables";
import {
  EditTypes,
  JobApplication,
  JobApplicationGenerated,
} from "@/types";
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

async function be_createJobApplication(
  jobApplication: any,
  userId: string | null | undefined
) {
  return jatbe.post("createJobApplication", {
    jobApplication,
    userId,
  });
}

async function be_editJobApplication(
  jobApplication: any,
  userId: string,
  type: EditTypes
) {
  return jatbe.patch("editJobApplication", {
    jobApplication,
    userId,
    type,
  });
}
async function archiveJobApplications(
  ids: string[],
  userId: string,
  isArchived: boolean
) {
  return jatbe.patch("applications/archive", {
    ids,
    userId,
    isArchived,
  });
}
async function be_deleteJobApplication(
  ids: string[],
  userId: string
) {
  return jatbe.delete("deleteJobApplication", {
    data: {
      ids,
      userId,
    },
  });
}
const applications = {
  archiveJobApplications,
};

export const api = {
  applications,
  be_deleteJobApplication,
  be_editJobApplication,
  be_getJobApplications,
  be_createJobApplication,
  be_createJobApplications,
};
