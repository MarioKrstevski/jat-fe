import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";
import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

interface SideMenuLinkWithoutChildrenProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  section?: boolean;
  parent?: boolean;
}
interface SideMenuLinkProps {
  to?: string | undefined;
  icon: React.ReactNode;
  label: string;
  indented?: boolean;
  parent?: boolean;
  section?: boolean;
  children?: SideMenuLinkWithoutChildrenProps[];
}
export default function SideMenuLink({
  to,
  icon,
  label,
  indented,
  parent,
  section,
  children,
}: SideMenuLinkProps) {
  const sideMenuControl = useSideMenuControl();
  const smState = sideMenuControl.state;
  const isActive = to && useMatch(to);

  if (children?.length) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <div
            className={cn(
              "flex items-center rounded-lg transition-all duration-300 ",
              isActive && "bg-red-500"
            )}
          >
            <AccordionTrigger className="py-2 pl-1 flex w-6 flex-row-reverse justify-end gap-0.5"></AccordionTrigger>
            <SideMenuLink
              parent
              key={label}
              to={to}
              label={label}
              icon={icon}
            />
          </div>
          <AccordionContent className="border-none pb-0.5 ">
            {children.map((child) => {
              return (
                <SideMenuLink
                  key={child.label}
                  to={child.to}
                  label={child.label}
                  icon={child.icon}
                  indented
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Link
      className={cn(
        "flex items-center gap-2.5 w-full py-1.5 px-1 text-sm cursor-default transition-all duration-300  ",
        smState === "minimized" && "w-8 justify-center",
        !parent && isActive && " rounded-lg bg-red-500 text-white "
      )}
      to={to || window.location.pathname}
    >
      {indented && <span className="w-4"></span>}
      <span className="transition-none">{icon}</span>
      <span
        className={cn(
          "overflow-x-hidden whitespace-nowrap"
          // smState === "minimized" ? "w-0 hidden" : "w-full block"
        )}
      >
        {/* Add a hashtag to know its not defined  */}
        {!to && "#"}
        {label}
      </span>
    </Link>
  );
}
