import ArchivedTable from "@/pages/dashboard-links/applications/components/tables/ArchivedTable";
import WishlistTable from "@/pages/dashboard-links/applications/components/tables/WishlistTable";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/backend";

export default function WishlistApplications() {
  const { userId, isLoaded } = useAuth();
  const { data: jobApplications } = useQuery({
    initialData: [],
    queryKey: ["jobApplications"],
    queryFn: api.applications.getJobApplications,
  });
  const navigate = useNavigate();

  //effect description
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("should go back");
      navigate("/signin");
      return;
    }
  }, [userId, isLoaded]);

  const wishlistApplications = jobApplications.filter((ja) => {
    if (ja.status === "Wishlist" && !ja.isArchived) {
      return true;
    }

    return false;
  });
  // sort by created time

  return (
    <div>
      <WishlistTable applications={wishlistApplications} />
    </div>
  );
}
