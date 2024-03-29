import { Outlet } from "react-router-dom";
import SecondaryNav from "@/components/SecondaryNav";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/backend";

export default function ApplicationsLayout() {
  const { data: jobApplications } = useQuery({
    initialData: [],
    queryKey: ["jobApplications"],
    queryFn: api.applications.getJobApplications,
  });

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
        console.log(ja);
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
    {
      to: "/d/applications/settings",
      label: "Settings",
    },
  ];
  return (
    <div>
      <SecondaryNav links={secondaryNavLinks} />
      <Outlet />
    </div>
  );
}
