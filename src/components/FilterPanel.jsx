import React from "react";
import Select from "react-select";

export default function FilterPanel({ entity, sampleRow, onFilterChange, actualData }) {
  const getUniqueValues = (field) => {
    const values = actualData.map((row) => row[field]).filter((v) => v !== undefined && v !== null);
    const unique = [...new Set(values)];

    // Convert to { value, label } format for react-select
    return unique.map((v) => {
      let label = v;

      if (typeof sampleRow?.[field] === "string" && !isNaN(Date.parse(v))) {
        const date = new Date(v);
        label = date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

      return { value: v, label };
    });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
      {Object.entries(entity).map(([label, field]) => {
        const options = getUniqueValues(field);

        if (!options.length) return null;

        return (
          <div key={field} style={{ minWidth: 200 }}>
            <label style={{ display: "block", marginBottom: "4px" }}>{label}</label>
            <Select
              options={[{ value: "", label: "All" }, ...options]}
              onChange={(selected) => onFilterChange(field, selected?.value || "")}
              isClearable
              placeholder={`Filter ${label}`}
            />
          </div>
        );
      })}
    </div>
  );
}
