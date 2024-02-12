import { Note } from "@/types";
import { jatbe } from "./instance";

// notes that are not attached to anything

async function editNote({
  newContent,
  noteId,
}: {
  noteId: string;
  newContent: string;
}): Promise<Note> {
  return jatbe
    .patch("notes/" + noteId, { newContent })
    .then((res) => res.data);
}

export const notes = {
  editNote,
};
