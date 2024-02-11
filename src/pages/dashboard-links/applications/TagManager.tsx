import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import TagDisplay from "./components/tag-manager/TagDisplay";
import TagForm from "./components/tag-manager/TagForm";
import { api } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/global/variables";
import { JobApplicationTag } from "@/types";

export default function TagManager() {
  const { data: tags, isLoading } = useQuery({
    initialData: [],
    queryKey: ["tags"],
    queryFn: api.tags.getTags,
  });

  // load tags
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
              <TagDisplay tag={tag} />
            </li>
          );
        })}
      </ul>

      <TagForm tags={tags} />
    </div>
  );
}
