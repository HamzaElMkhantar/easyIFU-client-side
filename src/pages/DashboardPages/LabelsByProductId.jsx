import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import '../../components/header/header.css';
import DeleteIcon from '@mui/icons-material/Delete';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {archivedProjectToggleAction, 
        deleteProjectAction, 
        duplicateProjectAction, 
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

const LabelsByProject = () => {
  const {productId} = useParams()

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

     // toggle form 
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

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
   const [formData, setFormData] = useState({
     companyId: decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?.companyId,
     createdBy:decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?._id,
     productId,
     labelName: '',
     labelDescription: '',
     labelSizes: [],
   });
  const {createLabel,
        deleteProject, 
        logout, 
        archivedProjectToggle, 
        duplicateProject, 
        getAllLabels} = useSelector(state => state)

  const {createLabelRequest, createLabelSuccess, createLabelFail, label} = createLabel
  const {deleteProjectRequest, deleteProjectSuccess, deleteProjectFail} = deleteProject
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const {archiveToggleProjectRequest, archiveToggleProjectSuccess, archiveToggleProjectFail, archiveToggleData} = archivedProjectToggle
  const {duplicateProjectRequest, duplicateProjectSuccess, duplicateProjectFail} = duplicateProject
  const {labelRequest, labelSuccess, labelFail, labelsData} = getAllLabels

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  useEffect(() => {
    if(logoutSuccess){
      navigate("/login")
    }
  },[logoutSuccess])


  // get all projects
  useEffect(() => {
    dispatch(getAllLabelsAction(productId, companyId, decodedToken?.userInfo?._id, token))
  }, [])

  useEffect(() => {
    if(createLabelSuccess){
      // dispatch(getAllLabelsAction(productId, companyId, decodedToken?.userInfo?._id, token))
      // handleClose()

      // setFormData({
      //   productId,
      //   labelName: '',
      //   labelDescription: '',
      //   labelSizes: [],
      // })
      navigate(`/dashboard/create-project/step1/${label._id}`)
    }
  }, [createLabelSuccess])


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
    const barLinks = [
      {title: 'Projects', link: '/dashboard/project'},
      {title: 'Released', link: '/dashboard/project/released'},
      {title: 'Received', link: '/dashboard/received-project'},
      {title: 'Archived', link: '/dashboard/archived-project'},
    ];
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
                            onClick={() => handleLogout()} > <MenuItem style={{fontSize:'14px', fontWeight:'700', borderTop:'1px solid lightGray'}} >LogOut</MenuItem>
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
                    <label htmlFor="service">4- Enter Project Sizes (By Centimeter):</label>
                    {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division mb-1" style={{display:'flex',}}>
                        <input
                            name="service"
                            style={{width:'50%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                            type="Number"
                            min="0"
                            id="service"
                            value={singleService}
                            placeholder={`Size ${index + 1}`}
                            onChange={(e) => handleServiceChange(e, index)}
                        />
                        {serviceList.length !== 1 && (
                              <button
                                  type="button"
                                  style={{backgroundColor:'#FBB8B8', borderRadius:'6px'}}
                                  onClick={() => handleServiceRemove(index)}
                                  className="remove-btn mx-2"
                                  >
                                  <span><DeleteIcon style={{color:'#2D2D2E'}} /></span>
                              </button>
                          )}
                        </div>
                        <div className="second-division">
       
                        {serviceList.length - 1 === index && (
                            <button
                                    type="button"
                                    style={{borderRadius:'5px', backgroundColor:'#79D4A3', fontSize:'14px'}}
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                >
                                <span>Add size</span>
                            </button>
                        )}
                        </div>
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
                  <th scope="col">Project Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") 
                    || decodedToken?.userInfo?.role.includes("Creator")) &&
                  
                  <>
                    <th scope="col">Details</th>
                    <th scope="col">Manage</th>
                    <th scope="col">Duplicate</th>
                  </>}
                  </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                {allProjects &&
                  allProjects?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.labelName}{item.projectVersion && (item.projectVersion > 1)?  "(V" +item.projectVersion +")" : null}</td>
                        <td >{item.labelDescription.length > 20  
                                ? item.labelDescription.substring(0, 20) + '...' 
                                : item.labelDescription}</td>
                  <td scope="col">{item.released ? "Released": "processing..."}</td>
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
                        {decodedToken && decodedToken?.userInfo 
                          && (decodedToken?.userInfo?.role.includes("Admin") 
                          || decodedToken?.userInfo?.role.includes("Creator")) &&
                          <td>{item.projectStep < 10
                             ? <button 
                                    style={{borderRadius:'4px'}} 
                                    onClick={() => handleDelete(item._id)}> 
                                <DeleteIcon style={{color:'#e97372', fontSize:'24px'}}/>
                              </button>
                             :<button disabled={archiveToggleProjectRequest ? true : false}
                             onClick={() => dispatch(archivedProjectToggleAction(item._id, token))} 
                             style={{borderRadius:'4px'}}>
                                  {!archiveToggleProjectRequest 
                                  ? <ArchiveIcon style={{marginLeft:'', fontSize:'24px', color:'#021D41'}}/>
                                  : <RotatingLines
                                              strokeColor="#021D41"
                                              strokeWidth="5"
                                              animationDuration="0.75"
                                              width="23"
                                              visible={true}
                                          /> }
                                  </button>
                          }</td>
                          }
                          <td>
                              <button disabled={item?.projectStep === 11 ? false : true}
                                  onClick={() => dispatch(duplicateProjectAction(item?._id, token))}
                                  style={item?.projectStep === 11 ? {borderRadius:'4px'}: {borderRadius:'4px', opacity:'0.5'}} > 
                                  {!duplicateProjectRequest 
                                  ? <ContentCopyRoundedIcon style={{color:'#021D41', fontSize:'24px'}}/>
                                  : <RotatingLines
                                              strokeColor="#021D41"
                                              strokeWidth="5"
                                              animationDuration="0.75"
                                              width="23"
                                              visible={true}
                                          /> }
                                
                              </button>
                          </td>
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