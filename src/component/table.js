import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid-premium";

export default function DataGridDemo(props) {
  return (
    <Box sx={{ height: 600, width: "100%", color: "white" }}>
      <DataGrid
        rows={props.rows.map((row) => ({ ...row, id: row._id }))}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[10]}
      
        
        disableRowSelectionOnClick
        sx={{ color: "white",border: "1px solid #15bab3"}}
      />
    </Box>
  );
}
