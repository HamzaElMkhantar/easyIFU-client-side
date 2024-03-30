import React, { useEffect, useState } from 'react';
import headerLogo from '../../assets/sideBar_logo.png';
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
import ContactsIcon from '@mui/icons-material/Contacts';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { logoutAction } from '../../redux/actions/authActions';
import { RotatingLines } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const SideBar = ({isSidebarOpen}) => {
  const {logout} = useSelector(state => state);
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutAction())
    // handleCloseAnchor()
  }

  const navigate = useNavigate()
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  useEffect(() => {
    if(logoutSuccess){
      navigate("/login")
    }
  },[logoutSuccess])

    
  return (
    <div id="wrapper" className={!isSidebarOpen ? '' : 'toggled'}>
      <div id="sidebar-wrapper" style={{ height:'100vh'}}>
        <img  src={sidebarBG} className='bg-sidebar-img' />
        <div className="sidebar-nav">
          <Link style={{marginBottom:'20px', display:'flex', justifyContent:'center'}} to='/' className='navbar-brand mx-auto'>
            <img src={headerLogo} alt='Logo' width='100' height='100' style={{marginLeft:'-50px', padding:'0', borderRadius:'4px'}} />
          </Link>
          <div className='sideBrd-user-info'>
            <h4>{decodedToken && decodedToken.userInfo && `${decodedToken && decodedToken.userInfo && decodedToken.userInfo.firstName} ${decodedToken && decodedToken.userInfo && decodedToken.userInfo.lastName}`}</h4>
            <p>{decodedToken && decodedToken.userInfo && decodedToken.userInfo.email}</p>
          </div>
          <div style={{ height:'', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>

            <div style={{height:'', overflowY:'scroll'}} className='navList' >
                {<Link style={{fontSize:"11px", padding:'5px 3px'}} to="/dashboard"><HomeRoundedIcon style={{color:'#9A3B3B'}}/>Home</Link>}
                {decodedToken &&
                  decodedToken?.userInfo && 
                  (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Creator"))
                  ?<Link style={{fontSize:"11px", padding:'5px 3px'}} to="/dashboard/project"><InventoryRoundedIcon style={{color:'#088395'}}/>Projects</Link>
                  :<Link style={{fontSize:"11px", padding:'5px 3px'}} to="/dashboard/received-project"><InventoryRoundedIcon style={{color:'#088395'}}/>Projects</Link>}

                {decodedToken && 
                decodedToken?.userInfo && 
                (decodedToken?.userInfo?.role.includes("Release") || decodedToken?.userInfo?.role.includes("Admin")) &&
                <>
                  <Link style={{fontSize:"11px", padding:'5px 3px'}} to="/dashboard/documents"><CollectionsIcon style={{color:'#EEEEEE80'}}/>Labels</Link>
                </>}
                <Link style={{fontSize:"11px", padding:'5px 3px'}} to="/dashboard/contact"><ContactsIcon style={{color:'#3992B0'}}/> contact Us</Link>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default SideBar;
