import { api } from "@/api/backend";
import { Note } from "@/types";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";

interface NoteFormProps {
  note: Note;
}
export default function NoteForm({ note }: NoteFormProps) {
  // console.log("note", note);
  const initialNoteContent = note.content || "";
  const [noteContent, setNoteContent] = useState(initialNoteContent);

  const { mutateAsync: editNote } = useMutation({
    mutationFn: api.notes.editNote,
    onSuccess: function () {
      toast.success("Note updated");
    },
  });

  function handleSaveNote() {
    editNote({ noteId: note.id, newContent: noteContent });
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
