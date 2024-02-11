import Heading from "@/components/ui/custom/heading";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import AddNewButton from "@/pages/dashboard-links/applications/components/AddNewButton";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/backend";

export default function ActiveTable() {
  const { data: jobApplications } = useQuery({
    initialData: [],
    queryKey: ["jobApplications"],
    queryFn: api.applications.getJobApplications,
  });
  console.log("jobApplications", jobApplications);

  if (!jobApplications) return null;
  const activeJobApplications = jobApplications.filter(
    (ja) => !ja.isArchived && ja.status !== "Wishlist"
  );

  return (
    <div className="p-3">
      <div className="flex items-center justify-start">
        <Heading
          title={"Job Applications"}
          description="Manage job applications"
        />
        <AddNewButton />
      </div>
      <div className="">
        <DataTable
          placeholder="Search by company name"
          searchKey="companyName"
          columns={columns}
          data={activeJobApplications}
        ></DataTable>
      </div>
    </div>
  );
}
