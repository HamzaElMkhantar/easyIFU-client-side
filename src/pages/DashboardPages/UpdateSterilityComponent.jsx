import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectAction, sterilityAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const UpdateSterilityComponent = () => {
    const {projectId} = useParams();
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {sterility, getProject} = useSelector(state => state);
    const {sterilityRequest, sterilitySuccess, sterilityFail, projectInfo} = sterility


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
        isSterile: false,
        hasSterilizationProcess: false,
        hasAsepticProcessing: false,
        hasEthyleneOxide: false,
        hasIrradiation: false,
        hasSteamOrDryHeat: false,
        isIntendedToBeResterilized: false,
        canBeUsedIfDamaged: false,
        hasSterileFluidPath: false,
        hasVaporizedHydrogenPeroxide: false,
        hasSingleSterileBarrierSystem: false,
        hasTwoSterileBarrierSystems: false,
        hasSingleSterileBarrierSystemWithProtectiveInside: false,
        hasSingleSterileBarrierSystemWithProtectiveOutside: false,
    });

    useEffect(() => {
        // Set formData with existing project information
        setFormData({
            isUpdate: true,
            projectId,
            isSterile: projectInformation?.labelData?.isSterile || false,
            hasSterilizationProcess: projectInformation?.labelData?.hasSterilizationProcess || false,
            hasAsepticProcessing: projectInformation?.labelData?.hasAsepticProcessing || false,
            hasEthyleneOxide: projectInformation?.labelData?.hasEthyleneOxide || false,
            hasIrradiation: projectInformation?.labelData?.hasIrradiation || false,
            hasSteamOrDryHeat: projectInformation?.labelData?.hasSteamOrDryHeat || false,
            isIntendedToBeResterilized: projectInformation?.labelData?.isIntendedToBeResterilized || false,
            canBeUsedIfDamaged: projectInformation?.labelData?.canBeUsedIfDamaged || false,
            hasSterileFluidPath: projectInformation?.labelData?.hasSterileFluidPath || false,
            hasVaporizedHydrogenPeroxide: projectInformation?.labelData?.hasVaporizedHydrogenPeroxide || false,
            hasSingleSterileBarrierSystem: projectInformation?.labelData?.hasSingleSterileBarrierSystem || false,
            hasTwoSterileBarrierSystems: projectInformation?.labelData?.hasTwoSterileBarrierSystems || false,
            hasSingleSterileBarrierSystemWithProtectiveInside: projectInformation?.labelData?.hasSingleSterileBarrierSystemWithProtectiveInside || false,
            hasSingleSterileBarrierSystemWithProtectiveOutside: projectInformation?.labelData?.hasSingleSterileBarrierSystemWithProtectiveOutside || false,
        });
      }, [projectInformation])


    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value === 'Yes',
        });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(sterilityAction(formData, token))
    }

    useEffect(() => {
        if(sterilitySuccess){
            // navigate(`/dashboard/create-project/step4/${projectInfo._id}`)
            toast.success(`updated success`)
        }

        if(sterilityFail){
            toast.warning(`${sterilityFail.message}`)
        }
    }, [sterilitySuccess, sterilityFail])

  return (
    <div className="container sterility">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
            {/* <Link style={{height:'35px'}} to={`/dashboard/create-project/step2/65764c7df80c7c51796e9bda`} className='label-info-link'> Back</Link> */}
            <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>Back</Link>
        </div>
        {/* <HorizontalLinearStepper step={2}/> */}
        <form onSubmit={handleSubmit} className='sterility-form'>
            <h2>Sterility</h2>
            {!formData.isSterile ?
                <div className="form-group">
                    <label>the Product is Sterile?</label>
                    <div>
                        <div className="form-check">
                            <label className="form-check-label">Yes</label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isSterile"
                                value="Yes"
                                checked={formData.isSterile}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isSterile"
                                value="No"
                                checked={!formData.isSterile}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label">No</label>
                        </div>
                    </div>
                </div>

            :<div>
                <div className="form-group">
                    <label>1- Has your product been subjected to a sterilization process?</label>
                    <div>
                        <div className="form-check">
                        <label className="form-check-label">Yes</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasSterilizationProcess"
                            value="Yes"
                            checked={formData.hasSterilizationProcess}
                            onChange={handleCheckboxChange}
                        />
                        </div>
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasSterilizationProcess"
                            value="No"
                            checked={!formData.hasSterilizationProcess}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">No</label>
                        </div>
                    </div>
                </div>

                {formData.hasSterilizationProcess && (
                <div>
                    <div className="form-group">
                            <label>2- Has your product been sterilized using aseptic processing techniques?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasAsepticProcessing"
                                    value="Yes"
                                    checked={formData.hasAsepticProcessing}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasAsepticProcessing"
                                    value="No"
                                    checked={!formData.hasAsepticProcessing}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>3- Has your product been sterilized using ethylene oxide?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasEthyleneOxide"
                                    value="Yes"
                                    checked={formData.hasEthyleneOxide}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasEthyleneOxide"
                                    value="No"
                                    checked={!formData.hasEthyleneOxide}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>4- Has your product been sterilized using irradiation ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasIrradiation"
                                    value="Yes"
                                    checked={formData.hasIrradiation}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasIrradiation"
                                    value="No"
                                    checked={!formData.hasIrradiation}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>5- Has your product been sterilized using steam or dry heat ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSteamOrDryHeat"
                                    value="Yes"
                                    checked={formData.hasSteamOrDryHeat}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSteamOrDryHeat"
                                    value="No"
                                    checked={!formData.hasSteamOrDryHeat}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>6- Is your product intended to be resterilized?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="isIntendedToBeResterilized"
                                    value="Yes"
                                    checked={formData.isIntendedToBeResterilized}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="isIntendedToBeResterilized"
                                    value="No"
                                    checked={!formData.isIntendedToBeResterilized}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                </div>
                )}

                    <div className="form-group">
                            <label>7- Can your product be used if the package has been damaged or opened ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="Yes"
                                    checked={formData.canBeUsedIfDamaged}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="No"
                                    checked={!formData.canBeUsedIfDamaged}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>8- Is there a presence of a sterile fluid path within your product, even if the other parts of it,
                                    including the exterior, might not be supplied sterile ?
                            </label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSterileFluidPath"
                                    value="Yes"
                                    checked={formData.hasSterileFluidPath}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSterileFluidPath"
                                    value="No"
                                    checked={!formData.hasSterileFluidPath}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>9- Has your product been sterilized using vaporized hydrogen peroxide ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasVaporizedHydrogenPeroxide"
                                    value="Yes"
                                    checked={formData.hasVaporizedHydrogenPeroxide}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasVaporizedHydrogenPeroxide"
                                    value="No"
                                    checked={!formData.hasVaporizedHydrogenPeroxide}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>10- Is there a single sterile barrier system ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystem"
                                    value="Yes"
                                    checked={formData.hasSingleSterileBarrierSystem}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystem"
                                    value="No"
                                    checked={!formData.hasSingleSterileBarrierSystem}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>11- Is there two sterile barrier systems ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasTwoSterileBarrierSystems"
                                    value="Yes"
                                    checked={formData.hasTwoSterileBarrierSystems}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasTwoSterileBarrierSystems"
                                    value="No"
                                    checked={!formData.hasTwoSterileBarrierSystems }
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>12- Is there a single sterile barrier system with protective packaging inside ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystemWithProtectiveInside"
                                    value="Yes"
                                    checked={formData.hasSingleSterileBarrierSystemWithProtectiveInside}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystemWithProtectiveInside"
                                    value="No"
                                    checked={!formData.hasSingleSterileBarrierSystemWithProtectiveInside}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>

                    <div className="form-group">
                            <label>13- Is there a single sterile barrier system with protective packaging outside ?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystemWithProtectiveOutside"
                                    value="Yes"
                                    checked={formData.hasSingleSterileBarrierSystemWithProtectiveOutside}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSingleSterileBarrierSystemWithProtectiveOutside"
                                    value="No"
                                    checked={!formData.hasSingleSterileBarrierSystemWithProtectiveOutside}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                    </div>
            </div>
                }


                {!sterilityRequest
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

export default UpdateSterilityComponent;
