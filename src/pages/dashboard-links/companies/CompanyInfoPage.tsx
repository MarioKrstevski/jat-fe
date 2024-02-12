import { api } from "@/api/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GlobeIcon, TwitterIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CompanyInfoPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: company } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => api.companies.getCompany(companyId as string),
  });

  const { mutateAsync: saveExistingCompany } = useMutation({
    mutationKey: ["saveExistingCompany"],
    mutationFn: api.companies.saveExistingCompany,
    onSuccess: (savedData) => {
      queryClient.invalidateQueries({
        queryKey: ["savedCompanies"],
      });
      toast.success("Company saved");
    },
    onError: (error: any) => {
      console.error("Error saving company:", error);
      toast.error("Failed to save: " + error.response.data.error);
    },
  });

  function handleSaveCompany() {
    saveExistingCompany(companyId as string);
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
      <div className="ml-2 absolute top-2 right-2">
        <Button
          variant={"outline"}
          onClick={handleSaveCompany}
          className="bg-transparent"
        >
          Save Company
        </Button>
      </div>
      <div
        className="flex gap-4 p-4 items-center   "
        key={company.id}
      >
        <div className="min-h-24 min-w-24 ">
          <img
            src={company.logo}
            alt={company.name + " logo"}
            className="w-full "
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{company.name}</p>
          <p className="text-slate-600 sm:pr-16  ">
            {company.shortDescription}
          </p>
          <p className="flex gap-1">
            {company.website && (
              <a href={company.website} target="_blank">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full border-slate-400 text-slate-500  hover:text-blue-700 "
                >
                  <GlobeIcon size={16} />
                </Button>
              </a>
            )}
            {company.linkedin && (
              <a href={company.linkedin} target="_blank">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full border-slate-400 text-slate-500 hover:text-blue-700"
                >
                  <LinkedInLogoIcon />
                </Button>
              </a>
            )}
            {/* @ts-ignore */}
            {company.twitter && (
              // @ts-ignore
              <a href={company.twitter} target="_blank">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full border-slate-400 text-slate-500 hover:text-blue-700"
                >
                  <TwitterIcon size={16} />
                </Button>
              </a>
            )}
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

          <p className="flex gap-1 py-1">
            {company.industry
              .split(",")
              .map((i: string) => i.trim())
              .map((i: string) => {
                return <Badge>{i}</Badge>;
              })}
          </p>
          <p className="flex gap-1 py-1">
            {company.companySize && (
              <span>
                Company size:{" "}
                <Badge className="bg-gray-400 text-base py-0">
                  {company.companySize.toLowerCase()}
                </Badge>{" "}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
