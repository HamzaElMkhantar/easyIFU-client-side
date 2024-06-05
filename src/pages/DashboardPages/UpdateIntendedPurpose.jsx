import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { RotatingLines } from 'react-loader-spinner';
import {Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { intendedPurposeAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie'
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';

import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { getLabelAction } from '../../redux/actions/labelActions';
import { getProductByIdAction } from '../../redux/actions/productActions';


const UpdateIntendedPurpose = () => {
    const languages = [
        { abbreviation: 'en', languageName: 'English' },
        { abbreviation: 'fr', languageName: 'French' },
        { abbreviation: 'de', languageName: 'German' },
        { abbreviation: 'it', languageName: 'Italian' },
        { abbreviation: 'es', languageName: 'Spanish' },
        { abbreviation: 'pt', languageName: 'Portuguese' },
        { abbreviation: 'nl', languageName: 'Dutch' },
        { abbreviation: 'el', languageName: 'Greek' },
        { abbreviation: 'ru', languageName: 'Russian' },
        { abbreviation: 'pl', languageName: 'Polish' },
        { abbreviation: 'cs', languageName: 'Czech' },
        { abbreviation: 'tr', languageName: 'Turkish' },
        { abbreviation: 'fi', languageName: 'Finnish' },
        { abbreviation: 'sv', languageName: 'Swedish' },
        { abbreviation: 'da', languageName: 'Danish' },
        { abbreviation: 'no', languageName: 'Norwegian' },
        { abbreviation: 'zh', languageName: 'Mandarin' },
        { abbreviation: 'bg', languageName: 'Bulgarian' },
        { abbreviation: 'hu', languageName: 'Hungarian' },
        { abbreviation: 'sk', languageName: 'Slovakian' },
        { abbreviation: 'ro', languageName: 'Romanian' },
        { abbreviation: 'sr', languageName: 'Serbian' },
        { abbreviation: 'ar', languageName: 'Arabic' }
    ];

    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {intendedPurpose, getLabel, productById} = useSelector(state => state)
    const {productByIdRequest, productByIdSuccess, productByIdFail, productByIdData} = productById
    const {intendedPurposeRequest, intendedPurposeSuccess, intendedPurposeFail, projectInfo} = intendedPurpose;
    const [intendedPurposeData, setIntendedPurposeData] = useState(
        [{
            language: '',
            abbreviation: '',
            intendedPurposeValue: ''
        }]);
    useEffect(() => {
        if(intendedPurposeSuccess){
            toast.success(`update success`)
        }

        if(intendedPurposeFail){
            toast.warning(`${intendedPurposeFail.message}`)
        }
    }, [intendedPurposeSuccess, intendedPurposeFail])


     // get all projects
    useEffect(() => {
        dispatch(getProductByIdAction(projectId, token))
    }, [])

    const [formData, setFormData] = useState({
        labelId: projectId,
        isUpdate: true,
        intendedPurpose: []
    })

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
        labelId: projectId,
        isUpdate: true,
        intendedPurpose: projectInformation?.labelData?.intendedPurpose.length > 0 
        ? projectInformation?.labelData?.intendedPurpose
        : ['']
    });
    setIntendedPurposeData(projectInformation?.labelData?.intendedPurpose.length > 0 
        ? projectInformation?.labelData?.intendedPurpose
        : [''])
  }, [projectInformation])
