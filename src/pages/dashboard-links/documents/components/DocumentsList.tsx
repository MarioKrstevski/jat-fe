import { Document } from "@/types";
import DocumentActionsDropdown from "./DocumentActionsDropdown";

interface DocumentsListProps {
  documents: Document[];
}
export default function DocumentsList({
  documents,
}: DocumentsListProps) {
  if (documents.length === 0) return <div>No documents</div>;
  return (
    <div>
      {documents.map((document) => {
        return (
          <div key={document.id}>
            {document.label}

            <DocumentActionsDropdown document={document} />
          </div>
        );
      })}
    </div>
  );
}
