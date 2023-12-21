import React from 'react'
import { useEffect, useState } from 'react';
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import '../../components/header/header.css';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, usersCompanyAction } from '../../redux/actions/userActions';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import SideBarEasyIFU from '../../components/easyIFU_header/SideBarEasyIFU';
import { companiesAction } from '../../redux/actions/supperAdminActions';

const Companies = () => {
  const [isOpen, setIsOpen] = useState(false);
      
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const [data, setData] = useState([]);
  
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

  console.log(decodedToken)

  const {companies} = useSelector(state => state)
  const {companiesRequest, companiesSuccess, companiesFailed, allCompanies} = companies;


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(companiesAction(token))
  },[])

console.log(companiesRequest, companiesSuccess, companiesFailed, allCompanies)

  useEffect(() => {
    if(companiesSuccess){
      setData(allCompanies)
    }
    if(companiesFailed){
        toast.warning(`${companiesFailed.message}`)
      }
  },[companiesSuccess, companiesFailed])


  const dateFormat = (date) => {
    const dateObject = new Date(date);
  
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  

  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBarEasyIFU isSidebarOpen={isSidebarOpen} />

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
        <section className='' style={{marginTop:'20px'}}>
          <div style={{ padding: '20px' }} className="col-md-12">
            <div className='container'>
              <h6>total companies: {data && data?.length > 0 ? data.length : <>No company</>}</h6>
              <div className="table-responsive">

                <table style={{ backgroundColor: '#fff', textAlign:'center' }} className="table table-hover my-1">
                  <thead style={{ backgroundColor: '#9a3b3a' }} className="thead-dark">
                    <tr style={{ color: '#fff' }}>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Subscription Status</th>
                      <th scope="col">Subscription expiration date</th>
                      <th scope="col">users</th>
                      <th scope="col">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.length > 0 &&
                      data?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.companyName}</td>
                            <td>{item?.companyCountry}, {item?.companyCity}</td>
                            <td>{item?.subscription?.status}</td>
                            <td>{item?.subscription?.endDate}</td>
                            <td>{item?.companyUsers?.length}</td>
                            <td>{dateFormat(item?.createdAt)}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {companiesRequest &&
                <div style={{textAlign:'center'}}>
                    <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                        /> 
                </div>
            }
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Companies