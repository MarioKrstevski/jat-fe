import { api } from "@/api/backend";
import { Badge } from "@/components/ui/badge";
import { cn, getContrastColor } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ExistingTagsControl({
  form,
  usedTags,
}: {
  form: any;
  usedTags: string;
}) {
  const [currentUsedTags, setCurrentUsedTags] = useState(usedTags);

  //updateCurrentUsedTags
  useEffect(() => {
    setCurrentUsedTags(usedTags);
  }, [usedTags]);

  const { data: tags } = useQuery({
    initialData: [],
    queryKey: ["tags"],
    queryFn: api.tags.getTags,
  });

  return (
    <div>
      <p>Existing tags</p>
      <div className="flex gap-1 my-2 flex-wrap">
        {tags.map((tag) => {
          return (
            <Badge
              key={tag.name}
              className={cn(
                "font-normal",
                !currentUsedTags.includes(tag.name) &&
                  "cursor-pointer shadow-md font-bold",
                currentUsedTags.includes(tag.name) && "opacity-55"
              )}
              onClick={() => {
                const currentTags = currentUsedTags;

                if (currentTags) {
                  const currentTagsArray = currentTags
                    .split(",")
                    .filter(Boolean);
                  if (currentTagsArray.includes(tag.name)) {
                    return;
                  } else {
                    currentTagsArray.push(tag.name);
                    setCurrentUsedTags(
                      currentTagsArray.join(",") + ","
                    );
                    form.setValue(
                      "tags",
                      currentTagsArray.join(",") + ","
                    );
                  }
                } else {
                  setCurrentUsedTags(tag.name + ",");
                  form.setValue("tags", tag.name + ",");
                }
              }}
              style={{
                backgroundColor: tag.color,
                color: getContrastColor(tag.color),
                borderColor: getContrastColor(tag.color),
              }}
            >
              {tag.name}
            </Badge>
          );
        })}{" "}
      </div>
    </div>
  );
}
