import Heading from "@/components/ui/custom/heading";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import AddNewButton from "@/pages/dashboard-links/applications/AddNewButton";

export default function JobApplicationsTable() {
  const jobApplications = useJobApplicationsStore(
    (state) => state.jobApplications
  );

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
