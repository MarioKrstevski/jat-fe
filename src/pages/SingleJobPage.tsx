import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const jobids = ["5", "10"];
function jobIdExists(jobId: string | undefined) {
  if (!jobId) {
    return false;
  }
  return jobids.includes(jobId);
}

export default function SingleJobPage() {
  const { userId, isLoaded } = useAuth();

  const { jobId } = useParams();
  const navigate = useNavigate();

  console.log("jobId", jobId);
  useEffect(() => {
    if (!jobIdExists(jobId)) {
      // navigate("/jobs");
    }
  }, []);

  return (
    <div>
      Archived
      {jobId}
    </div>
  );
}