console.log(projectInformation)

    //  dynamic input
    const handleIntendedPurposeData = (e, index) => {
        const { value, name } = e.target;

        let updatedIntendedPurposeData = null ;

        // Create a copy of the intendedPurposeData array
        if(name == "language"){
                // Find the matching language object
                let selectedLanguage = {}; // Initialize an empty object to hold the selected language
                languages.forEach(lang => {
                    if (lang.languageName === value) {
                        selectedLanguage = lang; // Assign the matching language object to selectedLanguage
                    }
                });
                // Now, selectedLanguage contains the object of the selected language
                const selectedLanguageAbbreviation = selectedLanguage ? selectedLanguage.abbreviation : '';

                updatedIntendedPurposeData = intendedPurposeData.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        language: value,
                        abbreviation: selectedLanguageAbbreviation
                    };
                }
                return item;
            });

            // Update the formData state
            setFormData((prevData) => ({
                ...prevData,
                intendedPurpose: updatedIntendedPurposeData
            }));
        
            // Update the intendedPurposeData state
            setIntendedPurposeData(updatedIntendedPurposeData);
            return;
        }
            updatedIntendedPurposeData = intendedPurposeData.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    [name]: value
                };
            }
            return item;
        });

        // Update the formData state
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: updatedIntendedPurposeData
        }));

        // Update the intendedPurposeData state
        setIntendedPurposeData(updatedIntendedPurposeData);

        console.log("formData : ", formData)
    };

    const handleIntendedPurposeDataRemove = (index) => {
        const list = [...intendedPurposeData];
        list.splice(index, 1);
        setIntendedPurposeData(list);
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: list,
        }));
    };

    const handleIntendedPurposeDataAdd = () => {
        setIntendedPurposeData([...intendedPurposeData, ""]);
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: intendedPurposeData,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: intendedPurposeData,
        }));
        dispatch(intendedPurposeAction(formData, token))
    }


if(projectInformation){
    if(projectInformation?.status == "released" 
    || projectInformation?.status == "rejected" 
    || projectInformation?.status == "pending_release" 
    || projectInformation?.status == "pending_approval"){
        navigate(`/dashboard/project-information/${projectId}`)
    }
}

  return (
    <div className="container productInfo">
                <div className='' style={{display:'flex',
                                  justifyContent:'space-between', 
                                  alignItems:'', width:'100%', 
                                  backgroundColor:'#fff',
                                  height:'',
                                  padding:'30px 5px 0 5px',
                                  borderRadius:'5px'
                                  }}>
            <Link style={{height:'35px'}} to={`/dashboard/create-project/step9/${projectId}`} className='label-info-link'>Back</Link>
                <HorizontalLinearStepper step={3}/>
                <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>escape</Link>
        </div>
        <form className="others-form" onSubmit={handleSubmit}>
            <h2>Intended Purpose</h2>            
            <div className="form-field">
                <label htmlFor="service" className='question-bg mb-1'>- Intended purpose of the device:</label>
                {intendedPurposeData?.map((singleIntendedPurpose, index) => (
                <div key={index} className="services">
                    <div className="first-division mb-1 mx-2" style={{display:'flex'}}>
                        <select onChange={(e) => handleIntendedPurposeData(e, index)} name="language" id="language" className='' style={{border:'1px solid lightGray', borderRadius:'5px', marginRight:'5px', minWidth:'120px', maxWidth:'200px', backgroundColor:'lightGray', cursor:'pointer'}}>
                            <option  value=''>Language</option>
                            {languages?.map(lang => (
                                <option key={lang.languageName}  value={lang.languageName}>{lang.languageName}</option>
                            ))}
                        </select>
                        <input
                            name="intendedPurposeValue"
                            style={{width:'90%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                            type="text"
                            id="service"
                            value={singleIntendedPurpose.intendedPurposeValue}
                            onChange={(e) => handleIntendedPurposeData(e, index)}
                        />
                        {intendedPurposeData.length !== 1 && (
                            <button
                                type="button"
                                style={{backgroundColor:'#FBB8B8', borderRadius:'6px'}}
                                onClick={() => handleIntendedPurposeDataRemove(index)}
                                className="remove-btn mx-2"
                                >
                                <span><DeleteIcon style={{color:'#2D2D2E'}} /></span>
                            </button>
                        )}
                    </div>
                    <div className="second-division">
                    {intendedPurposeData.length - 1 === index && (
                        <button
                                type="button"
                                style={{borderRadius:'5px', backgroundColor:'#79D4A3', fontSize:'14px'}}
                                onClick={handleIntendedPurposeDataAdd}
                                className="add-btn mx-2 mb-1"
                            >
                            <span>Add</span>
                        </button>
                    )}
                    </div>
                </div>
                ))}
            </div>

                {!intendedPurposeRequest 
            ?<div style={{width:"100%", display:'flex', justifyContent:"center", alignItems:'center', marginTop:"30px"}}>
                <button style={{padding:'4px 20px', borderRadius:'4px', backgroundColor:'#011D41', color:'#fff', fontWeight:"600"}}>Save</button>
            </div>
            :<div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
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

export default UpdateIntendedPurpose