import { Outlet } from "react-router-dom";
import SecondaryNav from "@/components/SecondaryNav";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useEffect, useState } from "react";

export default function ApplicationsLayout() {
  const jobApplicationsStore = useJobApplicationsStore();
  const jobApplications = jobApplicationsStore.jobApplications;
  const [counts, setCounts] = useState({
    active: 0,
    wishlist: 0,
    archived: 0,
    total: 0,
  });
  //Calculate counts
  useEffect(() => {
    let activeCount = 0;
    let wishlistCount = 0;
    let archivedCount = 0;
    for (const ja of jobApplications) {
      if (ja.isArchived) {
        archivedCount++;
      } else if (ja.status === "Wishlist") {
        wishlistCount++;
      } else if (ja.status !== "Wishlist" || !ja.isArchived) {
        activeCount++;
      }
    }
    setCounts({
      active: activeCount,
      wishlist: wishlistCount,
      archived: archivedCount,
      total: jobApplications.length,
    });
  }, [jobApplications]);
  const secondaryNavLinks = [
    {
      to: "/d/applications",
      label: `Active (${counts.active})`,
    },
    {
      to: "/d/applications/wishlist",
      label: `Wishlist (${counts.wishlist})`,
    },
    {
      to: "/d/applications/archived",
      label: `Archived (${counts.archived})`,
    },
    {
      to: "/d/applications/import",
      label: "Import",
    },
    {
      to: "/d/applications/kanban",
      label: "Kanban Board",
    },
  ];
  return (
    <div>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
