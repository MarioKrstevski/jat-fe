import ArchivedTable from "@/components/ArchivedTable";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ArchivedPage() {
  const { userId, isLoaded } = useAuth();
  const applications = useJobApplicationsStore(
    (state) => state.jobApplications
  );
  const navigate = useNavigate();
  console.log("test", userId);

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  return (
    <div>
      <ArchivedTable applications={applications} />
      {/* <SignOutButton /> */}
    </div>
  );
}
