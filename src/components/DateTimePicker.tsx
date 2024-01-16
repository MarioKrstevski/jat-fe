import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn, formatDate } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function DateTimePicker({
  date,
  setDate,
}: DateTimePickerProps) {
  console.log("Date", date);
  const [selectedDateTime, setSelectedDateTime] = useState<
    Date | undefined
  >(date);

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    if (!selected || !selectedDateTime) {
      return;
    }
    const modifiedDay = new Date(selected);
    modifiedDay.setHours(selectedDateTime.getHours());
    modifiedDay.setMinutes(selectedDateTime.getMinutes());

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay);
  };

  const handleTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (!selectedDateTime) {
      return;
    }
    const { value } = e.target;
    const hours = Number.parseInt(value.split(":")[0] || "00", 10);
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10);

    const modifiedDay = new Date(selectedDateTime);
    modifiedDay.setHours(hours);
    modifiedDay.setMinutes(minutes);

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay);
  };

  const footer = (
    <>
      {selectedDateTime ? (
        <div className="px-4 pt-0 pb-4">
          <Label>Time</Label>
          <Input
            type="time"
            onChange={handleTimeChange}
            value={format(selectedDateTime, "HH:mm")}
          />
        </div>
      ) : (
        <p className="px-4 pt-0 pb-4">Please pick a day.</p>
      )}
    </>
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDateTime ? (
            format(selectedDateTime, "do MMM yyyy - HH:mm")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime}
          onSelect={handleSelect}
          initialFocus
        />
        {footer}
      </PopoverContent>
    </Popover>
  );
}
