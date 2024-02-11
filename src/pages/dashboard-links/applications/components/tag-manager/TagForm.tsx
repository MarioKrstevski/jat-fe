import { api } from "@/api/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { tagColorsOptions } from "@/global/values";
import { queryClient } from "@/global/variables";
import { cn, getContrastColor } from "@/lib/utils";
import { JobApplicationTag } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface TagFormProps {
  tags: JobApplicationTag[];
}

export default function TagForm({ tags }: TagFormProps) {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#FFFFFF");
  const [isEditing, setIsEditing] = useState(false);

  const alreadyExists = tags.find(
    (t) => t.name.toLocaleLowerCase() === tagName
  );

  const { mutateAsync: createTag } = useMutation({
    mutationFn: api.tags.createTag,
    onSuccess: (newTag: JobApplicationTag) => {
      setTagName("");
      setTagColor("#FFFFFF");
      toast.success("Tag created");
      queryClient.setQueryData(
        ["tags"],
        (oldData: JobApplicationTag[]) => {
          return [...oldData, newTag];
        }
      );
    },
    onError: (error: any) => {
      toast.error(error.data.message.error);
    },
  });
  function handleCreateTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tagName === "") {
      return;
    }
    createTag({ name: tagName, color: tagColor });
  }
  return (
    <div className="mt-3">
      {!isEditing && (
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Add new tag
        </Button>
      )}

      {isEditing && (
        <form
          action=""
          onSubmit={handleCreateTag}
          className="flex gap-1 items-center "
        >
          <div className="relative">
            <input
              className="border border-slate-700 rounded-md w-36 px-2 py-1"
              type="text"
              value={tagName}
              onChange={(e) =>
                setTagName(e.target.value.toLocaleLowerCase().trim())
              }
            />
            {alreadyExists && (
              <small className="absolute left-0 top-8 text-red-500">
                Tag already exists
              </small>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border",
                  isEditing && "cursor-pointer"
                )}
                style={{ backgroundColor: tagColor }}
              ></div>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-3">
              <p>Pick a new color</p>
              <div className="flex gap-1 flex-wrap">
                {tagColorsOptions.map((color) => {
                  return (
                    <div
                      key={color}
                      className={cn(
                        "w-6 h-6 rounded-full border cursor-pointer border-slate-300"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setTagColor(color);
                      }}
                    ></div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            type="submit"
            size={"sm"}
            disabled={!!alreadyExists || tagName === ""}
          >
            Create
          </Button>
          {"-->"}
          {tagName && (
            <Badge
              style={{
                backgroundColor: tagColor,
                color: getContrastColor(tagColor),
                borderColor: getContrastColor(tagColor),
              }}
            >
              {tagName}
            </Badge>
          )}
        </form>
      )}
    </div>
  );
}
