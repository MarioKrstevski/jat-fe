import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DescriptionTooltipProps {
  children: React.ReactNode;
  tooltip: string;
  delayDuration?: number;
}
export function DescriptionTooltip({
  children,
  tooltip,
  delayDuration = 300,
}: DescriptionTooltipProps) {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={delayDuration / 2}
    >
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="px-2 py-1 bg-gray-50/90 border">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
