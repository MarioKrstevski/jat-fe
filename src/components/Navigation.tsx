import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

export default function Navigation() {
  const isOnJobs = useMatch("/jobs");
  const isOnArchived = useMatch("/archived");

  return (
    <nav className="ml-2 flex gap-3 items-center ">
      <Link
        to="/jobs"
        className={cn(
          "text-blue-300",
          isOnJobs && "text-blue-500 hover:text-blue-600"
        )}
      >
        Jobs
      </Link>
      <Link
        to="/archived"
        className={cn(
          "text-blue-300",
          isOnArchived && "text-blue-500 hover:text-blue-600"
        )}
      >
        Archived
      </Link>
    </nav>
  );
}
