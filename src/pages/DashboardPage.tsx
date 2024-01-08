import { Button } from "../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function () {
  const { userId, isLoaded } = useAuth();
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
      <Button onClick={() => toast.error("Gg")}>Sign In</Button>
    </div>
  );
}
