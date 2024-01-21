import { getFakeJobApplications } from "@/api/fake-job-applications";
import { Button } from "../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/api/backend";
import { JobApplication } from "@/types";
import JATable from "@/components/JATable";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";

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
      {/* <button
        className="border py-1 px-2 m-2 bg-black text-white rounded"
        onClick={handleCreateDbRecords}
      >
        Create a few fake entries
      </button>
      <div className="m-2">My ID: {userId}</div> */}
      <JATable />
    </div>
  );
}
