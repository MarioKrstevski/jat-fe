import { Document } from "@/types";
import { jatbe } from "./instance";

async function getDocuments(): Promise<Document[]> {
  return jatbe.get("documents").then((response) => response.data);
}
async function createDocument(
  documentDetails: any
): Promise<Document> {
  return jatbe
    .post("documents", {
      documentDetails,
    })
    .then((response) => response.data);
}

async function editDocument({
  documentDetails,
  documentId,
}: {
  documentDetails: any;
  documentId: string;
}): Promise<Document> {
  return jatbe
    .patch("documents/" + documentId, {
      documentDetails,
    })
    .then((response) => response.data);
}

async function deleteDocument(documentId: string): Promise<Document> {
  return jatbe
    .delete("documents/" + documentId)
    .then((response) => response.data);
}

export const documents = {
  getDocuments,
  createDocument,
  editDocument,
  deleteDocument,
};
