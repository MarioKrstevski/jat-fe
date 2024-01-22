import { columns } from "@/global/values";

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
    <div>
      {columns.map((column) => (
        <div key={column.key} className="inline m-1">
          <input
            type="checkbox"
            checked={selectedColumns.includes(column.key)}
            onChange={() => handleColumnToggle(column.key)}
          />
          {column.label}
        </div>
      ))}
    </div>
  );
}
