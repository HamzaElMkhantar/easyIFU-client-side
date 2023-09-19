import React, { useEffect, useState } from 'react'
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import '../../components/header/header.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const Account = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        JSON.parse(localStorage.getItem('sideToggle')) || false
      );
    const toggleSidebar = () => {
        const newToggleState = !isSidebarOpen;
        setIsSidebarOpen(newToggleState);
        localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
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
                <div style={{display:'flex', alignItems:'center'}} >
                    <div  className="dropdown">
                            <button style={{ 
                                        }}
                                    className="dropdown-toggle" 
                                    type="button" 
                                    // id="dropdownMenuButton1" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false">
                                        menu
                            </button>
                            <ul style={{padding:'5px'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {/* <li style={{display:'flex', alignItems:'center'}} ><Link  to="/profile">Profile</Link></li>
                                <li style={{cursor:'pointer', display:'flex', alignItems:'center'}}><span>SignOut</span></li> */}
                                <li style={{width:'100%', display:'flex', alignItems:'center'}}>
                                    <ChevronRightIcon/>
                                    <Link style={{width:'100px', padding:'2px 5px', fontSize:'16px', fontWeight:'600', color:'black'}} to="/dashboard">Home</Link>
                                </li>
                                <li style={{width:'100%', display:'flex', alignItems:'center'}}>
                                    <ChevronRightIcon/>
                                    <Link style={{width:'100px', padding:'2px 5px', fontSize:'16px', fontWeight:'600', color:'black'}} to="/dashboard/project">Project</Link>
                                </li>
                                <li style={{width:'100%', display:'flex', alignItems:'center'}}>
                                    <ChevronRightIcon/>
                                    <Link style={{width:'100px', padding:'2px 5px', fontSize:'16px', fontWeight:'600', color:'black'}} to="/dashboard/users">Users</Link>
                                </li>
                                <li style={{width:'100%', display:'flex', alignItems:'center'}}>
                                <ChevronRightIcon/>
                                    <Link style={{width:'100px', padding:'2px 5px', fontSize:'16px', fontWeight:'600', color:'black'}} to="/dashboard/company">Company</Link>
                                </li>
                                <li style={{width:'100%', display:'flex', alignItems:'center'}}>
                                <ChevronRightIcon/>
                                    <Link style={{width:'100px', padding:'2px 5px', fontSize:'16px', fontWeight:'600', color:'black'}} to="/dashboard/account">Account</Link>
                                </li>
                            </ul>
                        </div>
                            <Avatar sx={{bgcolor:'#000000'}}></Avatar>
                </div>
          </div>
        </div>

        {/* Dashboard  content   */}
        <section  className='' style={{paddingTop:'20px', overflowY:'scroll', height:'94.3vh'}}>
            <div className="container-dashboard mt-4">
 
                <div  className="row mt-4">
                    <div className="col-12 col-md-6 col-lg-4 my-1">
                        <Card>
                            <Card.Body className='' style={{display:'flex'}}>
                                <StoreRoundedIcon style={{ fontSize:'90px', marginRight:'15px', color:'#075670'}}/>
                                <div style={{ width:'100%'}} className=''>
                                    <h5 className="card-title">Projects</h5>
                                    <h4 className="card-number">245</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 my-1">
                        <Card>
                            <Card.Body className='' style={{display:'flex'}}>
                                <PersonRoundedIcon style={{ fontSize:'90px', marginRight:'15px', color:'#c08260'}}/>
                                <div style={{ width:'100%'}} className=''>
                                    <h5 className="card-title">Users</h5>
                                    <h4 className="card-number">245</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    
                    <div className="col-12 col-md-6 col-lg-4 my-1">
                        <Card>
                            <Card.Body className='' style={{display:'flex'}}>
                                <TurnedInRoundedIcon style={{ fontSize:'90px', marginRight:'15px', color:'#9A3B3B'}}/>
                                <div style={{ width:'100%'}} className=''>
                                    <h5 className="card-title">Documents</h5>
                                    <h4 className="card-number">245</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div   className="row mt-4">
                    <div  className="col-md-6"> 
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <h6>total project: 12</h6>  
                        <Link to="/dashboard/project" style={{display:'flex', alignItems:'center', color:'black', backgroundColor:'#fff', borderRadius:'5px', padding:'0 5px'}}>
                            Show More
                            <PlayArrowRoundedIcon/>
                        </Link>                     
                    </div>
                        <table style={{backgroundColor:'#fff'}} className="table table-hover my-1">
                        <thead style={{backgroundColor:'#075670'}} className="thead-dark">
                            <tr style={{color:'#fff'}}>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>


                    <div  className="col-md-6"> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <h6>total users: 3</h6>  
                            <Link to="/dashboard/users" style={{display:'flex', alignItems:'center', color:'black', backgroundColor:'#fff', borderRadius:'5px', padding:'0 5px'}}>
                                Show More
                                <PlayArrowRoundedIcon/>
                            </Link>                     
                        </div>
                        <table style={{backgroundColor:'#fff'}} className="table table-hover my-1">
                        <thead style={{backgroundColor:'#c08260'}} className="thead-dark">
                            <tr style={{color:'#fff'}}>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
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


export default Account