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
import { ProjectByRoleIdAction, releasedProjectAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';


const ReleasedProjects = () => {

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
        const companyId = decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId
    
        const [releasedProject, setReleasedProject] = useState([])
        const {ReleasedProject} = useSelector(state => state)
        const {releasedProjectRequest, releasedProjectSuccess, releasedProjectFail, releasedProjects} = ReleasedProject;

        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(releasedProjectAction(companyId,token))
        }, [])
        useEffect(() => {
            if(releasedProjectSuccess){
                setReleasedProject(releasedProjects)
            }
            if(releasedProjectFail){
                    toast.error(`${releasedProjectFail.message}`)
            }
        }, [releasedProjectSuccess, releasedProjectFail])


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

        <section className='container' style={{marginTop:'20px', padding:'10px'}}>
            <h6>Released Project: </h6>
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
                        {releasedProject.map((item, index) => (
                        <tr key={item.id}>
                        <td >{index + 1}</td>
                        <td >{item.projectName}</td>
                        <td >{item.projectDescription.length > 20 
                                ? item.projectDescription.substring(0, 20) + '...' 
                                : item.projectDescription}</td>
                        <td ><Link to={`/dashboard/project-released/${item._id}`}
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
                {releasedProjectRequest && 
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
                {!releasedProjectRequest && releasedProject.length < 1 &&
                    <p style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                        we didn't find any released project!
                </p>
                }
            </div>
        </section>
      </main>
    </div>
  )
}

export default ReleasedProjects