import Heading from "@/components/ui/custom/heading";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function Table() {
  const jobApplications = useJobApplicationsStore(
    (state) => state.jobApplications
  );

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <Heading
          title={"Data Table component"}
          description="Manage job applications"
        />
      </div>
      <div className="">
        <DataTable
          placeholder="Search by company name"
          searchKey="companyName"
          columns={columns}
          data={jobApplications}
        ></DataTable>
      </div>
    </div>
  );
}
