import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { safeUseAction } from '../../redux/actions/projectActions';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const SafeUseComponent = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {safeUse} = useSelector(state => state);
  const {safeUseRequest, safeUseSuccess, safeUseFail, projectInfo} = safeUse;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectId,
    hasBiologicalRisks: false,
    isIntendedForSingleUse: false,
    needInstructionsForUse: false,
    eIFULink: '',
    needCaution: false,
    containsRubberLatex: false,
    containsBloodDerivatives: false,
    containsMedicinalSubstance: false,
    containsAnimalOriginMaterial: false,
    containsHumanOriginMaterial: false,
    containsHazardousSubstances: false,
    containsNanoMaterials: false,
    multipleUsesOnSinglePatient: false,
  });

  const handleCheckboxChange = (name, value) => {
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

    dispatch(safeUseAction(formData, token))
  }

  useEffect(() => {
    if(safeUseSuccess){
      if(projectInfo.labelData.productType === "In Vitro Diagnostic (IVD) Medical Device"){
        navigate(`/dashboard/create-project/step6/${projectInfo._id}`)
        console.log(projectInfo.labelData.productType)
      }

      if(projectInfo.labelData.productType === "Medical device"){
        navigate(`/dashboard/create-project/step7/${projectInfo._id}`)
        console.log(projectInfo.labelData.productType)
      }

    }

    if(safeUseFail){
        toast.warning(`${safeUseFail.message}`)
    }
  }, [safeUseSuccess, safeUseFail])

  return (
    <div className="container safe-use">
      <HorizontalLinearStepper step={4} />
      <form className="safe-use-form" onSubmit={handleSubmit}>
        <h2>Safe Use</h2>

        <div className="form-group">
          <label>1- Are there any potential biological risks associated with your product?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasBiologicalRisks"
                value="Yes"
                checked={formData.hasBiologicalRisks}
                onChange={() => handleCheckboxChange('hasBiologicalRisks', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="hasBiologicalRisks"
                value="No"
                checked={!formData.hasBiologicalRisks}
                onChange={() => handleCheckboxChange('hasBiologicalRisks', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>2- Is your product intended for one single use only?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isIntendedForSingleUse"
                value="Yes"
                checked={formData.isIntendedForSingleUse}
                onChange={() => handleCheckboxChange('isIntendedForSingleUse', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isIntendedForSingleUse"
                value="No"
                checked={!formData.isIntendedForSingleUse}
                onChange={() => handleCheckboxChange('isIntendedForSingleUse', 'No')}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>3- Is there a need for the user to consult the instructions for use?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="needInstructionsForUse"
                value="Yes"
                checked={formData.needInstructionsForUse}
                onChange={() => handleCheckboxChange('needInstructionsForUse', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="needInstructionsForUse"
                value="No"
                checked={!formData.needInstructionsForUse}
                onChange={() => handleCheckboxChange('needInstructionsForUse', 'No')}
              />
            </div>
          </div>
        </div>

        {formData.needInstructionsForUse && (
          <div className="form-group">
            <label>Add the link for eIFU (If available):</label>
            <input
              type="text"
              className="form-control"
              placeholder='www.website.com'
              name="eIFULink"
              value={formData.eIFULink}
              onChange={(e) => handleInputChange('eIFULink', e.target.value)}
            />
          </div>
         )} 

        <div className="form-group">
          <label>4- Is caution necessary when operating the device?</label>
          <div>
            <div className="form-check">
              <label className="form-check-label">Yes</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="needCaution"
                value="Yes"
                checked={formData.needCaution}
                onChange={() => handleCheckboxChange('needCaution', 'Yes')}
              />
            </div>
            <div className="form-check">
              <label className="form-check-label">No</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="needCaution"
                value="No"
                checked={!formData.needCaution}
                onChange={() => handleCheckboxChange('needCaution', 'No')}
              />
            </div>
          </div>
        </div>

                {/* Question 5 */}
        <div className="form-group">
        <label>5- Is there a presence of a dry natural rubber or natural rubber latex as a material of construction within your device or the packaging of your device?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsRubberLatex"
                value="Yes"
                checked={formData.containsRubberLatex}
                onChange={() => handleCheckboxChange('containsRubberLatex', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsRubberLatex"
                value="No"
                checked={!formData.containsRubberLatex}
                onChange={() => handleCheckboxChange('containsRubberLatex', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 6 */}
        <div className="form-group">
        <label>6- Does your product contain human blood or plasma derivatives?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsBloodDerivatives"
                value="Yes"
                checked={formData.containsBloodDerivatives}
                onChange={() => handleCheckboxChange('containsBloodDerivatives', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsBloodDerivatives"
                value="No"
                checked={!formData.containsBloodDerivatives}
                onChange={() => handleCheckboxChange('containsBloodDerivatives', 'No')}
            />
            </div>
        </div>
        </div>

                {/* Question 7 */}
        <div className="form-group">
        <label>7- Does your product contain a medicinal substance?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsMedicinalSubstance"
                value="Yes"
                checked={formData.containsMedicinalSubstance}
                onChange={() => handleCheckboxChange('containsMedicinalSubstance', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsMedicinalSubstance"
                value="No"
                checked={!formData.containsMedicinalSubstance}
                onChange={() => handleCheckboxChange('containsMedicinalSubstance', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 8 */}
        <div className="form-group">
        <label>8- Does your product contain biological material of animal origin?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsAnimalOriginMaterial"
                value="Yes"
                checked={formData.containsAnimalOriginMaterial}
                onChange={() => handleCheckboxChange('containsAnimalOriginMaterial', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsAnimalOriginMaterial"
                value="No"
                checked={!formData.containsAnimalOriginMaterial}
                onChange={() => handleCheckboxChange('containsAnimalOriginMaterial', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 9 */}
        <div className="form-group">
        <label>9- Does your product contain biological material of human origin?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsHumanOriginMaterial"
                value="Yes"
                checked={formData.containsHumanOriginMaterial}
                onChange={() => handleCheckboxChange('containsHumanOriginMaterial', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsHumanOriginMaterial"
                value="No"
                checked={!formData.containsHumanOriginMaterial}
                onChange={() => handleCheckboxChange('containsHumanOriginMaterial', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 10 */}
        <div className="form-group">
        <label>10- Does your product contain hazardous substances?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsHazardousSubstances"
                value="Yes"
                checked={formData.containsHazardousSubstances}
                onChange={() => handleCheckboxChange('containsHazardousSubstances', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsHazardousSubstances"
                value="No"
                checked={!formData.containsHazardousSubstances}
                onChange={() => handleCheckboxChange('containsHazardousSubstances', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 11 */}
        <div className="form-group">
        <label>11- Does your product contain nano materials?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsNanoMaterials"
                value="Yes"
                checked={formData.containsNanoMaterials}
                onChange={() => handleCheckboxChange('containsNanoMaterials', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="containsNanoMaterials"
                value="No"
                checked={!formData.containsNanoMaterials}
                onChange={() => handleCheckboxChange('containsNanoMaterials', 'No')}
            />
            </div>
        </div>
        </div>

        {/* Question 12 */}
        <div className="form-group">
        <label>12- Is your product intended for multiple uses on a single patient?</label>
        <div>
            <div className="form-check">
            <label className="form-check-label">Yes</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="multipleUsesOnSinglePatient"
                value="Yes"
                checked={formData.multipleUsesOnSinglePatient}
                onChange={() => handleCheckboxChange('multipleUsesOnSinglePatient', 'Yes')}
            />
            </div>
            <div className="form-check">
            <label className="form-check-label">No</label>
            <input
                type="checkbox"
                className="form-check-input"
                name="multipleUsesOnSinglePatient"
                value="No"
                checked={!formData.multipleUsesOnSinglePatient}
                onChange={() => handleCheckboxChange('multipleUsesOnSinglePatient', 'No')}
            />
            </div>
        </div>
        </div>
        {!safeUseRequest
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

export default SafeUseComponent;