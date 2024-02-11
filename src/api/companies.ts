import {
  Company,
  Note,
  RequestedCompany,
  SavedCompany,
} from "@/types";
import { jatbe } from "./instance";

async function getCompany(companyId: string): Promise<Company> {
  return jatbe
    .get("companies/" + companyId)
    .then((response) => response.data);
}
async function getCompanies(): Promise<Company[]> {
  return jatbe.get("companies").then((response) => response.data);
}
async function getSavedCompanies(): Promise<SavedCompany[]> {
  return jatbe
    .get("companies/saved")
    .then((response) => response.data);
}
async function saveExistingCompany(
  companyId: string
): Promise<{ company: SavedCompany; note: Note }> {
  return jatbe
    .post("companies/existing/save/" + companyId)
    .then((response) => response.data);
}

async function saveCustomCompany({
  name,
  link,
}: {
  name: string;
  link: string | undefined;
}): Promise<{ company: SavedCompany; note: Note }> {
  return jatbe
    .post("companies/custom", {
      name,
      link,
    })
    .then((response) => response.data);
}

async function updateSavedCustomCompany({
  name,
  link,
  savedCompanyId,
}: {
  name: string;
  link: string | undefined;
  savedCompanyId: string;
}): Promise<SavedCompany> {
  return jatbe
    .patch("companies/saved/custom/" + savedCompanyId, {
      name,
      link,
    })
    .then((response) => response.data);
}

async function requestCompany({
  name,
  link,
}: {
  name: string;
  link: string;
}): Promise<RequestedCompany> {
  return jatbe
    .post("companies/request", {
      name,
      link,
    })
    .then((response) => response.data);
}

async function deleteSavedCompany(
  savedCompanyId: string
): Promise<SavedCompany> {
  return jatbe
    .delete("companies/saved/" + savedCompanyId)
    .then((response) => response.data);
}

export const companies = {
  getCompanies,
  getCompany,
  saveCustomCompany,
  updateSavedCustomCompany,
  saveExistingCompany,
  getSavedCompanies,
  requestCompany,
  deleteSavedCompany,
};
