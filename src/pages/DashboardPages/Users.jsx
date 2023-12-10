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
                      decodedToken?.userInfo.role == "Admin" &&
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
                            <td>{item.role}</td>
                            <td>{dateFormat(item.createdAt)}</td>
                            <td>{item.email}</td>
                            <td>{item.isActive ? 'Active' : 'Not Active'}</td>
                            {decodedToken &&
                            decodedToken?.userInfo &&
                            decodedToken?.userInfo.role == "Admin" &&
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