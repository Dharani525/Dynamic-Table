// components/DataTable/EditToolbar.jsx
import React from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const EditToolbar = ({ setRows, setRowModesModel, columns, title = "Data Table" }) => {
  const handleClick = () => {
    const id = crypto.randomUUID();
    const newRow = columns.reduce((acc, column) => {
      if (column.field !== "actions") acc[column.field] = "";
      return acc;
    }, { id, isNew: true });

    setRows((prev) => [...prev, newRow]);
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: "edit", fieldToFocus: columns[0]?.field },
    }));
  };

  return (
    <GridToolbarContainer sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" px={2} py={1}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Tooltip title="Add record">
          <button onClick={handleClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <AddIcon fontSize="small" />
          </button>
        </Tooltip>
      </Box>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
