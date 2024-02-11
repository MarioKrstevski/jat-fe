import { api } from "@/api/backend";
import { SecondaryNavLink } from "@/components/SecondaryNav";
import JobApplicationDetails from "@/pages/dashboard-links/applications/components/JobApplicationDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SingleApplicationView() {
  const { applicationId } = useParams();
  console.log("applicationId", applicationId);

  const { data: jobApplication } = useQuery({
    initialData: null,
    queryKey: ["jobApplication", applicationId],
    queryFn: () =>
      api.applications.getJobApplication(applicationId as string),
  });

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
