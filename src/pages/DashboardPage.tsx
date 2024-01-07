import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
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
      DashboardPage works
      <SignOutButton />
    </div>
  );
}
