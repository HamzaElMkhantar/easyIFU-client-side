import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectAction, productInformationAction, uploadManufacturerLogoAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const UpdateProductInfoComponent = () => {
    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {productInformation, uploadManufacturerLogo, getProject} = useSelector(state => state);
    const {productRequest, productSuccess, productFail, projectInfo} = productInformation;
    const {uploadLogoRequest, uploadLogoSuccess, uploadLogoFail} = uploadManufacturerLogo;

    const [numbersData, setNumbersData] = useState('')
    const [manufacturerLogo, setManufacturerLogo] = useState('')


      // get prev project info
    const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;
    const [projectInformation, setProjectInformation] = useState({});
    useEffect(() =>{
        dispatch(getProjectAction(projectId, token))
    }, [])
    useEffect(() =>{
        if(getProjectSuccess){
        setProjectInformation(project)
        }
    }, [getProjectSuccess])
    
    const [formData, setFormData] = useState({
        isUpdate: true,
        projectId,
        productName: '',
        intendedPurpose: '',
        productType: '',
        udiDI: '',
        udiFormat: '',
        udiType: '',
        useByDate: '',
        hasUseByDate: false,
        dateOfManufacture: '',
        haDateOfManufacture: false,
        serialNumber: '',
        haSerialNumber: false,
        LOTNumber: '',
        hasLotNumber: false ,
        catalogueNumber: '',
        modelNumber: '',
        packagingContents: '',
        addManufacturerLogo: false,
    });

    useEffect(() =>{
        setFormData({
            isUpdate: true,
            projectId,
            productName: projectInformation?.labelData?.productName ||'',
            intendedPurpose: projectInformation?.labelData?.intendedPurpose || '',
            productType: projectInformation?.labelData?.productType || '',
            udiDI: projectInformation?.labelData?.udiDI || '',
            udiFormat: projectInformation?.labelData?.udiFormat || '',
            udiType: projectInformation?.labelData?.udiType || '',
            useByDate: projectInformation?.labelData?.useByDate || '',
            hasUseByDate: projectInformation?.labelData?.hasUseByDate || false,
            dateOfManufacture: projectInformation?.labelData?.dateOfManufacture || '',
            haDateOfManufacture: projectInformation?.labelData?.haDateOfManufacture || false,
            serialNumber: projectInformation?.labelData?.serialNumber || '',
            haSerialNumber: projectInformation?.labelData?.haSerialNumber || false,
            LOTNumber: projectInformation?.labelData?.LOTNumber || '',
            hasLotNumber: projectInformation?.labelData?.hasLotNumber || false ,
            catalogueNumber: projectInformation?.labelData?.catalogueNumber || '',
            modelNumber: projectInformation?.labelData?.modelNumber || '',
            // packagingContents: projectInformation?.labelData?.packagingContents || '',
            addManufacturerLogo: projectInformation?.labelData?.addManufacturerLogo || false,
        })
    }, [projectInformation])


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;

        // Handle useByDate separately and format it as "mm-dd-yyyy"
        if (name == 'useByDate' && newValue !== '') {
            const monthsToAdd = parseInt(newValue, 10);
    
            if (isNaN(monthsToAdd) || monthsToAdd <= 0) {
            alert('Please enter a valid positive number of months.');
            return;
            }
    
            const currentDate = new Date();
            const futureDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsToAdd));
    
            // Format the date as "mm-dd-yyyy"
            const day = String(futureDate.getDate()).padStart(2, '0');
            const month = String(futureDate.getMonth() + 1).padStart(2, '0');
            const year = futureDate.getFullYear();

            // Format the date as "mm-dd-yyyy"
            newValue = `${year}-${month}-${day}`;
        }
        if(name == "manufacturerLogo"){
            newValue = e.target.files[0]
        }
        if (name === 'packagingContents') {
            // Update the state
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
            return;
        }
        setFormData({
            ...formData,
            [name]: newValue,
        });

        
    }

    console.log(formData)
    const dispatch = useDispatch()
    const formDataObject = new FormData();
    formDataObject.append('manufacturerLogo', formData.manufacturerLogo);
    formDataObject.append('projectId', projectId);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData)

        if (formData.packagingContents) {
            // Split the input string into an array using "-" as the delimiter
            const packagingContentsArray = formData.packagingContents.split('-').map((val) => val.trim());
        
            // Update the state
            setFormData({
                ...formData,
                packagingContents: packagingContentsArray
              });
          }

          if (formData.packagingContents) {
            // Split the input string into an array using "-" as the delimiter
            const packagingContentsArray = formData.packagingContents
              .split('-')
              .map((val) => val.trim())
              .filter((val) => val !== ''); // Remove empty values
        
            // Update the state

            setFormData({
                ...formData,
                packagingContents: packagingContentsArray
              });
          }

 

       await dispatch(productInformationAction(formData, token))
    //    await dispatch(uploadManufacturerLogoAction(formDataObject, token))

    }

    const navigate = useNavigate()
    useEffect(() => {
        if(productSuccess){
            navigate(`/dashboard/project-information/${projectInfo._id}`)
            toast.success(`updated success`)
            setFormData({...formData, packagingContents: ''})
        }

        if(productFail){
            toast.warning(`${productFail.message}`)
        }
    }, [productSuccess, productFail])

  return (
    <div className="container productInfo">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
            {/* <Link style={{height:'35px'}} to={`/dashboard/create-project/step1/65764c7df80c7c51796e9bda`} className='label-info-link'> Back</Link> */}
            <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
        {/* <HorizontalLinearStepper step={1}/> */}
        <form className='productInfo-form' onSubmit={handleSubmit}>
            <h2>Product Information</h2>            
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                    <label>1- Product Name*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>2- Intended purpose of the device:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="intendedPurpose"
                    value={formData.intendedPurpose}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>3- Is your product a*:</label>
                    <select
                        className="form-control"
                        name="productType"
                        value={formData.productType}
                        // required
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Medical device">Medical device</option>
                        <option value="In Vitro Diagnostic (IVD) Medical Device">In Vitro Diagnostic (IVD) Medical Device</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>4- Insert the UDI of the device*:</label>
                </div>
                <div  className="form-group">
                    <label>Choose UDI Format :</label>
                    <div style={{display:'flex'}}>

                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        // required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "GS1" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'GS1' })}
                        />
                        <label className="form-check-label mx-3">GS1</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        // required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "HIBCC" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'HIBCC' })}
                        />
                    <label className="form-check-label mx-3">HIBCC</label>

                    </div>
                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        // required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "ICCBBA" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'ICCBBA' })}
                        />
                        <label className="form-check-label mx-3">ICCBBA</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        // required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "IFA" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'IFA' })}
                        />
                    <label className="form-check-label mx-3">IFA</label>

                    </div>
                    </div>
                </div>

                {formData.udiFormat == "GS1" &&
                    <div  className="form-group">
                        <label>Choose UDI Format :</label>
                        <div style={{display:'flex'}}>
                            
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == 'GS1 (1D Bar Code)' ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (1D Bar Code)' })}
                                />
                                <label className="form-check-label mx-3">GS1 (1D Bar Code)</label>
                            </div>
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={ formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == "GS1 (Separate Bar Code)" ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (Separate Bar Code)' })}
                                />
                                <label className="form-check-label mx-3">GS1 (Separate Bar Code)</label>
        
                            </div>
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == 'GS1 (Data Matrix)' ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (Data Matrix)' })}
                                />
                            <label className="form-check-label mx-3">GS1 (Data Matrix)</label>
        
                            </div>
                        </div>
                    </div>
                }

                <div className="form-group">
                    <label>UDI-DI:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="udiDI"
                    value={formData.udiDI}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>5-how many month(Use-by Date):</label>
                    <input
                    type="number"
                    className="form-control"
                    name="useByDate"
                    onChange={handleInputChange}
                    />
                    <label>{formData.useByDate}</label>
                </div>
                </div>
                <div className="col-md-6">
                
                <div className="form-group">
                    <label>6- Has Date of Manufacture ? (Optional):</label>
                    <div className="form-group">
                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        className="form-check-input"
                        checked={formData.haDateOfManufacture ? true : false}
                        onClick={() => setFormData({...formData, haDateOfManufacture: true})}
                        />
                        <label className="form-check-label mx-3">Yes</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        required={formData.haDateOfManufacture ? false : true}
                        className="form-check-input"
                        checked={formData.haDateOfManufacture ? false : true}
                        onClick={() => setFormData({...formData, haDateOfManufacture: false})}
                        />
                    <label className="form-check-label mx-3">No</label>

                    </div>
                </div>
                    {/* <input
                    type="text"
                    className="form-control"
                    name="dateOfManufacture"
                    placeholder='mm-dd-yyyy'
                    value={formData.dateOfManufacture}
                    onChange={handleInputChange}
                    /> */}
                </div>
                <p className='form-group-paragraph'>In case where there is no specified expiration date, you can add the manufacture date*</p>
                <div className="form-group">
                    <label>7- choose one :</label>
                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        // required={numbersData == "" ? true : false}
                        className="form-check-input"
                        checked={formData.hasLotNumber}
                        onClick={() => setFormData({...formData, hasLotNumber: !formData.hasLotNumber})}
                        />
                        <label className="form-check-label mx-3">LOT Number</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        // required={numbersData == "" ? true : false}
                        className="form-check-input"
                        checked={formData.haSerialNumber}
                        onClick={() => setFormData({...formData, haSerialNumber: !formData.haSerialNumber})}
                        />
                    <label className="form-check-label mx-3">Serial Number</label>

                    </div>
                </div>
                {/* {numbersData == "Serial" &&
                <div className="form-group">
                    <label>Serial Number*:</label>
                    <input
                    type="text"
                    required={numbersData == "Serial" && true}
                    className="form-control"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    />
                </div>}

                { numbersData == "LOT" &&
                <div className="form-group">
                    <label>LOT Number*:</label>
                    <input
                    type="text"
                    required={numbersData == "LOT" && true}
                    className="form-control"
                    name="LOTNumber"
                    value={formData.LOTNumber}
                    onChange={handleInputChange}
                    />
                </div>} */}


                <div className="form-group">
                    <label>8- Catalogue Number (Ref)*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="catalogueNumber"
                    value={formData.catalogueNumber}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>9- Model Number:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-0">
                    <label>10- Packaging contents (if necessary):</label>
                    <input
                    type="text"
                    className="form-control"
                    name="packagingContents"
                    placeholder='content1 - content2 - ....'
                    value={formData.packagingContents}
                    onChange={handleInputChange}
                    />
                </div>
                <div className='px-2'>
                {projectInformation?.labelData?.packagingContents.map((item, index) => {
                    return (
                        <p style={{color:'black', fontSize:'14px'}}>{index = projectInformation?.labelData?.packagingContents.length ? item  : item + " - " }</p>
                    )
                })}
                </div>
                {/* <div className="form-group">
                    <label>11- Do you want to add your manufacturer logo in the label ?</label>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="addManufacturerLogo"
                        checked={formData.addManufacturerLogo}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label">Yes</label>
                    </div>
                </div> */}
                {/* {formData.addManufacturerLogo && (
                    <div className="form-group">
                    <label>Insert your logo:</label>
                    <input
                        type="file"
                        className="form-control"
                        name="manufacturerLogo"
                        onChange={handleInputChange}
                    />
                    </div>
                )} */}
                </div>
            </div>
           {!productRequest 
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
            </div>  }
        </form>
    </div>
  );
};

export default UpdateProductInfoComponent;