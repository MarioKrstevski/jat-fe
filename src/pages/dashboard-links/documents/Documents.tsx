import { api } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";
import DocumentsList from "./components/DocumentsList";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateDocumentSmartOverlay from "./components/modals/CreateDocumentSmartOverlay";
import EditDocumentSmartOverlay from "./components/modals/EditDocumentSmartOverlay";

interface DocumentsProps {}
export default function Documents({}: DocumentsProps) {
  const dialogControl = useDialogControl();
  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: api.documents.getDocuments,
  });

  if (!documents) return <div>Loading...</div>;

  return (
    <div>
      <CreateDocumentSmartOverlay />
      <EditDocumentSmartOverlay />
      Documents works:
      <Button
        onClick={() => {
          dialogControl.openModal("createDocument");
        }}
      >
        {" "}
        Add document
      </Button>
      <DocumentsList documents={documents} />
    </div>
  );
}
