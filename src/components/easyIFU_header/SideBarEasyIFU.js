import React, { useEffect, useState } from 'react';
import headerLogo from '../../assets/easyIFU_Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import LastPageIcon from '@mui/icons-material/LastPage';
import sidebarBG from '../../assets/sideBrdBG.svg'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useDispatch, useSelector } from 'react-redux';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { logoutAction } from '../../redux/actions/authActions';
import { RotatingLines } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const SideBarEasyIFU = ({isSidebarOpen}) => {
  const {logout} = useSelector(state => state);
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutAction())

  }
  const navigate = useNavigate()
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  useEffect(() => {
    if(logoutSuccess){
      navigate("/login")
      console.log("logout")
    }
  },[logoutSuccess])
    
  return (
    <div id="wrapper" className={!isSidebarOpen ? '' : 'toggled'}>
      <div id="sidebar-wrapper" style={{ height:'100vh'}}>
        <img  src={sidebarBG} className='bg-sidebar-img' />
        <div className="sidebar-nav">
          <Link style={{ marginBottom:'20px', display:'flex', justifyContent:'center'}} to='/' className='navbar-brand mx-auto'>
            <img src={headerLogo} alt='Logo' width='150' height='60' style={{marginLeft:'-50px', padding:'0', borderRadius:'4px'}} />
          </Link>
          <div className='sideBrd-user-info'>
            <h4>{decodedToken && decodedToken.userInfo && `${decodedToken && decodedToken.userInfo && decodedToken.userInfo.firstName} ${decodedToken && decodedToken.userInfo && decodedToken.userInfo.lastName}`}</h4>
            <p>{decodedToken && decodedToken.userInfo && decodedToken.userInfo.email}</p>
            {/* <p>{decodedToken && decodedToken.userInfo && decodedToken.userInfo.role}</p> */}
          </div>
          <div style={{ height:'67vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>

            <div style={{height:'63vh', overflowY:'scroll'}} className='navList' >
                <Link to="/eIFU-admin/companies"><HomeRoundedIcon style={{color:'#9A3B3B'}}/> Companies</Link>
                <Link to="/eIFU-admin/projects"><InventoryRoundedIcon style={{color:'#088395'}}/> Projects</Link>
                <Link to="/eIFU-admin/users"><GroupRoundedIcon style={{color:'#C08261'}}/> Users</Link>
                <Link to="/eIFU-admin/contacts"><ContactMailIcon style={{color:'#1D5466'}}/> Contacts</Link>
                <Link to="/eIFU-admin/account"><ManageAccountsRoundedIcon style={{color:'#61677A'}}/> Account</Link>

            </div>

            <div style={{ position:'absolute', bottom:'20px', left:'35%'}}>
                <button disabled={logoutRequest ? true : false} onClick={() => handleLogout()} style={{backgroundColor:'#0E2F78', color:'#fff', borderRadius:'5px', padding:'2px 10px', fontWeight:'600'}}>
                        {logoutRequest 
                        ? <RotatingLines
                          strokeColor="#FFFFFF"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={true}
                        /> 
                        : "Logout"}
                        <LogoutIcon style={{marginLeft:'10px'}}/>
                </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default SideBarEasyIFU;
