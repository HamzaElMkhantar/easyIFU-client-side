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
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateProductInfoComponent = () => {
    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {productInformation, uploadManufacturerLogo, getProject} = useSelector(state => state);
    const {productRequest, productSuccess, productFail, projectInfo} = productInformation;
    const {uploadLogoRequest, uploadLogoSuccess, uploadLogoFail} = uploadManufacturerLogo;


    const [numbersData, setNumbersData] = useState('')
    const [manufacturerLogo, setManufacturerLogo] = useState('')
    const [formData, setFormData] = useState({
        projectId,
        isUpdate: true,
        productName: '' ,
        intendedPurpose: '',
        productType: '',
        udiDI: '',
        udiFormat: '',
        udiType: '',
        useByDate: '',
        hasUseByDate: false,
        haDateOfManufacture: false,
        hasCountryOfManufacture: false,
        countryOfManufacture: '',
        canBeUsedIfDamaged: false,
        haSerialNumber: false,
        hasLotNumber: false ,
        catalogueNumber: '',
        modelNumber: '',
        packagingContents: [] ,
        addManufacturerLogo: false,
        quantity: 0,

    });


    //  dynamic input
    const [serviceList, setServiceList] = useState([""]);

    const handleServiceChange = (e, index) => {
    const { value } = e.target;
    const list = [...serviceList];
    list[index] = value;
    setServiceList(list);
    setFormData((prevData) => ({
        ...prevData,
        packagingContents: list
    }));
    };
    
    const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    setFormData((prevData) => ({
        ...prevData,
        packagingContents: list
    }));
    };
    
    const handleServiceAdd = () => {
    setServiceList([...serviceList, ""]);
    setFormData((prevData) => ({
        ...prevData,
        packagingContents: serviceList,
    }));
    };


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
            countryOfManufacture: projectInformation?.labelData?.countryOfManufacture || '',
            hasCountryOfManufacture: projectInformation?.labelData?.hasCountryOfManufacture || false,
            serialNumber: projectInformation?.labelData?.serialNumber || '',
            haSerialNumber: projectInformation?.labelData?.haSerialNumber || false,
            LOTNumber: projectInformation?.labelData?.LOTNumber || '',
            hasLotNumber: projectInformation?.labelData?.hasLotNumber || false ,
            catalogueNumber: projectInformation?.labelData?.catalogueNumber || '',
            modelNumber: projectInformation?.labelData?.modelNumber || '',
            // packagingContents: projectInformation?.labelData?.packagingContents || [''],
            addManufacturerLogo: projectInformation?.labelData?.addManufacturerLogo || false,
            quantity: projectInformation?.labelData?.quantity || 0,
            canBeUsedIfDamaged: projectInformation?.labelData?.canBeUsedIfDamaged || false,
        })

        setServiceList(projectInformation?.labelData?.packagingContents.length > 0 ? projectInformation?.labelData?.packagingContents : [''])
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
    const handleRadioButtonChange = (e) => {
        const {name, value, checkbox} = e.target;
        const serialAndLotNumbers = [
            'haSerialNumber',
            'hasLotNumber',
          ];
      
        if (serialAndLotNumbers.includes(name)) {
            console.log(name, value, serialAndLotNumbers.includes(name))
          // If the checkbox is in the exclusive list, set its value to true and others to false
          setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData };
      
            serialAndLotNumbers.forEach((checkbox) => {
              if (checkbox !== name) {
                updatedFormData[checkbox] = false;
              }
            });
      
            updatedFormData[name] = value === 'Yes';
      
            return updatedFormData;
          });

          return;
        } 
      };
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(productInformationAction(formData, token))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(productSuccess){
            toast.success(`Update Success`)
        }

        if(productFail){
            toast.warning(`${productFail.message}`)
        }
    }, [productSuccess, productFail])


  return (
    <div className="container productInfo">
        <div className='mb-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
        <form className='productInfo-form' onSubmit={handleSubmit}>
            <h2>Product Information</h2>            
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                    <label className='question-bg mb-1'>- Product Name*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Intended purpose of the device:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="intendedPurpose"
                    value={formData.intendedPurpose}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Is your product a*:</label>
                    <select
                        className="form-control"
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Medical device">Medical device</option>
                        <option value="In Vitro Diagnostic (IVD) Medical Device">In Vitro Diagnostic (IVD) Medical Device</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className='question-bg'>- Insert the UDI of the device*:</label>
                </div>
                <div  className="form-group">
                    <label>Choose UDI Format :</label>
                    <div style={{display:'flex'}}>

                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "GS1" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'GS1' })}
                        />
                        <label className="form-check-label mx-3">GS1</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "HIBCC" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'HIBCC' })}
                        />
                    <label className="form-check-label mx-3">HIBCC</label>

                    </div>
                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "ICCBBA" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'ICCBBA' })}
                        />
                        <label className="form-check-label mx-3">ICCBBA</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
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
                    <label className='question-bg mb-1'>- Use-by Date (how many month):</label>
                    <input
                        type="number"
                        className="form-control"
                        name="useByDate"
                        min="0"
                        onChange={handleInputChange}
                    />
                    <label>{formData.useByDate}</label>
                </div>
           
                <div className="form-group">
                    <label className='question-bg mb-1'>- Has Date of Manufacture ? (Optional):</label>
                    <div className="form-group" style={{display:'flex'}}>
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
                </div>
                
                </div>


                <div className="col-md-6">
                
                <div className="form-group">
                    <label className='question-bg mb-1'>- Do you want to write the country of origin? :</label>
                    <div className="form-group" style={{display:'flex'}}>
                        <div style={{display:'flex'}}>
                            <input style={{width:''}}
                            type="CheckBox"
                            className="form-check-input"
                            checked={formData.hasCountryOfManufacture ? true : false}
                            onClick={() => setFormData({...formData, hasCountryOfManufacture: true})}
                            />
                            <label className="form-check-label mx-3">Yes</label>
                        </div>
                        <div style={{display:'flex'}}>
                        <input style={{width:''}}
                            type="CheckBox"
                            required={formData.hasCountryOfManufacture ? false : true}
                            className="form-check-input"
                            checked={formData.hasCountryOfManufacture ? false : true}
                            onClick={() => setFormData({...formData, hasCountryOfManufacture: false})}
                            />
                            <label className="form-check-label mx-3">No</label>

                        </div>
                </div>
                </div>
               {formData.hasCountryOfManufacture &&
                    <div className="form-group">
                        <label>Two Or tree letter of the Country Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="countryOfManufacture"
                                maxLength="3"
                                value={formData.countryOfManufacture}
                                onChange={(e) => setFormData({...formData, countryOfManufacture: (e.target.value).toUpperCase() })}
                            />
                    </div>}
                    <div className="form-group">
                            <label className='question-bg mb-1'>- Can your product be used if the package is damaged ?</label>
                            <div style={{display:'flex'}}>
                                <div className="form-check" >
                                <label className="form-check-label mx-2">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="Yes"
                                    checked={formData.canBeUsedIfDamaged}
                                    onClick={() => setFormData({...formData, canBeUsedIfDamaged: true})}
                                />
                                </div>
                                <div className="form-check mx-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="No"
                                    checked={!formData.canBeUsedIfDamaged}
                                    onClick={() => setFormData({...formData, canBeUsedIfDamaged: false})}
                                />
                                <label className="form-check-label mx-2">No</label>
                                </div>
                            </div>
                    </div>
                    <div className="form-group">
                        <label className='question-bg mb-1'>- Quantity of product per packaging:</label>
                        <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        />
                    </div>
                <p className='form-group-paragraph' style={{fontSize:'14px'}}>In case where there is no specified expiration date, you can add the manufacture date*</p>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Choose one :</label>
                    <div style={{display:'flex'}}>
                    
                   <label className="form-check-label mx-3" htmlFor="lotNumber">LOT Number:</label>
                    <div style={{display:'flex', gridGap:'10px'}}>
                        <div className="form-check">
                        <label className="form-check-label">Yes</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasLotNumber"
                            value="Yes"
                            checked={formData.hasLotNumber}
                            onChange={handleRadioButtonChange}
                        />
                        </div>
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasLotNumber"
                            value="No"
                            checked={!formData.hasLotNumber}
                            onChange={handleRadioButtonChange}
                        />
                        <label className="form-check-label">No</label>
                        </div>
                    </div>
 


                    </div>
                    <div style={{display:'flex'}}>
                    
                    <label className="form-check-label mx-3" htmlFor="serialNumber">Serial Number: </label>

                    <div style={{display:'flex', gridGap:'10px'}}>
                        <div className="form-check">
                        <label className="form-check-label">Yes</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="haSerialNumber"
                            value="Yes"
                            checked={formData.haSerialNumber}
                            onChange={handleRadioButtonChange}
                        />
                        </div>
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="haSerialNumber"
                            value="No"
                            checked={!formData.haSerialNumber}
                            onChange={handleRadioButtonChange}
                        />
                        <label className="form-check-label">No</label>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className='question-bg mb-1'>- Catalogue Number (Ref)*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="catalogueNumber"
                    value={formData.catalogueNumber}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Model Number:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="service" className='question-bg mb-1'>- Packaging contents (if necessary):</label>
                    {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division mb-1" style={{display:'flex',}}>
                        <input
                            name="service"
                            style={{width:'50%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                            type="text"
                            id="service"
                            value={singleService}
                            placeholder={`Content ${index + 1}`}
                            onChange={(e) => handleServiceChange(e, index)}
                        />
                        {serviceList.length !== 1 && (
                                    <button
                                        type="button"
                                        style={{backgroundColor:'#FBB8B8', borderRadius:'6px'}}
                                        onClick={() => handleServiceRemove(index)}
                                        className="remove-btn mx-2"
                                        >
                                        <span><DeleteIcon style={{color:'#2D2D2E'}} /></span>
                                    </button>
                                )}
                        </div>
                        <div className="second-division">
       
                        {serviceList.length - 1 === index && (
                            <button
                                    type="button"
                                    style={{borderRadius:'5px', backgroundColor:'#79D4A3', fontSize:'14px'}}
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                >
                                <span>Add Content</span>
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
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
