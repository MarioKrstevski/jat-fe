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
async function saveExistingCompany(companyId: string) {
  return jatbe.post("companies/save/existing", {
    companyId,
  });
}
async function saveCustomCompany(name: string, linkedin: string) {
  return jatbe.post("companies/save/custom", {
    name,
    linkedin,
  });
}
async function requestCompany(name: string, linkedin: string) {
  return jatbe.post("companies/request", {
    name,
    linkedin,
  });
}

export const companies = {
  getCompanies,
  getCompany,
  saveCustomCompany,
  saveExistingCompany,
  getSavedCompanies,
  requestCompany,
};
