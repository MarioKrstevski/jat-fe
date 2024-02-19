import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface TextareaProps {
  form: any;
  fieldName: string;
  label: string;
  rows?: number;
}
export default function TextareaField({
  form,
  fieldName,
  label,
  rows = 3,
}: TextareaProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="flex-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea {...field} rows={rows} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
