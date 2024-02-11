import { groupByKey, toTitleCase } from "@/lib/utils";
import { JobApplication, JobApplicationTodo } from "@/types";
import { useState } from "react";

import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { queryClient } from "@/global/variables";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import TodoForm from "./TodoForm";

export default function JobApplicationTodoManager({
  todos: passedTodos,
  applicationId,
}: {
  todos: string;
  applicationId: string;
}) {
  const { mutateAsync: editJobApplication } = useMutation({
    mutationFn: api.applications.editJobApplication,
    onSuccess: (editedApplication: JobApplication) => {
      queryClient.setQueryData(
        ["jobApplications"],
        (oldData: JobApplication[]) => {
          return oldData.map((ja) => {
            if (ja.id === editedApplication.id) {
              return editedApplication;
            }
            return ja;
          });
        }
      );

      toast.success("Todos saved");
    },

    onError: (error: any) => {
      toast.error("Failed to save todos" + error.response.data.error);
    },
  });

  let parsedTodos: JobApplicationTodo[] = [];
  if (passedTodos.length > 0) {
    parsedTodos = JSON.parse(passedTodos);
  }
  const [todos, setTodos] =
    useState<JobApplicationTodo[]>(parsedTodos);

  const addTodo = (todo: JobApplicationTodo) => {
    setTodos([...todos, todo]);
  };
  function handleSaveTodos() {
    editJobApplication({
      application: {
        todos: JSON.stringify(todos),
      },
      applicationId,
      type: "todosChange",
    });
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
