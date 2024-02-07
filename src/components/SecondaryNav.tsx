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
        "text-gray-500 px-2 py-1 border rounded-l bg-white rounded ",
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
    <nav className="flex gap-2 px-3 py-2 mb-2 mt-1 bg-white-50 ">
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
