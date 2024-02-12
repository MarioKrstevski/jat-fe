import { JobApplicationTag } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function createTag({
  color,
  name,
}: {
  color: string;
  name: string;
}): Promise<JobApplicationTag> {
  return jatbe
    .post("tags", {
      color,
      name,
    })
    .then((res) => res.data);
}

async function getTags(): Promise<JobApplicationTag[]> {
  return jatbe.get("tags").then((res) => res.data);
}

async function editTag({
  tagId,
  newColor,
  newName,
  originalName,
}: {
  tagId: string;
  newColor: string;
  newName: string;
  originalName: string;
}): Promise<JobApplicationTag> {
  return jatbe
    .patch("tags/" + tagId, {
      newColor,
      newName,
      originalName,
    })
    .then((res) => res.data);
}

async function deleteTag(tagId: string): Promise<JobApplicationTag> {
  return jatbe.delete("tags/" + tagId).then((res) => res.data);
}

export const tags = {
  getTags,
  createTag,
  editTag,
  deleteTag,
};
