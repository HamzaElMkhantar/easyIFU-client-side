import React from 'react'
import './home.css'
import mainPhoto from '../../assets/main-photo.svg'
import compliancePhoto from '../../assets/compliance-section-photo.svg'
import dynamicLinkPhoto from '../../assets/dynamicLinkPhoto.svg'
import checkListPhoto from '../../assets/pana.svg'
import CompanyBrandPhoto from '../../assets/amico.svg'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { refreshAction } from '../../redux/actions/authActions'

const Home = () => {
    const dispatch = useDispatch()

  return (
    <div className='home'>
            <div className='main-section-bg'></div>
        <div className='main-section'>
            <div className='main-content'>
                <div className='main-right-content'>
                    <h1>Simplify Your eIFU Compliance with EasyIfu </h1>
                    <p>The Trusted Solution for  medical device Manufacturers</p>
                    <button>
                        <span>How it works</span>
                        <PlayCircleIcon />
                    </button>
                </div>

                <div className="main-left-content">
                    <img src={mainPhoto} alt="main-section-photo"  />
                </div>
            </div>
        </div>

    {/* about section */}
        <div className='about-section' id='about'>
            {/* <img className='aboutSectionBG' src={aboutSectionBG} alt="" /> */}
            <div className='about-content'>
                <h2>About Us</h2>
                <h4>The all-in-one Platform for Manufacturers</h4>
                <p>
                    EasyIFU is an elFU management platform that streamlines the creation, review, and release of electronic Instructions <br/>
                    for Use. Administrators can add users who are involved in the process, and a Document Control System is <br/>
                    available to track the elFU’s progress. Once created, products can be linked to the eIFU,<br/>
                    simplifying distribution. Experience the magic of streamlined <br/>
                    elFU management with EasyIFU
                </p>
            </div>

            <div className='compliance-content py-5'>
                <div className='compliance-content-item img-item'>
                    <img src={compliancePhoto} alt="compliance-photo" />
                </div>
                <div className='compliance-content-item content-item'>
                    <h6>COMPLIANCE</h6>
                    <h4>Experience Hassle-Free eIFU Compliance</h4>
                    <p>The EasyIFU platform is following the requirements of (EU) 2021/2226 on electronic instructions for use of medical devices. This is compatible with the requirements of (EU) 2017/745 criteria. The platform is passing all the validation and cybersecurity tests. The platform is constantly updated following the latest regulatory requirements.</p>
    
                    <button className='homeButton'>Learn More 
                        <ArrowForwardIcon style={{marginLeft:'10px'}} />
                    </button>
                </div>
            </div>


            <div className='dynamicLink-content py-5'>
                <div className='dynamicLink-content-item dynamicLink-img-item img-item'>
                    <img src={dynamicLinkPhoto} alt="dynamicLink-photo" />
                </div>
                <div className='dynamicLink-content-item content-item'>
                    <h6>DYNAMIC LINK</h6>
                    <h4>EasyIFU’s Dynamic  QR Function</h4>
                    <p>
                        When you generate a QR code or weblink on the EasylFU platform, customers who scan it or click on the link will be directed to the latest version of your elFU. Our platform manages your documentation and ensures it's readily available to your customers. Any updates made on the platform are immediately reflected in the link, thanks to our Dynamic QR function.
                    </p>
                    <button className='homeButton'>Learn More 
                        <ArrowForwardIcon style={{marginLeft:'10px'}} />
                    </button>
                </div>
            </div>


            
            <div className='checkList-content py-5'>
                <div className='dynamicLink-content-item checkList-img-item img-item'>
                    <img src={checkListPhoto} alt="checkList-photo" />
                </div>
                <div className='checkList-content-item content-item'>
                    <h6>IFU CHECKLIST</h6>
                    <h4>Customizable Checklists with EeasyIFU</h4>
                    <p>
                        EasylFU provides users with a default checklist that's fully compatible with (EU) 2017/745 regulations when creating IFUs. Additionally, our platform allows you to customize the checklist by adding or removing criteria to suit your specific needs.
                    </p>
                    <button className='homeButton'>Learn More 
                        <ArrowForwardIcon style={{marginLeft:'10px'}} />
                    </button>
                </div>
            </div>


            <div className='report-content about-content py-4'>
                <h2>REPORT</h2>
                <h4>Detailed eIFU Reporting with EasylFU</h4>
                <p>
                    A report can be created which will provide all the information <br/> regarding the eIFU
                </p>

                <div className='cards-content'>
                    <div className='report-card' style={{backgroundColor:'#EEBA0010'}}>
                        <div className='report-card-icon'>
                            <PeopleAltTwoToneIcon className='reportMUI-icon'  style={{color:'#EEBA00'}}/>
                        </div>
                        <p>Person that created , reviewed , released the eIFU with dates</p>
                    </div>

                    <div className='report-card' style={{backgroundColor:'#3A5FAF10'}}>
                        <div className='report-card-icon'>
                            <ReceiptLongTwoToneIcon className='reportMUI-icon'  style={{color:'#3A5FAF', backgroundColor:''}}/>
                        </div>
                        <p>CheckList Result</p>
                    </div>

                    <div className='report-card' style={{backgroundColor:'#972B2B10'}}>
                        <div className='report-card-icon'>
                            <CalendarMonthTwoToneIcon className='reportMUI-icon'  style={{color:'#972B2B', backgroundColor:''}}/>
                        </div>
                        <p>Copy of the eIFU</p>
                    </div>

                    <div className='report-card' style={{backgroundColor:'#455A6410'}}>
                        <div className='report-card-icon'>
                            <StackedLineChartOutlinedIcon className='reportMUI-icon' style={{color:'#455A64', backgroundColor:''}} />
                        </div>
                        <p>Status of the eIFU</p>
                    </div>
                </div>

            </div>


            <div className='companyBrand-content'>
                <div className='companyBrand-content-item companyBrand-img-item img-item'>
                    <img src={CompanyBrandPhoto} alt="companyBrand-photo" />
                </div>
                <div className='companyBrand-content-item content-item'>
                    <h6>COMPANY BRAND</h6>
                    <h4>Strengthen Your Brand's Reputation with EasylFU</h4>
                    <p>EasylFU provides users with a default checklist that's fully compatible with (EU) 2017/745 regulations when creating IFUs. Additionally, our platform allows you to customize the checklist by adding or removing criteria to suit your specific needs.</p>
                    <button className='homeButton'>Learn More 
                        <ArrowForwardIcon style={{marginLeft:'10px'}} />
                    </button>
                </div>
            </div>

        </div>

        <div className='pricing-section' id='price'>
            <h2>Pricing</h2>
            <h5>Save time and simplify Your eIFU Management with Our Efficient Pricing Plans-Quality <br/> Service Guaranteed</h5>
            <div className='pricing-card-content'>
   
                    
                    <div className='pricing-card monthly'>
                        <div className='card-top'>
                                <h4>Monthly</h4>
                                <p>What You’ll Get</p>
                                <ul className='pricing-list'>
                                    <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                        Compliance</li>
                                    <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                        Dynamic Link</li>
                                    <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                        IFU CheckList</li>
                                    <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                        Report</li>
                                    <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                        Company Brand</li>
                                </ul>
                        </div>
                        <div className='card-bottom'>
                            <span><h3>400$/</h3>month Package</span>
                            <button>Choose</button>
                        </div>
                    </div>

                    <div className='pricing-card annualy'>
                        <div className='card-top'>
                            <h4>Annualy</h4>
                            <p style={{color:'lightGray'}}>What You’ll Get</p>
                            <ul className='pricing-list'>
                                <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                    Compliance</li>
                                <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                    Dynamic Link</li>
                                <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                    IFU CheckList</li>
                                <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                    Report</li>
                                <li> <CheckCircleIcon style={{marginRight:'10px'}} />
                                    Company Brand</li>
                            </ul>
                        </div>

                        <div className='card-bottom'>
                            <span><h3>400$/</h3>month Package</span>
                            <h3 style={{color:'#EEBA00', textAlign:'center', fontWeight:'700', margin:'5px 0'}}>You Save 10%</h3>
                            <button>Choose</button>
                        </div>

                    </div>

                </div>
        </div>

        <div className='contact-section' id='contact'>
            <h3>Contact</h3>
            <div className='contact-card'>
                <div className='card-left-content'>
                    <h4>Get In Touch</h4>
                    <p>Thank you for your interest in EasylFU! If you have any questions or feedback about our platform, please fill out the form below and we'll get back to you as soon as possible.</p>
                    <div className='list-contact'>
                        <li>
                            <PhoneIcon className='contact-icon' /> 
                            <p>+1012 3456 789</p>
                        </li>
                        <li>
                            <EmailIcon className='contact-icon' /> 
                            <p>demo@gmail.com</p>
                        </li>
                        <li>
                            <LocationOnIcon className='contact-icon' /> 
                            <p>132 Dartmouth Street Boston, Massachusetts
                            02156 United States</p>
                            
                        </li>
                    </div>
                </div>

                <div className='card-right-content'>
                    <form action="">
                        <input style={{display:'none'}} type="text" name='trap' />
                        <div className='input-content'>
                            <p>First Name</p>
                            <input type="text" required/>
                        </div>
                        <div className='input-content'>
                            <p>Last Name</p>
                            <input placeholder='' type="text" required/>
                        </div>
                        <div className='input-content'>
                            <p>Email</p>
                            <input type="text" required/>
                        </div>
                        <div className='input-content'>
                            <p>Phone Number</p>
                            <input type="text" required/>
                        </div>

                        <div className='input-message'>
                            <p>Message</p>
                            <input type="text" required/>
                        </div>

                        <input className='submit-button' type="submit" />
                    </form>
                </div>
            </div>
        </div>


        

        
    </div>
  )
}

export default Home