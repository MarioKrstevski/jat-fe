import { Note } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

// notes that are not attached to anything

async function editNote(
  noteId: string,
  newContent: string
): Promise<AxiosResponse<Note[]>> {
  return jatbe.patch("notes", { newContent, noteId });
}

export const notes = {
  editNote,
};
