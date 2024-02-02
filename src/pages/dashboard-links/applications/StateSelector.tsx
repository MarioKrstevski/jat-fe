import { JobApplication, JobApplicationStatus } from "@/types";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
export default function StateSelector({
  states,
  current,
}: {
  states: JobApplicationStatus[];
  current: string;
}) {
  return (
    <div className="flex-1">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Select columns"
            defaultValue={current}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Columns</SelectLabel> */}
            {states.map((option) => {
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
