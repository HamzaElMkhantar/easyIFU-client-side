import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectAction, storageAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const UpdateStorageComponent = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {storage, getProject} = useSelector(state => state);
  const {storageRequest, storageSuccess, storageFail, projectInfo} = storage


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
    requiresCarefulHandling: false,
    requiresProtectionFromLight: false,
    requiresProtectionFromHeatAndRadioactiveSources: false,
    requiresProtectionFromMoisture: false,
    hasLowerLimitOfTemperature: false,
    lowerTemperatureLimit: '',
    hasUpperLimitOfTemperature: false,
    upperTemperatureLimit: '',
    hasHumidityRange: false,
    humidityMin: '',
    humidityMax: '',
    hasAtmosphericPressureRange: false,
    atmosphericPressureMin: '',
    atmosphericPressureMax: '',
  });

  useEffect(() => {
    // Set formData with existing project information
    setFormData({
      isUpdate: true,
      projectId,
      requiresCarefulHandling: projectInformation?.labelData?.requiresCarefulHandling || false,
      requiresProtectionFromLight: projectInformation?.labelData?.requiresProtectionFromLight || false,
      requiresProtectionFromHeatAndRadioactiveSources: projectInformation?.labelData?.requiresProtectionFromHeatAndRadioactiveSources || false,
      requiresProtectionFromMoisture: projectInformation?.labelData?.requiresProtectionFromMoisture || false,
      hasLowerLimitOfTemperature: projectInformation?.labelData?.hasLowerLimitOfTemperature || false,
      lowerTemperatureLimit: projectInformation?.labelData?.lowerTemperatureLimit || '',
      hasUpperLimitOfTemperature: projectInformation?.labelData?.hasUpperLimitOfTemperature || false,
      upperTemperatureLimit: projectInformation?.labelData?.upperTemperatureLimit || '',
      hasHumidityRange: projectInformation?.labelData?.hasHumidityRange || false,
      humidityMin: projectInformation?.labelData?.humidityMin || '',
      humidityMax: projectInformation?.labelData?.humidityMax || '',
      hasAtmosphericPressureRange: projectInformation?.labelData?.hasAtmosphericPressureRange || false,
      atmosphericPressureMin: projectInformation?.labelData?.atmosphericPressureMin || '',
      atmosphericPressureMax: projectInformation?.labelData?.atmosphericPressureMax || '',
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
      e.preventDefault();
      console.log(formData)
      
      if(formData.lowerTemperatureLimit != '' && formData.upperTemperatureLimit != ''){
        if(formData.lowerTemperatureLimit >= formData.upperTemperatureLimit){
          return toast.warning("Lower Temperature grater than or equal upper Temperature")

        }
      }

      if(formData.humidityMin != '' && formData.humidityMax != ''){
        if(formData.humidityMin >= formData.humidityMax){
          return toast.warning("Min humidity grater than or equal Max humidity")

        }
      }

      if(formData.atmosphericPressureMin != '' && formData.atmosphericPressureMax != ''){
        if(formData.atmosphericPressureMin >= formData.atmosphericPressureMax){
          return toast.warning("Min Atmospheric Pressure grater than or equal Max Atmospheric Pressure")

        }
      }

      dispatch(storageAction(formData, token))
  }

  useEffect(() => {
      if(storageSuccess){
        //   navigate(`/dashboard/create-project/step5/${projectInfo._id}`)
        //   console.log(projectInfo)
        toast.success(`updated success`) 
      }

      if(storageFail){
          toast.warning(`${storageFail.message}`)
      }
  }, [storageSuccess, storageFail])



  return (
    <div className="container storage">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
            {/* <Link style={{height:'35px'}} to={`/dashboard/create-project/step3/65764c7df80c7c51796e9bda`} className='label-info-link'> Back</Link> */}
            <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
      {/* <HorizontalLinearStepper step={3} /> */}
      <form onSubmit={handleSubmit} className="storage-form">
        <h2>Storage</h2>

        <div className="form-group">
          <label>1- Does this product need to be handled carefully to prevent it from being broken or damaged?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresCarefulHandling"
                value="Yes"
                checked={formData.requiresCarefulHandling}
                onChange={() => handleCheckboxChange('requiresCarefulHandling', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresCarefulHandling"
                value="No"
                checked={!formData.requiresCarefulHandling}
                onChange={() => handleCheckboxChange('requiresCarefulHandling', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>2- Does your product require protection from light sources?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromLight"
                value="Yes"
                checked={formData.requiresProtectionFromLight}
                onChange={() => handleCheckboxChange('requiresProtectionFromLight', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromLight"
                value="No"
                checked={!formData.requiresProtectionFromLight}
                onChange={() => handleCheckboxChange('requiresProtectionFromLight', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>3- Does your product require protection from heat and radioactive sources?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromHeatAndRadioactiveSources"
                value="Yes"
                checked={formData.requiresProtectionFromHeatAndRadioactiveSources}
                onChange={() => handleCheckboxChange('requiresProtectionFromHeatAndRadioactiveSources', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromHeatAndRadioactiveSources"
                value="No"
                checked={!formData.requiresProtectionFromHeatAndRadioactiveSources}
                onChange={() => handleCheckboxChange('requiresProtectionFromHeatAndRadioactiveSources', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>4- Does your product require protection from moisture?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromMoisture"
                value="Yes"
                checked={formData.requiresProtectionFromMoisture}
                onChange={() => handleCheckboxChange('requiresProtectionFromMoisture', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="requiresProtectionFromMoisture"
                value="No"
                checked={!formData.requiresProtectionFromMoisture}
                onChange={() => handleCheckboxChange('requiresProtectionFromMoisture', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>5- Is there a lower limit of temperature that your product must not exceed to operate safely?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasLowerLimitOfTemperature"
                value="Yes"
                checked={formData.hasLowerLimitOfTemperature}
                onChange={() => handleCheckboxChange('hasLowerLimitOfTemperature', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasLowerLimitOfTemperature"
                value="No"
                checked={!formData.hasLowerLimitOfTemperature}
                onChange={() => handleCheckboxChange('hasLowerLimitOfTemperature', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasLowerLimitOfTemperature && (
          <div className="form-group">
            <label>Lower limit of temperature:</label>
            <input
              type="text"
              className="form-control"
              name="lowerTemperatureLimit"
              placeholder='number + unit'
              value={formData.lowerTemperatureLimit}
              required={formData.hasLowerLimitOfTemperature ? true : false}
              onChange={(e) => handleInputChange('lowerTemperatureLimit', e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>6- Is there an upper limit of temperature that your product must not exceed to operate safely?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasUpperLimitOfTemperature"
                value="Yes"
                checked={formData.hasUpperLimitOfTemperature}
                onChange={() => handleCheckboxChange('hasUpperLimitOfTemperature', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasUpperLimitOfTemperature"
                value="No"
                checked={!formData.hasUpperLimitOfTemperature}
                onChange={() => handleCheckboxChange('hasUpperLimitOfTemperature', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasUpperLimitOfTemperature && (
          <div className="form-group">
            <label>Upper limit of temperature:</label>
            <input
              type="text"
              className="form-control"
              name="upperTemperatureLimit"
              placeholder='umber + unit'
              value={formData.upperTemperatureLimit}
              required={formData.hasUpperLimitOfTemperature ? true : false}
              onChange={(e) => handleInputChange('upperTemperatureLimit', e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>7- Is there a range of humidity that your product must not exceed to operate safely?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasHumidityRange"
                value="Yes"
                checked={formData.hasHumidityRange}
                onChange={() => handleCheckboxChange('hasHumidityRange', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasHumidityRange"
                value="No"
                checked={!formData.hasHumidityRange}
                onChange={() => handleCheckboxChange('hasHumidityRange', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasHumidityRange && (
          <div className="form-group">
            <label>Humidity Range:</label>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="humidityMin"
                  placeholder="Min"
                  required={formData.hasHumidityRange ? true : false}
                  value={formData.humidityMin}
                  onChange={(e) => handleInputChange('humidityMin', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="humidityMax"
                  placeholder="Max"
                  required={formData.hasHumidityRange ? true : false}
                  value={formData.humidityMax}
                  onChange={(e) => handleInputChange('humidityMax', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>8- Is there a range of atmospheric pressure that your product must not exceed to operate safely?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasAtmosphericPressureRange"
                value="Yes"
                checked={formData.hasAtmosphericPressureRange}
                onChange={() => handleCheckboxChange('hasAtmosphericPressureRange', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasAtmosphericPressureRange"
                value="No"
                checked={!formData.hasAtmosphericPressureRange}
                onChange={() => handleCheckboxChange('hasAtmosphericPressureRange', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasAtmosphericPressureRange && (
          <div className="form-group">
            <label>Atmospheric Pressure Range:</label>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="atmosphericPressureMin"
                  placeholder="Min (number + unit)"
                  required={formData.hasAtmosphericPressureRange ? true : false}
                  value={formData.atmosphericPressureMin}
                  onChange={(e) => handleInputChange('atmosphericPressureMin', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="atmosphericPressureMax"
                  required={formData.hasAtmosphericPressureRange ? true : false}
                  placeholder="Max (number + unit)"
                  value={formData.atmosphericPressureMax}
                  onChange={(e) => handleInputChange('atmosphericPressureMax', e.target.value)}
                />
              </div>
            </div>
          </div>
          )}
          {!storageRequest
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
      </form>
    </div>
  );
};

export default UpdateStorageComponent;
