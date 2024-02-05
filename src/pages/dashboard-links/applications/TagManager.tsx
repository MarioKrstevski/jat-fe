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
import { useAuth } from "@clerk/clerk-react";
import {
  DeleteIcon,
  EditIcon,
  LoaderIcon,
  Trash,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TagDisplayProps {
  tag: JobApplicationTag;
  tags: JobApplicationTag[];
  setTags: (tags: JobApplicationTag[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const colors = [
  "#CDFADB",
  "#F6FDC3",
  "#FFCF96",
  "#FF8080",
  "#FFFFFF",
  "#000000",
];

function TagDisplay({
  tag,
  tags,
  setTags,
  isLoading,
  setIsLoading,
}: TagDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const orignalValue = useRef<String>(tag.name);
  const orignalColor = useRef<String>(tag.color);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagName, setTagName] = useState(tag.name);
  const [tagColor, setTagColor] = useState(tag.color);

  function handleDelete() {
    setIsLoading(true);
    api.tags
      .deleteTag(tag.id)
      .then((res) => {
        console.log("Delete tag res", res);
        const updatedTags = tags.filter((t: JobApplicationTag) => {
          return t.name !== orignalValue.current;
        });
        setTags(updatedTags);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

    setIsLoading(true);
    api.tags
      .editTag(tag.id, tagColor, tagName)
      .then((res) => {
        console.log("Edit tag res", res);
        setTags(updatedTags);
        orignalValue.current = tagName;
        orignalColor.current = tagColor;
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
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
interface TagFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  tags: JobApplicationTag[];
  setTags: (tags: JobApplicationTag[]) => void;
}
function TagForm({
  isLoading,
  setIsLoading,
  tags,
  setTags,
}: TagFormProps) {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#FFFFFF");
  const [isEditing, setIsEditing] = useState(false);
  function handleCreateTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    api.tags
      .createTag(tagColor, tagName)
      .then((res) => {
        console.log("Create tag res", res);
        const newTags = [...tags, res.data];
        // @ts-ignore
        setTags(newTags);
        setTagName("");
        setTagColor("#FFFFFF");
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <input
            className="border border-slate-700 rounded-md w-36 px-2 py-1"
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
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
          <Button type="submit" size={"sm"}>
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
export default function TagManager() {
  const { isLoaded } = useAuth();
  const [tags, setTags] = useState<JobApplicationTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!isLoaded) {
      return;
    }
    handleFetchingTags();
  }, [isLoaded]);
  return (
    <div className="relative p-2">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-black/25 flex items-center justify-center cursor-not-allowed">
          <LoaderIcon
            className="text-white rounded-full border"
            size={20}
          />
        </div>
      )}
      <p> Manage your tags</p>
      <ul className="pl-5">
        {tags.map((tag, idx) => {
          return (
            <li className="list-disc mb-1 " key={tag.id}>
              <TagDisplay
                tag={tag}
                tags={tags}
                setTags={setTags}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </li>
          );
        })}
      </ul>

      <TagForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}
