import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectAction, transfusionInfusionAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';

const UpdateTransfusionInfusionComponent = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {transfusionInfusion, getProject} = useSelector(state => state);
  const {transfusionInfusionRequest, transfusionInfusionSuccess, transfusionInfusionFail, projectInfo} = transfusionInfusion
  const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [projectInformation, setProjectInformation] = useState({})
  useEffect(() => {
    dispatch(getProjectAction(projectId))
  }, [])

  useEffect(() => {
    if(getProjectSuccess){
      setProjectInformation(project)
    }
  }, [getProjectSuccess])


  const [formData, setFormData] = useState({
    isUpdate: true,
    projectId,
    isMedicalDeviceForSampleCollection: false,
    hasFluidPath: false,
    isNonPyrogenic: false,
    numberOfDropsPerMilliliter: '',
    liquidFilterPoreSize: '',
    hasOneWayValve: false,
  });

  useEffect(() => {
    // Set formData with existing project information
    setFormData({
      isUpdate: true,
      projectId,
      isMedicalDeviceForSampleCollection: projectInformation?.labelData?.isMedicalDeviceForSampleCollection ||  false,
      hasFluidPath: projectInformation?.labelData?.hasFluidPath ||  false,
      isNonPyrogenic: projectInformation?.labelData?.isNonPyrogenic ||  false,
      numberOfDropsPerMilliliter: projectInformation?.labelData?.isNonPyrogenic ||  '',
      liquidFilterPoreSize: projectInformation?.labelData?.liquidFilterPoreSize ||  '',
      hasOneWayValve: projectInformation?.labelData?.hasOneWayValve ||  false,
    });
  }, [projectInformation])

  const handleCheckboxChange = (name, value) => {
    let newValue = null
    if(value === 'Yes'){
      newValue = true
    }else if(value === 'No'){
      newValue = false
    }else if(value === 'Not applicable'){
      newValue = 'Not applicable'
    }else{
      toast.warning("something wrong !")
    }
    setFormData({
      ...formData,
      [name]: newValue
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

    dispatch(transfusionInfusionAction(formData, token))
  }

  useEffect(() => {
    if(transfusionInfusionSuccess){
        navigate(`/dashboard/project-information/${projectInfo._id}`)
        toast.success(`updated success`)
    }

    if(transfusionInfusionFail){
        toast.warning(`${transfusionInfusionFail.message}`)
    }
  }, [transfusionInfusionSuccess, transfusionInfusionFail])

  return (
    <div className="container transfusion-infusion">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
            {/* <Link style={{height:'35px'}} to={projectInformation && projectInformation.labelData && projectInformation.labelData.productType == "Medical device"
             ? `/dashboard/create-project/step5/65764c7df80c7c51796e9bda`
            :`/dashboard/create-project/step6/65764c7df80c7c51796e9bda`} className='label-info-link'> Back</Link> */}
                        <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
      {/* <HorizontalLinearStepper step={6} /> */}
      <form className="transfusion-infusion-form" onSubmit={handleSubmit}>
        <h2>Transfusion/Infusion</h2>

        <div className="form-group">
          <label>1- Is your product a medical device or blood processing application that includes a system dedicated to the collection of samples of a given substance stored in the medical device or blood container?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isMedicalDeviceForSampleCollection"
                value="Yes"
                checked={formData.isMedicalDeviceForSampleCollection}
                onChange={() => handleCheckboxChange('isMedicalDeviceForSampleCollection', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isMedicalDeviceForSampleCollection"
                value="No"
                checked={!formData.isMedicalDeviceForSampleCollection}
                onChange={() => handleCheckboxChange('isMedicalDeviceForSampleCollection', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>2- Is there a presence of a fluid path?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasFluidPath"
                value="Yes"
                checked={formData.hasFluidPath}
                onChange={() => handleCheckboxChange('hasFluidPath', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasFluidPath"
                value="No"
                checked={!formData.hasFluidPath}
                onChange={() => handleCheckboxChange('hasFluidPath', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>3- Is your medical device non-pyrogenic?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isNonPyrogenic"
                value="Yes"
                checked={formData.isNonPyrogenic}
                onChange={() => handleCheckboxChange('isNonPyrogenic', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isNonPyrogenic"
                value="No"
                checked={!formData.isNonPyrogenic}
                onChange={() => handleCheckboxChange('isNonPyrogenic', 'No')}
              />
            </div>
          </div>
        </div>

          <div className="form-group">
            <label>4- How many drops are there per milliliter?</label>
            <div style={{margin:'10px 0'}}>
              <label style={{marginRight:'10px '}} >Not applicable : </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="numberOfDropsPerMilliliter"
                    value="Not applicable"
                    checked={formData.numberOfDropsPerMilliliter === 'Not applicable' ? true : false }
                    onChange={() => handleCheckboxChange('numberOfDropsPerMilliliter', 'Not applicable')}
                  />
            </div>

            <input
              type="text"
              className="form-control"
              name="numberOfDropsPerMilliliter"
              value={formData.numberOfDropsPerMilliliter}
              required={formData.numberOfDropsPerMilliliter ? false : true}
              onChange={(e) => handleInputChange('numberOfDropsPerMilliliter', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>5- What is the pore size of the liquid filter?</label>
            <div style={{margin:'10px 0'}}>
              <label style={{marginRight:'10px '}} >Not applicable : </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="liquidFilterPoreSize"
                    value="Not applicable"
                    checked={formData.liquidFilterPoreSize === 'Not applicable' ? true : false }
                    onChange={() => handleCheckboxChange('liquidFilterPoreSize', 'Not applicable')}
                  />
            </div>

            <input
              type="text"
              className="form-control"
              name="liquidFilterPoreSize"
              value={formData.liquidFilterPoreSize}
              required={formData.liquidFilterPoreSize ? false : true}
              onChange={(e) => handleInputChange('liquidFilterPoreSize', e.target.value)}
            />
          </div>

        <div className="form-group">
          <label>6- Is your product a medical device with a valve that allows flow in only one direction?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasOneWayValve"
                value="Yes"
                checked={formData.hasOneWayValve}
                onChange={() => handleCheckboxChange('hasOneWayValve', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasOneWayValve"
                value="No"
                checked={!formData.hasOneWayValve}
                onChange={() => handleCheckboxChange('hasOneWayValve', 'No')}
              />
            </div>
          </div>
        </div>
        {!transfusionInfusionRequest
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

export default UpdateTransfusionInfusionComponent;
