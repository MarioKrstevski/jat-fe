import { api } from "@/api/backend";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { Note } from "@/types";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface NoteFormProps {
  note: Note;
}
export default function NoteForm({ note }: NoteFormProps) {
  // console.log("note", note);
  const initialNoteContent = note.content || "";
  const [noteContent, setNoteContent] = useState(initialNoteContent);

  function handleSaveNote() {
    api.notes
      .editNote(note.id, noteContent)
      .then((res) => {
        console.log("res", res.data);
        toast.success("Note updated");
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {});
  }

  return (
    <>
      <div>
        <ReactQuill
          theme="snow"
          value={noteContent}
          onChange={(stringifiedHTML) => {
            setNoteContent(stringifiedHTML);
          }}
          className="bg-white"
        />
        <Button
          className="px-3 py-1.5 my-1"
          size={"sm"}
          onClick={handleSaveNote}
        >
          Save Note
        </Button>
      </div>
    </>
  );
}
