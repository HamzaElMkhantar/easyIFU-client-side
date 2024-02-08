import React, { useEffect, useState } from 'react'
import SideBar from '../../components/header/SideBar'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import easyIFUlogo from '../../assets/easyIFU_Logo.png' 
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjectByRoleIdAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';
import BarLinks from '../../utilities/BarLinks';

const ProjectByRole = () => {
    // side bar toggle
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

    
    // -- component logic --
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
    const roleId = decodedToken && decodedToken.userInfo && decodedToken.userInfo._id

    const [projectsRole, setProjectsRole] = useState([])
    const {ProjectByRoleId} = useSelector(state => state)
    const {roleProjectRequest, roleProjectSuccess, roleProjectFail, roleProjects} = ProjectByRoleId;
    console.log(roleProjects)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ProjectByRoleIdAction(roleId,token))
    }, [])
    useEffect(() => {
        if(roleProjectSuccess){
            setProjectsRole(roleProjects)
        }
        if(roleProjectFail){
            if(roleProjectFail.message != "You didn't receive any project yet"){
                toast.error(`${roleProjectFail.message}`)
            }
        }
    }, [roleProjectSuccess, roleProjectFail])


    const barLinks = [
      {title: 'Projects', link: '/dashboard/project'},
      {title: 'Released', link: '/dashboard/project/released'},
      {title: 'Received', link: '/dashboard/received-project'},
  ];
  return (
    <div style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />
      <main style={{paddingTop:'0px', width:'100%'}}>
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

        <BarLinks pages={barLinks}/>

        <section className='container' style={{marginTop:'20px', padding:'10px'}}>
            <h6>Received Project: {ProjectByRole?.length}</h6>
            <div className="table-responsive">
                <table style={{backgroundColor:'#fff'}} className="table responsive-table table-hover my-1">
                    <thead style={{backgroundColor:'#075670', textAlign:'center', color:"#fff"}} className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Manage</th>
                    </tr>
                    </thead>
                    <tbody style={{ textAlign:'center'}}>
                        {projectsRole.map((item, index) => (
                        <tr key={item.id}>
                        <td >{index + 1}</td>
                        <td >{item.projectName}</td>
                        <td >{item.projectDescription.length > 20 
                                ? item.projectDescription.substring(0, 20) + '...' 
                                : item.projectDescription}</td>
                        <td ><Link to={token && decodedToken && decodedToken.userInfo &&
                                (decodedToken.userInfo.role.includes("Approver") || decodedToken.userInfo.role.includes("Release")) &&
                                    decodedToken.userInfo.role.includes("Approver") 
                                    ?`/dashboard/project/review-approver/${item._id}`
                                    : decodedToken.userInfo.role.includes("Release") 
                                    ?`/dashboard/project/review-release/${item._id}`
                                    :`/dashboard/project/review-creator/${item._id}`}
                            style={{backgroundColor:'#0C458F', 
                              color:"#fff", 
                              padding:'2px 10px', 
                              borderRadius:'4px'
                            }}>
                              <VisibilityIcon style={{paddingBottom:'3px'}} />
                          </Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {roleProjectRequest && 
                    <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                        <RotatingLines
                            strokeColor="#011d41"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible={true}
                            /> 
                </div>
                }
                {!roleProjectRequest && projectsRole.length < 1 &&
                    <p style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                        You didn't receive any project yet
                </p>
                }
            </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectByRole