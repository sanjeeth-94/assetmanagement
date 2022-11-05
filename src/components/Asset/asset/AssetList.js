import  React , { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { FetchAssetListService } from '../../../services/ApiServices';
import AssetModel from './AssetModel';

const AssetList = () => {
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [rows, setRows] = useState([]);
    const [editData, setEditData] = useState('');
    const [refresh , setRefresh]=useState(false)
    
    const columns = [
        { field: 'id', headerName: 'Serial No', width: 80 },
        { field: 'department', headerName: 'Department', width: 140 },
        { field: 'section', headerName: 'Section', width: 140 },
        { field: 'assetName', headerName: 'Machine', width: 140 },
        { field: 'assetType', headerName: 'Asset Type', width: 140 },
        { field: 'manufaturer', headerName: 'Manufacturer', width: 140 },
        { field: 'assetModel', headerName: 'Asset Model', width: 140 },
        { field: 'warrantyStartDate', headerName: 'Warranty Start Date', width: 140 },
        { field: 'warrantyEndDate', headerName: 'Warranty End Date', width: 140 },
        {field: 'action', headerName: 'Action', width: 250, sortable: false,
        cellClassname: 'actions',
        type: 'actions',
        getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
        ],
        }
    ];
    
    useEffect(() => {
        FetchAssetListService(handleFetchSuccess, handleFetchException);
    }, [refresh]);
    
    const handleFetchSuccess = (dataObject) =>{
        setRows(dataObject.data);
    }

    const handleFetchException = (errorStaus, errorMessage) =>{
        console.log(errorMessage);
    }
    
    function EditData({ selectedRow }) {
        return (
            <Button style={{ marginLeft: '20px', marginRight: '20px', width: '100px' }}
            className='prbuton'
            variant="contained"
            color='primary'>
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
                deletUser(selectedRow.id)
            }}>
              Delete
            </Button>
        )
    }
    
    const deletUser = (id) => {
        
    }
    
    const handleDeleteSuccess = (dataObject) =>{
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
    }
    
    const handleDeleteException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
    }
    
    const handleModalOpen = () => {
        setIsAdd(true);
        setOpen(true);   
    };
  
    return (
        <div>
            <h1 style={{ marginLeft: '50px' }}>Asset</h1>
            <hr style={{ bottom: 'solid' }} />
            <Button style={{marginLeft:'83%',width:'120px',height:'30px', marginBottom:'20px'}} variant="outlined" onClick={handleModalOpen}>
               Add
            </Button>
            <div className='adduser' style={{ height: 270, width: '90%' }}>
                <DataGrid
                rows={rows}
                columns={columns} />
            </div>
            <AssetModel
            open={open}
            setOpen={setOpen}
            isAdd={isAdd}
            editData={editData}
            setRefresh={setRefresh}/>
        </div>
    )
}

export default AssetList
