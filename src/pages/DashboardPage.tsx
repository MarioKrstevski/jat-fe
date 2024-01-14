import { getFakeJobApplications } from "@/api/fake-job-applications";
import { Button } from "../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/api/backend";
import { JobApplication } from "@/types";
import JATable from "@/components/JATable";

export default function () {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [ja, setJa] = useState<JobApplication[]>([]);

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      // console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  function handleCreateDbRecords() {
    const jobApplications = getFakeJobApplications();
    api
      .be_createJobApplications(jobApplications, userId)
      .then((res) => {
        console.log("Success", res);
      });
  }
  function handleFetchingJobApplications() {
    api
      .be_getJobApplications(userId)
      .then((res) => {
        setJa(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    handleFetchingJobApplications();
  }, []);

  return (
    <div>
      <button
        className="border py-1 px-2 m-2 bg-black text-white rounded"
        onClick={handleCreateDbRecords}
      >
        Create a few fake entries
      </button>
      <div className="m-2">My ID: {userId}</div>
      <div>
        {/* <div className="my-16">
          {ja.map((jobApplication: any) => (
            <div key={jobApplication?.id}>
              <h3>Name: {jobApplication?.name}</h3>
            </div>
          ))}
        </div> */}

        <JATable jobApplications={ja} />
        {/* <div>
          {jobApplications.map((jobApplication) => (
            <div key={jobApplication.id}>
              <pre>{JSON.stringify(jobApplication, null, 2)}</pre>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
