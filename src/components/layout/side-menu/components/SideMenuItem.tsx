type DynamicObject = Record<string, any>;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSideMenuControl } from "@/hooks/useSideMenuControl";
import { cn } from "@/lib/utils";
import { useMatch } from "react-router-dom";
import SideMenuLink from "./SideMenuLink";

export default function SideMenuItem({
  item,
}: {
  item: DynamicObject;
}) {
  const sideMenuControl = useSideMenuControl();
  const smState = sideMenuControl.state;

  // Link with children
  if (item.hasOwnProperty("children") && item.children.length > 0) {
    const isActive = item.to && useMatch(item.to);
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <div
            className={cn(
              "flex items-center rounded-lg transition-all duration-300 ",
              isActive && "bg-red-500"
            )}
          >
            <AccordionTrigger className="py-2 pl-1 flex w-7 flex-row-reverse justify-end gap-0.5"></AccordionTrigger>
            <SideMenuLink
              parent
              to={item.to}
              label={item.label}
              icon={item.icon}
              tag={item.tag}
            />
          </div>
          <AccordionContent className="border-none pb-0.5 ">
            {item.children.map((child: DynamicObject) => {
              return (
                <SideMenuLink
                  key={child.label}
                  to={child.to}
                  label={child.label}
                  icon={child.icon}
                  tag={child.tag}
                  indented
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  // Section
  if (item.hasOwnProperty("section") && item.section) {
    return (
      <p className="pt-5 pl-2 text-sm whitespace-nowrap">
        {item.label}
      </p>
    );
  }

  // Link without children
  if (
    item.hasOwnProperty("to") &&
    item.hasOwnProperty("label") &&
    item.hasOwnProperty("icon")
  ) {
    return (
      <SideMenuLink
        to={item.to}
        label={item.label}
        icon={item.icon}
        tag={item.tag}
      />
    );
  }

  if (
    item.hasOwnProperty("customComponent") &&
    item.customComponent &&
    item.hasOwnProperty("component") &&
    item.component
  ) {
    return (
      <p className="pt-5 pl-2 text-sm whitespace-nowrap">
        {item.component}
      </p>
    );
  }

  throw new Error("Invalid side menu item");
}
