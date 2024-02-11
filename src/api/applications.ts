import { EditTypes, JobApplication } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getJobApplications(): Promise<JobApplication[]> {
  return jatbe.get("applications/").then((res) => res.data);
}

async function getJobApplication(
  applicationId: string
): Promise<AxiosResponse<JobApplication[]>> {
  return jatbe.get("applications/", {
    params: {
      applicationId,
    },
  });
}

async function createJobApplication(application: any) {
  return jatbe.post("applications/", {
    application,
  });
}

async function editJobApplication(
  application: Partial<JobApplication>,
  applicationId: string,
  type: EditTypes
) {
  return jatbe.patch("applications/edit/" + applicationId, {
    application,
    type,
  });
}
async function archiveJobApplications(
  ids: string[],
  isArchived: boolean
) {
  return jatbe.patch("applications/archive", {
    ids,
    isArchived,
  });
}
async function deleteJobApplication(ids: string[]) {
  return jatbe.delete("applications", {
    data: {
      ids,
    },
  });
}

export const applications = {
  archiveJobApplications,
  deleteJobApplication,
  editJobApplication,
  getJobApplications,
  getJobApplication,
  createJobApplication,
};
