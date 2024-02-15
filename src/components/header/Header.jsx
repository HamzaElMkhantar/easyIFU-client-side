import React, { useState } from 'react';
import './header.css';
import headerLogo from '../../assets/easyIFU_Logo.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';
import { RotatingLines } from 'react-loader-spinner';
import { Avatar } from '@mui/material';
import jwtDecode from 'jwt-decode';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const token = Cookies.get('eIfu_ATK') || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const dispatch = useDispatch()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const {logout} = useSelector(state => state);
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const handleLogout = () => {
    dispatch(logoutAction())
  }

 
  return (
    <nav 
     className='navbar navbar-expand-md navbar-light'>
      <div className='container'>
        <Link onClick={() => setMenuOpen(false)} to='/' className='navbar-brand'>
          <img src={headerLogo} alt='Logo' width='50' height='50' />
        </Link>
        <div className='d-lg-none ml-auto'>
          <button
            className='navbar-toggler'
            type='button'
            onClick={toggleMenu}
          >
            <span className={`navbar-toggler-icon ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className='navbar-nav mx-auto'>
            <li className='nav-item'>
              <a onClick={() => setMenuOpen(false)} className='nav-link' href='#about'>
                About Us
              </a>
            </li>
            <li className='nav-item'>
              <a onClick={() => setMenuOpen(false)} className='nav-link' href='#contact'>
                Contact
              </a>
            </li>
            <li className='nav-item'>
              <a onClick={() => setMenuOpen(false)} className='nav-link' href='#price'>
                Pricing
              </a>
            </li>
           
          </ul>
          <div to={decodedToken && decodedToken?.userInfo?.role.includes("superAdmin") ?  "/eIFU-admin/companies" : "/dashboard"} onClick={() => setMenuOpen(false)} className='d-lg-none ml-auto m-0'>
            {!token 
            ? <Link to='/login' className='btn' style={{backgroundColor:'#ecf0f3'}}>
                <button style={{backgroundColor:'#0E2F78', color:'#fff', borderRadius:'10px', padding:'2px 10px'}}>
                    Log In
                </button>
            </Link>
            :( <li style={{display:''}} className='nav-item'>
                <Link to={decodedToken && decodedToken?.userInfo?.role.includes("superAdmin") ?  "/eIFU-admin/companies" : "/dashboard"} onClick={() => setMenuOpen(false)} className='nav-link px-0 mx-0' href='#price'>
                  dashboard
                </Link>
                
                <Link onClick={() => dispatch(logoutAction())}  className='btn' style={{backgroundColor:'#ecf0f3'}}>
                  <button style={{backgroundColor:'#0E2F78', color:'#fff', borderRadius:'10px', padding:'2px 10px'}}>
                  {logoutRequest 
                       ? <RotatingLines
                        strokeColor="#FFFFFF"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="30"
                        visible={true}
                      /> 
                      : "LogOut"}
                  </button>
                </Link>
              </li>
              
              )
          }
          </div>
        </div>
        <div className='d-none d-lg-block ml-auto m-0'>
          {!token 
            ? <Link to='/login' className='btn' style={{backgroundColor:'#ecf0f3'}}>
                <button style={{backgroundColor:'#0E2F78', color:'#fff', borderRadius:'10px', padding:'2px 10px'}}>
                    Log In
                </button>
            </Link>
            : <li style={{position:'relative'}} className='nav-item'>
              <Avatar style={{backgroundColor:'#072D60', color:'#fff', fontWeight:'600', cursor:'pointer'}} 
                onClick={() => setToggle(!toggle)}>
                {decodedToken && decodedToken.userInfo && decodedToken.userInfo.firstName[0].toUpperCase()}
              </Avatar>
              <ul style={!toggle ? {display:'none'} 
                : {display:'flex', 
                    flexDirection:'column', position:'absolute', 
                    backgroundColor:'#fff', 
                    top:'50px', 
                    right:'0px', 
                    borderRadius:'5px', 
                    border:'1px solid lightGray', 
                    textAlign:'left',
                    padding:'0',
                  }}
              >
                  <Link to={decodedToken && decodedToken?.userInfo?.role.includes("superAdmin") ? "/eIFU-admin/companies" : "/dashboard"} style={{width:'150px', padding:'5px 20px'}} onClick={() => setMenuOpen(false)} className='nav-link' href='#price'>
                    dashboard
                  </Link>
                  <Link style={{width:'150px', padding:'5px 20px'}} onClick={() => dispatch(logoutAction())} className='nav-link' href='#price'>
                    logOut
                  </Link>
              </ul>
              </li>
          }
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
