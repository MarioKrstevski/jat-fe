import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  useNavigate,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import SplashScreen from "../../components/layout/SplashScreen";
import { cn } from "@/lib/utils";

export default function ApplicationsLayout() {
  const isOnApplications = useMatch("/d/applications");
  const isOnArchivedApplications = useMatch(
    "/d/applications/archived"
  );
  return (
    <div>
      <nav className="flex gap-2 px-3 py-1">
        <Link
          to="/d/applications"
          className={cn(
            "text-blue-300 px-2 py-1 border rounded-l",
            isOnApplications && "text-blue-500 hover:text-blue-700 "
          )}
        >
          Applicatinos
        </Link>
        <Link
          to="/d/applications/archived"
          className={cn(
            "text-blue-300 px-2 py-1 border rounded-l",
            isOnArchivedApplications &&
              "text-blue-500 hover:text-blue-700 "
          )}
        >
          Archived
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
