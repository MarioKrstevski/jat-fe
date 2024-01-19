import Archived from "@/components/Archived";
import { useJobApplications } from "@/hooks/useJobApplications";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ArchivedPage() {
  const { userId, isLoaded } = useAuth();
  const jobApplications = useJobApplications(
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
      <Archived jobApplications={jobApplications} />
      {/* <SignOutButton /> */}
    </div>
  );
}
