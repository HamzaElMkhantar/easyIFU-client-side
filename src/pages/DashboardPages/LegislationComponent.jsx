import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './project.css'

import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectAction, legislationAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const LegislationComponent = () => {

    const {projectId} = useParams();
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
  
    const {legislation, getProject} = useSelector(state => state);
    const {legislationRequest, legislationSuccess, legislationFail, legislationInfo} = legislation;


    const [projectInfo, setProjectInfo] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        labelId: projectId,
        customMadeDevice: false,
        clinicalInvestigationOnly: false,
        IsItForEurope: false ,
        IsItForUK: false ,
        productClass: 'Class I',
        notifiedBodyNumber: '',
        UK_productClass: 'Class I',
        UK_notifiedBodyNumber: '',
    })

    // get prev project info
    const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;
    const [projectInformation, setProjectInformation] = useState({});
    console.log("get old data :", projectInformation)
    useEffect(() =>{
        dispatch(getProjectAction(projectId, token))
    }, [])
    useEffect(() =>{
        if(getProjectSuccess){
        setProjectInformation(project)
        }
    }, [getProjectSuccess])
    console.log(formData)

    useEffect(() =>{
        setFormData({
            isUpdate: false,
            labelId: projectId,
            customMadeDevice: projectInformation?.labelData?.customMadeDevice ? true : false,
            clinicalInvestigationOnly: projectInformation?.labelData?.clinicalInvestigationOnly ? true : false,
            IsItForEurope: projectInformation?.labelData?.IsItForEurope || false,
            IsItForUK: projectInformation?.labelData?.IsItForUK || false,
            productClass: projectInformation?.labelData?.productClass || 'Class I',
            notifiedBodyNumber: projectInformation?.labelData?.notifiedBodyNumber || '',
            UK_productClass: projectInformation?.labelData?.UK_productClass || 'Class I',
            UK_notifiedBodyNumber: projectInformation?.labelData?.UK_notifiedBodyNumber || '',
        })
    }, [projectInformation])

    const handleCheckboxChange = (name, value, checkOderName) => {
        console.log(formData[checkOderName] )

        if(formData[checkOderName]){
            setFormData({
                ...formData,
                [name]: value === 'Yes',
                [checkOderName]: false
              });
              console.log(formData)
              return
            };
        setFormData({
          ...formData,
          [name]: value === 'Yes',
        });
      };

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
          ...formData,
          [name]: newValue,
        });
      };

    const handleLegislation = (e) => {
        e.preventDefault();
        dispatch(legislationAction(formData, token))
    }

    useEffect(() => {
        if(legislationSuccess){
            navigate(`/dashboard/create-project/step3/${projectId}`)
        }

        if(legislationFail){
            toast.warning(`${legislationFail.message}`)
        }
    }, [legislationSuccess, legislationFail])
  return (
    <div className='manufactureInfo container pb-3'>
        <div className='' style={{display:'flex',
                                  justifyContent:'space-between', 
                                  alignItems:'', width:'100%', 
                                  backgroundColor:'#fff',
                                  height:'',
                                  padding:'30px 5px 0 5px',
                                  borderRadius:'5px'
                                  }}>
            <Link style={{height:'35px'}} to={`/dashboard/create-project/step1/${projectId}`} className='label-info-link'>Back</Link>
                <HorizontalLinearStepper step={1}/>
                <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>escape</Link>
        </div>

        <form onSubmit={handleLegislation} action="">
            <h2>Legislation</h2>

            <div className="form-group" >
                <label className='question-bg'>- Is your product a Custom made device?</label>
                <div style={{display:'flex', flexDirection:'row-reverse'}}>
                    <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                    <label className="form-check-label">Yes</label>
                    <input
                        style={{width:'30px', height:'15px'}}
                        type="checkbox"
                        name="customMadeDevice"
                        value="Yes"
                        checked={formData.customMadeDevice}
                        onChange={() => handleCheckboxChange('customMadeDevice', 'Yes', 'clinicalInvestigationOnly')}
                    />
                    </div>
                    <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                    <label className="form-check-label">No</label>
                    <input
                        style={{width:'30px', height:'15px'}}
                        type="checkbox"
                        name="customMadeDevice"
                        value="No"
                        checked={!formData.customMadeDevice}
                        onChange={() => handleCheckboxChange('customMadeDevice', 'No', 'clinicalInvestigationOnly')}
                    />
                    </div>
                </div>
            </div>
                
            <div className="form-group">
                <label className='question-bg'>- Is your device intended for clinical investigation only?</label>
                <div style={{display:'flex', flexDirection:'row-reverse'}}>
                    <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                    <label className="">Yes</label>
                    <input
                        style={{width:'30px', height:'15px'}}
                        type="checkbox"
                        name="clinicalInvestigationOnly"
                        value="Yes"
                        checked={formData.clinicalInvestigationOnly}
                        onChange={() => handleCheckboxChange('clinicalInvestigationOnly', 'Yes', 'customMadeDevice')}
                    />
                    </div>
                    <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                    <label className="">No</label>
                    <input
                        style={{width:'30px', height:'15px'}}
                        type="checkbox"
                        name="clinicalInvestigationOnly"
                        value="No"
                        checked={!formData.clinicalInvestigationOnly}
                        onChange={() => handleCheckboxChange('clinicalInvestigationOnly', 'No', 'customMadeDevice')}
                    />
                    </div>
                </div>
            </div>

            {(!formData.customMadeDevice && !formData.clinicalInvestigationOnly)&&
            <>
                <div className="form-group">
                    <label className='question-bg'>- Is It For Europe ?</label>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                        <label className="">Yes</label>
                        <input
                            style={{width:'30px', height:'15px'}}
                            type="checkbox"
                            name="IsItForEurope"
                            value="Yes"
                            checked={formData.IsItForEurope}
                            onChange={() => setFormData({...formData, IsItForEurope: true})}
                        />
                        </div>
                        <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                        <label className="">No</label>
                        <input
                            style={{width:'30px', height:'15px'}}
                            type="checkbox"
                            name="IsItForEurope"
                            value="No"
                            checked={!formData.IsItForEurope}
                            onChange={() => setFormData({...formData, IsItForEurope: false})}
                        />
                        </div>
                    </div>
                </div>
                {formData.IsItForEurope &&
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
                }
            {formData.IsItForEurope && formData.productClass !== 'Class I' && 
                <div>
                <label>Notified Body Number*:</label>
                    <input
                        type="text"
                        name="notifiedBodyNumber"
                        value={formData.notifiedBodyNumber}
                        onChange={handleInputChange}
                        required={formData.productClass !== 'Class I' ? true : false}
                    />
                </div>}

                <div className="form-group">
                    <label className='question-bg'>- Is It For UK ?</label>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                        <label className="">Yes</label>
                        <input
                            style={{width:'30px', height:'15px'}}
                            type="checkbox"
                            name="IsItForUK"
                            value="Yes"
                            checked={formData.IsItForUK}
                            onChange={() => setFormData({...formData, IsItForUK: true})}
                        />
                        </div>
                        <div className="form-check" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginRight:'20px'}}>
                        <label className="">No</label>
                        <input
                            style={{width:'30px', height:'15px'}}
                            type="checkbox"
                            name="IsItForUK"
                            value="No"
                            checked={!formData.IsItForUK}
                            onChange={() => setFormData({...formData, IsItForUK: false})}

                        />
                        </div>
                    </div>
                </div>

                {formData.IsItForUK &&
                    <div>
                        <label>What is the class of your product?</label>
                        <select
                        name="UK_productClass"
                        value={formData.UK_productClass}
                        onChange={handleInputChange}
                        >
                        <option value="Class I">Class I</option>
                        <option value="Class Is (sterile)">Class Is (sterile)</option>
                        <option value="Class Im (with a measuring function)">Class Im (with a measuring function)</option>
                        <option value="Class IIa">Class IIa</option>
                        <option value="Class IIb">Class IIb</option>
                        <option value="Class III">Class III</option>
                        </select>
                    </div>            
                }
            {formData.IsItForUK && formData.UK_productClass !== 'Class I' && 
                <div>
                <label>Notified Body Number*:</label>
                    <input
                        type="text"
                        name="UK_notifiedBodyNumber"
                        value={formData.UK_notifiedBodyNumber}
                        onChange={handleInputChange}
                        required={formData.productClass !== 'Class I' ? true : false}
                    />
                </div>}
            </>}

            {!legislationRequest 
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
  )
}

export default LegislationComponent