import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { IVDDiagnosticAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';
import { getLabelAction } from '../../redux/actions/labelActions';

const UpdateIVDDiagnosticComponent = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {IVDDiagnostic, getLabel} = useSelector(state => state);
  const {IVDDiagnosticRequest, IVDDiagnosticSuccess, IVDDiagnosticFail, projectInfo} = IVDDiagnostic;

  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const [formData, setFormData] = useState({
    labelId: projectId,
    isUpdate: true,
    hasControlMaterial: false,
    isControlMaterial: false,
    isControlMaterialForNegativeRange: false,
    isControlMaterialForPositiveRange: false,
    hasSpecificNumberOfTests: false,
    numberOfTests: '',
    // isIVDForPerformanceEvaluation: false,
  });

    // get prev project info
    const {getLabelRequest, getLabelSuccess, getLabelFail, label} = getLabel;
    const [projectInformation, setProjectInformation] = useState({});
    useEffect(() =>{
      dispatch(getLabelAction(projectId, token))
    }, [])
    useEffect(() =>{
      if(getLabelSuccess){
        setProjectInformation(label)
      }
    }, [getLabelSuccess])

  useEffect(() => {
    // Set formData with existing project information
    setFormData({
      isUpdate: true,
      labelId: projectId,
      hasControlMaterial: projectInformation?.labelData?.hasControlMaterial || false,
      isControlMaterial: projectInformation?.labelData?.isControlMaterial || false,
      isControlMaterialForNegativeRange: projectInformation?.labelData?.isControlMaterialForNegativeRange || false,
      isControlMaterialForPositiveRange: projectInformation?.labelData?.isControlMaterialForPositiveRange || false,
      hasSpecificNumberOfTests: projectInformation?.labelData?.hasSpecificNumberOfTests || false,
      numberOfTests: projectInformation?.labelData?.numberOfTests || '',
      // isIVDForPerformanceEvaluation: projectInformation?.labelData?.isIVDForPerformanceEvaluation || false,
    });
  }, [projectInformation])

  const handleCheckboxChange = (name, value) => {

    const controlMaterials = [
      'isControlMaterial',
      'isControlMaterialForNegativeRange',
      'isControlMaterialForPositiveRange'
    ]

    if(controlMaterials.includes(name)){
      setFormData((prevData) => {
        const updatedControlMaterials = {...prevData};
        
        controlMaterials.forEach(checkbox => {
          if(checkbox !== name){
            updatedControlMaterials[checkbox] = false
          }
        })
        updatedControlMaterials[name] = value === 'Yes';

        return updatedControlMaterials;
      })
      return;
    }
    setFormData({
      ...formData,
      [name]: value === 'Yes',
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = e => {
    e.preventDefault();

    dispatch(IVDDiagnosticAction(formData, token))
}

useEffect(() => {
    if(IVDDiagnosticSuccess){
      toast.success(`updated success`)
    }

    if(IVDDiagnosticFail){
        toast.warning(`${IVDDiagnosticFail.message}`)
    }
}, [IVDDiagnosticSuccess, IVDDiagnosticFail])



if(projectInformation){
  if(projectInformation?.status == "released" 
  || projectInformation?.status == "rejected" 
  || projectInformation?.status == "pending_release" 
  || projectInformation?.status == "pending_approval"){
      navigate(`/dashboard/project-information/${projectId}`)
  }
}

  return (
    <div className="container ivd-diagnostic">
        <div className='mb-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
      <form className="ivd-diagnostic-form" onSubmit={handleSubmit}>
        <h2>In Vitro Diagnostic (IVD)</h2>

        <div className="form-group">
          <label className='question-bg mb-1'>1- Is there a control material?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasControlMaterial"
                value="Yes"
                checked={formData.hasControlMaterial}
                onChange={() => handleCheckboxChange('hasControlMaterial', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasControlMaterial"
                value="No"
                checked={!formData.hasControlMaterial}
                onChange={() => handleCheckboxChange('hasControlMaterial', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasControlMaterial &&
         <>
          <div className="form-group">
            <label>- Is your product a control material intended to verify the performance of another medical device?</label>
            <div>
              <div className="form-check">
                <label className="form-check-label">Yes</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterial"
                  value="Yes"
                  checked={formData.isControlMaterial}
                  onChange={() => handleCheckboxChange('isControlMaterial', 'Yes')}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">No</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterial"
                  value="No"
                  checked={!formData.isControlMaterial}
                  onChange={() => handleCheckboxChange('isControlMaterial', 'No')}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>- Is your product a control material intended to verify the results in the expected negative range?</label>
            <div>
              <div className="form-check">
                <label className="form-check-label">Yes</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterialForNegativeRange"
                  value="Yes"
                  checked={formData.isControlMaterialForNegativeRange}
                  onChange={() => handleCheckboxChange('isControlMaterialForNegativeRange', 'Yes')}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">No</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterialForNegativeRange"
                  value="No"
                  checked={!formData.isControlMaterialForNegativeRange}
                  onChange={() => handleCheckboxChange('isControlMaterialForNegativeRange', 'No')}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>- Is your product a control material intended to verify the results in the expected positive range?</label>
            <div>
              <div className="form-check">
                <label className="form-check-label">Yes</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterialForPositiveRange"
                  value="Yes"
                  checked={formData.isControlMaterialForPositiveRange}
                  onChange={() => handleCheckboxChange('isControlMaterialForPositiveRange', 'Yes')}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">No</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isControlMaterialForPositiveRange"
                  value="No"
                  checked={!formData.isControlMaterialForPositiveRange}
                  onChange={() => handleCheckboxChange('isControlMaterialForPositiveRange', 'No')}
                />
              </div>
            </div>
          </div>
        </>}



        <div className="form-group">
          <label className='question-bg mb-1'>2- Is there a specific number of tests that can be performed with your medical device?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasSpecificNumberOfTests"
                value="Yes"
                checked={formData.hasSpecificNumberOfTests}
                onChange={() => handleCheckboxChange('hasSpecificNumberOfTests', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasSpecificNumberOfTests"
                value="No"
                checked={!formData.hasSpecificNumberOfTests}
                onChange={() => handleCheckboxChange('hasSpecificNumberOfTests', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.hasSpecificNumberOfTests && (
          <div className="form-group">
            <label>Number of tests:</label>
            <input
              type="number"
              min='0'
              className="form-control"
              name="numberOfTests"
              required={formData.hasSpecificNumberOfTests ? true : false}
              value={formData.numberOfTests}
              onChange={(e) => handleInputChange('numberOfTests', e.target.value)}
            />
          </div>
        )}
        {/* <div className="form-group">
          <label>5- Is your product an IVD medical device intended to be used only for evaluating its performance characteristics before it’s placed on the market for medical diagnostic use?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isIVDForPerformanceEvaluation"
                value="Yes"
                checked={formData.isIVDForPerformanceEvaluation}
                onChange={() => handleCheckboxChange('isIVDForPerformanceEvaluation', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isIVDForPerformanceEvaluation"
                value="No"
                checked={!formData.isIVDForPerformanceEvaluation}
                onChange={() => handleCheckboxChange('isIVDForPerformanceEvaluation', 'No')}
            />
          </div>
        </div>
        </div> */}
        {!IVDDiagnosticRequest
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

export default UpdateIVDDiagnosticComponent;
