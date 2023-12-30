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
import { deleteDocumentsAction, documentsAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';
import './documentInformation.css'
import { RotatingLines } from 'react-loader-spinner';



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

  

    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const [companyDocument, setCompanyDocument] = useState([])

    const {documents, deleteDocument } = useSelector(state => state)
    const {documentsRequest, documentsSuccess, documentsFail, documentsCompany} = documents
    const {deleteDocumentsRequest, deleteDocumentsSuccess, deleteDocumentsFail, deleteDocumentMessage} = deleteDocument

    const companyId = decodedToken && decodedToken?.userInfo && decodedToken?.userInfo?.companyId
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(documentsAction(companyId, token))
    }, [])


console.log(documentsCompany && documentsCompany)
console.log(documentsCompany && documentsCompany.length)
    useEffect(() => {
      if(documentsSuccess){
        setCompanyDocument(documentsCompany)
       
      }
     
      if(documentsFail && documentsFail.message == "didn't found any document"){
        setCompanyDocument([])
      }
    }, [documentsSuccess, documentsFail])

    useEffect(() => {
      if(deleteDocumentsSuccess){
        dispatch(documentsAction(companyId, token))
        toast.success(`Document deleted`)
      }
      if(deleteDocumentsFail && deleteDocumentsFail.message !== "didn't found any document"){
        toast.warning(`${deleteDocumentsFail.message}`)
      }
    }, [deleteDocumentsSuccess, deleteDocumentsFail])

          
    const handleDeleteDocument = (documentId) => {
      dispatch(deleteDocumentsAction(documentId))
    }
  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>      
    <SideBar isSidebarOpen={isSidebarOpen} />
    <main className='' style={{paddingTop:'0px', width:'100%'}}>
  {/* Dashboard header  */}
  <div  style={{ borderBottom:'1px solid lightGray'}} id="page-content-wrapper">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='container-dashboard'>
                <div style={{display:'flex', alignItems:'center'}} className=''>
                    <span  href="#menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
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
        <section  className='container py-5' style={{paddingTop:'20px', overflowY:'scroll', height:'94.3vh'}}> 
        <div className="row row_branchen">
        {!companyDocument.length > 0 && <div style={{textAlign:'center', width:'100%', backgroundColor:'#09566F', color:"#fff"}}>
          <h4>didn,t found any document</h4>
        </div>}
        {companyDocument?.map((document, index) => (
          <div  key={index} style={{position:'relative'}} className="col-lg-4 col-md-6 col-sm-6 card-wrapper">
            <button onClick={() => handleDeleteDocument(document._id)} style={{position:'absolute', top:'0', right:'0', zIndex:'999', backgroundColor:'#FAC9C3', padding:'3px', margin:'2px', borderRadius:'5px'}}>
              {deleteDocumentsRequest 
              ? <RotatingLines
                  strokeColor="#011d41"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                  /> 
               :<DeleteIcon/>}
              </button>
            <Link to={`/dashboard/document-sizes/${document._id}`} 
                  className="card mb-3 card-document">
                <div className="image__wrapper" style={{borderBottom:'.1px solid lightGray'}}>
                  <div className="card__shadow--1"></div>
                  <img className="card-img-top" src={`${process.env.REACT_APP_BASE_URL}/assets/documents/${document.imageUrl}`}alt={document.projectName} />
                </div>
                <div className="card-body pb-4">
                  <h6 style={{color:'black'}}   className="card-title text-center">{document?.projectName}</h6>
                  <p style={{color:'gray', fontSize:'13px'}} className="card-text">{document?.projectDescription.length > 20 ? document?.projectDescription.slice(0, 20) + "..." : document?.projectDescription} </p>
                </div>
            </Link>
          </div>
        ))}
      </div>
        </section>
      </main>

      </div>
  )
}

export default Documents