import { JobApplicationTag } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function editNote(
  noteId: string,
  newContent: string
): Promise<AxiosResponse<JobApplicationTag[]>> {
  return jatbe.patch("notes", { newContent, noteId });
}

export const notes = {
  editNote,
};
