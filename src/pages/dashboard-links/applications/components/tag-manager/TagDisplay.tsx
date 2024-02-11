import { api } from "@/api/backend";
import { JobApplicationTag } from "@/types";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import { cn, getContrastColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { tagColorsOptions } from "@/global/values";
import { toast } from "sonner";
import { queryClient } from "@/global/variables";
import { useMutation } from "@tanstack/react-query";
interface TagDisplayProps {
  tag: JobApplicationTag;
}
export default function TagDisplay({ tag }: TagDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const originalName = useRef<string>(tag.name);
  const orignalColor = useRef<string>(tag.color);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagName, setTagName] = useState(tag.name);
  const [tagColor, setTagColor] = useState(tag.color);

  const { mutateAsync: deleteTag } = useMutation({
    mutationFn: api.tags.deleteTag,
    onSuccess: () => {
      toast.success("Tag deleted");
      queryClient.setQueryData(
        ["tags"],
        (oldData: JobApplicationTag[]) => {
          return oldData.filter((t: JobApplicationTag) => {
            return t.name !== originalName.current;
          });
        }
      );
    },
    onError: (error: any) => {
      toast.error(error.data.message.error);
    },
  });

  const { mutateAsync: editTag } = useMutation({
    mutationFn: api.tags.editTag,
    onSuccess: () => {
      originalName.current = tagName;
      orignalColor.current = tagColor;
      toast.success("Tag updated");
      queryClient.setQueryData(
        ["tags"],
        (oldData: JobApplicationTag[]) => {
          return oldData.map((t: JobApplicationTag) => {
            if (t.name === originalName.current) {
              return { ...t, name: tagName, color: tagColor };
            } else {
              return t;
            }
          });
        }
      );
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.data.message.error);
    },
  });

  function handleDelete() {
    // if you pass the tag name it will delete the tag from every job application that uses it
    deleteTag(tag.id);
  }
  function handleSave() {
    if (tagName === "") {
      return;
    }

    setIsEditing(false);
    editTag({
      tagId: tag.id,
      newColor: tagColor,
      newName: tagName,
      originalName: originalName.current,
    });
  }
  return (
    <div className="flex items-center gap-1">
      <input
        ref={inputRef}
        disabled={!isEditing}
        type="text"
        className="border w-28 px-1 py-0.5 rounded"
        value={tagName}
        onChange={(e) =>
          setTagName(e.target.value.toLocaleLowerCase().trim())
        }
      />
      {!isEditing && (
        <div
          className={cn(
            "w-5 h-5 rounded-full border",
            isEditing && "cursor-pointer"
          )}
          style={{ backgroundColor: tagColor }}
        ></div>
      )}
      {isEditing && (
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
      )}

      {isEditing && (
        <Button
          size={"sm"}
          variant={"secondary"}
          className="p-2 h-8"
          onClick={handleSave}
          disabled={
            !(
              tagName !== originalName.current ||
              tagName === "" ||
              tagColor !== orignalColor.current
            )
          }
        >
          Save
        </Button>
      )}
      {!isEditing && (
        <Button
          size={"sm"}
          variant={"secondary"}
          className="p-2 h-8"
          onClick={(e) => setIsEditing(true)}
        >
          <EditIcon size={14} />
        </Button>
      )}
      <Button
        size={"sm"}
        variant={"outline"}
        className="p-2 h-8 border-red-200"
        onClick={handleDelete}
      >
        <Trash size={14} className="bg-text-400 " color="red " />
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
    </div>
  );
}
