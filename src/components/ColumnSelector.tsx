import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { selectableColumns } from "@/global/values";
import CustomMultipleSelect from "./ui/CustomMultipleSelect";

export default function ColumnSelector({
  selectedColumns,
  setSelectedColumns,
}: {
  selectedColumns: string[];
  setSelectedColumns: any;
}) {
  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(
        selectedColumns.filter((col) => col !== column)
      );
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  return (
    <div className="relative top-[-3px]">
      <CustomMultipleSelect
        options={selectableColumns}
        selected={selectedColumns}
        onSelected={setSelectedColumns}
        nothingSelectedText="Select additional columns"
      />
    </div>
  );
}
