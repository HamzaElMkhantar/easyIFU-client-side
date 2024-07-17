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
import { getAllLabelsAction, LabelsTemplateAction } from '../../redux/actions/labelActions';
import { createProductAction, getProductByIdAction, getProductByProjectIdAction } from '../../redux/actions/productActions';
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

const Templates = () => {

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
  const companyId = decodedToken?.userInfo?.companyId || null
  const userId = decodedToken?.userInfo?._id || null
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [allProjects, setAllProjects] = useState([])
  const {logout, 
        getProductByProjectId,
        LabelsTemplate,
        createProduct} = useSelector(state => state)


  const {labelsTemplateRequest, labelsTemplateSuccess, labelsTemplateFail, labelsTemplate} = LabelsTemplate
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const {productRequest, productSuccess, productsData, productFail} = getProductByProjectId


  useEffect(() => {
    if(logoutSuccess){
      navigate("/login")
    }
  },[logoutSuccess])




  // get all products
  useEffect(() => {
    dispatch(LabelsTemplateAction({companyId, userId}, token))
  }, [])


  useEffect(() => {
    if(labelsTemplateSuccess){
      setAllProjects(labelsTemplate)
    }

    if(labelsTemplateFail){
      setAllProjects([])
    }
  }, [labelsTemplateSuccess, labelsTemplateFail])


    // ------ headers ------
    const handleLogout = () => {
        dispatch(logoutAction())
      }
      const [anchorEl, setAnchorEl] = React.useState(null);
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleCloseAnchor = () => {
        setAnchorEl(null);
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
        </div>
        {/* Dashboard  content   */}
       {!labelsTemplateRequest ? <section className='container py-5' style={{paddingTop:'20px', overflowY:'scroll', height:'94.3vh'}}>
          <div>
            <Table striped bordered hover style={{backgroundColor:'#fff'}} className="table table-hover my-1">
              <thead style={{backgroundColor:'#075670', textAlign:'center'}} className="thead-dark">
                  <tr style={{color:'#fff'}}>
                  <th scope="col">#</th>
                  <th scope="col">Template Name</th>
                  <th scope="col">Description</th>
                  {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") 
                    || decodedToken?.userInfo?.role.includes("Creator")) &&
                  
                  <>
                    <th scope="col">createdAt</th>
                    <th scope="col">Details</th>
                  </>}
                  </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                {allProjects &&
                  allProjects?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.labelName}</td>
                        <td >{item.labelDescription?.length > 20  
                                ? item.labelDescription.substring(0, 20) + '...'
                                : item.labelDescription}</td>
                          <td>{formatDate(item?.createdAt)}</td>
                        {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") 
                          || decodedToken?.userInfo?.role.includes("Creator")) &&
                        
                        <td><Link to={`/dashboard/project-released/${item._id}`}
                            style={{color:'#021D41', 
                              backgroundColor:"#efefef", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              <VisibilityIcon style={{paddingBottom:'3px', fontSize:'24px'}} />
                          </Link>
                        </td>}
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
              {(productRequest) && 
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
              {(allProjects.length < 1 && !productRequest)&& <h6 style={{textAlign:'center', marginTop:'10px'}}>No Projects Created</h6>}
          </div>
        </section> 
        :(<div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
            <RotatingLines
                strokeColor="#011d41"
                strokeWidth="5"
                animationDuration="0.75"
                width="90"
                visible={true}
              /> 
          </div>)}
      </main>
    </div>
  )
}

export default Templates