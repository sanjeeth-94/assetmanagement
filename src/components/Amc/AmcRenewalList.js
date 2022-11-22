import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { ViewAmcRenewal, AmcServiceDeleteService } from '../../services/ApiServices';

const AmcRenewalList = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [rows , setRows]=useState([]);
  const [editData, setEditData] = useState('');
  const [refresh , setRefresh]=useState(false)
  const [openNotification, setNotification] = useState({
      status: false,
      type: 'error',
      message: '',
  });

  const columns = [
    { field: 'department', headerName: 'Department', width: 250 },
    { field: 'machineName', headerName: 'Machine', width: 250 },
    { field: 'amcStartDate', headerName: 'AMC Start Date', width: 250 },
    { field: 'amcEndDate', headerName: 'AMC End Date', width: 250 },
    {field: 'action', headerName: 'Action', width: 250, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
  ];

  function EditData({ selectedRow }) {
    return (
        <Button style={{ marginLeft: '20px', marginRight: '20px', width: '100px' }}
        className='prbuton'
        variant="contained"
        color='primary'
        onClick={() => {
            setIsAdd(false);
            setEditData(selectedRow);
            setOpen(true);
        }}>
            Edit
        </Button>
    )
}

function DeleteData({ selectedRow }) {
    return (
        <Button style={{ width: '100px' }}
        variant="contained"
        color='primary'
        onClick={() => {
            deleteAmc(selectedRow.id)
            }
            }>
            Delete
        </Button>
    )
}

const deleteAmc = (id) => {
    AmcServiceDeleteService ({id}, handleDeleteSuccess, handleDeleteException);
}

const handleDeleteSuccess = (dataObject) =>{
    console.log(dataObject);
    setRefresh(oldValue => !oldValue);
    setNotification({
        status: true,
        type: 'success',
        message: dataObject.message,
      });
}

const handleDeleteException = (errorObject, errorMessage) =>{
    console.log(errorMessage);
    setNotification({
        status: true,
        type: 'error',
        message:errorMessage,
    });
}

  
  useEffect(()=>{
    ViewAmcRenewal(handleViewAmcRenewalResult,handleViewAmcRenewalError)
  },[]);

  const handleViewAmcRenewalResult=(dataObject)=>{
    setRows(dataObject.data);
    console.log(dataObject.data);
  }
  const handleViewAmcRenewalError=(errorStaus, errorMessage)=>{
    console.log(errorMessage)
    
  }
  return (
    <div>
   
        <h3 style={{marginLeft:'40%'}}> View AMC </h3>
        <hr/>
      <div>
        <Box sx={{ height: 300, width: '100%' }}>
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}/>
        </Box>
      </div>
   
    </div>
  )
}

export default AmcRenewalList
