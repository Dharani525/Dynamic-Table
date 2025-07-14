// components/DataTable/index.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowModes, GridRowEditStopReasons } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import EditToolbar from "./EditToolbar";
import { generateColumns } from "./columns";

const DataTable = ({ data }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const entity = data?.[0]?.Entity;
  const sampleRow = data?.[0]?.actualData?.[0] || {};

  useEffect(() => {
    if (data?.[0]?.actualData?.length) {
      setRows(data[0].actualData.map((row) => ({
        ...row,
        id: row.id || row.productId || row.orderId || crypto.randomUUID(),
      })));
    }
  }, [data]);

  if (!data || !data.length) return <p>No data available</p>;

  const onEditClick = (id) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };

  const onSaveClick = (id) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };

  const onCancelClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const isNew = rows.find((r) => r.id === id)?.isNew;
    if (isNew) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const onDeleteClick = (id) => () => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const onViewClick = (id, row) => {
    navigate(`/view/${id}`, { state: row });
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prev) => prev.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = generateColumns({
    entity,
    sampleRow,
    rowModesModel,
    onEditClick,
    onDeleteClick,
    onSaveClick,
    onCancelClick,
    onViewClick,
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel, columns, title: data[0]?.title || "Data Table" } }}
        showToolbar
        disableColumnSorting
        sx={{
          "& .MuiDataGrid-footerContainer": { display: "none" },
          "& .actions": { color: "text.secondary" },
          "& .textPrimary": { color: "text.primary" },
        }}
      />
    </Box>
  );
};

export default DataTable;
