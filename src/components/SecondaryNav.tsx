import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";
interface SecondaryNavLink {
  to: string;
  label: string;
}
export function SecondaryNavLink({ to, label }: SecondaryNavLink) {
  const isActive = useMatch(to);
  return (
    <Link
      to={to}
      className={cn(
        "text-gray-500 px-2 py-1 border rounded-l",
        isActive && "text-blue-500 hover:text-blue-700 "
      )}
    >
      {label}
    </Link>
  );
}

interface SecondaryNavProps {
  links: SecondaryNavLink[];
}
export default function SecondaryNav({ links }: SecondaryNavProps) {
  return (
    <nav className="flex gap-2 px-3 py-1">
      {links.map((link) => {
        return (
          <SecondaryNavLink
            to={link.to}
            label={link.label}
            key={link.label}
          />
        );
      })}
    </nav>
  );
}
