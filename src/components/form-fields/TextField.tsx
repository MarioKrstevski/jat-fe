import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface TextFieldProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder?: string;
  sanitize?: (value: string) => string;
}
export default function TextField({
  form,
  fieldName,
  label,
  placeholder,
  sanitize,
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
              {sanitize ? (
                <Input
                  {...field}
                  placeholder={placeholder}
                  onChange={(e) => {
                    form.setValue(
                      fieldName,
                      sanitize(e.target.value)
                    );
                  }}
                />
              ) : (
                <Input {...field} placeholder={placeholder} />
              )}
            </FormControl>
            <FormMessage>
              {form.formState.errors[fieldName]?.message}
            </FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
