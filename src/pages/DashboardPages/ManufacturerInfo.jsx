import React, { useEffect, useState } from 'react';
import './project.css'
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { manufacturerInformationAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { GOOGLE_MAPS_API_KEY } from '../../config';
import { getCompanyInfoAction } from '../../redux/actions/companyAcions';

const ManufacturerInfoComponent = () => {
    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {manufacturerInformation, getCompanyInfo} = useSelector(state => state)
    const {manufacturerRequest, manufacturerSuccess, manufacturerFail, projectInfo} = manufacturerInformation;
    const {companyRequest, companySuccess, companyFail, companyInfo} = getCompanyInfo;

  const [formData, setFormData] = useState({
    projectId,
    companyId: decodedToken && decodedToken.userInfo ? decodedToken.userInfo.companyId : null,
    hasDistributor: false,
    distributorName: '',
    distributorAddress: '',
    isOutsideEU: false,
    europeanAuthorizedRepName: '',
    europeanAuthorizedRepAddress: '',
    importerName: '',
    importerAddress: '',
    productClass: 'Class I',
    notifiedBodyNumber: '',
  });


// function to check if an address is in Europe

    const [userCountry, setUserCountry] = useState('');

    const europeanCountries = [
        'albania', 'andorra', 'armenia', 'austria', 'azerbaijan', 'belarus', 'belgium', 'bosnia and herzegovina',
        'bulgaria', 'croatia', 'cyprus', 'czech republic', 'denmark', 'estonia', 'finland', 'france', 'georgia',
        'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'kazakhstan', 'kosovo', 'latvia', 'liechtenstein',
        'lithuania', 'luxembourg', 'malta', 'moldova', 'monaco', 'montenegro', 'netherlands', 'north macedonia', 'norway',
        'poland', 'portugal', 'romania', 'russia', 'san marino', 'serbia', 'slovakia', 'slovenia', 'spain', 'sweden',
        'switzerland', 'turkey', 'ukraine', 'united kingdom', 'vatican city'
    ];


    const isCountryInEurope = () => {
        // console.log("User Input:", userCountry);

        // Capitalize the first letter and lowercase the rest
        const normalizedUserCountry = userCountry.toLowerCase();
        // console.log("Normalized Input:", normalizedUserCountry);

        const isIncluded = europeanCountries.includes(normalizedUserCountry);
        // console.log("Is Included:", isIncluded);

    
        return isIncluded;
    };
    






  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(manufacturerInformationAction(formData, token))

    setFormData({
        projectId,
        isOutsideEU: false,
        hasDistributor: false,
        distributorName: '',
        distributorAddress: '',
        europeanAuthorizedRepName: '',
        europeanAuthorizedRepAddress: '',
        importerName: '',
        importerAddress: '',
        productClass: 'Class I',
        notifiedBodyNumber: '',
    })
  }

  useEffect(() => {
    if(decodedToken){
        dispatch(getCompanyInfoAction(decodedToken.userInfo.companyId, token))
    }
  }, [])

  useEffect(() => {
    if(companySuccess){
        setUserCountry(companyInfo.companyCountry)
    }
  }, [companySuccess])

  useEffect(() => {
    const result = isCountryInEurope();
    setFormData({
        ...formData,
        isOutsideEU: result,
      });
    // You can use the result as needed in your application
}, [companySuccess]);

  const navigate = useNavigate()
  useEffect(() => {
    if(manufacturerSuccess){
        navigate(`/dashboard/create-project/step2/${projectInfo._id}`)
    }

    if(manufacturerFail){
        toast.warning(`${manufacturerFail.message}`)
    }
  }, [manufacturerSuccess, manufacturerFail])

  return (
    <div className='manufactureInfo container'>
        <div className='mb-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>Back</Link>
        </div>
        <HorizontalLinearStepper step={0}/>
        <form onSubmit={handleSubmit}>
            <h2>Manufacturer Information</h2>
            {!companyRequest 
            ?<div>
                    <div>
                        <label>Do You have a Distributor ?</label>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}} >
                            <label >Yes: </label>
                                <input className='mx-1'
                                    type="checkbox"
                                    name="hasDistributor"
                                    checked={formData.hasDistributor}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div style= {{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <label>No: </label>
                                <input className='mx-1'
                                    type="checkbox"
                                    name="hasDistributor"
                                    checked={!formData.hasDistributor}
                                    onChange={() => setFormData({...formData,
                                        hasDistributor: false})}
                                    />
                            </div>
                        </div>
                    </div>
                {formData.hasDistributor &&
                    <div>
                            <label>Distributor Name:</label>
                            <input
                            type="text"
                            name="distributorName"
                            value={formData.distributorName}
                            onChange={handleInputChange}
                            required
                            />
                            <label>Distributor Address:</label>
                            <input
                            type="text"
                            name="distributorAddress"
                            value={formData.distributorAddress}
                            required
                            onChange={handleInputChange}
                            />
                    </div>
                    }
                    {formData.isOutsideEU && (
                        <div>
                        <label>European Authorized Representative Name:</label>
                        <input
                            type="text"
                            name="europeanAuthorizedRepName"
                            value={formData.europeanAuthorizedRepName}
                            onChange={handleInputChange}
                            required={formData.isOutsideEU ? true : false}
                        />
                        <label>European Authorized Representative Address:</label>
                        <input
                            type="text"
                            name="europeanAuthorizedRepAddress"
                            value={formData.europeanAuthorizedRepAddress}
                            onChange={handleInputChange}
                        />
                        <label>Importer Name:</label>
                        <input
                            type="text"
                            name="importerName"
                            value={formData.importerName}
                            onChange={handleInputChange}
                            required={formData.isOutsideEU? true : false}
                        />
                        <label>Importer Address:</label>
                        <input
                            type="text"
                            name="importerAddress"
                            value={formData.importerAddress}
                            onChange={handleInputChange}
                            required={formData.isOutsideEU ? true : false}
                        />
                        </div>
                    )}
                    <div>
                        <label>What is the class of your product?</label>
                        <select
                        name="productClass"
                        value={formData.productClass}
                        onChange={handleInputChange}
                        >
                        <option value="Class I">Class I</option>
                        <option value="Class Is (sterile)">Class Is (sterile)</option>
                        <option value="Class Im (with a measuring function)">Class Im (with a measuring function)</option>
                        <option value="Class Ir (surgical reusable device)">Class Ir (surgical reusable device)</option>
                        <option value="Class IIa">Class IIa</option>
                        <option value="Class IIb">Class IIb</option>
                        <option value="Class III">Class III</option>
                        </select>
                    </div>
                    {formData.productClass !== 'Class I' && (
                        <div>
                        <label>Notified Body Number*:</label>
                        <input
                            type="text"
                            name="notifiedBodyNumber"
                            value={formData.notifiedBodyNumber}
                            onChange={handleInputChange}
                            required={formData.productClass !== 'Class I' ? true : false}
                        />
                        </div>
                    )}
                {!manufacturerRequest
                ? <div style={{width:"100%", display:'flex', justifyContent:"center", alignItems:'center', marginTop:"30px"}}>
                        <button style={{padding:'4px 20px', borderRadius:'4px', backgroundColor:'#011D41', color:'#fff', fontWeight:"600"}}>Save</button>
                    </div>
                    : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                        <RotatingLines
                            strokeColor="#011d41"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible={true}
                            /> 
                    </div>  
                    }
            </div>
            : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
            <RotatingLines
                strokeColor="#011d41"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
                /> 
        </div>  }
        </form>

    </div>
  );
};

export default ManufacturerInfoComponent;
