import ArchivedTable from "@/pages/dashboard-links/applications/components/tables/ArchivedTable";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ArchivedApplications() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const applications = useJobApplicationsStore(
    (state) => state.jobApplications
  );

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  const archivedApplications = applications.filter((ja) => {
    if (ja.isArchived) {
      return true;
    }
    return false;
  });
  return (
    <div>
      <ArchivedTable applications={archivedApplications} />
    </div>
  );
}
