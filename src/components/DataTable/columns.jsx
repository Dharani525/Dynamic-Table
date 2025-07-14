// components/DataTable/columns.js
import {
  GridActionsCellItem,
  GridRowModes
} from "@mui/x-data-grid";
import { Edit, DeleteOutlined, Save, Close, Visibility } from "@mui/icons-material";

export const generateColumns = ({
  entity,
  sampleRow,
  rowModesModel,
  onEditClick,
  onDeleteClick,
  onSaveClick,
  onCancelClick,
  onViewClick,
}) => {
  const columns = Object.entries(entity).map(([header, field]) => {
    const value = sampleRow?.[field];
    const column = {
      field,
      headerName: header,
      width: 180,
      editable: true,
    };

    if (typeof value === "number") {
      column.type = "number";
      if (!Number.isInteger(value)) {
        column.valueFormatter = ({ value }) => value?.toFixed(2);
      }
    } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
      column.type = "date";
      column.valueFormatter = ({ value }) => {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? ""
          : date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
      };
    }

    return column;
  });

  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    getActions: ({ id, row }) => {
      const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;
      return isEditing
        ? [
            <GridActionsCellItem icon={<Save />} label="Save" onClick={onSaveClick(id)} />,
            <GridActionsCellItem icon={<Close />} label="Cancel" onClick={onCancelClick(id)} />
          ]
        : [
            <GridActionsCellItem icon={<Edit />} label="Edit" onClick={onEditClick(id)} />,
            <GridActionsCellItem icon={<Visibility />} label="View" onClick={() => onViewClick(id, row)} />,
            <GridActionsCellItem icon={<DeleteOutlined />} label="Delete" onClick={onDeleteClick(id)} />,
          ];
    },
  });

  return columns;
};
