import { getFakeJobApplications } from "@/api/fake-job-applications";
import { Button } from "../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function () {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const jobApplications = getFakeJobApplications();

  const [ja, setJa] = useState([]);

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  //
  useEffect(() => {
    const fetchJobApplications = async () => {
      const response = await fetch(
        "https://jat-be-api.onrender.com/jobApplications"
      );
      const data = await response.json();
      setJa(data);
    };
    fetchJobApplications();
  }, []);

  return (
    <div>
      <Button onClick={() => toast.error("Gg")}>Sign In</Button>
      <div>
        <h2>Job Applications</h2>
        <div className="my-16">
          {ja.map((jobApplication: any) => (
            <div key={jobApplication?.id}>
              <h3>Name: {jobApplication?.name}</h3>
            </div>
          ))}
        </div>
        <div>
          {jobApplications.map((jobApplication) => (
            <div key={jobApplication.id}>
              <pre>{JSON.stringify(jobApplication, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
