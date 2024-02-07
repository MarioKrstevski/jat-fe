import { jatbe } from "./instance";

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
async function saveCompany() {
  return jatbe.post("companies/save");
}
async function requestCompany(name: string, linkedinUrl: string) {
  return jatbe.post("companies/request", {
    name,
    linkedinUrl,
  });
}

export const companies = {
  getCompanies,
  getCompany,
  saveCompany,
  getSavedCompanies,
  requestCompany,
};
