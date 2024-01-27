import { JobApplication } from "@/types";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
export default function ColumnSelector2({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) {
  return (
    <div className="flex-1">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select columns" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Columns</SelectLabel> */}
            {Object.keys(jobApplications[0]).map((option) => {
              return (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
