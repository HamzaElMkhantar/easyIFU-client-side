import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import SideBar from '../../components/header/SideBar';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { UpdateUserAction, createUserAction, getUserAction, toggleStatusUserAction } from '../../redux/actions/userActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 

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

const CreateUser = () => {
    const [isOpen, setIsOpen] = useState(false);
      
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const [userState, setUserState] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(
      JSON.parse(localStorage.getItem('sideToggle')) || false
    );
    const toggleSidebar = () => {
        const newToggleState = !isSidebarOpen;
        setIsSidebarOpen(newToggleState);
        localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
      };
 
    const {getUser, updateUser, toggleStatusUser, createUser} = useSelector(state => state);
    const {createUserRequest, createUserSuccess, createUserFail} = createUser;
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const [userInfo, setUserInfo] = useState({
        adminId: decodedToken ? decodedToken.userInfo._id : null,
        companyId: decodedToken ? decodedToken.userInfo.companyId : null,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        role: []
      })

      console.log(userInfo)
    
      const dispatch = useDispatch();
    
      const handleCheckboxChange = (newRole) => {
        const updatedRoles = userInfo.role.includes(newRole)
          ? userInfo.role.filter((r) => r !== newRole) // Remove role if already present
          : [...userInfo.role, newRole]; // Add role if not present
        setUserInfo({
          ...userInfo,
          role: updatedRoles
        });
      };
    
      const handleInput = (e) => {
        setUserInfo({
          ...userInfo,
          [e.target.id]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userInfo)
        const { firstName, lastName, email, password, role } = userInfo;
      
        if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && role !== '') {
          dispatch(createUserAction(userInfo, token));

        // Reset the form fields
        setUserInfo({
            ...userInfo,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
          });
        } else {
          toast.info("All Fields are Required");
        }
      }

      useEffect(()=> {
        if(createUserSuccess){
            toast.success("user created successfully")
        }
        if(createUserFail){
            toast.warning(`${createUserFail.message}`)
        }
      }, [ createUserSuccess, createUserFail])


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
      // {title: 'Archived', link: '/dashboard/Archived-project'},
    ];
  }else{
    barLinks = [
      {title: 'Company', link: '/dashboard/company'},
      {title: 'Users', link: '/dashboard/users'},
      // {title: 'Create User', link: '/dashboard/user/create'},
      // {title: 'Archived', link: '/dashboard/Archived-project'},
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
      <section className='container' style={{marginTop:'20px'}}>
            <div  style={{
                        backgroundColor:'#fff',
                        marginTop:'20px',
                        borderRadius:'10px'
                    }}
                className="card-body col-md-9 mx-auto">
    
                        <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                        <div className="row">
                        {decodedToken &&
                                decodedToken.userInfo &&
                                decodedToken.userInfo.role.includes("Admin") &&
                                <div className="col-md-12">
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="firstName">
                                First name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control"
                                    onChange={(e) => handleInput(e)}
                                    placeholder="First Name"
                                    value={userInfo.firstName}
                                />
                            </div>
                            </div>}

                            {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role.includes("Admin") &&
                                <div className="col-md-12">
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="lastName">
                                        Last name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            onChange={(e) => handleInput(e)}
                                            className="form-control"
                                            placeholder="Last Name"
                                            value={userInfo.lastName}
                                        />
                                    </div>
                                </div>}

                        </div>
                        <div className="row">
                            {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role.includes("Admin") &&
                                <div className="col-md-12">
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="email">
                                    E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) => handleInput(e)}
                                        className="form-control"
                                        placeholder="E-mail"
                                        value={userInfo.email}
                                    />
                                </div>
                                </div>}

                            <div className="col-md-12">
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="password">
                                    Password
                                    </label>
                                    <input
                                        value={userInfo.password}
                                        type="password"
                                        id="password"
                                        onChange={(e) => handleInput(e)}
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="roles">
                                  User Roles
                                </label>
                                <div>
                                  <label>
                                    <input className='mx-1'
                                      type="checkbox"
                                      id="Admin"
                                      checked={userInfo.role.includes('Admin')}
                                      onChange={() => handleCheckboxChange('Admin')}
                                    />
                                    Admin
                                  </label>
                                  <label>
                                    <input className='mx-1'
                                      type="checkbox"
                                      id="Creator"
                                      checked={userInfo.role.includes('Creator')}
                                      onChange={() => handleCheckboxChange('Creator')}
                                    />
                                    Creator
                                  </label>
                                  <label>
                                    <input className='mx-1'
                                      type="checkbox"
                                      id="Approver"
                                      checked={userInfo.role.includes('Approver')}
                                      onChange={() => handleCheckboxChange('Approver')}
                                    />
                                    Approver
                                  </label>
                                  <label>
                                    <input className='mx-1'
                                      type="checkbox"
                                      id="Release"
                                      checked={userInfo.role.includes('Release')}
                                      onChange={() => handleCheckboxChange('Release')}
                                    />
                                    Release
                                  </label>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="text-center pt-1 mb-4 pb-1">
                            <button disabled={createUserRequest ? true : false}
                            style={{ width: '100%', backgroundColor: '#08408b', border: '0', fontSize: '18px' , fontWeight:'600'}}
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                            >
                            {createUserRequest ?
                                <div>
                                    <RotatingLines
                                        strokeColor="#FFFFFF"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="30"
                                        visible={true}
                                        /> 
                                </div>
                            :"Create"}
                            </button>
                        </div>
                        </form>
            </div>
      </section>
    </main>
  </div>
  )
}

export default CreateUser