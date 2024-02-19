import { Template } from "@/types";
import TemplateActionsDropdown from "./TemplateActionsDropdown";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { DescriptionTooltip } from "@/components/DescriptionTooltip";
import { toast } from "sonner";

interface TemplatesListProps {
  templates: Template[];
}

export default function TemplatesList({
  templates,
}: TemplatesListProps) {
  if (templates.length === 0) return <div>No templates</div>;
  return (
    <div>
      {templates.map((template) => {
        return (
          <div key={template.id} className="relative">
            <div className="absolute top-1 right-1">
              <TemplateActionsDropdown template={template} />
            </div>

            <div className=" my-2">{template.name}</div>

            <div className="border text-base rounded shadow-md bg-slate-50 relative">
              <div className="absolute top-1 right-1">
                <DescriptionTooltip tooltip="Copy">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(template.content);
                      toast.success("Template copied to clipboard");
                    }}
                    variant={"outline"}
                    size={"icon"}
                    className="h-8 w-8"
                  >
                    <CopyIcon size={16} />
                  </Button>
                </DescriptionTooltip>
              </div>
              <pre className="text-sm whitespace-pre-wrap p-2 rounded font-sans ">
                {template.content}
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
}
