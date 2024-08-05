import React, { useEffect, useState } from 'react'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import '../../components/header/header.css';
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import '../../components/header/header.css';
import '../../utilities/dasboardCard.css'
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
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BarLinks from '../../utilities/BarLinks';
import LineChart from '../../utilities/LineChart';
import OrderDetailsDashboard from '../../utilities/OrderDetailsDashboard';
import { Work, HourglassEmpty , AddCircle} from '@mui/icons-material'; 
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { Inbox, CheckCircle, Cancel } from '@mui/icons-material';
import DashboardCard from '../../utilities/DashboardCard';
import LabelStatusPieChart from '../../utilities/PieChart';
import axios from 'axios';
import { Inventory, Print } from '@mui/icons-material'; // Import other icons as needed

import { Pie } from 'react-chartjs-2';
import DashTable from '../../utilities/DashTabel';
import MonthlyMetricsBarChart from '../../utilities/BarNivoChart';
import PrintLogsSlider from '../../utilities/PrintLogsSwiper';

// ------- chart libraries for dashboard -------



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
    const userId = decodedToken && decodedToken?.userInfo?._id

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

    const data = [
      {
        orderName: "Order 1",
        producedName: "Produced Item A",
        printCount: 100
      },
      {
        orderName: "Order 2",
        producedName: "Produced Item B",
        printCount: 150
      },
      {
        orderName: "Order 3",
        producedName: "Produced Item C",
        printCount: 200
      },
      {
        orderName: "Order 1",
        producedName: "Produced Item A",
        printCount: 100
      },
      {
        orderName: "Order 2",
        producedName: "Produced Item B",
        printCount: 150
      },
      {
        orderName: "Order 3",
        producedName: "Produced Item C",
        printCount: 200
      },
      {
        orderName: "Order 1",
        producedName: "Produced Item A",
        printCount: 100
      },
      {
        orderName: "Order 2",
        producedName: "Produced Item B",
        printCount: 150
      },
      {
        orderName: "Order 3",
        producedName: "Produced Item C",
        printCount: 200
      }
    ];

  // ---  fetch dashboard data ---


  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrder, setRecentOrder] = useState(null);
  const [recentLabels, setRecentLabels] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [printLogs, setPrintLogs] = useState(null);
