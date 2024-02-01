import { backendURL } from "@/global/variables";
import { EditTypes, JobApplication } from "@/types";
import axios, { AxiosResponse } from "axios";

const jatbe = axios.create({
  baseURL: backendURL,
  //   timeout: 4000,
  headers: {},
});

async function getJobApplications(
  userId: string | null | undefined
): Promise<AxiosResponse<JobApplication[]>> {
  return jatbe.get("applications/", {
    params: {
      userId,
    },
  });
}

async function createJobApplication(
  jobApplication: any,
  userId: string | null | undefined
) {
  return jatbe.post("applications/", {
    jobApplication,
    userId,
  });
}

async function editJobApplication(
  application: Partial<JobApplication>,
  applicationId: string,
  userId: string,
  type: EditTypes
) {
  return jatbe.patch("applications/edit/" + applicationId, {
    application,
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
async function deleteJobApplication(ids: string[], userId: string) {
  return jatbe.delete("applications", {
    data: {
      ids,
      userId,
    },
  });
}
const applications = {
  archiveJobApplications,
  deleteJobApplication,
  editJobApplication,
  getJobApplications,
  createJobApplication,
};

export const api = {
  applications,
};
