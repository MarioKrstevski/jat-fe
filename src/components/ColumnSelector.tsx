import { columns } from "@/global/values";
import { JobApplication } from "@/types";
import { useState } from "react";

export default function ColumnSelector({
  selectedColumns,
  setSelectedColumns,
}: {
  selectedColumns: string[];
  setSelectedColumns: any;
}) {
  // const [selectedColumns, setSelectedColumns] = useState(columns);

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
    <div>
      {columns.map((column) => (
        <div key={column} className="inline m-1">
          <input
            type="checkbox"
            checked={selectedColumns.includes(column)}
            onChange={() => handleColumnToggle(column)}
          />
          {column}
        </div>
      ))}
    </div>
  );
}
