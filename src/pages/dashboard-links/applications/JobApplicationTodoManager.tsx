import {
  generateShortId,
  groupByKey,
  toTitleCase,
} from "@/lib/utils";
import { JobApplicationTodo } from "@/types";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultStatusOptions } from "@/global/values";
import { Button } from "@/components/ui/button";
import { api } from "@/api/backend";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { toast } from "sonner";

function TodoForm({
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

export default function JobApplicationTodoManager({
  todos: passedTodos,
  applicationId,
}: {
  todos: string;
  applicationId: string;
}) {
  const jobApplicationStore = useJobApplicationsStore();
  console.log(
    "passedTodos",
    passedTodos,
    typeof passedTodos,
    passedTodos.length
  );

  let parsedTodos: JobApplicationTodo[] = [];
  if (passedTodos.length > 0) {
    parsedTodos = JSON.parse(passedTodos);
  }
  console.log("parsedTodos", parsedTodos);
  const [todos, setTodos] =
    useState<JobApplicationTodo[]>(parsedTodos);
  console.log("todos", todos);
  const addTodo = (todo: JobApplicationTodo) => {
    setTodos([...todos, todo]);
  };
  function handleSaveTodos() {
    api.applications
      .editJobApplication(
        {
          todos: JSON.stringify(todos),
        },
        applicationId,
        "todosChange"
      )
      .then((res) => {
        console.log("res", res);
        const newJobApplicationsArray =
          jobApplicationStore.jobApplications.map((ja) => {
            if (ja.id === applicationId) {
              return res.data;
            } else {
              return ja;
            }
          });
        jobApplicationStore.setData(newJobApplicationsArray);
        toast.success("Todos saved");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Failed to save todos" + err.response.data.error);
      })
      .finally(() => {});
  }
  function handleChange(todo: JobApplicationTodo, checked: boolean) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          isCompleted: checked,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
  }

  const groupedByStatus = groupByKey(todos, "relatedTo");
  const keys = Object.keys(groupedByStatus);

  console.log("groupedByStatus", groupedByStatus);

  return (
    <div>
      <div>
        <Tabs defaultValue={keys[0]} className="">
          <TabsList className="flex gap-2 justify-start">
            {keys.map((key) => {
              return (
                <TabsTrigger key={key} value={key}>
                  {toTitleCase(key)}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {keys.map((key) => {
            return (
              <TabsContent key={key} value={key} className="px-2">
                {groupedByStatus[key].map(
                  (todo: JobApplicationTodo) => {
                    return (
                      <div
                        key={todo.id}
                        className="flex gap-1 items-center mb-1  "
                      >
                        <Checkbox
                          className="h-5 w-5"
                          id={todo.id}
                          checked={todo.isCompleted}
                          onCheckedChange={(checked) =>
                            handleChange(todo, checked as boolean)
                          }
                        />
                        <Label htmlFor={todo.id} className="text-sm">
                          {todo.text}
                        </Label>
                      </div>
                    );
                  }
                )}
              </TabsContent>
            );
          })}
        </Tabs>
        <TodoForm addTodo={addTodo} />

        <Button
          className="mt-2"
          onClick={handleSaveTodos}
          size={"sm"}
        >
          Save Todos
        </Button>
      </div>
    </div>
  );
}
