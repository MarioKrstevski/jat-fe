import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
interface CheckboxFieldProps {
  form: any;
  fieldName: string;
  label: string;
}
export default function CheckboxField({
  form,
  fieldName,
  label,
}: CheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="flex-1">
            <FormControl>
              <div className="flex items-center mb-3">
                <Checkbox
                  id={fieldName}
                  checked={field.value}
                  onCheckedChange={(value) => {
                    form.setValue(fieldName, value as boolean);
                  }}
                />
                <FormLabel
                  htmlFor={fieldName}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                >
                  {label}
                </FormLabel>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
