import React, { useEffect, useState } from 'react'
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import '../../components/header/header.css';
import Avatar from '@mui/material/Avatar';
import SideBar from '../../components/header/SideBar';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateUserAction, getUserAction, toggleStatusUserAction } from '../../redux/actions/userActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';


const Contact = () => {
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


        const token = Cookies.get("eIfu_ATK") || null;
        const decodedToken = token ? jwtDecode(token) : null

        const [form, setForm] = useState({
            companyId: decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            message: '',
          });
        
          const [request, setRequest] = useState(false);
        
          const handleInputChange = (e) => {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value });
          };
        
          const handleContact = async (e) => {
            e.preventDefault();
        
            try {
              setRequest(true);
              await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/create-contact`, form);
              toast.success('Contact submitted successfully');
              setForm({
                companyId: decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                message: '',
              });
            } catch (error) {
              console.error(error);
              toast.warning('Failed to submit contact request');
            } finally {
              setRequest(false);
            }
          };
        

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
        <section className='container' style={{marginTop:'20px', }}>
            <form style={{width:'60%', margin:'auto', backgroundColor:'#fff', padding:'20px', borderRadius:'10px'}} onSubmit={handleContact}>
        <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
            First Name
            </label>
            <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleInputChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
            Last Name
            </label>
            <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleInputChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
            Phone Number
            </label>
            <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInputChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
            Email
            </label>
            <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="message" className="form-label">
            Message
            </label>
            <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={form.message}
            onChange={handleInputChange}
            ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={request}>
            {request ? 'Submitting...' : 'Submit'}
        </button>
            </form>
      </section>
      </main>
    </div>
  )
}


export default Contact