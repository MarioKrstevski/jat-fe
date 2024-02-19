import { api } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";
import TemplatesList from "./components/TemplatesList";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateTemplateSmartOverlay from "./components/modals/CreateTemplateSmartOverlay";
import EditTemplateSmartOverlay from "./components/modals/EditTemplateSmartOverlay";

interface TemplatesProps {}
export default function Templates({}: TemplatesProps) {
  const dialogControl = useDialogControl();
  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: api.templates.getTemplates,
  });

  if (!templates) return <div>Loading...</div>;

  return (
    <div>
      <CreateTemplateSmartOverlay />
      <EditTemplateSmartOverlay />
      Templates works:
      <Button
        onClick={() => {
          dialogControl.openModal("createTemplate");
        }}
      >
        {" "}
        Add template
      </Button>
      <TemplatesList templates={templates} />
    </div>
  );
}
