import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link } from 'react-router-dom';
import '../../components/header/header.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import { RotatingLines } from 'react-loader-spinner';
import { getCompanyInfoAction, updateCompanyInfoAction } from '../../redux/actions/companyAcions';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import moment from 'moment'
import BarLinks from '../../utilities/BarLinks';
import { logoutAction } from '../../redux/actions/authActions';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';

const MyCompany = () => {
  const [isOpen, setIsOpen] = useState(false);
      
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem('sideToggle')) || false
  );
  const toggleSidebar = () => {
      const newToggleState = !isSidebarOpen;
      setIsSidebarOpen(newToggleState);
      localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
    };

    const {getCompanyInfo, updateCompanyInfo} = useSelector(state => state);
    const {companyRequest, companySuccess, companyFail, companyInfo} = getCompanyInfo;
    const {updatedCompanyRequest, updatedCompanySuccess, updatedCompanyFail, updatedCompanyInfo} = updateCompanyInfo;



    
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const [companyState, setCompanyState] = useState(null);
    const [updateInfo, setUpdateInfo] = useState(false);

    const [company, setCompany] = useState({
        companyId: decodedToken ? decodedToken.userInfo.companyId : null,
        companyName: '',
        companyAddress: '',
        companyZip: '',
        companyCity: '',
        companyCountry: '',
        companyPhone: ''
      })

      useEffect(() => {
        setCompany({
          companyId: decodedToken ? decodedToken.userInfo.companyId : null,
          companyName:companyState?.companyName || '',
          companyAddress:companyState?.companyAddress || '',
          companyZip:companyState?.companyZip || '',
          companyCity:companyState?.companyCity || '',
          companyCountry:companyState?.companyCountry || '',
          companyPhone:companyState?.companyPhone || ''
        })
      }, [companySuccess])
  

      const dispatch = useDispatch();
    
      const handleInput = (e) => {
        setCompany({
          ...company,
          [e.target.id]: e.target.value
        })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const {companyName, companyAddress, companyZip, companyCity, password, companyPhone, companyCountry} = company;
      
        if (companyName !== '' || companyAddress !== '' || companyZip !== '' || companyCity !== '' || companyCountry !== '' || companyPhone !== '' || password !== '') {
          dispatch(updateCompanyInfoAction(company, token));
        } else {
          toast.info("Fields are Empty");
        }
      
        // Reset the form fields
        setCompany({
          companyId: decodedToken ? decodedToken.userInfo.companyId : null,
          companyName: '',
          companyAddress: '',
          companyZip: '',
          companyCity: '',
          companyCountry: '',
          companyPhone: ''
        });
      }

      useEffect(() => {
          dispatch(getCompanyInfoAction(decodedToken && decodedToken.userInfo.companyId, token))
      }, [])

      useEffect(() => {
          if(updatedCompanySuccess){
            dispatch(getCompanyInfoAction(decodedToken && decodedToken.userInfo.companyId, token))
          }
      }, [updatedCompanySuccess])



      useEffect(() => {
          if(companySuccess){
            setCompanyState(companyInfo)
          }
      }, [companySuccess])
      useEffect(() => {
        if(updatedCompanySuccess){
            toast.success("Updated successfully")
            setUpdateInfo(false)
        }
        if(companyFail){
            toast.warning(`${companyFail.updatedCompanyFail}`)
        }
      }, [updatedCompanySuccess, updatedCompanyFail])


      const dateFormat = (date) => {
        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      };

      const formatDate = (date) => {
        const newDate = new Date(date);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = newDate.toLocaleDateString('en-GB', options);

        return formattedDate;
      }


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
        <section className='container' style={{marginTop:'20px'}}>
          <div style={{backgroundColor:'#fff', 
                        borderRadius:'10px', 
                        padding:'10px',
                        display:'flex',
                        marginTop:'10px'
                        }} className='col-12 manage-user-card'>
                <div className='col-lg-2' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Avatar 
                        sx={{ width: 130, height: 130, fontSize:'90px'}}
                        style={{backgroundColor:'black', color:"#ecf0f3", marginBottom:'15px'}}>
                        {companyState && companyState.companyName[0].toUpperCase()}
                    </Avatar>
                    <button onClick={() => setUpdateInfo(!updateInfo)}
                          style={{ backgroundColor: '#08408b', border: '0', fontSize: '18px' , fontWeight:'600'}}
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                         {!updateInfo ?
                              "Update"
                         :"Hide Form"}
                        </button>
                    
                </div>
                <div className='manage-user-card-content px-3 col-lg-8'>
                    <p style={{fontSize:'14px', color:'gray'}}>Name: {companyState && companyState.companyName} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Address: {companyState && companyState.companyAddress} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Zip: {companyState && companyState.companyZip} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>City: {companyState && companyState.companyCity} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Country: {companyState && companyState.companyCountry} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Phone: {companyState && companyState.companyPhone} </p>
                    <div>subscription Info: 
                      <p style={{fontSize:'12px', color:'gray', margin:'0', padding:'0 8px'}}>Start Date :{companyState && companyState.subscription && 
                        companyState.subscription.startDate}
                      </p>
                      <p style={{fontSize:'12px', color:'gray', margin:'0', padding:'0 8px'}}>End Date :{companyState && companyState.subscription && 
                        companyState.subscription.endDate }
                      </p>
                    </div>

                    {/* {company && company.createdAt && <p style={{fontSize:'14px', color:'gray'}}>Created: {company && dateFormat(company.createdAt)} </p>} */}

                </div>
                {companyRequest 
                    ? <RotatingLines
                    strokeColor="#FFFFFF"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  /> 
                    : null}

          </div>

 

          {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") 
          &&<div  style={!updateInfo ? {}: {
                    backgroundColor:'#fff',
                    marginTop:'20px',
                    borderRadius:'10px'
                }}
            className="card-body col-md-12">
    
  
                   {updateInfo && <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                      <div className="row">
                       {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role.includes("Admin") &&
                            <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="companyName">
                            Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                className="form-control"
                                onChange={(e) => handleInput(e)}
                                placeholder="First Name"
                                value={company.companyName}
                            />
                          </div>
                        </div>}

                        {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                            <div className="col-md-6">
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="companyAddress">
                                    Company Address
                                    </label>
                                    <input
                                        type="text"
                                        id="companyAddress"
                                        onChange={(e) => handleInput(e)}
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={company.companyAddress}
                                    />
                                </div>
                            </div>}

                      </div>

                      <div className="row">
                        {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                            <div className="col-md-6">
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="companyCity">
                                Company City
                                </label>
                                <input
                                    type="text"
                                    id="companyCity"
                                    onChange={(e) => handleInput(e)}
                                    className="form-control"
                                    placeholder="Company City"
                                    value={company.companyCity}
                                />
                            </div>
                            </div>}

                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="companyCountry">
                            Company Country
                            </label>
                            <input
                                value={company.companyCountry}
                                type="text"
                                id="companyCountry"
                                onChange={(e) => handleInput(e)}
                                className="form-control"
                                placeholder="Company Country"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                            <div className="col-md-6">
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="companyZip">
                                Company Zip
                                </label>
                                <input
                                    type="text"
                                    id="companyZip"
                                    onChange={(e) => handleInput(e)}
                                    className="form-control"
                                    placeholder="Company Zip"
                                    value={company.companyZip}
                                />
                            </div>
                            </div>}
                            <div className="col-md-6">
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="companyPhone">
                                Company Phone
                                </label>
                                <input
                                    type="text"
                                    id="companyPhone"
                                    onChange={(e) => handleInput(e)}
                                    className="form-control"
                                    placeholder="Company Phone"
                                    value={company.companyPhone}
                                />
                            </div>
                            </div>
                      </div>
                      <div className="row">

                      </div>
                      <div className="text-center pt-1 mb-4 pb-1">
                        <button disabled={updatedCompanyRequest ? true : false}
                          style={{ width: '100%', backgroundColor: '#08408b', border: '0', fontSize: '18px' , fontWeight:'600'}}
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                         {updatedCompanyRequest ?
                              <div>
                                  <RotatingLines
                                  strokeColor="#FFFFFF"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="30"
                                  visible={true}
                                /> 
                              </div>
                         :"Save"}
                        </button>
                      </div>
                    </form>}
          </div>}
      </section>
      </main>
    </div>
  )
}

export default MyCompany