import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid } from '@mui/material';

const MaintenanceViewClose = ({ open, setOpen, isAdd, editData, setRefresh }) => {
    const [rows, setRows] = useState([]);
    const [affectingMachines,setAffectingMachines]=useState('');
    const [utilizationPlan,setUtilizationPlan]=useState('');
    const [affectingManHours,setAffectingManHours]=useState('');
    const [utilizationPlan2,setUtilizationPlan2]=useState('');
    
    const columns = [
        { field: 'maintenanceId', headerName: 'Name	', width: 80 },
        { field: 'maintenanceType', headerName: 'Part Id', width: 100 },
        { field: 'assetName', headerName: 'Quantity	', width: 100 },
        { field: 'severity', headerName: 'UOM', width: 100 },
        { field: 'problemNote', headerName: 'Unit Price', width: 120 },
       
       
    ]
    useEffect(() => {
        setAffectingMachines(editData.affectedMachine || '');
        setUtilizationPlan(editData.shutdownOrUtilization || '');
        setAffectingManHours(editData.timeFrom ||'' );
        setUtilizationPlan2(editData.offOrUtilization || '');
      }, [editData]);
    
      const handleClose = () => {
        setOpen(false);
      
        };
    
        const onSubmit = (e) => {
            e.preventDefault();
           
          }
  return (
    <div>
      <Dialog
      open={open}
      maxWidth='lg'
    >
      <form onSubmit={onSubmit}>
        <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
          {isAdd === true ? 'Estimated Cost For Maintenance ' : 'Close Maintainance Schedule '}User
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { 
            
            isAdd=== true ?
            (
         <>
     
         <Grid container>
         <Grid style={{ height: 200, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5]}
            onRowAdd/>
        </Grid>
        <div>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:'20px', marginLeft:'250px' }}>
      <Accordion >
        <AccordionSummary
        fullwith 
          expandIcon={<VisibilityIcon />}
          
        >
          <Typography style={{marginLeft:'200px'}}>Impact and Plans</Typography>
          <hr/>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div>
                <div style={{display:'flex',marginTop:'5px'}}>
           <label style={{marginLeft:'50px', marginRight:'100px'}}>Affecting Machines: </label>
           <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={affectingMachines} variant="standard" />
          
           </div>
           <div style={{display:'flex' ,marginTop:'5px'}}>
           <label style={{marginLeft:'80px', marginRight:'100px'}}>Utilization Plan: </label>
           <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={utilizationPlan} variant="standard" />
          
           </div>
           <div style={{display:'flex',marginTop:'5px'}}>
           <label style={{marginLeft:'50px', marginRight:'100px'}}>Affecting Man Hours: </label>
           <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={affectingManHours} variant="standard" />
          
           </div>
           <div style={{display:'flex',marginTop:'5px'}}>
           <label style={{marginLeft:'50px', marginRight:'100px'}}>Utilization Plan: </label>
           <TextField style={{marginLeft:'50px', marginRight:'100px'}} value={utilizationPlan2} variant="standard" />
          
           </div>
           </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </div>
         </Grid>
         </>
            ):(
                <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginLeft:'30px'}}>
                    <lable>Remarks</lable>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                
                </Grid>
                </>
            )
}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='addbutton'>
            <Button type='reset' onClick={handleClose}>Cancel</Button>
            <Button type='submit'>
              {isAdd === true ? 'Add' : 'Update'}
            </Button>
          </div>
         
        </DialogActions>
      </form>
    </Dialog>
    </div>
  )
}

export default MaintenanceViewClose