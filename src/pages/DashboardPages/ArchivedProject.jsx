import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../../components/header/header.css';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import UnarchiveRoundedIcon from '@mui/icons-material/UnarchiveRounded';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { archivedProjectToggleAction, deleteProjectAction, getArchivedProjectsAction} from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import VisibilityIcon from '@mui/icons-material/Visibility';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import BarLinks from '../../utilities/BarLinks';
import { logoutAction } from '../../redux/actions/authActions';
import { Tab, Table } from 'react-bootstrap';

const ArchivedProject = () => {

  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem('sideToggle')) || false
  );
  const toggleSidebar = () => {
      const newToggleState = !isSidebarOpen;
      setIsSidebarOpen(newToggleState);
      localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
    };

  // -- component logic --
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null
  const companyId = decodedToken && decodedToken?.userInfo?.companyId
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [allProjects, setAllProjects] = useState([])
  const {getArchivedProjects, deleteProject, logout, archivedProjectToggle} = useSelector(state => state)
  const {getArchivedProjectsRequest, getArchivedProjectsSuccess, getArchivedProjectsFail, archivedProjects} = getArchivedProjects
  const {deleteProjectRequest, deleteProjectSuccess, deleteProjectFail} = deleteProject
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const {archiveToggleProjectRequest, archiveToggleProjectSuccess, archiveToggleProjectFail, archiveToggleData} = archivedProjectToggle

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
    dispatch(getArchivedProjectsAction(companyId, token))
  }, [])

  useEffect(() => {
    if(deleteProjectSuccess || archiveToggleProjectSuccess){
      dispatch(getArchivedProjectsAction(companyId, token))
    }
  }, [deleteProjectSuccess, archiveToggleProjectSuccess])


  useEffect(() => {
    if(getArchivedProjectsSuccess){
      setAllProjects(archivedProjects)
    }

    if(getArchivedProjectsFail){
      setAllProjects([])
    }

    if(deleteProjectFail){
      toast.warning(`${deleteProjectFail.message}`)
    }
  }, [getArchivedProjectsSuccess, getArchivedProjectsFail, deleteProjectFail])

  


  const handleDelete = (projectId) => {
    dispatch(deleteProjectAction(projectId, token))
  }

  

    // ------ headers ------
    let barLinks = []
    
    if(decodedToken &&
      decodedToken?.userInfo && 
      (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Creator"))){
        barLinks = [
          {title: 'Projects', link: '/dashboard/project'},
          {title: 'Released', link: '/dashboard/project/released'},
          {title: 'Received', link: '/dashboard/received-project'},
          {title: 'Archived', link: '/dashboard/archived-project'},
        ];
    } else if(decodedToken &&
      decodedToken?.userInfo && 
      (!decodedToken?.userInfo?.role.includes("Admin") || !decodedToken?.userInfo?.role.includes("Creator"))){
        barLinks = [
          // {title: 'Projects', link: '/dashboard/project'},
          {title: 'Released', link: '/dashboard/project/released'},
          {title: 'Received', link: '/dashboard/received-project'},
          {title: 'Archived', link: '/dashboard/archived-project'},
        ];
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseAnchor = () => {
      setAnchorEl(null);
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
        <section className='container' style={{marginTop:'15px'}}>
          <div>
            <Table striped bordered hover style={{backgroundColor:'#fff'}} className="table table-hover my-1">
              <thead style={{backgroundColor:'#075670', textAlign:'center'}} className="thead-dark">
                  <tr style={{color:'#fff'}}>
                  <th scope="col">#</th>
                  <th scope="col">label Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  {decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Creator")) &&
                    <>
                        <th scope="col">unArchive</th>
                    </>}
                  </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                {allProjects &&
                  allProjects.map((item, index) => {
                    return (
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{item.labelName}</td>
                        <td >{item.labelDescription.length > 20 
                                ? item.labelDescription.substring(0, 20) + '...' 
                                : item.labelDescription}</td>
                  <td scope="col">{item.released ? "Released": "processing..."}</td>
                      <td>
                        <button disabled={archiveToggleProjectRequest ? true : false}
                            onClick={() => dispatch(archivedProjectToggleAction(item._id, token))} 
                            style={{color:'#021D41', borderRadius:'4px',  fontSize:''}}>
                        {!archiveToggleProjectRequest 
                          ?<UnarchiveRoundedIcon />
                          :<RotatingLines
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
              {(getArchivedProjectsRequest || deleteProjectRequest) && 
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
              {allProjects.length < 1 && <h6 style={{textAlign:'center', marginTop:'10px'}}>No Projects Archived</h6>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ArchivedProject