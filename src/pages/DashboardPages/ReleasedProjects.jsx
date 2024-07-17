import React, { useEffect, useState } from 'react'
import SideBar from '../../components/header/SideBar'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjectByRoleIdAction, releasedProjectAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';

import { logoutAction } from '../../redux/actions/authActions';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BarLinks from '../../utilities/BarLinks';
import { Table } from 'react-bootstrap';
const ReleasedProjects = () => {
  const {productId} = useParams()

  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(
      JSON.parse(localStorage.getItem('sideToggle')) || false
  );
  const toggleSidebar = () => {
      const newToggleState = !isSidebarOpen;
      setIsSidebarOpen(newToggleState);
      localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
  }; 

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  
  // -- component logic --
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null
  const companyId = decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId
  const userId = decodedToken && decodedToken.userInfo && decodedToken.userInfo._id

  const [releasedProject, setReleasedProject] = useState([])
  const {ReleasedProject} = useSelector(state => state)
  const {releasedProjectRequest, releasedProjectSuccess, releasedProjectFail, releasedProjects} = ReleasedProject;

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(releasedProjectAction({companyId, productId, createdBy: userId},token))
  }, [])
  useEffect(() => {
      if(releasedProjectSuccess){
          setReleasedProject(releasedProjects)
      }
      if(releasedProjectFail && releasedProjectFail.message != "no label found!"){
          toast.error(`${releasedProjectFail.message}`)
      }
  }, [releasedProjectSuccess, releasedProjectFail])




  // ------ headers ------
  const {logout} = useSelector(state => state)
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const handleLogout = () => {
    dispatch(logoutAction())
  }
  let barLinks = [
    {title: 'All Labels', link: '/dashboard/labels/'+productId},
    {title: 'Draft', link: '/dashboard/project/draft/'+productId},
    {title: 'Approved', link: '/dashboard/project/approved/'+productId},
    {title: 'Released', link: '/dashboard/project/released/'+productId},
    {title: 'Rejected', link: '/dashboard/project/rejected/'+productId}]
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  
  return (
    <div style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />
      <main style={{paddingTop:'0px', width:'100%'}}>
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
        
        <section className='container' style={{marginTop:'20px', padding:'10px'}}>
            <h6>Released Project: </h6>
            <div className="table-responsive">
                <Table striped bordered hover style={{backgroundColor:'#fff'}} className="table responsive-table table-hover my-1">
                    <thead style={{backgroundColor:'#075670', textAlign:'center', color:"#fff"}} className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Version</th>
                        <th>Description</th>
                       {(decodedToken?.userInfo?.role.includes("Creator") || decodedToken?.userInfo?.role.includes("Admin") )&& <th>Manage</th>}
                    </tr>
                    </thead>
                    <tbody style={{ textAlign:'center'}}>
                        {releasedProject.map((item, index) => (
                        <tr key={item.id}>
                        <td >{index + 1}</td>
                        <td >{item.labelName}</td>
                        <td >{item.labelVersion}</td>
                        <td >{item.labelDescription.length > 20 
                                ? item.labelDescription.substring(0, 20) + '...' 
                                : item.labelDescription}</td>
                        {(decodedToken?.userInfo?.role.includes("Creator") || decodedToken?.userInfo?.role.includes("Admin") )&&<td ><Link to={`/dashboard/project-information/${item._id}`}
                            style={{backgroundColor:'#0C458F', 
                              color:"#fff", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              <VisibilityIcon style={{paddingBottom:'3px'}} />
                          </Link></td>}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {releasedProjectRequest && 
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
                {!releasedProjectRequest && releasedProject.length < 1 &&
                    <p style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                        we didn't find any released project!
                </p>
                }
            </div>
        </section>
      </main>
    </div>
  )
}

export default ReleasedProjects