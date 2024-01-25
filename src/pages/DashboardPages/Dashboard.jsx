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

                {companyData && companyData?.companyDocuments?.length >= 4 ? <div className='my-3' style={{backgroundColor:'#', borderRadius:'5px'}}>
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
                        
                </div>: null}

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