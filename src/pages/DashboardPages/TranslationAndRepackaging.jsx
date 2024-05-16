import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { translationAndRepackagingAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { getLabelAction } from '../../redux/actions/labelActions';
import { getProductByIdAction } from '../../redux/actions/productActions';

const TranslationAndRepackaging = () => {
    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {translationAndRepackaging, productById} = useSelector(state => state);

    const {translationAndRepackagingRequest, translationAndRepackagingSuccess, translationAndRepackagingFail, translationAndRepackagingInfo} = translationAndRepackaging;

    console.log(translationAndRepackagingRequest, translationAndRepackagingSuccess, translationAndRepackagingFail, translationAndRepackagingInfo)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      labelId: projectId,
      isUpdate: false,
      translationActivity: false,
      translationEntityName: '',
      translationEntityAddress: '',
      modificationToPackaging: false,
      repackagingEntityName: '',
      repackagingEntityAddress: '',
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
      translationActivity: projectInformation?.labelData?.translationActivity || false,
      translationEntityName: projectInformation?.labelData?.translationEntityName || '',
      translationEntityAddress: projectInformation?.labelData?.translationEntityAddress || '',
      modificationToPackaging: projectInformation?.labelData?.modificationToPackaging || false,
      repackagingEntityName: projectInformation?.labelData?.repackagingEntityName || '',
      repackagingEntityAddress: projectInformation?.labelData?.repackagingEntityAddress || '',
      
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
  
      dispatch(translationAndRepackagingAction(formData, token))
  }
  
  useEffect(() => {
      if(translationAndRepackagingSuccess){
          navigate(`/dashboard/labels/${projectId}`)
      }
  
      if(translationAndRepackagingFail){
          toast.warning(`${translationAndRepackagingFail.message}`)
      }
  }, [translationAndRepackagingSuccess, translationAndRepackagingFail])
    

  return (
    <div className='container others'>
        <div className='' style={{display:'flex',
                                  justifyContent:'space-between', 
                                  alignItems:'', width:'100%', 
                                  backgroundColor:'#fff',
                                  height:'',
                                  padding:'30px 5px 0 5px',
                                  borderRadius:'5px'
                                  }}>
            <Link style={{height:'35px'}} to={`/dashboard/create-project/step9/${projectId}`} className='label-info-link'>Back</Link>
                <HorizontalLinearStepper step={10}/>
                <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>escape</Link>
        </div>
      <form onSubmit={handleSubmit} className="others-form">
        <h2>Translation and repackaging</h2>

        <div className="form-group">
          <label className='question-bg mb-1'>- Has the original medical device information undergone a translation that supplements or replaces the original information? (Choose YES only if this translation activity was undertaken by someone other than the manufacturer)</label>
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
          <label className='question-bg mb-1'>- Has a modification to the original medical device packaging configuration occurred? (Choose YES only if this repackaging activity was undertaken by someone other than the manufacturer)</label>
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


          {!translationAndRepackagingRequest
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
              </div>  
          }
      </form>
    </div>
  )
}

export default TranslationAndRepackaging ;