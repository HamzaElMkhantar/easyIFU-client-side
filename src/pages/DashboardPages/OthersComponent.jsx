import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { othersAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { getLabelAction } from '../../redux/actions/labelActions';
import { getProductByIdAction } from '../../redux/actions/productActions';


const OthersComponent = () => {
  const {projectId} = useParams()
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {others, productById} = useSelector(state => state);
  const {othersRequest, othersSuccess, othersFail, projectInfo} = others;


  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const fetchCurrentDate = async () => {
      try {
        const response = await fetch('http://worldclockapi.com/api/json/utc/now');
        const data = await response.json();
        const rawDate = new Date(data.currentDateTime);
        const formattedDate = rawDate.toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy format
        setCurrentDate(formattedDate);
      } catch (error) {
        setCurrentDate(null);
      }
    };

    fetchCurrentDate();
  }, []);


  //  dynamic input
  const [serviceList, setServiceList] = useState([""]);

  const handleServiceChange = (e, index) => {
    const { value } = e.target;
    const list = [...serviceList];
    list[index] = value;
    setServiceList(list);
    setFormData((prevData) => ({
        ...prevData,
        cmrSubstancesList: list
    }));
  };
  
  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    setFormData((prevData) => ({
      ...prevData,
      cmrSubstancesList: list
    }));
  };
  
  const handleServiceAdd = () => {
    setServiceList([...serviceList, ""]);
    setFormData((prevData) => ({
        ...prevData,
        cmrSubstancesList: serviceList,
    }));
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const [formData, setFormData] = useState({
    labelId: projectId,
    isUpdate: false,
    associatedWithIndividualPatient: false,
    hasPatientNumber: false,
    patientNumber: '',
    hasPatientName: false,
    patientName: '',
    hasHealthCareCenterNameAndAddress: false,
    healthCareCentreName: '',
    healthCareCentreAddress: '',
    hasDoctorName: false,
    doctorName: '',
    date: currentDate || (new Date(Date.now())).toLocaleDateString('en-GB'),
    addWebsite: false,
    website: '',
    reprocessedDevice: false,
    reprocessingCycles: 0,
    reprocessingLimitation: 0,
    containsCMRSubstances: false,
    cmrSubstancesList: [],
    intendedForIntroduction: false,
    qualitativeComposition: '',
    quantitativeInformation: ''
  });

  // get prev label info
  const {productByIdRequest, productByIdSuccess, productByIdFail, productByIdData} = productById;
  const [projectInformation, setProjectInformation] = useState({});
  useEffect(() =>{
    dispatch(getProductByIdAction(projectId, token))
  }, [])
  useEffect(() =>{
    if(productByIdSuccess){
      setProjectInformation(productByIdData)
    }
  }, [productByIdSuccess])

  useEffect(() => {
    // Set formData with existing project information
    setFormData({
      isUpdate: false,
      labelId: projectId,
      associatedWithIndividualPatient: projectInformation?.labelData?.associatedWithIndividualPatient || false,
      hasPatientNumber: projectInformation?.labelData?.hasPatientNumber || false,
      patientNumber:projectInformation?.labelData?.patientNumber || '',
      hasPatientName: projectInformation?.labelData?.hasPatientName || false,
      patientName: projectInformation?.labelData?.patientName || '',
      hasHealthCareCenterNameAndAddress: projectInformation?.labelData?.hasHealthCareCenterNameAndAddress || false,
      healthCareCentreName: projectInformation?.labelData?.healthCareCentreName || '',
      healthCareCentreAddress: projectInformation?.labelData?.healthCareCentreAddress || '',
      hasDoctorName: projectInformation?.labelData?.hasDoctorName || false,
      doctorName:  projectInformation?.labelData?.doctorName || '',
      date: projectInformation?.labelData?.date || (new Date(Date.now())).toLocaleDateString('en-GB'),
      addWebsite: projectInformation?.labelData?.addWebsite || false,
      website: projectInformation?.labelData?.website || '',
      translationActivity: projectInformation?.labelData?.translationActivity || false,
      translationEntityName: projectInformation?.labelData?.translationEntityName || '',
      translationEntityAddress: projectInformation?.labelData?.translationEntityAddress || '',
      modificationToPackaging: projectInformation?.labelData?.modificationToPackaging || false,
      repackagingEntityName: projectInformation?.labelData?.repackagingEntityName || '',
      repackagingEntityAddress: projectInformation?.labelData?.repackagingEntityAddress || '',
      reprocessedDevice: projectInformation?.labelData?.reprocessedDevice || false,
      reprocessingCycles: projectInformation?.labelData?.reprocessingCycles || 0,
      reprocessingLimitation: projectInformation?.labelData?.reprocessingLimitation || 0,
      containsCMRSubstances: projectInformation?.labelData?.containsCMRSubstances || false,
      cmrSubstancesList: projectInformation?.labelData?.cmrSubstancesList || [],
      intendedForIntroduction: projectInformation?.labelData?.intendedForIntroduction || false,
      qualitativeComposition: projectInformation?.labelData?.qualitativeComposition || '',
      quantitativeInformation: projectInformation?.labelData?.quantitativeInformation || '',
      quantity: projectInformation?.labelData?.quantity || 0,
    });

    setServiceList(projectInformation?.labelData?.cmrSubstancesList.length > 0 ? projectInformation?.labelData?.cmrSubstancesList : [''])

  }, [projectInformation])
  const handleCheckboxChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value === 'Yes',
    });
    console.log(formData)
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };



  const handleSubmit = e => {
    e.preventDefault();

    dispatch(othersAction(formData, token))
  }

  useEffect(() => {
    if(othersSuccess){
        navigate(`/dashboard/create-project/step11/${projectInfo._id}`)
    }

    if(othersFail){
        toast.warning(`${othersFail.message}`)
    }
  }, [othersSuccess, othersFail])





  

  return (
    <div className="container others">
        <div className='' style={{display:'flex',
                                  justifyContent:'space-between', 
                                  alignItems:'', width:'100%', 
                                  backgroundColor:'#fff',
                                  height:'',
                                  padding:'30px 5px 0 5px',
                                  borderRadius:'5px'
                                  }}>
            <Link style={{height:'35px'}} to={`/dashboard/create-project/step8/${projectId}`} className='label-info-link'>Back</Link>
                <HorizontalLinearStepper step={9}/>
                <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>escape</Link>
        </div>
      <form className="others-form" onSubmit={handleSubmit}>
        <h2>Others</h2>
        {projectInfo && projectInfo?.customMadeDevice &&
        <>
            <div className="form-group">
                <label className='question-bg mb-1'>- is there any additional patient data?</label>
                <div>
                    <div className="form-check">
                    <label className="form-check-label">Yes</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="associatedWithIndividualPatient"
                        value="Yes"
                        checked={formData.associatedWithIndividualPatient}
                        onChange={() => handleCheckboxChange("associatedWithIndividualPatient", "Yes")}
                    />
                    </div>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="associatedWithIndividualPatient"
                        value="No"
                        checked={!formData.associatedWithIndividualPatient}
                        onChange={() => handleCheckboxChange("associatedWithIndividualPatient", "No")}
                    />
                    <label className="form-check-label">No</label>
                    </div>
                </div>
          </div>

          <div className="form-group">
                <label className='question-bg mb-1'>- Is there a patient Name?</label>
                <div>
                    <div className="form-check">
                    <label className="form-check-label">Yes</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasPatientName"
                        value="Yes"
                        checked={formData.hasPatientName}
                        onChange={() => handleCheckboxChange("hasPatientName", "Yes")}
                    />
                    </div>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasPatientName"
                        value="No"
                        checked={!formData.hasPatientName}
                        onChange={() => handleCheckboxChange("hasPatientName", "No")}
                    />
                    <label className="form-check-label">No</label>
                    </div>
                </div>
          </div>

          <div className="form-group">
                <label className='question-bg mb-1'>- Is there a patient Number?</label>
                <div>
                    <div className="form-check">
                    <label className="form-check-label">Yes</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasPatientNumber"
                        value="Yes"
                        checked={formData.hasPatientNumber}
                        onChange={() => handleCheckboxChange("hasPatientNumber", "Yes")}
                    />
                    </div>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasPatientNumber"
                        value="No"
                        checked={!formData.hasPatientNumber}
                        onChange={() => handleCheckboxChange("hasPatientNumber", "No")}
                    />
                    <label className="form-check-label">No</label>
                    </div>
                </div>
          </div>

          <div className="form-group">
                <label className='question-bg mb-1'>- Is there a Health Care center or doctor?</label>
                <div>
                    <div className="form-check">
                    <label className="form-check-label">Yes</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasDoctorName"
                        value="Yes"
                        checked={formData.hasDoctorName}
                        onChange={() => handleCheckboxChange("hasDoctorName", "Yes")}
                    />
                    </div>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasDoctorName"
                        value="No"
                        checked={!formData.hasDoctorName}
                        onChange={() => handleCheckboxChange("hasDoctorName", "No")}
                    />
                    <label className="form-check-label">No</label>
                    </div>
                </div>
          </div>
        </>
        }


        <div className="form-group">
          <label className='question-bg mb-1'>- Would you add a website where the patients can obtain additional information on your medical product?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="addWebsite"
                value="Yes"
                checked={formData.addWebsite}
                onChange={() => handleCheckboxChange('addWebsite', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="addWebsite"
                value="No"
                checked={!formData.addWebsite}
                onChange={() => handleCheckboxChange('addWebsite', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.addWebsite && (
          <div className="form-group">
            <label>Website:</label>
            <input
              type="text"
              className="form-control"
              name="website"
              required={formData.addWebsite ? true : false}
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label className='question-bg mb-1'>- Is your device a single-use device that has been reprocessed?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="reprocessedDevice"
                value="Yes"
                checked={formData.reprocessedDevice}
                onChange={() => handleCheckboxChange('reprocessedDevice', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="reprocessedDevice"
                value="No"
                checked={!formData.reprocessedDevice}
                onChange={() => handleCheckboxChange('reprocessedDevice', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.reprocessedDevice && (
          <div>
            <div className="form-group">
              <label>Number of reprocessing cycles already performed:</label>
              <input
                type="Number"
                min="0"
                className="form-control"
                required={formData.reprocessedDevice ? true : false}
                name="reprocessingCycles"
                value={formData.reprocessingCycles}
                onChange={(e) => handleInputChange('reprocessingCycles', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Limitation:</label>
              <input
                type="Number"
                min="0"
                className="form-control"
                required={formData.reprocessedDevice ? true : false}
                name="reprocessingLimitation"
                value={formData.reprocessingLimitation}
                onChange={(e) => handleInputChange('reprocessingLimitation', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className='question-bg mb-1'>- Does your medical device contain CMR (Carcinogenic, Mutagenic or Reprotoxic) substances of category 1A or 1B or substances having endocrine-disrupting properties in a concentration above 0.1 % (w/w)?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="containsCMRSubstances"
                value="Yes"
                checked={formData.containsCMRSubstances}
                onChange={() => handleCheckboxChange('containsCMRSubstances', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="containsCMRSubstances"
                value="No"
                checked={!formData.containsCMRSubstances}
                onChange={() => handleCheckboxChange('containsCMRSubstances', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.containsCMRSubstances && (
          <div>
            <div className="form-group">
              <label>List of existing substances:</label>
                  {serviceList.map((singleService, index) => (
                    <div key={index} className="services" style={{display:'flex', flexDirection:'column'}}>
                        <div className="first-division mb-1" style={{display:'flex', width:'80%'}}>
                        <input
                            name="service"
                            style={{width:'100%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                            type="text"
                            id="service"
                            value={singleService}
                            placeholder={`substance ${index + 1}`}
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
                                <span>Add substance</span>
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label className='question-bg mb-1'>- Is your product composed of substances or combinations of substances that are intended to be introduced into the human body via a body orifice or applied to the skin and that are absorbed by or locally dispersed in the human body?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="intendedForIntroduction"
                value="Yes"
                checked={formData.intendedForIntroduction}
                onChange={() => handleCheckboxChange('intendedForIntroduction', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="intendedForIntroduction"
                value="No"
                checked={!formData.intendedForIntroduction}
                onChange={() => handleCheckboxChange('intendedForIntroduction', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.intendedForIntroduction && (
          <div>
            <div className="form-group">
              <label>Qualitative composition of the device:</label>
              <textarea
                className="form-control"
                name="qualitativeComposition"
                required={formData.intendedForIntroduction ? true : false}
                value={formData.qualitativeComposition}
                onChange={(e) => handleInputChange('qualitativeComposition', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Quantitative information on the main constituent:</label>
              <textarea
                className="form-control"
                name="quantitativeInformation"
                required={formData.intendedForIntroduction ? true : false}
                value={formData.quantitativeInformation}
                onChange={(e) => handleInputChange('quantitativeInformation', e.target.value)}
              />
            </div>
          </div>
        )}
          {!othersRequest 
           ? <div style={{width:"100%", display:'flex', justifyContent:"center", alignItems:'center', marginTop:"30px"}}>
                <button type='submit' style={{padding:'4px 20px', borderRadius:'4px', backgroundColor:'#011D41', color:'#fff', fontWeight:"600"}}>Save</button>
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

export default OthersComponent;
