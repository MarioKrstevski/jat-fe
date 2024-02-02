import { EditTypes, JobApplication } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getJobApplications(): Promise<
  AxiosResponse<JobApplication[]>
> {
  return jatbe.get("applications/");
}

async function getJobApplication(
  userId: string | null | undefined,
  applicationId: string
): Promise<AxiosResponse<JobApplication[]>> {
  return jatbe.get("applications/", {
    params: {
      userId,
      applicationId,
    },
  });
}

async function createJobApplication(
  application: any,
  userId: string | null | undefined
) {
  return jatbe.post("applications/", {
    application,
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
export const applications = {
  archiveJobApplications,
  deleteJobApplication,
  editJobApplication,
  getJobApplications,
  getJobApplication,
  createJobApplication,
};
