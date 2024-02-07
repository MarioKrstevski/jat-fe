import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CompanyInfoPage() {
  const { companyId } = useParams();
  const companiesStore = useCompaniesStore();
  const company = companiesStore.companies.find(
    (company) => company.id === companyId
  );

  function handleSaveCompany() {
    api.companies
      .saveExistingCompany(company?.id!)
      .then((response) => {
        console.log(response.data);
        toast.success("Company saved");
        // companiesStore.setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error saving company:", error);
        toast.error("Failed to save: " + error.response.data.error);
      })
      .finally(() => {});
  }
  if (!company) {
    return null;
  }
  return (
    <div className="p-4">
      <h1>Company Info</h1>
      <p>{company.id}</p>
      <Button onClick={handleSaveCompany}>Save company</Button>
      <p>{company.name}</p>
      <p>{company.description}</p>
      <p>{company.industry}</p>
      <p>{company.companySize}</p>
      <p>{company.website}</p>
      <p>{company.linkedin} </p>
    </div>
  );
}
