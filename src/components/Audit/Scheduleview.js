import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';


const columns = [
  { field: 'Serial No', headerName: 'Serial No', width: 80 },
  { field: 'Date', headerName: 'Date', width: 140 },
  { field: 'Audit Name', headerName: 'Audit Name', width: 140 },
  { field: 'Department', headerName: 'Department', width: 140 },
  { field: 'Section', headerName: 'Section', width: 140 },
  { field: 'Asset Type', headerName: 'Asset Type', width: 140 },
  { field: 'action', headerName: 'Action', width: 250 ,  sortable: false,
      renderCell:(cellValues)=>{
      return(
        <div >
        <Button
        className='prbuton'
        variant="contained"
        color='primary'>
          Edit
        </Button>
        <Button
        variant="contained"
        color='primary'>
          Delete
        </Button>
        </div>
      )
    }
  }
];

const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
];

export default function DataTable() {
  return (
    <div className='adduser' style={{ height: 200, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        onRowAdd/>
    </div>
  );
}