console.log({recentOrder})
  const [dashboardCardData, setDashboardCardData] = useState({
    labelCount: 0 ,
    productCount: 0,
    onGoingLabels: 0,
    totalPrintCount: 0,
  })
    // Dummy data
    const DummyData = [
      { icon: <TaskOutlinedIcon style={{ fontSize: '50px', color: '#ff9800' }} />, title: 'Ongoing Labels', count: dashboardCardData.onGoingLabels, color: '#BE7609' },
      { icon: <CategoryOutlinedIcon style={{ fontSize: '50px', color: '#4caf50' }} />, title: 'Received Labels', count: dashboardCardData.productCount , color: '#207D23' },
      { icon: <LabelOutlinedIcon style={{ fontSize: '50px', color: '#2196f3' }} />, title: 'Total Labels', count: dashboardCardData.labelCount , color: '#062D60' },
      { icon: <Print style={{ fontSize: '50px', color: '#f44336' }} />, title: 'Total Order Print', count: dashboardCardData.totalPrintCount , color: '#AC190E' },
    ];

  const fetchChartData = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/dashboard-data/${companyId}/${userId}`, config);
      const { labelStatusDistribution } = response.data;
      const { recentOrder } = response.data;
      const { recentLabels } = response.data;
      const { metrics } = response.data;
      const { printLogs } = response.data;

      setRecentOrder(recentOrder)
      setRecentLabels(recentLabels)
      setMetrics(metrics)
      setPrintLogs(printLogs)
      
      setDashboardCardData({
        labelCount: response.data.labelCount ,
        productCount:  response.data.productCount,
        onGoingLabels:  response.data.onGoingLabels,
        totalPrintCount:   response.data.totalPrintCount,
      })

      console.log('Fetched data:', response);

      if (!labelStatusDistribution) {
        throw new Error('labelStatusDistribution is undefined');
      }

      // Transform the data for the Pie chart
      const labels = labelStatusDistribution.map(item => item._id);
      const values = labelStatusDistribution.map(item => item.count);

      // Data for Chart.js
      const chartJSData = {
        labels,
        datasets: [
          {
            label: 'Label Status Distribution',
            data: values,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ]
          }
        ]
      };

      // Data for Nivo Pie
      const nivoData = labelStatusDistribution.map(item => ({
        id: item._id,
        label: item._id,
        value: item.count
      }));

      setChartData({ chartJSData, nivoData });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [companyId, token]);


  return (
    <div className='' style={{height:'70vh', width:'100vw', display:'flex', overflow: 'hidden', width: '100vw', height: ''}}>
      <SideBar isSidebarOpen={isSidebarOpen} />
      <main className='' style={{ paddingBottom: '0px', width: '100%', overflow: 'hidden' }}>
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
                            onClick={() => handleLogout()} > <MenuItem style={{fontSize:'14px', fontWeight:'700', borderTop:'1px solid lightGray'}} >Logout</MenuItem>
                            </Link>
                    </Menu>
                  </div>

              </Toolbar>
            </AppBar>
          </Box>
        </div>


        {/* Dashboard content   */}
        <div className='' style={{ paddingBottom:'50px', backgroundColor:''}}>
          <section className='chart-section container mt-4' >
           {recentOrder?.length > 0 && <div className='mb-3'>
              {<h3 style={{color:'#062d60', fontWeight:'700', margin:'0'}}>{ !loading &&
                  chartData ?  recentOrder[0]?.companyId?.companyName: "..."}</h3>}
                {<p style={{color:'#062d60', fontWeight:'500', fontSize:'15px', margin:'0'}}>{ !loading && 
                chartData ?  recentOrder[0]?.companyId?.companyAddress + " " + recentOrder[0]?.companyId?.companyCity + " " + recentOrder[0]?.companyId?.companyCountry 
                
                : "..."}</p>}
            </div>}

            <div className='row' style={{display:'flex', justifyContent:'space-between', margin:'auto'}}>
              {DummyData?.map((item, index) => (
                <DashboardCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  count={item.count}
                  color={item.color}
                  bg={`bg${index+1}`}
                />
              ))}
            </div>
            <div className='row mt-4 container'>
              <div className='custom-col custom-col-md-8'>
              <h6>Label Status Over Time:</h6>
                <LineChart companyId={companyId} token={token} />
              </div>
              <div className='custom-col custom-col-md-4 p-1' >
                <div className='mb-1' style={{display:'flex', justifyContent:'space-between'}}>
                  <h6>Received Labels:</h6>
                  <Link to="/dashboard/received-project" style={{display:'flex', alignItems:'center', color:'#fff', backgroundColor:'#021d41', borderRadius:'5px', padding:'0 5px'}}>
                            Show More
                            <PlayArrowRoundedIcon/>
                        </Link>   
                </div>
              <div className='p-2 ' style={{ display: 'flex', flexDirection: 'column', height: '350px', overflowY: 'auto', zIndex:'1', backgroundColor:'#fff', borderRadius:'5px'}}>
                  {!loading &&
                  chartData && 
                  <OrderDetailsDashboard data={recentOrder} />}
                  {loading && <div className='mt-5' style={{display:'flex', justifyContent:'center'}}>
                  <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                    /> </div>}
              </div>
              </div>
            </div>
          </section>

          <section className='container mt-5'>
            {!loading && 
              chartData && 
              <div className='row container'>
              <div className='col-md-6'>
                <div className='mb-1' style={{display:'flex', justifyContent:'space-between'}}>
                <h6>Recent Labels:</h6>
                  <Link to="/dashboard/project" style={{display:'flex', alignItems:'center', color:'#fff', backgroundColor:'#021d41', borderRadius:'5px', padding:'0 5px'}}>
                            Show More
                            <PlayArrowRoundedIcon/>
                        </Link>   
                </div>
                <DashTable recentLabels={recentLabels} />
              </div>
              <div className='col-md-6'   >
                <h6>Label Status Distribution:</h6>
                {
                <LabelStatusPieChart 
                    chartData={chartData} 
                    loading={loading} 
                    error={error} 
                    token={token} 
                    companyId={companyId} 
                    chartLibrary="nivo" />}
              </div>
            </div>}
            {loading &&
                <div style={{display:'flex', justifyContent:'center'}}>
                  <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                    /> 
                </div>}
              {error && <p>{error}</p>}
          </section>

          <section className='mt-5 container'>
           { <div className='row container'>
              <div className="col-md-6">
              <h6>Monthly Metrics Comparison:</h6>
                {metrics && <MonthlyMetricsBarChart data={metrics} />}
              </div>
              <div className="col-md-6" style={{overflow:'hidden'}}>
                <h6>Recent Print Labels:</h6>
                  <PrintLogsSlider printLogs={printLogs} />
              </div>
            </div>}
          </section>
        </div>

        {/* ------------------ Dashboard  content  ----------------- */}
        {/* <section  className='container' style={{paddingTop:'20px', overflowY:'scroll', height:'87.3vh'}}>
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
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
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

        </section> */}
      </main>
    </div>
  )
}

export default Dashboard