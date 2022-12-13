import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchAuditListService, AuditDeleteService } from '../../services/ApiServices';
import NotificationBar from '../../services/NotificationBar';
import AuditModel from './AuditModel';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

const AuditList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false)
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    
    const columns = [
        { field: 'id', headerName: 'Serial No', width: 120 },
        { field: 'auditDate', headerName: 'Date', width: 140 },
        { field: 'auditName', headerName: 'Audit Name', width: 140 },
        { field: 'department', headerName: 'Department', width: 140 },
        { field: 'section', headerName: 'Section', width: 140 },
        { field: 'assetType', headerName: 'Asset Type', width: 140 },
        {field: 'action', headerName: 'Action', width: 250, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row}  />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];

    function EditData({ selectedRow }) {
        return (
            <Edit 
            className='prbuton'
            variant="contained"
            color='primary'
            onClick={() => {
                setIsAdd(false);
                setEditData(selectedRow);
                setOpen(true);
                
            }}/>
        )
    }
    
    function DeleteData({ selectedRow }) {
        return (
            <Delete  
            variant="contained"
            color='primary'
            onClick={() => {
                deleteAudit(selectedRow.id)
            }}/>
        )
    }

    useEffect(() => {
        FetchAuditListService(handleFetchSuccess, handleFetchException);
       
    }, [refresh]);

    const handleFetchSuccess = (dataObject) =>{
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }

    const handleClose = () => {
        setNotification({
          status: false,
          type: '',
          message: '',
        });
    };
    
    const deleteAudit = (id) => {
        AuditDeleteService({id}, handleDeleteSuccess, handleDeleteException);
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

    const handleModalOpen = () => {
        setIsAdd(true);
        setOpen(true);
    };
  
    return (
        <div style={{border:'solid', borderColor:'whitesmoke'}}>
            <div style={{display:'flex'}}>
                <h3 style={{ marginLeft: '50px' }}> Audit View Assets </h3>
                <Button style={{marginLeft:'63%',width:'120px',height:'30px',marginTop:'20px'}} variant="outlined" onClick={handleModalOpen}>
                    Add
                </Button>
            </div>
            <hr style={{ bottom: 'solid' }} />
            <div style={{ height: '400px', width: '90%', marginLeft: '40px', marginTop: '20px' }}>
                <DataGrid
                rows={rows}
                columns={columns} />
                
            </div>
            <AuditModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh} />
            
            <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}/>
        </div>
    )
}

export default AuditList;