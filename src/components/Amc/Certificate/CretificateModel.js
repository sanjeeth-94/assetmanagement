import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AmcServiceAddService,
   AmcServiceUpdateService,
   FetchDepaertmentService, 
   FetchSectionService,
   FetchVenderService,
   FetchVenderDataService, 
  } from '../../../services/ApiServices';

const CretificateModel = ({ open, setOpen, isAdd, editData, setRefresh,isService }) => {
    
    const [vendorName, setVendorName] = useState('');
    const [vendorNameList, setVendorNameList] = useState([]);
    const [venderEmail ,setVenderEmail]= useState();
    const [venderAddress ,setVenderAddress]= useState();
    const [venderCompany ,setVenderCompany]= useState();
    const [venderPhone ,setVenderPhone]= useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [periodFrom ,setPeriodFrom]= useState();
    const [periodTo ,setPeriodTo]= useState();
    const [premiumCost ,setPremiumCost]= useState();
    const [AMCDoc ,setAMCDoc]= useState();
    const [servicePattern ,setServicePattern]= useState();
    const [department  ,setDepartment]= useState();
    const [section ,setSection]= useState();
    const [sectionList,setSectionList]=useState([]);
    const [assetType ,setAssetType]= useState();
    const [assetName ,setAssetName]= useState();
    const [departmentList,setDepartmentList]= useState([]);
    const [fromDate, setfromDate] = useState('');
    const [vendorData, setVendorData] = useState([]);
    const [toDate, settoDate] = useState(''); 
    const [gstCertificate, setGstCertificate] = useState('');
    
    

    const handleChangefromDate = (e) => {
      setfromDate(e.target.value);
      console.log(e.target.value);
    };
  
    const handleChangetoDate = (e) => {
      settoDate(e.target.value);
      console.log(e.target.value);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
      });

      useEffect(() => {
        FetchDepaertmentService(handleFetchSuccess, handleFetchException);
        FetchVenderService(handleFetchVender, handleFetchVenderException);
      }, [editData]);

       const handleFetchSuccess = (dataObject) =>{
    setDepartmentList(dataObject.data);
  }
  
  const handleFetchException = (errorStaus, errorMessage) =>{
    console.log(errorMessage);
  }

  const handleFetchVender = (dataObject) => {
    setVendorNameList(dataObject.data);
  }

  const handleFetchVenderException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }
  
  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    FetchSectionService ({
      id: e.target.value
  },handleFetchDepartmentSuccess, handleFetchDepartmentException);

}

const onVenderChange = (e) => {
  setVendorName(e.target.value);
  FetchVenderDataService({ id: e.target.value }, handleFetchVenderDataService, handleFetchVenderDataServiceException)
}

const handleFetchVenderDataService = (dataObject) => {
  setVendorData(dataObject.data);
  setPhoneNumber(dataObject?.data[0]?.contactNo || '');
  setEmailId(dataObject?.data[0]?.email || '');
  setVenderAddress(dataObject?.data[0]?.address || '');
}

