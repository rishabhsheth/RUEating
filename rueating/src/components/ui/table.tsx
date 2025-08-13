// table.tsx
import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface DataGridTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSize?: number;
  checkboxSelection?: boolean;
}

export const DataGridTable: React.FC<DataGridTableProps> = ({
  columns,
  rows,
  pageSize = 5,
  checkboxSelection = false,
}) => {
  return (
    <div className="w-full h-[400px] overflow-auto">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick
        className="bg-white [&_.MuiDataGrid-cell]:px-4 [&_.MuiDataGrid-columnHeader]:px-4"
      />
    </div>
  );
};
