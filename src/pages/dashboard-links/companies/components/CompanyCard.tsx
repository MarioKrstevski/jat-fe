import { Company } from "@/types";
import { useNavigate } from "react-router-dom";

export default function CompynayCard({
  company,
}: {
  company: Company;
}) {
  const navigate = useNavigate();

  return (
    <div
      key={company.id}
      className="flex gap-4 p-4 items-center bg-white rounded  cursor-pointer hover:-translate-y-1 transform transition-all duration-400 ease-in-out shadow-md"
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
          {company.shortDescription}
        </p>
      </div>
    </div>
  );
}
