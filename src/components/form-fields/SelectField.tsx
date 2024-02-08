import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface TextFieldProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder?: string;
  options: string[];
}
export default function SelectField({
  form,
  fieldName,
  options,
  label,
  placeholder,
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="flex-1 mb-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(selection) => {
                  form.setValue(fieldName, selection);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Columns</SelectLabel> */}
                    {options.map((option) => {
                      return (
                        <SelectItem value={option} key={option}>
                          {option}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
