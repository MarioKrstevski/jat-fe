import { api } from "@/api/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getContrastColor } from "@/lib/utils";
import { JobApplicationTag } from "@/types";
import { DeleteIcon, EditIcon, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TagDisplayProps {
  tag: JobApplicationTag;
  tags: JobApplicationTag[];
  setTags: (tags: JobApplicationTag[]) => void;
}
const colors = [
  "#CDFADB",
  "#F6FDC3",
  "#FFCF96",
  "#FF8080",
  "#FFFFFF",
  "#000000",
];
function TagDisplay({ tag, tags, setTags }: TagDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const orignalValue = useRef<String>(tag.name);
  const orignalColor = useRef<String>(tag.color);
  const [tagName, setTagName] = useState(tag.name);
  const [tagColor, setTagColor] = useState(tag.color);

  function handleDelete() {
    const updatedTags = tags.filter((t: JobApplicationTag) => {
      return t.name !== orignalValue.current;
    });
    setTags(updatedTags);
  }
  function handleSave() {
    if (tagName === "") {
      return;
    }
    setIsEditing(false);

    const updatedTags = tags.map((t: JobApplicationTag) => {
      if (t.name === orignalValue.current) {
        return { ...t, name: tagName, color: tagColor };
      } else {
        return t;
      }
    });
    setTags(updatedTags);
    orignalValue.current = tagName;
    orignalColor.current = tagColor;
  }
  return (
    <div className="flex items-center gap-1">
      <input
        disabled={!isEditing}
        type="text"
        className="border w-28 px-1 py-0.5 rounded"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
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
              {colors.map((color) => {
                return (
                  <div
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
              tagName !== orignalValue.current ||
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
        variant={"destructive"}
        className="p-2 h-8 bg-red-400"
        onClick={handleDelete}
      >
        <Trash size={14} />
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
export default function TagManager() {
  const [tags, setTags] = useState<JobApplicationTag[]>([]);

  async function handleFetchingTags() {
    api.tags
      .getTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  // load tags
  useEffect(() => {
    handleFetchingTags();
  }, []);
  return (
    <div>
      <p> Manage your tags</p>
      <ul className="pl-5">
        {tags.map((tag, idx) => {
          return (
            <li className="list-disc mb-1 " key={tag.id}>
              <TagDisplay tag={tag} tags={tags} setTags={setTags} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
