import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { contactByIdAction } from '../../redux/actions/supperAdminActions';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const ContactDetails = () => {
    const {contactId} = useParams()
    const [contactInfo, setContactInfo] = useState([]);
  
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
  
    const {contactById} = useSelector(state => state)
    const {contactByIdRequest, contactByIdSuccess, contactByIdFail, contactByIdInfo} = contactById;
  
  
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(contactByIdAction(contactId,token))
    },[])
  
  
    useEffect(() => {
      if(contactByIdSuccess){
        setContactInfo(contactByIdInfo)
      }
      if(contactByIdFail){
          toast.warning(`${contactByIdFail.message}`)
        }
    },[contactByIdSuccess, contactByIdFail])
  
  
    const dateFormat = (date) => {
      const dateObject = new Date(date);
    
      const day = String(dateObject.getDate()).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const year = dateObject.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    };
  return (
    <div className='container py-5'>
        <Link style={{height:'35px'}} to={`/eIFU-admin/contacts`} className='label-info-link'>Back</Link>
        <div className='contact-content my-4' style={{backgroundColor:'#fff', borderRadius:'5px', padding:'10px', border:'0.5px solid lightGray', color:'gray'}}>
            <p>FirstName: {contactInfo?.firstName}</p>
            <p>LastName: {contactInfo?.lastName}</p>
            <p>Sender Email: {contactInfo?.email}</p>
            <p>Company Email: {contactInfo?.companyEmail}</p>
            <p>Created At: {dateFormat(contactInfo?.createdAt)}</p>
        </div>
            <div className='contact-message' style={{backgroundColor:'#fff', borderRadius:'5px', padding:'10px', border:'0.5px solid lightGray'}}>
                <p style={{fontSize:'20px', fontWeight:'700'}}>Message :</p>
                <p style={{fontSize:'17px', paddingLeft:'10px'}}>{contactInfo?.message}</p>
            </div>
    </div>
  )
}

export default ContactDetails