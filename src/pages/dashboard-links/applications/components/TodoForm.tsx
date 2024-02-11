import { Button } from "@/components/ui/button";
import { defaultStatusOptions } from "@/global/values";
import { generateShortId } from "@/lib/utils";
import { JobApplicationTodo } from "@/types";
import { useState } from "react";

export default function TodoForm({
  addTodo,
}: {
  addTodo: (todo: JobApplicationTodo) => void;
}) {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [relatedTo, setRelatedTo] = useState("application");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (text.trim() === "") return;

    addTodo({
      id: generateShortId(),
      text,
      isCompleted: false,
      relatedTo,
    });

    setText("");
    setRelatedTo("application");

    console.log("submitted");
  }
  return (
    <>
      <p className="my-2">Create new todo:</p>
      <div>
        <Button
          variant={"outline"}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          size={"sm"}
          className="my-1"
        >
          {isEditing ? "Hide form" : "Add new todo"}
        </Button>
      </div>

      {isEditing && (
        <form action="" onSubmit={handleSubmit} className="">
          <div className=" mb-1 ">
            <input
              type="text"
              className="border px-2 py-1 w-full"
              placeholder="Todo text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="relatedTo">Related to:</label>
            <select
              name="relatedTo"
              className="border rounded"
              value={relatedTo}
              onChange={(e) => {
                setRelatedTo(e.target.value);
              }}
              id="relatedTo"
            >
              {["application", ...defaultStatusOptions].map(
                (option) => {
                  if (option === "application")
                    return (
                      <option
                        key={option}
                        value={"application"}
                        disabled
                      >
                        {option}
                      </option>
                    );
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              )}
            </select>
          </div>
          <Button
            type="submit"
            size={"sm"}
            className="my-1"
            disabled={!text}
          >
            Add
          </Button>
        </form>
      )}
    </>
  );
}
