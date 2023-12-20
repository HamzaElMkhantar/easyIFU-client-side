import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route, Link } from 'react-router-dom';
import '../../components/header/header.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import { RotatingLines } from 'react-loader-spinner';
import { getCompanyInfoAction, updateCompanyInfoAction } from '../../redux/actions/companyAcions';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import moment from 'moment'
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

    const [company, setCompany] = useState({
        companyId: decodedToken ? decodedToken.userInfo.companyId : null,
        companyName: '',
        companyAddress: '',
        companyZip: '',
        companyCity: '',
        companyCountry: '',
        companyPhone: ''
      })
  

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

  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className='' style={{paddingTop:'0px', width:'100%'}}>
        {/* Dashboard header  */}
        <div  style={{ borderBottom:'1px solid lightGray'}} id="page-content-wrapper">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='container-dashboard'>
                <div style={{display:'flex', alignItems:'center'}} className=''>
                    <span href="#menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
                        &#9776;
                    </span>
                    <Link to="/">
                        <img className='dash-Logo' src={easyIFUlogo} alt="easyIFU-logo" />
                    </Link>
                      <div style={{display:'flex', flexWrap:'wrap', gridGap:'5px'}} className='dash-header-sm-devices'>
                          
                      </div>
          </div>
          <div className="custom-dropdown-container">
                      <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
                        <button className="custom-dropdown-toggle" onClick={toggleDropdown}>
                          menu
                        </button>
                        <div className="custom-dropdown-menu">
                          {/* Dropdown items */}
                          <Link to="/dashboard">Home</Link>
                          <Link to="/dashboard/project">Project</Link>
                          <Link to="/dashboard/users">Users</Link>
                          <Link to="/dashboard/user/create">Create User</Link>
                          <Link to="/dashboard/company">Company</Link>
                          <Link to="/dashboard/account">Account</Link>
                        </div>
                      </div>
                      <Avatar className="avatar" sx={{ bgcolor: '#000000' }}></Avatar>
        </div>
          </div>
        </div>

        {/* Dashboard  content   */}
        <section className='container' style={{marginTop:'20px'}}>
          <div style={{backgroundColor:'#fff', 
                        borderRadius:'10px', 
                        padding:'10px',
                        display:'flex',
                        marginTop:'10px'
                        }} className='col-12 manage-user-card'>
                <div className='col-lg-2'>
                    <Avatar 
                        sx={{ width: 130, height: 130, fontSize:'90px'}}
                        style={{backgroundColor:'black', color:"#ecf0f3", marginBottom:'15px'}}>
                        {companyState && companyState.companyName[0].toUpperCase()}
                    </Avatar>
                    
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
                        decodedToken.userInfo.role == "Admin" &&<div  style={{
                    backgroundColor:'#fff',
                    marginTop:'20px',
                    borderRadius:'10px'
                }}
            className="card-body col-md-12">
  
                    <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                      <div className="row">
                       {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role == "Admin" &&
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
                        decodedToken.userInfo.role == "Admin" &&
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
                        decodedToken.userInfo.role == "Admin" &&
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
                        decodedToken.userInfo.role == "Admin" &&
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
                         :"Update"}
                        </button>
                      </div>
                    </form>
          </div>}
      </section>
      </main>
    </div>
  )
}

export default MyCompany