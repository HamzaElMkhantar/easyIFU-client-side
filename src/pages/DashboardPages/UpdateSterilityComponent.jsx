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


    const [formData, setFormData] = useState({
        projectId,
        isUpdate: true,
        isSterile: false,
        hasSterilizationProcess: false,
        hasAsepticProcessing: false,
        hasEthyleneOxide: false,
        hasIrradiation: false,
        hasSteamOrDryHeat: false,
        hasEthyleneOxideFluid: false,
        hasIrradiationFluid: false,
        hasSteamOrDryHeatFluid: false,
        isIntendedToBeResterilized: false,
        hasSterileFluidPath: false,
        hasVaporizedHydrogenPeroxide: false,
        hasSterileBarrierSystem: false,
        hasSingleSterileBarrierSystem: false,
        hasTwoSterileBarrierSystems: false,
        hasSingleSterileBarrierSystemWithProtectiveInside: false,
        hasSingleSterileBarrierSystemWithProtectiveOutside: false,
    });

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
            hasEthyleneOxideFluid: projectInformation?.labelData?.hasEthyleneOxideFluid || false,
            hasIrradiationFluid: projectInformation?.labelData?.hasIrradiationFluid || false,
            hasSteamOrDryHeatFluid: projectInformation?.labelData?.hasSteamOrDryHeatFluid || false,
            isIntendedToBeResterilized: projectInformation?.labelData?.isIntendedToBeResterilized || false,
            canBeUsedIfDamaged: projectInformation?.labelData?.canBeUsedIfDamaged || false,
            hasSterileFluidPath: projectInformation?.labelData?.hasSterileFluidPath || false,
            hasVaporizedHydrogenPeroxide: projectInformation?.labelData?.hasVaporizedHydrogenPeroxide || false,
            hasSterileBarrierSystem: projectInformation?.labelData?.hasSterileBarrierSystem || false,
            hasSingleSterileBarrierSystem: projectInformation?.labelData?.hasSingleSterileBarrierSystem || false,
            hasTwoSterileBarrierSystems: projectInformation?.labelData?.hasTwoSterileBarrierSystems || false,
            hasSingleSterileBarrierSystemWithProtectiveInside: projectInformation?.labelData?.hasSingleSterileBarrierSystemWithProtectiveInside || false,
            hasSingleSterileBarrierSystemWithProtectiveOutside: projectInformation?.labelData?.hasSingleSterileBarrierSystemWithProtectiveOutside || false,
        });
      }, [projectInformation])

    // const handleCheckboxChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //     ...formData,
    //     [name]: value === 'Yes',
    //     });
    // };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
      
        const exclusiveCheckboxes = [
          'hasAsepticProcessing',
          'hasEthyleneOxide',
          'hasIrradiation',
          'hasSteamOrDryHeat',
          'hasVaporizedHydrogenPeroxide',
        ];

        const exclusiveCheckboxesFluid = [
            'hasEthyleneOxideFluid',
            'hasIrradiationFluid',
            'hasSteamOrDryHeatFluid'
          ];

        const sterileBarrierSystem = [
            'hasSingleSterileBarrierSystem',
            'hasTwoSterileBarrierSystems',
            'hasSingleSterileBarrierSystemWithProtectiveInside',
            'hasSingleSterileBarrierSystemWithProtectiveOutside'
          ];
      
        if (exclusiveCheckboxes.includes(name)) {
          // If the checkbox is in the exclusive list, set its value to true and others to false
          setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData };
      
            exclusiveCheckboxes.forEach((checkbox) => {
              if (checkbox !== name) {
                updatedFormData[checkbox] = false;
              }
            });
      
            updatedFormData[name] = value === 'Yes';
      
            return updatedFormData;
          });

          return;
        } 
        if (exclusiveCheckboxesFluid.includes(name)) {
            // If the checkbox is in the exclusive list, set its value to true and others to false
            setFormData((prevFormData) => {
              const updatedFormData = { ...prevFormData };
        
              exclusiveCheckboxesFluid.forEach((checkbox) => {
                if (checkbox !== name) {
                  updatedFormData[checkbox] = false;
                }
              });
        
              updatedFormData[name] = value === 'Yes';
        
              return updatedFormData;
            });
  
            return;
          } 
          if (sterileBarrierSystem.includes(name)) {
            // If the checkbox is in the exclusive list, set its value to true and others to false
            setFormData((prevFormData) => {
              const updatedFormData = { ...prevFormData };
        
              sterileBarrierSystem.forEach((checkbox) => {
                if (checkbox !== name) {
                  updatedFormData[checkbox] = false;
                }
              });
        
              updatedFormData[name] = value === 'Yes';
        
              return updatedFormData;
            });
  
            return;
          } 
          // Handle other checkboxes that shouldn't follow the exclusive behavior
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
            toast.success(`updated success`)
        }

        if(sterilityFail){
            toast.warning(`${sterilityFail.message}`)
        }
    }, [sterilitySuccess, sterilityFail])

  return (
    <div className="container sterility">
        <div className='mb-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
            <Link style={{height:'35px'}} to={`/dashboard/project-information/${projectId}`} className='label-info-link'>Back</Link>
        </div>
        <form onSubmit={handleSubmit} className='sterility-form'>
            <h2>Sterility</h2>
           
                <div style={{textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}} className="form-group">
                    <label className='question-bg mb-1'>-Is the Product delivered Sterile?</label>
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
                {!formData.isSterile ? null
            :<div>
                <div className="form-group">
                    <label className='question-bg mb-1'>1- Has your product been subjected to a sterilization process?</label>
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
                        <label>- Has your product been sterilized using aseptic processing techniques?</label>
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
                            <label>- Has your product been sterilized using ethylene oxide?</label>
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
                            <label>- Has your product been sterilized using irradiation ?</label>
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
                            <label>- Has your product been sterilized using steam or dry heat ?</label>
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
                            <label>- Has your product been sterilized using vaporized hydrogen peroxide ?</label>
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
                </div>
                )}

                    <div className="form-group">
                            <label className='question-bg mb-1'>2- Is your product intended to be resterilized?</label>
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

                    <div className="form-group">
                            <label className='question-bg mb-1'>3- Is there a presence of a sterile fluid path within your product, even if the other parts of it,
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
                    {formData.hasSterileFluidPath && 
                    <>
                        <div className="form-group">
                            <label>- Has your product been sterilized fluid using ethylene oxide?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasEthyleneOxideFluid"
                                    value="Yes"
                                    checked={formData.hasEthyleneOxideFluid}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasEthyleneOxideFluid"
                                    value="No"
                                    checked={!formData.hasEthyleneOxideFluid}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>- Has your product been sterilized fluid using irradiation?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasIrradiationFluid"
                                    value="Yes"
                                    checked={formData.hasIrradiationFluid}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasIrradiationFluid"
                                    value="No"
                                    checked={!formData.hasIrradiationFluid}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>- Has your product been sterilized fluid using steam or dry heat?</label>
                            <div>
                                <div className="form-check">
                                <label className="form-check-label">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSteamOrDryHeatFluid"
                                    value="Yes"
                                    checked={formData.hasSteamOrDryHeatFluid}
                                    onChange={handleCheckboxChange}
                                />
                                </div>
                                <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="hasSteamOrDryHeatFluid"
                                    value="No"
                                    checked={!formData.hasSteamOrDryHeatFluid}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                    <div className="form-group">
                                <label className='question-bg mb-1'>4- Is there a sterile barrier system ?</label>
                                <div>
                                    <div className="form-check">
                                    <label className="form-check-label">Yes</label>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="hasSterileBarrierSystem"
                                        value="Yes"
                                        checked={formData.hasSterileBarrierSystem}
                                        onChange={handleCheckboxChange}
                                    />
                                    </div>
                                    <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="hasSterileBarrierSystem"
                                        value="No"
                                        checked={!formData.hasSterileBarrierSystem}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label">No</label>
                                    </div>
                                </div>
                        </div>
                   {formData.hasSterileBarrierSystem && 
                   <>
                        <div className="form-group">
                                <label>- Is there a single sterile barrier system ?</label>
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
                                <label>- Is there two sterile barrier systems ?</label>
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
                                <label>- Is there a single sterile barrier system with protective packaging inside ?</label>
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
                                <label>- Is there a single sterile barrier system with protective packaging outside ?</label>
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
                    </>}
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