const handleFetchVenderDataServiceException = (errorStaus, errorMessage) => {
  console.log(errorMessage);
}

    const onSubmit = (e) => {
        e.preventDefault();
            isAdd === true ?
            (
        
            AmcServiceAddService({
              department: department,
        section: section,
        vendorName: vendorName,
        phoneNumber: phoneNumber,
        email: emailId,
        fromDate:fromDate,
        toDate:toDate,
            },handleSuccess, handleException)
            ) : (
            
            AmcServiceUpdateService({
            id: editData.id,
            department: department,
            section: section,
            vendorName: vendorName,
            phoneNumber: phoneNumber,
            email: emailId,
            fromDate:fromDate,
            toDate:toDate,
            }, handleSuccess, handleException)
            );
        }
    
        const handleSuccess = (dataObject) =>{
        console.log(dataObject);
        setRefresh(oldValue => !oldValue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });

        }
    
        const handleException = (errorObject, errorMessage) =>{
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message:errorMessage,
        });
        }
    
        const handleCloseNotify = () => {
        setOpen(false)
        setNotification({
            status: false,
            type: '',
            message: '',
        });
        };
        const handleFetchDepartmentSuccess = (dataObject) =>{
          setSectionList(dataObject.data);
  
        }
        const handleFetchDepartmentException = (errorStaus, errorMessage) =>{
          console.log(errorMessage);
        }
  
        const onSectionChange = (e) => {
          setSection(e.target.value);    
        }

  return (
    <div>
           <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='lg'>
            <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ background: 'whitesmoke' }}>
            {"ADD ASSET"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form>
                <div>
                  <div><h2>VENDER DETAILS</h2> <hr /> </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginLeft: '20px', marginRight: '30px' }}>Name: </label>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl style={{ width: '190px' ,marginLeft:'9px' }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label=""
                        onChange={(e) => onVenderChange(e)}>
                          {vendorNameList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.vendorName}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                    <label style={{ marginLeft: '60px', marginRight: '30px' }}>E-mail: </label>
                    <TextField
                    id="Email"
                    label=""
                    variant="outlined"
                    value={emailId} />
                    <label
                    style={{
                      marginLeft: '60px',
                      marginRight: '30px'
                    }}>
                      Address :
                    </label>
                    <TextField
                    id=""
                    label=""
                    variant="outlined"
                    value={venderAddress} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <label
                    style={{
                      marginLeft: '20px',
                      marginRight: '30px'
                    }}>
                      Phone :
                    </label>
                    <TextField
                    style = {{ width: '190px'}}
                    id=" Phone"
                    label=""
                    variant="outlined"
                    value={phoneNumber}/>
                  </div>
                  <form style={{ border: 'solid', borderColor:'whitesmoke' }}>
                    <div style={{ margin: '20px' }}>
                      <h2>CERTIFICATE DETAILS</h2>
                      <hr />
                    </div>
                    <div style={{ margin: '20px', display: 'flex', marginTop: '20px' }}>
                      <label style={{ marginLeft: '20px', marginRight: '80px' }}>
                      Certificate Date
                      </label>
                      <TextField
                      style={{width:'200px'}}
                      id="Vendor-Address"
                      variant="outlined"
                      type='date'
                      value={fromDate}
                      onChange={(e) => { handleChangefromDate(e) }}/>
                      <label style={{ marginLeft: '20px', marginRight: '80px' }}>
                      Expire Date
                      </label>
                      <TextField
                      style={{width:'200px'}}
                      id="Vendor-Address"
                      variant="outlined"
                      type='date'
                      value={toDate}
                      onChange={(e) => { handleChangetoDate(e) }}/>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '40px', marginTop: '20px', alignItems: 'center' }}>
                      <label style={{ 
                                marginRight: '90px' 
                                }}>
                                    Premium Cost
                       </label>
                      <TextField 
                        id="premium" 
                        label="Premium Cost" 
                        variant="outlined" 
                        onChange={(e) => { setPremiumCost(e.target.value) }}
                        value={premiumCost}    
                       />
                      <label style={{ marginLeft: '60px', marginRight: '50px' }}>Certificate Doc</label>
                      <TextField
                  style={{ width: '300px', marginLeft: '20px' }}
                  
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setGstCertificate(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                  type="file"
                />
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px', marginLeft: '30px', alignItems: 'center' }}>
                      <label style={{ marginRight: '60px' }}>Inspection Pattern :</label>
                      <Box>
                        <FormControl style={{ width: '260px' }}>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          label=""
                          >
                            
                          </Select>
                        </FormControl>
                      </Box>
                      <label style={{ marginRight: '10px', marginLeft: '30px' }}>Department :</label>
                      <Box>
                        <FormControl style={{ width: '260px' }} >
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          label="Age"
                          onChange={(e) => onDepartmentChange(e)}>
                            {departmentList.map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>{data.department_name}</MenuItem>
                              )
                            })}
                            
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px', marginLeft: '30px', alignItems: 'center' }}>
                      <label style={{ marginRight: '140px' }}>Section:</label>
                      <Box>
                        <FormControl style={{ width: '260px' }}>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          label="Age"
                          onChange={(e) => onSectionChange(e)}>
                          {sectionList.map((data, index) => {
                            return (
                              <MenuItem value={data.id} key={index}>{data.section}</MenuItem>
                              )
                          })}
                          </Select>
                        </FormControl>
                      </Box>
                      <label style={{ marginRight: '10px', marginLeft: '30px' }}>Asset Type :</label>
                      <Box>
                        <FormControl style={{ width: '260px' }}>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          label="Age"
                          >
                           
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px', marginLeft: '30px', alignItems: 'center', marginBottom: '30px' }}>
                      <label style={{ marginRight: '100px' }}>Asset Name :</label>
                      <Box>
                        <FormControl style={{ width: '260px' }}>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          label="Age"
                          >
                            
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </form>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='addbutton'>
              <Button style={{ border: 'solid', width: '150px' }} onClick={handleClose} autoFocus>Apply</Button>
            </div>
          </DialogActions>
          </form>
        </Dialog>
      
    </div>
  )
}

export default CretificateModel