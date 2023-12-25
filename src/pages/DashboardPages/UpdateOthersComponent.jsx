import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { getProjectAction, othersAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';

const UpdateOthersComponent = () => {
  const {projectId} = useParams()
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {others, getProject} = useSelector(state => state);
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

  const dispatch = useDispatch()
  const navigate = useNavigate()


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
    associatedWithIndividualPatient: false,
    patientNumber: '',
    patientName: '',
    healthCareCentreName: '',
    healthCareCentreAddress: '',
    doctorName: '',
    date: currentDate || (new Date(Date.now())).toLocaleDateString('en-GB'),
    addWebsite: false,
    website: '',
    translationActivity: false,
    translationEntityName: '',
    translationEntityAddress: '',
    modificationToPackaging: false,
    repackagingEntityName: '',
    repackagingEntityAddress: '',
    reprocessedDevice: false,
    reprocessingCycles: 0,
    reprocessingLimitation: '',
    customMadeDevice: false,
    clinicalInvestigationOnly: false,
    containsCMRSubstances: false,
    cmrSubstancesList: '',
    intendedForIntroduction: false,
    qualitativeComposition: '',
    quantitativeInformation: '',
    quantity: 0,
  });
  useEffect(() => {
    // Set formData with existing project information
    setFormData({
      isUpdate: true,
      projectId,
      associatedWithIndividualPatient: projectInformation?.labelData?.associatedWithIndividualPatient || false,
      patientNumber:projectInformation?.labelData?.patientNumber || '',
      patientName: projectInformation?.labelData?.patientName || '',
      healthCareCentreName: projectInformation?.labelData?.healthCareCentreName || '',
      healthCareCentreAddress: projectInformation?.labelData?.healthCareCentreAddress || '',
      doctorName:  projectInformation?.labelData?.doctorName || '',
      date: currentDate || (new Date(Date.now())).toLocaleDateString('en-GB'),
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
      reprocessingLimitation: projectInformation?.labelData?.reprocessingLimitation || '',
      customMadeDevice: projectInformation?.labelData?.customMadeDevice || false,
      clinicalInvestigationOnly: projectInformation?.labelData?.clinicalInvestigationOnly || false,
      containsCMRSubstances: projectInformation?.labelData?.containsCMRSubstances || false,
      cmrSubstancesList: projectInformation?.labelData?.cmrSubstancesList || '',
      intendedForIntroduction: projectInformation?.labelData?.intendedForIntroduction || false,
      qualitativeComposition: projectInformation?.labelData?.qualitativeComposition || '',
      quantitativeInformation: projectInformation?.labelData?.quantitativeInformation || '',
      quantity: projectInformation?.labelData?.quantity || 0,
    });
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
        // navigate(`/dashboard/project-information/${projectInfo._id}`)
        toast.success(`updated success`)
    }

    if(othersFail){
        toast.warning(`${othersFail.message}`)
    }
  }, [othersSuccess, othersFail])

  return (
    <div className="container others">
      {/* <HorizontalLinearStepper step={10} /> */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
            <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>Back</Link>
        </div>
      <form className="others-form" onSubmit={handleSubmit}>
        <h2>Others</h2>

        {/* <div className="form-group">
          <label>1- Is your medical device associated with an individual patient?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="associatedWithIndividualPatient"
                value="Yes"
                checked={formData.associatedWithIndividualPatient}
                onChange={() => handleCheckboxChange('associatedWithIndividualPatient', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="associatedWithIndividualPatient"
                value="No"
                checked={!formData.associatedWithIndividualPatient}
                onChange={() => handleCheckboxChange('associatedWithIndividualPatient', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.associatedWithIndividualPatient && (
          <div>
            <div className="form-group">
              <label>Patient Number:</label>
              <input
                type="text"
                className="form-control"
                name="patientNumber"
                value={formData.patientNumber}
                required={formData.associatedWithIndividualPatient ? true : false}
                onChange={(e) => handleInputChange('patientNumber', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Patient Name:</label>
              <input
                type="text"
                className="form-control"
                name="patientName"
                value={formData.patientName}
                required={formData.associatedWithIndividualPatient ? true : false}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Health Care Centre Name*:</label>
              <input
                type="text"
                className="form-control"
                name="healthCareCentreName"
                value={formData.healthCareCentreName}
                required={formData.associatedWithIndividualPatient ? true : false}
                onChange={(e) => handleInputChange('healthCareCentreName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Health Care Centre Address:</label>
              <input
                type="text"
                className="form-control"
                name="healthCareCentreAddress"
                value={formData.healthCareCentreAddress}
                required={formData.associatedWithIndividualPatient ? true : false}
                onChange={(e) => handleInputChange('healthCareCentreAddress', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Doctor Name:</label>
              <input
                type="text"
                className="form-control"
                name="doctorName"
                required={formData.associatedWithIndividualPatient ? true : false}
                value={formData.doctorName}
                onChange={(e) => handleInputChange('doctorName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date*:</label>
              <input
                type="date"
                className="form-control"
                required={formData.associatedWithIndividualPatient ? true : false}
                name="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            <p className='form-group-paragraph'>
                *Mention the health care centre where the medical information about the patient may be found.<br/>
                *Mention the date that information was entered or a medical procedure took place.
            </p>
          </div>

        )} */}

        <div className="form-group">
          <label>- Would you add a website where the patients can obtain additional information on your medical product?</label>
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
          <label>- Has the original medical device information undergone a translation that supplements or replaces the original information? (Choose YES only if this translation activity was undertaken by someone other than the manufacturer)</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="translationActivity"
                value="Yes"
                checked={formData.translationActivity}
                onChange={() => handleCheckboxChange('translationActivity', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="translationActivity"
                value="No"
                checked={!formData.translationActivity}
                onChange={() => handleCheckboxChange('translationActivity', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.translationActivity && (
          <div>
            <div className="form-group">
              <label>Entity responsible for the translation activity name:</label>
              <input
                type="text"
                className="form-control"
                name="translationEntityName"
                required={formData.translationActivity ? true : false}
                value={formData.translationEntityName}
                onChange={(e) => handleInputChange('translationEntityName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Entity responsible for the translation activity Address:</label>
              <input
                type="text"
                className="form-control"
                name="translationEntityAddress"
                required={formData.translationActivity ? true : false}
                value={formData.translationEntityAddress}
                onChange={(e) => handleInputChange('translationEntityAddress', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>- Has a modification to the original medical device packaging configuration occurred? (Choose YES only if this repackaging activity was undertaken by someone other than the manufacturer)</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="modificationToPackaging"
                value="Yes"
                checked={formData.modificationToPackaging}
                onChange={() => handleCheckboxChange('modificationToPackaging', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="modificationToPackaging"
                value="No"
                checked={!formData.modificationToPackaging}
                onChange={() => handleCheckboxChange('modificationToPackaging', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.modificationToPackaging && (
          <div>
            <div className="form-group">
              <label>Entity responsible for the repackaging activity Name:</label>
              <input
                type="text"
                className="form-control"
                name="repackagingEntityName"
                required={formData.modificationToPackaging ? true : false}
                value={formData.repackagingEntityName}
                onChange={(e) => handleInputChange('repackagingEntityName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Entity responsible for the repackaging activity Address:</label>
              <input
                type="text"
                className="form-control"
                required={formData.modificationToPackaging ? true : false}
                name="repackagingEntityAddress"
                value={formData.repackagingEntityAddress}
                onChange={(e) => handleInputChange('repackagingEntityAddress', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>- Is your device a single-use device that has been reprocessed?</label>
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
                type="text"
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
          <label>- Is your product a Custom made device?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="customMadeDevice"
                value="Yes"
                checked={formData.customMadeDevice}
                onChange={() => handleCheckboxChange('customMadeDevice', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="customMadeDevice"
                value="No"
                checked={!formData.customMadeDevice}
                onChange={() => handleCheckboxChange('customMadeDevice', 'No')}
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>- Is your device intended for clinical investigation only?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="clinicalInvestigationOnly"
                value="Yes"
                checked={formData.clinicalInvestigationOnly}
                onChange={() => handleCheckboxChange('clinicalInvestigationOnly', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="clinicalInvestigationOnly"
                value="No"
                checked={!formData.clinicalInvestigationOnly}
                onChange={() => handleCheckboxChange('clinicalInvestigationOnly', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>- Does your medical device contain CMR (Carcinogenic, Mutagenic or Reprotoxic) substances of category 1A or 1B or substances having endocrine-disrupting properties in a concentration above 0.1 % (w/w)?</label>
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
              <textarea
                className="form-control"
                required={formData.containsCMRSubstances ? true : false}
                name="cmrSubstancesList"
                value={formData.cmrSubstancesList}
                onChange={(e) => handleInputChange('cmrSubstancesList', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>- Is your product composed of substances or combinations of substances that are intended to be introduced into the human body via a body orifice or applied to the skin and that are absorbed by or locally dispersed in the human body?</label>
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

          <div className="form-group">
            <label>- Quantity of product per packaging:</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </div>
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

export default UpdateOthersComponent;
