import { getFakeJobApplications } from "@/api/fake-job-applications";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/backend";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import JobApplicationsTable from "@/components/data-tables/JobApplicationsTable/table";

export default function () {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const jobApplications = useJobApplicationsStore(
    (state) => state.jobApplications
  );

  function handleCreateDbRecords() {
    const jobApplications = getFakeJobApplications();
    api
      .be_createJobApplications(jobApplications, userId)
      .then((res) => {
        console.log("Success", res);
      });
  }

  return (
    <div>
      <JobApplicationsTable />
    </div>
  );
}
