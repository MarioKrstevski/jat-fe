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
  newColor: string,
  newName: string,
  originalName: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.patch("tags", {
    tagId,
    newColor,
    newName,
    originalName,
  });
}

async function deleteTag(
  tagId: string,
  name?: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.delete("tags", { params: { tagId, name } });
}

export const tags = {
  getTags,
  createTag,
  editTag,
  deleteTag,
};
