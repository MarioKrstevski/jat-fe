import { JobApplicationTag } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function createTag(
  color: string,
  name: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.post("tags", {
    color,
    name,
  });
}

async function getTags(): Promise<
  AxiosResponse<JobApplicationTag[]>
> {
  return jatbe.get("tags");
}

async function editTag(
  tagId: string,
  color: string,
  name: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.patch("tags", {
    tagId,
    color,
    name,
  });
}

async function deleteTag(
  tagId: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.delete("tags", { params: { tagId } });
}

export const tags = {
  getTags,
  createTag,
  editTag,
  deleteTag,
};
