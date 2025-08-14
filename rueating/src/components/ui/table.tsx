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
    <div className="w-full h-fit">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: pageSize, page: 0 },
          },
        }}
        pageSizeOptions={[10, 15, 20]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        className="bg-white [&_.MuiDataGrid-cell]:px-4 [&_.MuiDataGrid-columnHeader]:px-4"
      />
    </div>
  );
};
