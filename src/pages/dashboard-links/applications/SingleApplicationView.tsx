import JobApplicationDetails from "@/components/JobApplicationDetails";
import { SecondaryNavLink } from "@/components/SecondaryNav";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useAuth } from "@clerk/clerk-react";
import { Link, useParams } from "react-router-dom";

export default function SingleApplicationView() {
  const { userId, isLoaded } = useAuth();
  const { applicationId } = useParams();
  console.log("applicationId", applicationId);

  const jobApplications = useJobApplicationsStore(
    (state) => state.jobApplications
  );
  const jobApplication = jobApplications.find(
    (ja) => ja.id === applicationId
  );

  if (!jobApplication) {
    return (
      <div>
        Job Application not found
        <br />
        <SecondaryNavLink
          to={"/d/applications"}
          label="Go back to Applications table"
        />
      </div>
    );
  }

  return (
    <div>
      <JobApplicationDetails jobApplication={jobApplication} />
    </div>
  );
}
