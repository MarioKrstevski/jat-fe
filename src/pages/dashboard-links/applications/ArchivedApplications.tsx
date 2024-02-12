import { api } from "@/api/backend";
import ArchivedTable from "@/pages/dashboard-links/applications/components/tables/ArchivedTable";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ArchivedApplications() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const { data: jobApplications } = useQuery({
    initialData: [],
    queryKey: ["jobApplications"],
    queryFn: api.applications.getJobApplications,
  });
  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  const archivedApplications = jobApplications.filter((ja) => {
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
