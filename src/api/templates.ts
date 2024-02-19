import { Template } from "@/types";
import { jatbe } from "./instance";

async function getTemplates(): Promise<Template[]> {
  return jatbe.get("templates").then((response) => response.data);
}
async function createTemplate(
  templateDetails: any
): Promise<Template> {
  return jatbe
    .post("templates", {
      templateDetails,
    })
    .then((response) => response.data);
}

async function editTemplate({
  templateDetails,
  templateId,
}: {
  templateDetails: any;
  templateId: string;
}): Promise<Template> {
  return jatbe
    .patch("templates/" + templateId, {
      templateDetails,
    })
    .then((response) => response.data);
}

async function deleteTemplate(templateId: string): Promise<Template> {
  return jatbe
    .delete("templates/" + templateId)
    .then((response) => response.data);
}

export const templates = {
  getTemplates,
  createTemplate,
  editTemplate,
  deleteTemplate,
};
