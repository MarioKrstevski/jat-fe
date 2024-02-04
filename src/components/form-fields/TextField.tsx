import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface TextFieldProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder?: string;
}
export default function TextField({
  form,
  fieldName,
  label,
  placeholder,
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="pb-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={placeholder} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
