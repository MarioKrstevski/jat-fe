import {
  Link,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { cn } from "../lib/utils";

export default function Navigation() {
  const isOnDashboard = useMatch("/dashboard");
  const isOnArchived = useMatch("/archived");

  return (
    <nav className="ml-2 flex gap-3 items-center ">
      <Link
        to="/dashboard"
        className={cn(
          "text-blue-300",
          isOnDashboard && "text-blue-500 hover:text-blue-600"
        )}
      >
        Dashboard
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
