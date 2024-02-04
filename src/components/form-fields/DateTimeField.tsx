import { DateTimePicker } from "@/components/DateTimePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
interface DateTimeFieldProps {
  form: any;
  fieldName: string;
  label: string;
}
export default function DateTimeField({
  form,
  fieldName,
  label,
}: DateTimeFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <DateTimePicker
                  date={field.value}
                  enableClear
                  setDate={(date) => {
                    form.setValue(fieldName, date);
                  }}
                />
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
