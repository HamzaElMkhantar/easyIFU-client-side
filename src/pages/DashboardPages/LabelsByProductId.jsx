import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import '../../components/header/header.css';
import DeleteIcon from '@mui/icons-material/Delete';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {archivedProjectToggleAction, 
        deleteProjectAction, 
        duplicateLabelAction, 
        getAllProjectsAction, 
        startProjectAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import ArchiveIcon from '@mui/icons-material/Archive';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Popover } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import BarLinks from '../../utilities/BarLinks';
import NavDashboard from '../../components/header/NavDashboard';
import { logoutAction } from '../../redux/actions/authActions';
import { createLabelAction, getAllLabelsAction } from '../../redux/actions/labelActions';
import { getProductByIdAction } from '../../redux/actions/productActions';
import Swal from 'sweetalert2';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "600px",
  width:"98%" ,
  bgcolor: 'background.paper',
  border: '1px solid lightGray',
  boxShadow: 4,
  p: 4,
  borderRadius: '3px'
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`;
}
const LabelsByProject = () => {
  const {productId} = useParams()

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem('sideToggle')) || false
  );
  const toggleSidebar = () => {
      const newToggleState = !isSidebarOpen;
      setIsSidebarOpen(newToggleState);
      localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
    };

  // --- component logic ---
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null
  const companyId = decodedToken && decodedToken?.userInfo?.companyId
  const dispatch = useDispatch();
  const navigate = useNavigate()

   const [allProjects, setAllProjects] = useState([])
   const [intendedPurpose, setIntendedPurpose] = useState([])
   const [intendedData, setIntendedData] = useState([]);
console.log("project : ", allProjects)
   const [formData, setFormData] = useState({
    companyId: decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?.companyId,
    createdBy:decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?._id,
    productId,
    labelName: '',
    labelDescription: '',
    intendedPurpose: intendedData
  });

    // toggle form 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
    setOpen(false)
    setIntendedData([])
    setFormData({
      companyId: decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?.companyId,
      createdBy:decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?._id,
      productId,
      labelName: '',
      labelDescription: '',
      intendedPurpose: intendedData
    })
    };


   const handleIntendedPurpose = (item) => {
     // Check if the item is already in intendedData
     const isItemSelected = intendedData.some((dataItem) => dataItem._id === item._id);
 
     if (isItemSelected) {
       // If item exists in intendedData, remove it
       const updatedData = intendedData.filter((dataItem) => dataItem._id !== item._id);
       setIntendedData(updatedData);
       setFormData({...formData, intendedPurpose: updatedData});
     } else {
       // Otherwise, add the item to intendedData
       setIntendedData([...intendedData, item]);
       setFormData({...formData, intendedPurpose: [...intendedData, item]});
     }
   };
 
   const isItemChecked = (item) => {
     // Check if the item is present in intendedData
     return intendedData.some((dataItem) => dataItem._id === item._id);
   };

  const {createLabel,
        deleteProject, 
        logout, 
        archivedProjectToggle, 
        duplicateProject, 
        productById,
        getAllLabels} = useSelector(state => state)

  const {productByIdRequest, productByIdSuccess, productByIdFail, productByIdData} = productById

  const {createLabelRequest, createLabelSuccess, createLabelFail, label} = createLabel
  const {deleteProjectRequest, deleteProjectSuccess, deleteProjectFail} = deleteProject
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const {archiveToggleProjectRequest, archiveToggleProjectSuccess, archiveToggleProjectFail, archiveToggleData} = archivedProjectToggle
  const {duplicateProjectRequest, duplicateProjectSuccess, duplicateProjectFail, deplicatedProject} = duplicateProject
  const {labelRequest, labelSuccess, labelFail, labelsData} = getAllLabels

  console.log(labelRequest, labelSuccess, labelFail, labelsData)

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  useEffect(() => {
    if(logoutSuccess){
      navigate("/login")
    }
  },[logoutSuccess])

  // handle duplicate project for update it
  useEffect(() => {
    if(duplicateProjectSuccess){
      navigate(`/dashboard/project-information/${deplicatedProject._id}`)
    }

    if(duplicateProjectFail){
      toast.warning(`${duplicateProjectFail?.message}`)
    }
  },[duplicateProjectFail, duplicateProjectSuccess])

  // get all projects
  useEffect(() => {
    dispatch(getAllLabelsAction(productId, companyId, decodedToken?.userInfo?._id, token))
    dispatch(getProductByIdAction(productId, token))
  }, [])

  useEffect(() => {
    if(createLabelSuccess){
      setOpen(false)
      dispatch(getAllLabelsAction(productId, companyId, decodedToken?.userInfo?._id, token))
      setFormData({
        companyId: decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?.companyId,
        createdBy:decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?._id,
        productId,
        labelName: '',
        labelDescription: '',
        intendedPurpose: []
      })
      setIntendedData([])
    }


    if(productByIdSuccess){
      setIntendedPurpose(productByIdData?.labelData?.intendedPurpose)
    }

    if(createLabelFail){
      if(createLabelFail.message == "payment_required!"){
        handleClose()
        Swal.fire({
          title: "Subscription Needed",
          text: "To unlock the ability to create additional labels, please upgrade your subscription.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Upgrade Now",
          cancelButtonText: "Close",
          customClass: {
            popup: 'custom-swal-bg',
            confirmButton: 'custom-swal-button',
            cancelButton: 'custom-swal-cancel-button',
            icon: 'custom-swal-icon'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close()
            navigate('/check-subscription')
          }
        });
      }else{
        toast.warning(`${createLabelFail.message}`)
      }
    }
  }, [createLabelSuccess, productByIdSuccess, createLabelFail])


  useEffect(() => {
    if(labelSuccess){
      setAllProjects(labelsData)
    }

    if(labelFail){
      // toast.warning(`${getAllProjectsFail.message}`)
      setAllProjects([])
    }

    if(deleteProjectFail){
      toast.warning(`${deleteProjectFail.message}`)
    }
  }, [labelSuccess, labelFail, deleteProjectFail])


 

  const [numElements, setNumElements] = useState(0);
  const [projectSizes, setProjectSizes] = useState(Array(numElements).fill(0));
  
  const handleCreateLabel = () => {
    dispatch(createLabelAction(formData, token))
  }

  // handleNumElementsChange function
  const handleNumElementsChange = (e) => {
    const newNumElements = parseInt(e.target.value, 10) || 0;
    setNumElements(newNumElements);
  
    // Update the state with an array of zeros only if the user has started entering data
    setProjectSizes(Array(newNumElements).fill(Number));
    
    // Update formData.labelSizes if needed
    setFormData((prevData) => ({
      ...prevData,
      labelSizes: newNumElements > 0 ? Array(newNumElements).fill(Number) : [],
    }));
  };
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'labelSizes') {
      // Split the input string into an array using "-" as the delimiter
      const sizesArray = value.split('-').map((size) => size.trim());

      // Update the state
      setFormData((prevData) => ({
        ...prevData,
        labelSizes: sizesArray,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const renderInputFields = () => {
    return projectSizes.map((size, index) => (
      <input
        key={index}
        type="text"
        className="form-control"
        placeholder={`Enter size ${index + 1}`}
        value={size}
        onChange={(e) => handleInputChange(index, e.target.value)}
      />
    ));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.projectName == '' || formData.projectDescription == ''){
      toast.warning("Fields are Empty !")
    }else{
      dispatch(startProjectAction(formData, token))
    }
  }

  const handleDelete = (projectId) => {
    dispatch(deleteProjectAction(projectId, token))
  }

  // useEffect(() => {
  //   if(startProjectSuccess){
  //     navigate(`/dashboard/create-project/step1/${projectId}`)
  //   }
  //   if(startProjectFail){
  //     toast.error("Fields are Empty !")
  //   }
  // }, [ startProjectSuccess, startProjectFail])
  


    //  dynamic input
    const [serviceList, setServiceList] = useState([""]);

    const handleServiceChange = (e, index) => {
      const { value } = e.target;
      const list = [...serviceList];
      list[index] = value;
      setServiceList(list);
      setFormData((prevData) => ({
          ...prevData,
          labelSizes: list
      }));
    };
    
    const handleServiceRemove = (index) => {
      const list = [...serviceList];
      list.splice(index, 1);
      setServiceList(list);
      setFormData((prevData) => ({
        ...prevData,
        labelSizes: list
      }));
    };
     
    
    const handleServiceAdd = () => {
      setServiceList([...serviceList, ""]);
      setFormData((prevData) => ({
          ...prevData,
              labelSizes: serviceList,
      }));
    };


    // ------ headers ------
    let barLinks = [
      {title: 'All Labels', link: '/dashboard/labels/'+productId},
      {title: 'Draft', link: '/dashboard/project/draft/'+productId},
      {title: 'Approved', link: '/dashboard/project/approved/'+productId},
      {title: 'Released', link: '/dashboard/project/released/'+productId},
      {title: 'Rejected', link: '/dashboard/project/rejected/'+productId}]
    
    if(decodedToken &&
      decodedToken?.userInfo && 
      (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Creator"))){
        barLinks = [
          {title: 'All Labels', link: `/dashboard/labels/${productId}`},
          {title: 'Draft', link: `/dashboard/project/draft/${productId}`},
          {title: 'Approved', link: `/dashboard/project/approved/${productId}`},
          {title: 'Released', link: '/dashboard/project/released/'+productId},
          {title: 'Rejected', link: `/dashboard/project/rejected/${productId}`},
        ];
    } else if(decodedToken &&
      decodedToken?.userInfo && 
      (!decodedToken?.userInfo?.role.includes("Admin") || !decodedToken?.userInfo?.role.includes("Creator"))){
        barLinks = [
          // {title: 'Projects', link: '/dashboard/project'},
          {title: 'Released', link: '/dashboard/project/released'},
        ];
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseAnchor = () => {
      setAnchorEl(null);
    };


    // table menu
    const [anchorETable, setAnchorElTable] = useState(null);

    const handleMenuClick = (event) => {
      setAnchorElTable(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorElTable(null);
    };
  
    const handleArchive = (_id) => {
      dispatch(archivedProjectToggleAction(_id, token));
      handleCloseMenu();
    };


    // ----  Label Version Model ----





    const [openLabelVersionModel, setOpenLabelVersionModel] = useState(false)

    const handleLabelVersionSubmit = (e) => {
      e.preventDefault();

    };
    const handleLabelVersionClose = () => {
      setOpenLabelVersionModel(false)
    };

    const [oldVersionId, setOldVersionId] = useState('')
    const handleLabelVersionOpen = (oldLabelVersionId) => {
      setOpenLabelVersionModel(true)

      setOldVersionId(oldLabelVersionId)
    };
  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className='' style={{paddingTop:'0px', width:'100%'}}>
        {/* Dashboard header  */}
        <div  style={{position:'sticky', top:'0'}} id="page-content-wrapper">
          <Box sx={{ flexGrow: 1}} className="" >
            <AppBar position="static" style={{backgroundColor:'#ecf0f3',  marginBottom:'-10px'}}>
              <Toolbar className='container'  style={{marginTop:'-10px'}}>
                <IconButton
                  size="large"
                  edge="start"
                  color="black"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleSidebar}
                >
                  <WidgetsRoundedIcon style={{color:'#021d41'}} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/">
                      <img className='dash-Logo' src={easyIFUlogo} alt="easyIFU-logo" />
                  </Link>
                </Typography>

                  <div >
                    <IconButton
                      size="small"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      style={{height:'35px', width:'35px', padding:'2px'}}
                    >
                      <Avatar  style={{color:'#ecf0f3', backgroundColor:'#021d41', height:'100%', width:'100%'}} 
                      onClick={handleMenu}
                      />
                      {/* <Avatar style={{backgroundColor:'#021d41', color:'#fff', height:'30px', width:'30px'}}>Y</Avatar> */}
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseAnchor}
                    >
                      <Link to="/dashboard/account" style={{color:'black'}} onClick={handleCloseAnchor}> <MenuItem >Profile</MenuItem></Link>
                      <Link to="/dashboard/company" style={{color:'black'}} onClick={handleCloseAnchor}> <MenuItem >My Company</MenuItem></Link>
                      <Link style={{color:'black', borderTop:'1px solid lightGray'}}
                            onClick={() => handleLogout()} > <MenuItem style={{fontSize:'14px', fontWeight:'700', borderTop:'1px solid lightGray'}} >Logout</MenuItem>
                            </Link>
                    </Menu>
                  </div>

              </Toolbar>
            </AppBar>
          </Box>
          <BarLinks pages={barLinks}/>
        </div>


        {/* Dashboard  content   */}
        <section className='container pb-5' style={{marginTop:'15px'}}>
          {/* modal */}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{color:'#08408B', textAlign:'center'}}>
                  Project Information
              </h2>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                        <label>1- Label Name:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, labelName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>2- Label Description:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, labelDescription: e.target.value })}
                        />
                    </div>
                    <div className="form-field">
                      <label htmlFor="service">3- choose the intended purpose for this label:</label>
                      {intendedPurpose?.map((item, index) => (
                              <div key={index} style={{}}>
                                <input
                                  type="checkbox"
                                  checked={isItemChecked(item)}
                                  onChange={() => handleIntendedPurpose(item)}
                                />
                                <label htmlFor={`language-${item._id}`} className="px-2">
                                  {item.language}
                                </label>
                              </div>
                            ))}
                </div>
                    {!createLabelRequest 
                      ? <div style={{display:'flex', justifyContent:'space-between'}}>
                        <button onClick={handleCreateLabel}
                          style={{marginTop:'20px', 
                              padding:'5px 20px', 
                              fontWeight:'600', 
                              fontSize:'18px', 
                              borderRadius:'5px', 
                              backgroundColor:'#011d41', 
                              color:'#fff'}}>Start Creating</button>
                        <button
                          onClick={handleClose}
                          style={{marginTop:'20px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#1753A2', color:'#fff'}}>Close</button>
                      </div> 
                        : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                          <RotatingLines
                            strokeColor="#011d41"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible={true}
                          /> 
                      </div>
                    }
                </form>
              </Typography>
            </Box>
          </Modal>

          {/* modal for new label version*/}
          <Modal className='' 
                  open={openLabelVersionModel}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
            <Box sx={style} style={{backgroundColor:'#FFD631', border:'0'}}>
              <h5 className='text-center' style={{color:'#08408B', textAlign:'center', fontWeight:'600'}}>
                Please be aware that updating certain information will require creating a new product with a new  Unique 
                <br/>Device Identification (UDI) code. Changes have 
                <br/>been made to the following aspects :
              </h5>
              <ul>
                <li>• Name or trade name of the device</li>
                <li>• Device version or model</li>
                <li>• Labelled as single use</li>
                <li>• Packaged sterile</li>
                <li>• Need for sterilization before use</li>
                <li>• Quantity of devices provided in a package</li>
                <li>• Critical warning or contra-indications</li>
              </ul>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {!duplicateProjectRequest 
                  ? <div style={{display:'flex', justifyContent:'space-between'}}>

                    <button onClick={() => dispatch(duplicateLabelAction(oldVersionId, token))} style={{marginTop:'20px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#011d41', color:'#fff'}}>Continue</button>
                    <button
                      onClick={handleLabelVersionClose}
                      style={{marginTop:'20px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#1753A2', color:'#fff'}}>Close</button>
                  </div> 
                  : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                      <RotatingLines
                        strokeColor="#011d41"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="40"
                        visible={true}
                      /> 
                  </div>}
              </Typography>
            </Box>
          </Modal>

          {/* <Link to='/dashboard/create-project/step1'> */}
           {decodedToken 
              && decodedToken?.userInfo 
              && (decodedToken?.userInfo?.role.includes("Admin") 
              || decodedToken?.userInfo?.role.includes("Creator")) 
              &&<button onClick={handleOpen}
                    style={{
                      padding: "8px 20px",
                      backgroundColor:"#9a3b3a",
                      borderRadius:'3px',
                      color: "#ecf0f3",
                      fontWeight:'700'
                    }}>
                New Label</button>}
          {/* </Link> */}
          <div>
            <Table striped bordered hover style={{backgroundColor:'#fff'}} className="table table-hover my-1">
              <thead style={{backgroundColor:'#075670', textAlign:'center'}} className="thead-dark">
                  <tr style={{color:'#fff'}}>
                  <th scope="col">#</th>
                  <th scope="col">Label Name</th>
                  <th scope="col">Version</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>

                  {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") 
                    || decodedToken?.userInfo?.role.includes("Creator")) &&
                  
                  <>
                    <th scope="col">Details</th>
                    {/* <th scope="col">Manage</th> */}
                    <th scope="col">Edit</th>
                  </>}
                  <th scope="col">createdAt</th>
                  </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                {allProjects &&
                  allProjects?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.labelName}</td>
                        <td> {(item.labelVersion)}</td>
                        <td >{item?.labelDescription?.length > 20  
                                ? item.labelDescription.substring(0, 20) + '...' 
                                : item.labelDescription}</td>
                  <td style={item?.status == "rejected" 
                            ? {color:'#921212', fontWeight:'700'} 
                            : ( item?.status == "released" 
                                            ? {color:'#066136', fontWeight:'700'} 
                                            : {fontWeight:'600'})  } >
                              
                              {item?.status}</td>
                        {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") 
                          || decodedToken?.userInfo?.role.includes("Creator")) &&
                        
                        <td>
                          {item.labelStep < 11
                          ? <Link to={`/dashboard/create-project/step${item.labelStep}/${item._id}`}
                            style={{backgroundColor:'#021D41', 
                              color:"#fff", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              Continue
                          </Link>
                          : <Link to={`/dashboard/project-information/${item._id}`}
                            style={{color:'#021D41', 
                              backgroundColor:"#efefef", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              <VisibilityIcon style={{paddingBottom:'3px', fontSize:'24px'}} />
                          </Link>}
                        </td>}
                          <td>
                              <button 
                                  onClick={() => handleLabelVersionOpen(item._id)}
                                  > 
                                  {!duplicateProjectRequest 
                                  ? <ContentCopyRoundedIcon style={{color:'#021D41',  Size:'24px'}}/>
                                  : <RotatingLines
                                              strokeColor="#021D41"
                                              strokeWidth="5"
                                              animationDuration="0.75"
                                              width="23"
                                              visible={true}
                                          /> }
                                
                              </button>
                          </td>
                          <td>{formatDate(item?.createdAt)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
              {(labelRequest || deleteProjectRequest) && 
                <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                  <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                  /> 
                </div>
              }
              {(allProjects.length < 1 && !labelRequest) && <h6 style={{textAlign:'center', marginTop:'10px'}}>No Projects Created</h6>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default LabelsByProject