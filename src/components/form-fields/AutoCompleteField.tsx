import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";

type Suggestion = {
  label: string;
};
interface AutoCompleteFieldProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder?: string;
  suggestionsOptions: Suggestion[];
}
export default function AutoCompleteField({
  form,
  fieldName,
  label,
  placeholder,
  suggestionsOptions,
}: AutoCompleteFieldProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(
    suggestionsOptions
  );
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Suggestion[]
  >([]);
  const search = (event: any) => {
    event.preventDefault();

    // Timeout to emulate a network connection
    let _filteredSuggestions: Suggestion[] = [];

    if (!event.query.trim().length) {
      _filteredSuggestions = [...suggestions];
    } else {
      console.log("eventq", event.query);
      console.log("suggestions", suggestions);
      console.log("suggestionsOptions", suggestionsOptions);
      _filteredSuggestions = suggestions.filter((suggestion) => {
        return suggestion.label
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }

    setFilteredSuggestions(_filteredSuggestions);
  };
  //set suggestions
  // useEffect(() => {
  //   setSuggestions(suggestionsOptions);
  // }, []);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const autoCompleteValue = field.value
          ? field.value.split(",").map((tag: string) => {
              return { label: tag };
            })
          : [];
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <AutoComplete
                  // field={fieldName}
                  field={"label"}
                  multiple
                  value={autoCompleteValue}
                  suggestions={filteredSuggestions}
                  completeMethod={search}
                  onInput={(e) => {
                    e.preventDefault();
                    console.log("input", e);
                  }}
                  onChange={(e) => {
                    console.log("value", e.value);
                    if (e.target.value === "") {
                    }
                    form.setValue(
                      fieldName,
                      e.value
                        .map((v: Suggestion) => v.label)
                        .join(",")
                    );
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
