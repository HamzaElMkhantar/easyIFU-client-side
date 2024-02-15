import React from 'react'
import { useEffect, useState } from 'react';
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import '../../components/header/header.css';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, usersCompanyAction } from '../../redux/actions/userActions';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { toast } from 'react-toastify';
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
import BarLinks from '../../utilities/BarLinks';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
      
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [users, setUsers] = useState(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem('sideToggle')) || false
  );
  const toggleSidebar = () => {
      const newToggleState = !isSidebarOpen;
      setIsSidebarOpen(newToggleState);
      localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
    };

  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null


  const {usersCompany, deleteUser} = useSelector(state => state)
  const {allUsers, usersCompanyRequest, usersCompanySuccess, usersCompanyFailed} = usersCompany;
  const {deleteUserRequest, deleteUserSuccess, deleteUserFail} = deleteUser;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(usersCompanyAction(decodedToken.userInfo, token))
  },[])

  useEffect(() => {
    if(deleteUserSuccess){
      dispatch(usersCompanyAction(decodedToken.userInfo, token))
      toast.success("user deleted successfully")
    }
  },[deleteUserSuccess])

  useEffect(() => {
    if(deleteUserFail){
      toast.warning(`${deleteUserFail.message}`)
    }
  },[deleteUserFail])
  useEffect(() => {
    if(usersCompanySuccess){
      setUsers(allUsers)
    }
  },[usersCompanySuccess])

  const handleUserDelete = (userId) => {
    const ids = {
      userId,
      adminId: decodedToken.userInfo._id,
      companyId: decodedToken.userInfo.companyId
    }
    dispatch(deleteUserAction(ids, token))
  }

  const dateFormat = (date) => {
    const dateObject = new Date(date);
  
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  
  // ------ headers ------
  const {logout} = useSelector(state => state)
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const handleLogout = () => {
    dispatch(logoutAction())
  }
    let barLinks = []

    if(decodedToken && decodedToken?.userInfo && (decodedToken?.userInfo?.role.includes("Admin"))){
      barLinks = [
        {title: 'Company', link: '/dashboard/company'},
        {title: 'Users', link: '/dashboard/users'},
        {title: 'Create User', link: '/dashboard/user/create'},
        
      ];
    }else{
      barLinks = [
        {title: 'Company', link: '/dashboard/company'},
        {title: 'Users', link: '/dashboard/users'},
        // {title: 'Create User', link: '/dashboard/user/create'},
       
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
        <section className='' style={{marginTop:'20px'}}>
          <div style={{ padding: '20px' }} className="col-md-12">
            <div className='container'>
              <h6>total users: {users ? users?.length : <>No users</>}</h6>
              <div className="table-responsive">

                <table style={{ backgroundColor: '#fff' }} className="table table-hover my-1">
                  <thead style={{ backgroundColor: '#c08260' }} className="thead-dark">
                    <tr style={{ color: '#fff' }}>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      {decodedToken &&
                      decodedToken?.userInfo &&
                      decodedToken?.userInfo.role.includes("Admin") &&
                      <th scope="col">Manage</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.firstName} {item.lastName}</td>
                            <td ><p style={{display:'flex', padding:'0', margin:'0'}}>{item.role.length > 1 ? item.role.map((item) => (<p className='mx-1'>{item},</p>)) : item.role.map((item) => (<p className='mx-1'>{item}</p>))} </p></td>
                            <td>{dateFormat(item.createdAt)}</td>
                            <td>{item.email}</td>
                            <td>{item.isActive ? 'Active' : 'Not Active'}</td>
                            {decodedToken &&
                            decodedToken?.userInfo &&
                            decodedToken?.userInfo.role.includes("Admin") &&
                            <td>
                              <div style={{display:'flex'}}>
                                <Link to={`/dashboard/user/${item._id}`}
                                  style={{ margin: '2px 5px', padding: '5px', borderRadius: '5px', border:'1px solid lightGray'}}
                                >
                                  <SettingsSuggestRoundedIcon style={{ color: '#404040' }} />
                                </Link>
                                <button
                                    disabled={deleteUserRequest ? true : false}
                                    onClick={() => handleUserDelete(item._id)}
                                    style={{ margin: '2px 5px', padding: '5px', borderRadius: '5px', border:'1px solid lightGray'}}
                                >
                                  {deleteUserRequest ?
                                          <div>
                                              <RotatingLines
                                              strokeColor="#FFFFFF"
                                              strokeWidth="5"
                                              animationDuration="0.75"
                                              width="30"
                                              visible={true}
                                            /> 
                                          </div>
                                    :
                                      <DeleteRoundedIcon style={{ color: '#F24E4E' }} />
                                    }
                                </button>
                              </div>
                            </td>}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Users