import React, { useState } from 'react';
import './header.css';
import headerLogo from '../../assets/easyIFU_Logo.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';
import { RotatingLines } from 'react-loader-spinner';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = Cookies.get('eIfu_ATK') || null;

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
          <img src={headerLogo} alt='Logo' width='120' height='50' />
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
          <div to="/dashboard" onClick={() => setMenuOpen(false)} className='d-lg-none ml-auto m-0'>
            {!token 
            ? <Link to='/login' className='btn' style={{backgroundColor:'#ecf0f3'}}>
                <button style={{backgroundColor:'#0E2F78', color:'#fff', borderRadius:'10px', padding:'2px 10px'}}>
                    Log In
                </button>
            </Link>
            :( <li style={{display:''}} className='nav-item'>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className='nav-link px-0 mx-0' href='#price'>
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
            : <li style={{display:'flex'}} className='nav-item'>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className='nav-link px-2 mx-1' href='#price'>
                  dashboard
                </Link>
                <Link onClick={() => dispatch(logoutAction())} className='nav-link px-0' href='#price'>
                  logOut
                </Link>
              </li>
          }
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
