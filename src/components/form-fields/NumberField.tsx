import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface NumberFieldProps {
  form: any;
  fieldName: string;
  label: string;
  min: number;
  max: number;
}
export default function NumberField({
  form,
  fieldName,
  label,
  min,
  max,
}: NumberFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="pb-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  form.setValue(fieldName, Number(e.target.value));
                }}
                type="number"
                min={min}
                max={max}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
