import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import { Company } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCompanyModal from "./modals/RequestCompanyModal";

interface CompaniesListProps {
  companies: Company[];
}
export default function CompaniesList({
  companies,
}: CompaniesListProps) {
  const [searchText, setSearchText] = useState("");
  const dialogControl = useDialogControl();

  const navigate = useNavigate();
  const filteredCompanies = companies.filter((company) => {
    return company.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });
  return (
    <div className=" p-4 bg-slate-50">
      <RequestCompanyModal />
      <p className="flex flex-col gap-1">
        <span className="font-semibold text-2xl">
          Browse Companies
        </span>
        <small>
          Don't see your company? Request it and we will collect data.{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              dialogControl.openModal("requestCompany");
            }}
          >
            Request
          </span>
        </small>
      </p>
      <div className="my-3 p-1 flex gap-1 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.trim())}
          className="border h-9 px-2 w-60"
          placeholder="Search company"
        />
        <Button size={"sm"}>Search</Button>
      </div>
      <div className="flex flex-wrap gap-4 ">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="flex gap-4 p-4  items-center bg-white rounded  cursor-pointer hover:-translate-y-1 transform transition-all duration-400 ease-in-out shadow-md"
            onClick={() => {
              navigate(`/d/companies/${company.id}`);
            }}
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
                {company.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
