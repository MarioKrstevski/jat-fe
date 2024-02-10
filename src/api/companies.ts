import { SavedCompany } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getCompany(companyId: string) {
  return jatbe.get("companies", {
    params: {
      companyId,
    },
  });
}
async function getCompanies() {
  return jatbe.get("companies");
}
async function getSavedCompanies() {
  return jatbe.get("companies/saved");
}
async function saveExistingCompany(companyId: string) {
  return jatbe.post("companies/save/existing", {
    companyId,
  });
}
async function saveCustomCompany(
  name: string,
  link: string | undefined
) {
  return jatbe.post("companies/save/custom", {
    name,
    link,
  });
}

async function editCustomCompany(
  name: string,
  link: string | undefined,
  savedCompanyId: string
) {
  return jatbe.patch("companies/edit/custom", {
    name,
    link,
    savedCompanyId,
  });
}

async function requestCompany(name: string, link: string) {
  return jatbe.post("companies/request", {
    name,
    link,
  });
}

async function deleteCustomCompany(
  savedCompanyId: string
): Promise<AxiosResponse<SavedCompany>> {
  return jatbe.delete("companies/custom", {
    data: {
      savedCompanyId,
    },
  });
}

export const companies = {
  getCompanies,
  getCompany,
  saveCustomCompany,
  editCustomCompany,
  saveExistingCompany,
  getSavedCompanies,
  requestCompany,
  deleteCustomCompany,
};
