import { EditTypes, JobApplication, Note } from "@/types";
import { jatbe } from "./instance";

async function getJobApplications(): Promise<JobApplication[]> {
  return jatbe.get("applications/").then((res) => res.data);
}

async function getJobApplication(
  applicationId: string
): Promise<JobApplication> {
  return jatbe
    .get("applications/" + applicationId)
    .then((res) => res.data);
}

async function createJobApplication(
  application: any
): Promise<{ jobApplication: JobApplication; note: Note }> {
  return jatbe
    .post("applications/", {
      application,
    })
    .then((res) => res.data);
}

async function editJobApplication({
  application,
  applicationId,
  type,
}: {
  application: Partial<JobApplication>;
  applicationId: string;
  type: EditTypes;
}): Promise<JobApplication> {
  return jatbe
    .patch("applications/edit/" + applicationId, {
      application,
      type,
    })
    .then((res) => res.data);
}
async function archiveJobApplications({
  ids,
  isArchived,
}: {
  ids: string[];
  isArchived: boolean;
}): Promise<{ count: number }> {
  return jatbe
    .patch("applications/archive", {
      ids,
      isArchived,
    })
    .then((res) => res.data);
}
async function deleteJobApplications(
  ids: string[]
): Promise<{ count: number }> {
  return jatbe
    .delete("applications", {
      data: {
        ids,
      },
    })
    .then((res) => res.data);
}

export const applications = {
  archiveJobApplications,
  deleteJobApplications,
  editJobApplication,
  getJobApplications,
  getJobApplication,
  createJobApplication,
};
