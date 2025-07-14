// src/components/FilteredTableContainer.jsx
import React, { useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import DataTable from "./DataTable";

export default function FilteredTableContainer({ title, entity, actualData }) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = useMemo(() => {
    return actualData.filter((row) =>
      Object.entries(filters).every(([field, value]) => {
        if (!value) return true;
        const rowValue = row[field];
        if (typeof rowValue === "string")
          return rowValue.toLowerCase().includes(value.toLowerCase());
        if (typeof rowValue === "number") return rowValue === Number(value);
        if (!isNaN(Date.parse(rowValue))) return rowValue.startsWith(value);
        return true;
      })
    );
  }, [filters, actualData]);

  return (
    <div className="p-4 sm:p-8 lg:p-12 m-2 sm:m-4 lg:m-8 bg-white rounded-2xl shadow-xl overflow-x-auto">
      <div className="max-w-full">
        <FilterPanel 
          entity={entity}
          sampleRow={actualData[0]}
          actualData={actualData}
          onFilterChange={handleFilterChange}
        />
        <div className="mt-4">
          <DataTable
            data={[
              {
                title,
                Entity: entity,
                actualData: filteredData,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
