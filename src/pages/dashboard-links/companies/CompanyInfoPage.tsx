import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCompaniesStore } from "@/hooks/useCompaniesStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CompanyInfoPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();
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
    <div
      key={company.id}
      className="p-4 m-2 border shadow-md bg-white rounded relative "
      onClick={() => {
        navigate(`/d/companies/${company.id}`);
      }}
    >
      <Button
        className="ml-2 absolute top-2 right-2"
        variant={"outline"}
        onClick={handleSaveCompany}
      >
        Save Company
      </Button>
      <div
        className="flex gap-4 p-4 items-center   "
        key={company.id}
      >
        <div className="h-24 w-24">
          <img
            src={company.logo}
            alt={company.name + " logo"}
            className="w-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{company.name}</p>
          <p className="w-64 text-slate-600">
            {company.shortDescription}
          </p>
        </div>
      </div>
      <Separator />
      {company.description && (
        <div>
          <h3 className="text-xl font-semibold my-2">
            Company Overview
          </h3>
          <p className="p-2 max-w-screen-sm">{company.description}</p>
        </div>
      )}
      <Separator />
      <Separator />
      <p>{company.name}</p>
      <p>{company.description}</p>
      <p>{company.industry}</p>
      <p>{company.companySize}</p>
      <p>{company.website}</p>
      <p>{company.linkedin} </p>
    </div>
  );
}
