import React, { useEffect, useState } from 'react'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import '../../components/header/header.css';
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import '../../components/header/header.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardCompanyInfoAction } from '../../redux/actions/companyAcions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { RotatingLines } from 'react-loader-spinner';

import { logoutAction } from '../../redux/actions/authActions';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BarLinks from '../../utilities/BarLinks';

const Dashboard = () => {
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
    const companyId = decodedToken && decodedToken?.userInfo?.companyId

    const [companyData, setCompanyData] = useState(null)
    const {dashboardCompanyInfo} = useSelector(state => state)
    const {dashboardCompanyRequest, dashboardCompanySuccess, dashboardCompanyFail, dashboardCompanyData} = dashboardCompanyInfo

    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(dashboardCompanyInfoAction(companyId, token))
    }, [])
    useEffect(() =>{
        if(dashboardCompanySuccess){
            setCompanyData(dashboardCompanyData)
        }
        if(dashboardCompanyFail){
            toast.warning(`${dashboardCompanyFail.message}`)
        }
    }, [dashboardCompanySuccess, dashboardCompanyFail])

    const formatDate = (createdAt) => {
        const options = {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
      
        const dateObject = new Date(createdAt);
      
        return new Intl.DateTimeFormat('en-GB', options).format(dateObject);
      };


    //  ------- document Swiper ------
    const [imagesPerPage, setImagesPerPage] = useState(1);
    useEffect(() => {
        const handleResize = () => {
          // Adjust the number of images per page based on the screen width
          const screenWidth = window.innerWidth;
          if (screenWidth < 600) {
            setImagesPerPage(1); // Mobile: 1 image per page
          } else if (screenWidth < 992) {
            setImagesPerPage(2); // Tablet: 2 images per page
          } else if (screenWidth < 1200) {
            setImagesPerPage(3); // Tablet to laptop: 3 images per page
          } else {
            setImagesPerPage(4); // Laptop and larger: 8 images per page
          }
        };
    
        // Initial setup
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // Run the effect only once on component mount
    
      const groupedImages = companyData?.companyDocuments.reduce((acc, _, index, array) => {
        if (index % imagesPerPage === 0) {
          acc.push(array.slice(index, index + imagesPerPage));
        }
        return acc;
      }, []);
    
      const renderCustomPrevArrow = (onClickHandler, hasPrev, label) => (
        <button
          onClick={onClickHandler}
          disabled={!hasPrev}
          aria-label={label}
          style={{
            backgroundColor: '#046B81',
            color: 'white',
            position: 'absolute',
            top: '50%',
            height:'70%',
            borderRadius:'5px',
            fontSize:'14px',
            fontWeight:'700',
            left: '10px', // Adjust the left position
            transform: 'translateY(-50%)',
            zIndex: 2,
          }}
        >
          Prev
        </button>
      );
    
      const renderCustomNextArrow = (onClickHandler, hasNext, label) => (
        <button
          onClick={onClickHandler}
          disabled={!hasNext}
          aria-label={label}
          style={{
            backgroundColor: '#046B81',
            color: 'white',
            position: 'absolute',
            top: '50%',
            height:'70%',
            borderRadius:'5px',
            fontSize:'14px',
            fontWeight:'700',
            right: '10px', // Adjust the right position
            transform: 'translateY(-50%)',
            zIndex: 2,
          }}
        >
          Next
        </button>
      );




        // ------ headers ------
  const {logout} = useSelector(state => state)
  const {logoutRequest, logoutSuccess, logoutFail} = logout
  const handleLogout = () => {
    dispatch(logoutAction())
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
        </div>


        {/* <BarLinks /> */}

        {/* Dashboard  content   */}
        <section  className='container' style={{paddingTop:'20px', overflowY:'scroll', height:'87.3vh'}}>
            <div className=" mt-4" style={{overflowY:'scroll', height:''}}>
                <div  className="row mt-4">
                    <div className="col-12 col-md-6 col-lg-4 my-1">
                        <Card>
                            <Card.Body className='' style={{display:'flex'}}>
                                <StoreRoundedIcon style={{ fontSize:'90px', marginRight:'15px', color:'#075670'}}/>
                                <div style={{ width:'100%'}} className=''>
                                    <h5 className="card-title">Projects</h5>
                                    <h4 className="card-number">{!dashboardCompanyRequest 
                                    ?companyData?.companyProject?.length
                                    :  <RotatingLines
                                    strokeColor="#011d41"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="40"
                                    visible={true}
                                    /> 
                                    }</h4>
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
                                    <h4 className="card-number">{!dashboardCompanyRequest 
                                    ?companyData?.companyUsers?.length
                                    :  <RotatingLines
                                    strokeColor="#072d60"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="40"
                                    visible={true}
                                    /> 
                                    }</h4>
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
                                    <h4 className="card-number">{!dashboardCompanyRequest 
                                    ?companyData?.companyDocuments?.length
                                    :  <RotatingLines
                                    strokeColor="#011d41"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="40"
                                    visible={true}
                                    /> 
                                    }</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div> 

                {/* {companyData && companyData?.companyDocuments?.length >= 4 ? <div className='my-3' style={{backgroundColor:'#', borderRadius:'5px'}}>
                    <h6>documents:</h6>
                <Carousel
                    showArrows={true} 
                    infiniteLoop={true} 
                    showThumbs={false} 
                    showIndicators={false}
                    emulateTouch={true} // Hide default arrows
                    renderArrowPrev={renderCustomPrevArrow}
                    renderArrowNext={renderCustomNextArrow}
                    >
                    {groupedImages &&
                        groupedImages.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            {group.map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', margin: '10px', maxWidth: '200px'}}>
                                <img style={{objectFit:'fill'}}
                                src={`${process.env.REACT_APP_BASE_URL}/assets/documents/${item.imageUrl}`}
                                alt={`Document ${index + 1}`}
                                />
                            </div>
                            ))}
                        </div>
                        ))}
                    </Carousel>
                        
                </div>: null} */}

                <div   className="" style={{display:'flex', flexWrap:'wrap', gridGap:'10px', justifyContent:"", flexDirection:'row', alignItems:'flex-start'}}>
                    <div  className="" style={{width:'49.5%', minWidth:'300px', margin:'auto'}}> 
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <h6>projects:</h6>  
                        <Link to="/dashboard/project" style={{display:'flex', alignItems:'center', color:'black', backgroundColor:'#fff', borderRadius:'5px', padding:'0 5px'}}>
                            Show More
                            <PlayArrowRoundedIcon/>
                        </Link>                     
                    </div>
                        <table style={{backgroundColor:'#fff', textAlign:'center', fontSize:'13px', width:'100%'}} className="table table-hover my-1 ">
                        <thead style={{backgroundColor:'#075670'}} className="thead-dark">
                            <tr style={{color:'#fff'}}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Realization</th>
                            <th scope="col">createdAt</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'13px', fontWeight:'400'}}>
                            {companyData && 
                            companyData?.companyProject?.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.projectName}</td>
                                        <td >{item.projectDescription.length > 20 
                                            ? item.projectDescription.substring(0, 20) + '...' 
                                            : item.projectDescription}</td>
                                        <td>{item.released ? "Released" : "Not yet"}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                        </table>
                    </div>


                    <div  className="" style={{width:'49.5%', minWidth:'300px', margin:'0 auto'}}> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <h6>users:</h6>  
                            <Link to="/dashboard/users" style={{display:'flex', alignItems:'center', color:'black', backgroundColor:'#fff', borderRadius:'5px', padding:'0 5px'}}>
                                Show More
                                <PlayArrowRoundedIcon/>
                            </Link>                     
                        </div>
                        <table style={{backgroundColor:'#fff', fontSize:'13px', width:'100%'}} className="table table-hover my-1">
                        <thead style={{backgroundColor:'#c08260'}} className="thead-dark">
                            <tr style={{color:'#fff'}}>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">CreatedAt</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'13px', fontWeight:'400'}}>
                            {companyData && 
                            companyData?.companyUsers?.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{`${item.firstName}`}</td>
                                        <td>{` ${item.lastName}`}</td>
                                        <td>{item.isActive ? "Active" : "Not Active"}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                    </tr>
                                )
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

export default Dashboard