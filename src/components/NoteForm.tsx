import { api } from "@/api/backend";
import { Note } from "@/types";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";

// style change example
// https://i.stack.imgur.com/Tr98d.png
//https://javascript.plainenglish.io/creating-rich-text-editor-for-react-app-a-comprehensive-guide-using-the-quill-library-ae5ead8a0d3a
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
        <div className="h-52">
          <ReactQuill
            theme="snow"
            className="grid"
            value={noteContent}
            onChange={(stringifiedHTML) => {
              setNoteContent(stringifiedHTML);
            }}
          />
        </div>
        <Button
          className="px-3 py-1.5 my-1"
          size={"sm"}
          type="button"
          onClick={handleSaveNote}
        >
          Save Note
        </Button>
      </div>
    </>
  );
}
