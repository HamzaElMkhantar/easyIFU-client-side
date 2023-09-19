import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import headerLogo from '../../assets/easyIFU_Logo.png'


const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-content'>
        <div className='footer-top'>
            <img src={headerLogo}/>
            <p style={{display:'flex'}}>EasyIFU : Streamlining eIFU Compliance. We're Easy Medical Device, specialists in Quality and Regulatory affairs for Medical Device firms. Ensure (EU) 2021/2226 and (EU) 2017/745 compliance effortlessly. Manage eIFUs with dynamic QR codes, checklists, and reports. Contact us to simplify compliance.</p>
        </div>
        <div className='footer-bottom'>
            <div>
                <li><h4>Reach us</h4></li>
                <div className='list-contact'>
                        <li>
                            <PhoneIcon className='footer-icon' /> 
                            <p>+1012 3456 789</p>
                        </li>
                        <li>
                            <EmailIcon className='footer-icon' /> 
                            <p>demo@gmail.com</p>
                        </li>
                        <li>
                            <LocationOnIcon className='footer-icon' /> 
                            <p>132 Dartmouth Street Boston, Massachusetts <br/>
                            02156 United States</p>
                            
                        </li>
                    </div>
            </div>
            <div>
                <li><h4>Company</h4></li>
                <li><a href='#about'>About</a></li>
                <li><a href='#contact'>Contact</a></li>
                <li><a href='#price'>Pricing</a></li>
            </div>
            <div>
                <li><h4>Legal</h4></li>
                <li>Privacy Policy</li>
                <li>Terms & Services</li>
                <li>Terms of Use</li>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer