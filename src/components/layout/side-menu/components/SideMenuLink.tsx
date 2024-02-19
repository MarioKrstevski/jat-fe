import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

interface SideMenuLinkProps {
  to?: string | undefined;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  parent?: boolean;
  tag?: string | React.ReactNode;
}
export default function SideMenuLink({
  to,
  icon,
  label,
  indented,
  parent,
  tag,
}: SideMenuLinkProps) {
  const isActive = to && useMatch(to);

  return (
    <Link
      className={cn(
        "flex items-center gap-2.5 w-full py-1.5 px-1 min-h-8 text-sm cursor-default transition-all duration-300  overflow-x-clip ",
        !parent && isActive && " rounded-lg bg-red-500 text-white "
      )}
      to={to || window.location.pathname}
    >
      {indented && <span className="w-6"></span>}
      <span className="transition-none">{icon}</span>
      <span className={cn("overflow-x-hidden whitespace-nowrap")}>
        {/* Add a hashtag to know its not defined  */}
        {!to && "#"}
        {label}
      </span>

      {/* Tag */}
      {tag && <span className="ml-auto">{tag}</span>}
    </Link>
  );
}
