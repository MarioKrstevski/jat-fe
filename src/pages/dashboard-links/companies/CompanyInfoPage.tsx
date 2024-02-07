import { Button } from "@/components/ui/button";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useParams } from "react-router-dom";

export default function CompanyInfoPage() {
  const { companyId } = useParams();
  const companiesStore = useCompaniesStore();
  const company = companiesStore.companies.find(
    (company) => company.id === companyId
  );

  if (!company) {
    return null;
  }
  return (
    <div className="p-4">
      <Button>Save company</Button>
      <p>{company.name}</p>
      <p>{company.description}</p>
      <p>{company.industry}</p>
      <p>{company.companySize}</p>
      <p>{company.website}</p>
      <p>{company.linkedin} </p>
    </div>
  );
}
