import React, { useEffect, useState } from 'react'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import '../../components/header/header.css';
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import '../../components/header/header.css';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocumentsAction, documentsAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';
import './documentInformation.css'
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
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Documents = () => {
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

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
  
      return `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`;
    }

    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const [searchBy, setSearchBy] = useState('LOTNumber')
    const [searchWords, setSearchWords] = useState('')
    const [companyDocument, setCompanyDocument] = useState([])

    const {documents, deleteDocument } = useSelector(state => state)
    const {documentsRequest, documentsSuccess, documentsFail, documentsCompany} = documents
    const {deleteDocumentsRequest, deleteDocumentsSuccess, deleteDocumentsFail, deleteDocumentMessage} = deleteDocument

    const companyId = decodedToken && decodedToken?.userInfo?.companyId
    const producerId = decodedToken && decodedToken?.userInfo._id


    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(documentsAction({companyId, producerId}, token))
    }, [])

    useEffect(() => {
      // if(searchWords != ''){
        dispatch(documentsAction({
          searchBy,
          searchWords: searchWords.trim(),
          companyId, 
          producerId
        }, token))
      // }
      // if(searchWords === ''){
      //   dispatch(documentsAction({companyId, producerId}, token))
      // }
    }, [searchWords, searchBy])


    useEffect(() => {
      if(documentsSuccess){
        setCompanyDocument(documentsCompany)
       
      }
     
      if(documentsFail){
        setCompanyDocument([])
      }
    }, [documentsSuccess, documentsFail])

    useEffect(() => {
      if(deleteDocumentsSuccess){
        dispatch(documentsAction(companyId, producerId, token))
        toast.success(`Document deleted`)
      }
      if(deleteDocumentsFail && deleteDocumentsFail.message !== "didn't found any document"){
        toast.warning(`${deleteDocumentsFail.message}`)
      }
    }, [deleteDocumentsSuccess, deleteDocumentsFail])

          
    const handleDeleteDocument = (documentId) => {
      dispatch(deleteDocumentsAction(documentId))
    }


    // ------ headers ------
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
                            onClick={() => handleLogout()} > <MenuItem style={{fontSize:'14px', fontWeight:'700', borderTop:'1px solid lightGray'}} >Logout</MenuItem>
                            </Link>
                    </Menu>
                  </div>

              </Toolbar>
            </AppBar>
          </Box>
        </div>

        {/* Dashboard  content   */}
        <section  className='container py-4' style={{paddingTop:'0px', overflowY:'scroll', height:'94.3vh'}}> 
          <div className='' style={{display:'flex', justifyContent:'space-between',}}>
            <Link to='/dashboard/templates'>
              <button style={{
                            padding: "8px 20px",
                            backgroundColor:"#9a3b3a",
                            borderRadius:'3px',
                            color: "#ecf0f3",
                            fontWeight:'700'
                          }}>
                      New Order</button>
            </Link>

            <div className='search'>
            <div style={{textAlign:'center', display:'flex', flexDirection:'', alignItems:'center', justifyContent:'center'}} className="form-group">
                    <div className='mx-4' style={{textAlign:'center', display:'', flexDirection:'row-reverse', alignItems:'center', justifyContent:'center', alignItems:'center'}} >
                        <div className="form-check">
                            <label style={{fontSize:'12px'}} className="form-check-label">LOT number</label>
                            <input style={{width:'15px', height:'15px'}}
                                type="checkbox"
                                className="form-check-input"
                                name="LOTNumber"
                                value="LOTNumber"
                                checked={searchBy == 'LOTNumber'}
                                onClick={e => setSearchBy(e.target.value)}
                            />
                        </div>
                        <div style={{fontSize:'12px'}} className="form-check p">
                            <input style={{width:'15px', height:'15px'}}
                                type="checkbox"
                                className="form-check-input"
                                name="serialNumber"
                                value="serialNumber"
                                checked={searchBy == 'serialNumber'}
                                onClick={e => setSearchBy(e.target.value)}
                            />
                            <label className="form-check-label">Serial number</label>
                        </div>
                    </div>
                    <label className='-bg mb-1'>
                    <input  style={{width:'220px', height:'30px', borderBottom:'1px solid black', borderLeft:'1px solid black', fontSize:'12px'}}
                                type="text"
                                className="form-check- px-2"
                                placeholder={`search by ${searchBy == "LOTNumber" ? "LOT number" : 'Serial number'}`}
                                name="search-word"
                                value={searchWords}
                                onChange={e => setSearchWords(e.target.value)}
                            />
                    </label>

                </div>
            </div>
          </div>
        {!documentsRequest ? <div className="row row_branchen">
        {!companyDocument.length > 0 && <div style={{textAlign:'center', width:'100%'}}>
          <h5>No Order Created</h5>
        </div>}
        <div>{companyDocument.length > 0 && 
            <Table striped bordered hover style={{backgroundColor:'#fff'}} className="table table-hover my-1">
              <thead style={{backgroundColor:'#075670', textAlign:'center'}} className="thead-dark">
                <tr style={{color:'#fff'}}>
                  <th scope="col">#</th>
                  <th scope="col">label Name</th>
                  <th scope="col">LOT number</th>
                  <th scope="col">Serial number</th>
                  <th scope="col">Produced By</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody style={{ textAlign:'center'}}>
                 {companyDocument &&
                  companyDocument?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                          <td>{item?.labelName}</td>
                          <td>{item?.labelData.hasLotNumber ? item?.labelData.LOTNumber : "N/A" }</td>
                          <td>{item?.labelData.haSerialNumber ? item?.labelData.serialNumber : "N/A"}</td>
                          <td>{item?.produceBy?.firstName} {item?.produceBy?.lastName}</td>
                          <td>{formatDate(item?.createdAt)}</td>
                          <td>
                            <Link to={`/dashboard/document-sizes/${item._id}`} 
                                style={{color:'#021D41', 
                                backgroundColor:"#efefef",
                                padding:'2px 10px', 
                                borderRadius:'4px'}}>
                              <VisibilityIcon style={{paddingBottom:'', fontSize:'24px', color:"#03295C"}} />
                            </Link>
                          </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>}
          </div>
      </div> 
      :(<div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
        <RotatingLines
            strokeColor="#011d41"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          /> 
      </div>) }
        </section>
      </main>

      </div>
  )
}

export default Documents