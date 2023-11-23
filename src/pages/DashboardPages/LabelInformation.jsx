import React, { useEffect, useState } from 'react';
import './project.css'
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getProjectAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

// manufacturer and product info symbols
import Manufacturer from '../../assets/eIFUSymbols/Manufacturer.png'
import Distributor from '../../assets/eIFUSymbols/Distributor.png'
import Authorized_Representative from '../../assets/eIFUSymbols/Authorized_Representative.png'
import Importer from '../../assets/eIFUSymbols/Importer.png'
import CE_mark from '../../assets/eIFUSymbols/CE_mark.svg'
import catalogueNumberSymbol from '../../assets/eIFUSymbols/catalogue_number.png'
import modelNumberSymbol from '../../assets/eIFUSymbols/model_number.png'
import Serial_numberSymbol from '../../assets/eIFUSymbols/Serial_number.png'
import Batch_codeSymbol from '../../assets/eIFUSymbols/Batch_code.png'
import Date_of_manufactureSymbol from '../../assets/eIFUSymbols/Date_of_manufacture.png'
import Medical_deviceSymbol from '../../assets/eIFUSymbols/Medical_device.png'
import nonSterileSymbol from '../../assets/eIFUSymbols/nonSterile.jpeg'
// sterile symbols
import sterileSymbol from '../../assets/eIFUSymbols/sterile.png'
import sterile_ASymbol from '../../assets/eIFUSymbols/sterile_A.png'
import Sterile_RSymbol from '../../assets/eIFUSymbols/Sterile_R.png'
import Sterile_EOSymbol from '../../assets/eIFUSymbols/sterile_EO.png'
import Sterilized_usings_team_or_dry_heatSymbol from '../../assets/eIFUSymbols/Sterilized_usings_team_or_dry_heat.png'
import package_is_damageSymbol from '../../assets/eIFUSymbols/packege_is_damage.png'
import do_not_resterilizeSymbol from '../../assets/eIFUSymbols/do_not_resterilize.png'
import sterile_fluid_pathSymbol from '../../assets/eIFUSymbols/sterile_fluid_path.png'
import VaporizedHydrogenPeroxideSymbol from '../../assets/eIFUSymbols/VaporizedHydrogenPeroxide.png'
import single_S_B_S from '../../assets/eIFUSymbols/singleSBS.png'
import double_S_B_S from '../../assets/eIFUSymbols/doubleSBS.jpeg'
import double_S_B_S_outside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-outside.png'
import double_S_B_S_inside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-inside.png'
// storage symbols
import fragile_handle_with_care from '../../assets/eIFUSymbols/fragile_handle_with_care.png'
import keep_away_from_sunlight from '../../assets/eIFUSymbols/keep_away_from_sunlight.png'
import protect_from_heat_and_radioactive_soures from '../../assets/eIFUSymbols/protect_from_heat_and_radioactive_soures.png'
import keep_dry from '../../assets/eIFUSymbols/keep_dry.png'
import lower_limit_temperaure from '../../assets/eIFUSymbols/lower_limit_temperaure.png'
import upper_limit_temperaure from '../../assets/eIFUSymbols/upper_limit_temperaure.png'
import temperature from '../../assets/eIFUSymbols/temperature.png'
import HumidityLimit from '../../assets/eIFUSymbols/HumidityLimit.png'
import AtmPressureLimit from '../../assets/eIFUSymbols/AtmPressureLimit.png'

// Safe Use Symbols
import biological_risks from '../../assets/eIFUSymbols/biological_risks.png'
import do_not_re_use from '../../assets/eIFUSymbols/do_not_re-use.png'
import consult_instruction_for_use from '../../assets/eIFUSymbols/consult_instruction_for_use.png'
import caution from '../../assets/eIFUSymbols/caution.png'
import contains_or_presence_of_natural_rubber_latex from '../../assets/eIFUSymbols/contains_or_presence_of_natural_rubber_latex.png'
import contains_human_blood from '../../assets/eIFUSymbols/contains_human_blood.png'
import Contains_a_medicinal_substance from '../../assets/eIFUSymbols/Contains_a_medicinal_substance.png'
import Contains_biological_material_of_animal_origin from '../../assets/eIFUSymbols/Contains_biological_material_of_animal_origin.png'
import Contains_human_origin from '../../assets/eIFUSymbols/Contains_human_origin.jpeg'
import Contains_hazardous_substances from '../../assets/eIFUSymbols/Contains_hazardous_substances.jpeg'
import Contains_nano_materials from '../../assets/eIFUSymbols/Contains_nano_materials.png'
import Single_patient_multiple_use from '../../assets/eIFUSymbols/Single_patient_multiple_use.jpeg'

// In Vitro Diagnostic IVD Symbols
import control from '../../assets/eIFUSymbols/control.png'
import control_negative from '../../assets/eIFUSymbols/control-negative.png'
import control_positive from '../../assets/eIFUSymbols/positive-control.png'
import contains_suffient_for_n_tests from '../../assets/eIFUSymbols/contains_suffient_for_n_tests.png'
import for_IVD_performance_evaluation_only from '../../assets/eIFUSymbols/for_IVD_performance_evaluation_only.png'

// Transfusion Infusion Symbols
import sampling_site from '../../assets/eIFUSymbols/sampling_site.png'
import fluid_path from '../../assets/eIFUSymbols/fluid_path.png'
import Non_pyrogenic from '../../assets/eIFUSymbols/Non_pyrogenic.png'
import Drops_per_millilitre from '../../assets/eIFUSymbols/Drops_per_millilitre.png'
import Liquid_filter_with_pore_size from '../../assets/eIFUSymbols/Liquid_filter_with_pore_size.png'
import one_way_valve from '../../assets/eIFUSymbols/one-way-valve.png'

// Other (step-8) Symbols
import patient_identification from '../../assets/eIFUSymbols/patient_identification.png'
import Patient_information_website from '../../assets/eIFUSymbols/Patient_information_website.jpeg'
import Health_care_centre_or_doctor from '../../assets/eIFUSymbols/Health_care_centre_or_doctor.png'
import date from '../../assets/eIFUSymbols/date.jpg'
import Translation from '../../assets/eIFUSymbols/Translation.png'
import Repackaging from '../../assets/eIFUSymbols/Repackaging.png'
import udi from '../../assets/eIFUSymbols/udi.png'


const LabelInformation = () => {

  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {getProject} = useSelector(state => state);
  const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;

  const [projectInfo, setProjectInfo] = useState({});

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProjectAction(projectId, token))
  }, [])

  useEffect(() => {
    if(getProjectSuccess){
      setProjectInfo(project)
    }

    if(getProjectFail){
      toast.warning(`${getProjectFail.message}`)
    }
  }, [getProjectSuccess, getProjectFail])

    const handleManufacturerInfo = () => {
      if(projectInfo && projectInfo.labelData){
        if(projectInfo.labelData.isOutsideEU){
          return (
            <div className='symbol-content'>
  
              {/* <div className='symbol-content-item'>
                <img className='symbol-img' src={Manufacturer} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.manufacturerName}</p>
                  <p>{projectInfo.labelData.manufacturerAddress}</p>
                </div>
              </div> */}
  
              {/* { projectInfo.labelData.hasDistributor &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Distributor} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.distributorAddress}</p>
                  <p>{projectInfo.labelData.distributorAddress}</p> 
                </div>
              </div>
              } */}
  
              {/* <div className='symbol-content-item'>
                <img className='symbol-img' src={Importer} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.importerName}</p>
                  <p>{projectInfo.labelData.importerAddress}</p> 
                </div>
              </div>
  
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Authorized_Representative} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                  <p>{projectInfo.labelData.europeanAuthorizedRepAddress}</p> 
                </div>
              </div> */}
  
              {/* {projectInfo.labelData.productClass == 'Class I'
              ?( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                 </div>)
  
              :( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                    <div className='symbol-info'>
                      <p>{projectInfo.labelData.notifiedBodyNumber}</p>
                    </div>
                 </div>)} */}
            </div>
          )
        }else{
          return (
            <div className='symbol-content'>
{/*   
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Manufacturer} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.manufacturerName}</p>
                  <p>{projectInfo.labelData.manufacturerAddress}</p> 
                </div>
              </div>
  
              {projectInfo.labelData.hasDistributor &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Distributor} />
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.distributorName}</p>
                  <p>{projectInfo.labelData.distributorAddress}</p> 
                </div>
              </div>
              } */}
  
              {/* {projectInfo.labelData.productClass == 'Class I'
              ?( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                 </div>)
  
              :( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                    <div className='symbol-info'>
                      <p>{projectInfo.labelData.notifiedBodyNumber}</p>
                    </div>
                 </div>)} */}
            </div>
          )
        }
      }

      return null;
    }
    const handleProductInfo = () => {
      if(projectInfo && projectInfo.labelData){
        return(
          <div className='symbol-content'>
            <div className='right-side'>
              {/* {projectInfo.labelData.productName &&
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.productName}</p>
                </div>}

              {projectInfo.labelData.intendedPurpose &&
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.intendedPurpose}</p>
                </div>}

              {projectInfo.labelData.packagingContents &&
                <div className='symbol-info'>
                  <p>{projectInfo.labelData.packagingContents}</p>
                </div>} */}

              {/* {projectInfo.labelData.dateOfManufacture &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Date_of_manufactureSymbol} />
                  <div className='symbol-info'>
                    <p>{projectInfo.labelData.dateOfManufacture}</p>
                  </div>
                </div>}

              {projectInfo.labelData.catalogueNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={catalogueNumberSymbol} />
                  <div className='symbol-info'>
                    <p>{projectInfo.labelData.catalogueNumber}</p>
                  </div>
                </div>}

              {projectInfo.labelData.modelNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={modelNumberSymbol} />
                  <div className='symbol-info'>
                    <p>{projectInfo.labelData.modelNumber}</p>
                  </div>
                </div>}

                {projectInfo.labelData.LOTNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Batch_codeSymbol} />
                  <div className='symbol-info'>
                    <p>{projectInfo.labelData.LOTNumber}</p>
                  </div>
                </div>}

                {projectInfo.labelData.serialNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Serial_numberSymbol} />
                  <div className='symbol-info'>
                    <p>{projectInfo.labelData.serialNumber}</p>
                  </div>
                </div>} */}

                {/* {projectInfo.labelData.productType == "Medical device" &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Medical_deviceSymbol} />
                </div>} */}

            </div>
            
          </div>
        )
      }
      return null;
    }
    const handleSterility = () => {
      if(projectInfo && projectInfo.labelData){
        if(projectInfo.labelData.isSterile == false){
          return null;
        }else{
          if(projectInfo.labelData.hasSterilizationProcess){
            return (<div className='symbols-Sterile' style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap'}}>

                      {/* {(projectInfo.labelData.hasVaporizedHydrogenPeroxide  == true
                        || projectInfo.labelData.hasAsepticProcessing  == true
                        || projectInfo.labelData.hasEthyleneOxide  == true
                        || projectInfo.labelData.hasIrradiation  == true
                        || projectInfo.labelData.hasSteamOrDryHeat  == true
                        )

                        ? null
                        : <div className='symbol-content-item'>
                            <img className='symbol-img' src={sterileSymbol} />
                          </div>
                      } */}
                      {/* {projectInfo.labelData.hasSterilizationProcess == true && 
                        projectInfo.labelData.hasAsepticProcessing &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={sterile_ASymbol} />
                        </div>}

                      {projectInfo.labelData.hasSterilizationProcess == true && 
                        projectInfo.labelData.hasEthyleneOxide &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Sterile_EOSymbol} />
                        </div>}

                      {projectInfo.labelData.hasSterilizationProcess == true && 
                        projectInfo.labelData.hasIrradiation &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Sterile_RSymbol} />
                        </div>}

                      {projectInfo.labelData.hasSterilizationProcess == true && 
                        projectInfo.labelData.hasSteamOrDryHeat &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Sterilized_usings_team_or_dry_heatSymbol} />
                        </div>}

                      {projectInfo.labelData.hasSterilizationProcess == true && 
                        projectInfo.labelData.isIntendedToBeResterilized &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={do_not_resterilizeSymbol} />
                        </div>} */}

                        
                       

            </div>)
          }else{
            return (<div className='symbols-Sterile' style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap'}}>
                      
                      {/* {projectInfo.labelData.hasSterilizationProcess == false && 
                        <div className='symbol-content-item'>
                          <img className='symbol-img' src={nonSterileSymbol} />
                        </div>
                      }

                      {projectInfo.labelData.canBeUsedIfDamaged &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={package_is_damageSymbol} />
                        </div>}

                      {projectInfo.labelData.hasSterileFluidPath &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={sterile_fluid_pathSymbol} />
                        </div>}

                      {projectInfo.labelData.hasVaporizedHydrogenPeroxide &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={VaporizedHydrogenPeroxideSymbol} />
                        </div>}

                      {projectInfo.labelData.hasSingleSterileBarrierSystem &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={single_S_B_S} />
                        </div>}

                      {projectInfo.labelData.hasTwoSterileBarrierSystems &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={double_S_B_S} />
                        </div>}

                      {projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveInside &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={double_S_B_S_inside} />
                        </div>}

                      {projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveOutside &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={double_S_B_S_outside} /> */}
                        {/* </div>} */}
            </div>)
          }
        }
      }

      return null;
    }
    const handleStorage = () => {
      // if(projectInfo && projectInfo.labelData){
        // return (
          // <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap', marginTop:'15px'}}>
          //       {projectInfo.labelData.requiresCarefulHandling &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={fragile_handle_with_care} />
          //         </div>}

          //       {projectInfo.labelData.requiresProtectionFromLight &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={keep_away_from_sunlight} />
          //         </div>}

          //       {projectInfo.labelData.requiresProtectionFromHeatAndRadioactiveSources &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={protect_from_heat_and_radioactive_soures} />
          //         </div>}

          //       {projectInfo.labelData.requiresProtectionFromMoisture &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={keep_dry} />
          //         </div>}

          //       {projectInfo.labelData.hasLowerLimitOfTemperature &&
          //         projectInfo.labelData.hasUpperLimitOfTemperature == false &&
          //         <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
          //           <div style={{display:'flex', alignItems:'flex-end'}}>
          //             <p style={{marginBottom:'-3px', marginRight:'-13px', zIndex:'2'}} >{projectInfo.labelData.lowerTemperatureLimit}</p>
          //           </div>
          //           <img className='symbol-img' src={lower_limit_temperaure} />
          //         </div>}

          //       {projectInfo.labelData.hasUpperLimitOfTemperature &&
          //         projectInfo.labelData.hasLowerLimitOfTemperature == false &&
          //         <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
          //           <img className='symbol-img' src={upper_limit_temperaure} />
          //           <div style={{display:'flex', justifyContent:'flex-end'}}>
          //             <p style={{marginTop:'-2px' ,marginLeft:'-13px', zIndex:'2'}} >{projectInfo.labelData.upperTemperatureLimit}</p>
          //           </div>
          //         </div>}

          //       {projectInfo.labelData.hasUpperLimitOfTemperature == true &&
          //         projectInfo.labelData.hasLowerLimitOfTemperature == true &&
          //         <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
          //           <div style={{display:'flex', alignItems:'flex-end'}}>
          //             <p style={{marginBottom:'-3px', marginRight:'-13px', zIndex:'2'}} >{projectInfo.labelData.lowerTemperatureLimit}</p>
          //           </div>
          //           <img className='symbol-img' src={temperature} />
          //           <div style={{display:'flex', justifyContent:'flex-end'}}>
          //             <p style={{marginTop:'-2px' ,marginLeft:'-13px', zIndex:'2'}} >{projectInfo.labelData.upperTemperatureLimit}</p>
          //           </div>
          //         </div>}

          //       {projectInfo.labelData.hasHumidityRange &&
          //         <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
          //           <div style={{display:'flex', alignItems:'flex-end'}}>
          //             <p style={{marginBottom:'-10px', marginRight:'px', zIndex:'2'}} >{projectInfo.labelData.humidityMin}</p>
          //           </div>
          //           <img className='symbol-img' src={HumidityLimit} />
          //           <div style={{display:'flex', justifyContent:'flex-end'}}>
          //             <p style={{marginTop:'-11px', zIndex:'2'}} >{projectInfo.labelData.humidityMax}</p>
          //           </div>
          //         </div>}

          //       {projectInfo.labelData.hasAtmosphericPressureRange &&
          //         <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
          //         <div style={{display:'flex', alignItems:'flex-end'}}>
          //           <p style={{marginBottom:'-10px', marginRight:'px', zIndex:'2'}} >{projectInfo.labelData.humidityMin}</p>
          //         </div>
          //         <img className='symbol-img' src={AtmPressureLimit} />
          //         <div style={{display:'flex', justifyContent:'flex-end'}}>
          //           <p style={{marginTop:'-11px', zIndex:'2'}} >{projectInfo.labelData.humidityMax}</p>
          //         </div>
          //       </div>}
                
          // </div>)
      // }

      return null;
    }
    const handleSafeUse = () => {
      // if(projectInfo && projectInfo.labelData){
        // return (
          // <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap', marginTop:'15px'}}>
                
          //       {projectInfo.labelData.hasBiologicalRisks &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={biological_risks} />
          //         </div>}

          //       {projectInfo.labelData.isIntendedForSingleUse &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={do_not_re_use} />
          //         </div>}

          //       {projectInfo.labelData.needCaution &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={caution} />
          //         </div>}

          //       {projectInfo.labelData.containsRubberLatex &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={contains_or_presence_of_natural_rubber_latex} />
          //         </div>}

          //       {projectInfo.labelData.containsBloodDerivatives &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={contains_human_blood} />
          //         </div>}

          //       {projectInfo.labelData.containsMedicinalSubstance &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Contains_a_medicinal_substance} />
          //         </div>}

          //       {projectInfo.labelData.containsAnimalOriginMaterial &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Contains_biological_material_of_animal_origin} />
          //         </div>}

          //       {projectInfo.labelData.containsHumanOriginMaterial &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Contains_human_origin} />
          //         </div>}

          //       {projectInfo.labelData.containsHazardousSubstances &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Contains_hazardous_substances} />
          //         </div>}

          //       {projectInfo.labelData.containsNanoMaterials &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Contains_nano_materials} />
          //         </div>}

          //       {projectInfo.labelData.multipleUsesOnSinglePatient &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={Single_patient_multiple_use} />
          //         </div>}

          //       {projectInfo.labelData.needInstructionsForUse &&
          //         <div className='symbol-content-item'>
          //           <img className='symbol-img' src={consult_instruction_for_use} />
          //           {projectInfo.labelData.eIFULink &&
          //             <p>{projectInfo.labelData.eIFULink}</p>
          //           }
          //         </div>}
          // </div>)
      // }

      return null;
    }
    const handleInVitroDiagnosticIVD = () => {
      if(projectInfo && projectInfo.labelData){
        if(projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device"){
        return (
          <div className='symbols-Sterile' style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap', marginTop:'15px'}}>
{/*                 
                {projectInfo.labelData.isControlMaterial &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={control} />
                  </div>}

                {projectInfo.labelData.isControlMaterialForNegativeRange &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={control_negative} />
                  </div>}

                {projectInfo.labelData.isControlMaterialForPositiveRange &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={control_positive} />
                  </div>} */}
{/* 
                {projectInfo.labelData.hasSpecificNumberOfTests &&
                  <div className='symbol-content-item' style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                        <img style={{width:'85%', height:'30px', marginBottom:'-10px', marginTop:'35px'}} className='symbol-img' src={contains_suffient_for_n_tests} />
                          {projectInfo.labelData.numberOfTests && 
                            <p style={{marginTop:"-6px"}}>{projectInfo.labelData.numberOfTests}</p>}
                  </div>} */}
{/* 
                {projectInfo.labelData.isIVDForPerformanceEvaluation &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={for_IVD_performance_evaluation_only} />
                  </div>} */}
          </div>)
        }
      }
      return null;
    }
    const handleTransfusionInfusion = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap', marginTop:'15px'}}>
                
                {/* {projectInfo.labelData.isMedicalDeviceForSampleCollection &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={sampling_site} />
                  </div>}

                {projectInfo.labelData.hasFluidPath &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={fluid_path} />
                  </div>}

                {projectInfo.labelData.isNonPyrogenic &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Non_pyrogenic} />
                  </div>} */}

                {/* {projectInfo.labelData.numberOfDropsPerMilliliter !== "Not applicable" &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Drops_per_millilitre} />
                      <div>
                        <p>{projectInfo.labelData.numberOfDropsPerMilliliter}</p>
                      </div>
                  </div>}

                {projectInfo.labelData.liquidFilterPoreSize !== "Not applicable" &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Liquid_filter_with_pore_size} />
                      <div>
                        <p>{projectInfo.labelData.liquidFilterPoreSize}</p>
                      </div>
                  </div>} */}

                {/* {projectInfo.labelData.hasOneWayValve &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={one_way_valve} />
                  </div>} */}
          </div>)
      }
      return null;
    }
    const handleOthers = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexWrap:'wrap', marginTop:'15px'}}>

            {/* {projectInfo.labelData.associatedWithIndividualPatient &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={patient_identification} />
                <div>
                  <p>{projectInfo.labelData.patientName}</p>
                  <p>{projectInfo.labelData.patientNumber}</p>
                </div>
              </div>}

              {projectInfo.labelData.associatedWithIndividualPatient &&
                ( projectInfo.labelData.healthCareCentreName !== ''
                  || projectInfo.labelData.healthCareCentreAddress !== ''
                  || projectInfo.labelData.doctorName !== ''
                ) &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Health_care_centre_or_doctor} />
                <div>
                  {projectInfo.labelData.healthCareCentreName && 
                    <p>{projectInfo.labelData.healthCareCentreName}</p>
                  }
                  {projectInfo.labelData.healthCareCentreAddress && 
                    <p>{projectInfo.labelData.healthCareCentreAddress}</p>
                  }
                  {projectInfo.labelData.doctorName && 
                    <p>{projectInfo.labelData.doctorName}</p>
                  }
                </div>
              </div>} */}


            {/* {projectInfo.labelData.associatedWithIndividualPatient &&
              projectInfo.labelData.date &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={date} />
                <div>
                  <p>{projectInfo.labelData.date}</p>
                </div>
              </div>}

            {projectInfo.labelData.addWebsite &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Patient_information_website} />
                <div>
                  <p>{projectInfo.labelData.website}</p>
                </div>
              </div>} */}
{/* 
            {projectInfo.labelData.translationActivity &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Translation} />
                <div>
                  {projectInfo.labelData.translationEntityName &&
                    <p>{projectInfo.labelData.translationEntityName}</p>}
                  {projectInfo.labelData.translationEntityAddress &&
                    <p>{projectInfo.labelData.translationEntityAddress}</p>}
                </div>
              </div>}

            {projectInfo.labelData.modificationToPackaging &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Repackaging} />
                <div>
                  {projectInfo.labelData.repackagingEntityName &&
                    <p>{projectInfo.labelData.repackagingEntityName}</p>}
                  {projectInfo.labelData.repackagingEntityAddress &&
                    <p>{projectInfo.labelData.repackagingEntityAddress}</p>}
                </div>
              </div>}

            {projectInfo.labelData.reprocessedDevice &&
              <div className='symbol-content-item'>
                <img className='symbol-img' src={Repackaging} />
                <div>
                  {projectInfo.labelData.reprocessingCycles &&
                    <p>number of reprocessing cycles: {projectInfo.labelData.reprocessingCycles}</p>}
                  {projectInfo.labelData.reprocessingLimitation &&
                    <p>{projectInfo.labelData.reprocessingLimitation}</p>}
                </div>
              </div>} */}

            {/* {projectInfo.labelData.customMadeDevice &&
              <div className='symbol-content-item'>
                <p>custom-made device</p>
              </div>}

            {projectInfo.labelData.clinicalInvestigationOnly &&
              <div className='symbol-content-item'>
                <p>exclusively for clinical investigation</p>
              </div>} */}

            {/* {projectInfo.labelData.containsCMRSubstances &&
              <div className='symbol-content-item'>
                <p>{projectInfo.labelData.cmrSubstancesList}</p>
              </div>}

            {projectInfo.labelData.intendedForIntroduction &&
              <div className='symbol-content-item'>
                <p>{projectInfo.labelData.qualitativeComposition}</p>
                <p>{projectInfo.labelData.quantitativeInformation}</p>
              </div>}

            {projectInfo.labelData.quantity > 0 &&
              <div className='symbol-content-item'>
                <p>QTY: {projectInfo.labelData.quantity}</p>
              </div>} */}


          </div>
        )
      }

      return null;
    }

  


// handling the categories of the label symbol
    const symbolsWithImageAnd2ParagraphsOrMore = () => {
      if(projectInfo && projectInfo.labelData){
        return(
          <div className='symbol-content img-and-2-paragraphs'>
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Manufacturer} />
                  <div className=''>
                    <p>{projectInfo.labelData.manufacturerName}</p>
                    <p>{projectInfo.labelData.manufacturerAddress}</p>
                  </div>
                </div>

                { projectInfo.labelData.hasDistributor &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Distributor} />
                    <div className=''>
                      <p>{projectInfo.labelData.distributorAddress}</p>
                      <p>{projectInfo.labelData.distributorAddress}</p> 
                    </div>
                  </div>
                }

                {/* if outside of EUROPE */}
                {projectInfo.labelData.isOutsideEU &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Authorized_Representative} />
                    <div className=''>
                      <p>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                      <p>{projectInfo.labelData.europeanAuthorizedRepAddress}</p> 
                    </div>
                  </div>
                }
                {projectInfo.labelData.isOutsideEU &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Importer} />
                    <div className=''>
                      <p>{projectInfo.labelData.importerName}</p>
                      <p>{projectInfo.labelData.importerAddress}</p> 
                    </div>
                  </div>
                }

                {projectInfo.labelData.associatedWithIndividualPatient &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={patient_identification} />
                    <div>
                      <p>{projectInfo.labelData.patientName}</p>
                      <p>{projectInfo.labelData.patientNumber}</p>
                    </div>
                  </div>}

                {projectInfo.labelData.associatedWithIndividualPatient &&
                    ( projectInfo.labelData.healthCareCentreName !== ''
                      || projectInfo.labelData.healthCareCentreAddress !== ''
                      || projectInfo.labelData.doctorName !== ''
                    ) &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Health_care_centre_or_doctor} />
                    <div>
                      {projectInfo.labelData.healthCareCentreName && 
                        <p>{projectInfo.labelData.healthCareCentreName}</p>
                      }
                      {projectInfo.labelData.healthCareCentreAddress && 
                        <p>{projectInfo.labelData.healthCareCentreAddress}</p>
                      }
                      {projectInfo.labelData.doctorName && 
                        <p>{projectInfo.labelData.doctorName}</p>
                      }
                    </div>
                  </div>}


                  {projectInfo.labelData.translationActivity &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={Translation} />
                      <div>
                        {projectInfo.labelData.translationEntityName &&
                          <p>{projectInfo.labelData.translationEntityName}</p>}
                        {projectInfo.labelData.translationEntityAddress &&
                          <p>{projectInfo.labelData.translationEntityAddress}</p>}
                      </div>
                    </div>}

                  {projectInfo.labelData.modificationToPackaging &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={Repackaging} />
                      <div>
                        {projectInfo.labelData.repackagingEntityName &&
                          <p>{projectInfo.labelData.repackagingEntityName}</p>}
                        {projectInfo.labelData.repackagingEntityAddress &&
                          <p>{projectInfo.labelData.repackagingEntityAddress}</p>}
                      </div>
                    </div>}

                  {/* {projectInfo.labelData.reprocessedDevice &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={Repackaging} />
                      <div>
                        {projectInfo.labelData.reprocessingCycles &&
                          <p>number of reprocessing cycles: {projectInfo.labelData.reprocessingCycles}</p>}
                        {projectInfo.labelData.reprocessingLimitation &&
                          <p>{projectInfo.labelData.reprocessingLimitation}</p>}
                      </div>
                    </div>} */}
                

          </div>
        )
      }

      return null;
    }

    const symbolsWithImageAndParagraph = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div className='symbol-content img-with-paragraph'>
              {projectInfo.labelData.dateOfManufacture &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Date_of_manufactureSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.dateOfManufacture}</p>
                  </div>
                </div>}

              {projectInfo.labelData.catalogueNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={catalogueNumberSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.catalogueNumber}</p>
                  </div>
                </div>}

              {projectInfo.labelData.modelNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={modelNumberSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.modelNumber}</p>
                  </div>
                </div>}

              {projectInfo.labelData.LOTNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Batch_codeSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.LOTNumber}</p>
                  </div>
                </div>}

              {projectInfo.labelData.serialNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Serial_numberSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.serialNumber}</p>
                  </div>
                </div>}

                {projectInfo.labelData.needInstructionsForUse &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={consult_instruction_for_use} />
                    {projectInfo.labelData.eIFULink &&
                      <div className=''>
                        <p>{projectInfo.labelData.eIFULink}</p>
                      </div>
                    }
                  </div>}

                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                    projectInfo.labelData.hasSpecificNumberOfTests &&
                      <div className='symbol-content-item' style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                          <img style={{width:'80%', height:'40px', marginBottom:'-0px', marginTop:'5px'}} className='symbol-img' src={contains_suffient_for_n_tests} />
                          {projectInfo.labelData.numberOfTests && 
                            <div className=''>
                              <p style={{marginTop:"0px", marginLeft:'-5px'}}>{projectInfo.labelData.numberOfTests}</p>
                            </div>}
                      </div>}


                {projectInfo.labelData.associatedWithIndividualPatient &&
                  projectInfo.labelData.date &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={date} />
                    <div>
                      <p>{projectInfo.labelData.date}</p>
                    </div>
                  </div>}

                {projectInfo.labelData.addWebsite &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Patient_information_website} />
                    <div>
                      <p>{projectInfo.labelData.website}</p>
                    </div>
                  </div>}
          </div>
        )
      }

      return null;
    }

    const symbolsWithImageOnly = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div className='symbol-content img-only'>
              {projectInfo.labelData.productType == "Medical device" &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Medical_deviceSymbol} />
                </div>}

            {/* sterility */}
              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                (projectInfo.labelData.hasVaporizedHydrogenPeroxide  == true
                  || projectInfo.labelData.hasAsepticProcessing  == true
                  || projectInfo.labelData.hasEthyleneOxide  == true
                  || projectInfo.labelData.hasIrradiation  == true
                  || projectInfo.labelData.hasSteamOrDryHeat  == true
                ) &&
                <div className='symbol-content-item sterileSymbol'>
                  <img className='symbol-img sterileSymbol-img' src={sterileSymbol} />
                </div>
              }

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                    projectInfo.labelData.hasAsepticProcessing &&
                      <div className='symbol-content-item sterileSymbol'>
                        <img className='symbol-img sterileSymbol-img' src={sterile_ASymbol} />
                      </div>
              }

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                    projectInfo.labelData.hasEthyleneOxide &&
                      <div className='symbol-content-item sterileSymbol'>
                        <img className='symbol-img sterileSymbol-img' src={Sterile_EOSymbol} />
                      </div>
              }

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                    projectInfo.labelData.hasIrradiation &&
                      <div className='symbol-content-item sterileSymbol'>
                        <img className='symbol-img sterileSymbol-img' src={Sterile_RSymbol} />
                      </div>
              }
              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                    projectInfo.labelData.hasSteamOrDryHeat &&
                      <div className='symbol-content-item sterileSymbol'>
                        <img className='symbol-img sterileSymbol-img' src={Sterilized_usings_team_or_dry_heatSymbol} />
                      </div>
              }


              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                    projectInfo.labelData.isIntendedToBeResterilized &&
                        <div className='symbol-content-item'>
                          <img className='symbol-img' src={do_not_resterilizeSymbol} />
                        </div>
              }

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&

                <div className='symbol-content-item'>
                  <img className='symbol-img' src={nonSterileSymbol} />
                </div>
              }

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&

                  projectInfo.labelData.canBeUsedIfDamaged &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={package_is_damageSymbol} />
                </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&

                  projectInfo.labelData.hasSterileFluidPath &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={sterile_fluid_pathSymbol} />
              </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&
            
                projectInfo.labelData.hasVaporizedHydrogenPeroxide &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={VaporizedHydrogenPeroxideSymbol} />
                  </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&
                
                  projectInfo.labelData.hasSingleSterileBarrierSystem &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={single_S_B_S} />
                  </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&
                
                  projectInfo.labelData.hasTwoSterileBarrierSystems &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={double_S_B_S} />
                  </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&
                
                  projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveInside &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={double_S_B_S_inside} />
                  </div>}

              {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess == false &&
                
                  projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveOutside &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={double_S_B_S_outside} />
                  </div>}

                  {/* storage */}

                {projectInfo.labelData.requiresCarefulHandling &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={fragile_handle_with_care} />
                  </div>}

                {projectInfo.labelData.requiresProtectionFromLight &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={keep_away_from_sunlight} />
                  </div>}

                {projectInfo.labelData.requiresProtectionFromHeatAndRadioactiveSources &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={protect_from_heat_and_radioactive_soures} />
                  </div>}

                {projectInfo.labelData.requiresProtectionFromMoisture &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={keep_dry} />
                  </div>}

                {projectInfo.labelData.hasLowerLimitOfTemperature &&
                  projectInfo.labelData.hasUpperLimitOfTemperature == false &&
                  <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
                    <div style={{display:'flex', alignItems:'flex-end'}}>
                      <p style={{marginBottom:'-3px', marginRight:'-13px', zIndex:'2'}} >{projectInfo.labelData.lowerTemperatureLimit}</p>
                    </div>
                    <img className='symbol-img' src={lower_limit_temperaure} />
                  </div>}

                {projectInfo.labelData.hasUpperLimitOfTemperature &&
                  projectInfo.labelData.hasLowerLimitOfTemperature == false &&
                  <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
                    <img className='symbol-img' src={upper_limit_temperaure} />
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <p style={{marginTop:'-2px' ,marginLeft:'-13px', zIndex:'2'}} >{projectInfo.labelData.upperTemperatureLimit}</p>
                    </div>
                  </div>}

                {projectInfo.labelData.hasUpperLimitOfTemperature == true &&
                  projectInfo.labelData.hasLowerLimitOfTemperature == true &&
                  <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
                    <div style={{display:'flex', alignItems:'flex-end'}}>
                      <p style={{marginBottom:'-3px', marginRight:'-13px', zIndex:'2'}} >{projectInfo.labelData.lowerTemperatureLimit}</p>
                    </div>
                    <img className='symbol-img' src={temperature} />
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <p style={{marginTop:'-2px' ,marginLeft:'-13px', zIndex:'2'}} >{projectInfo.labelData.upperTemperatureLimit}</p>
                    </div>
                  </div>}

                {projectInfo.labelData.hasHumidityRange &&
                  <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
                    <div style={{display:'flex', alignItems:'flex-end'}}>
                      <p style={{marginBottom:'-10px', marginRight:'px', zIndex:'2'}} >{projectInfo.labelData.humidityMin}</p>
                    </div>
                    <img className='symbol-img' src={HumidityLimit} />
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <p style={{marginTop:'-11px', zIndex:'2'}} >{projectInfo.labelData.humidityMax}</p>
                    </div>
                  </div>}

                {projectInfo.labelData.hasAtmosphericPressureRange &&
                  <div style={{display:'flex', height:'50px', backgroundColor:''}} className=''>
                    <div style={{display:'flex', alignItems:'flex-end'}}>
                      <p style={{marginBottom:'-10px', marginRight:'px', zIndex:'2'}} >{projectInfo.labelData.humidityMin}</p>
                    </div>
                    <img className='symbol-img' src={AtmPressureLimit} />
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <p style={{marginTop:'-11px', zIndex:'2'}} >{projectInfo.labelData.humidityMax}</p>
                    </div>
                  </div>}
                
                  {/* safe use */}
                
                {projectInfo.labelData.hasBiologicalRisks &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={biological_risks} />
                  </div>}

                {projectInfo.labelData.isIntendedForSingleUse &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={do_not_re_use} />
                  </div>}

                {projectInfo.labelData.needCaution &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={caution} />
                  </div>}

                {projectInfo.labelData.containsRubberLatex &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={contains_or_presence_of_natural_rubber_latex} />
                  </div>}

                {projectInfo.labelData.containsBloodDerivatives &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={contains_human_blood} />
                  </div>}

                {projectInfo.labelData.containsMedicinalSubstance &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Contains_a_medicinal_substance} />
                  </div>}

                {projectInfo.labelData.containsAnimalOriginMaterial &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Contains_biological_material_of_animal_origin} />
                  </div>}

                {projectInfo.labelData.containsHumanOriginMaterial &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Contains_human_origin} />
                  </div>}

                {projectInfo.labelData.containsHazardousSubstances &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Contains_hazardous_substances} />
                  </div>}

                {projectInfo.labelData.containsNanoMaterials &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Contains_nano_materials} />
                  </div>}

                {projectInfo.labelData.multipleUsesOnSinglePatient &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Single_patient_multiple_use} />
                  </div>}

                  {/* Diagnostic IVD */}

                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.isControlMaterial &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={control} />
                    </div>
                }

                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.isControlMaterialForNegativeRange &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={control_negative} />
                    </div>
                }

                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.isControlMaterialForPositiveRange &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={control_positive} />
                    </div>
                }

                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.isIVDForPerformanceEvaluation &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img' src={for_IVD_performance_evaluation_only} />
                    </div>
                }

                {projectInfo.labelData.isMedicalDeviceForSampleCollection &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={sampling_site} />
                  </div>}

                {projectInfo.labelData.hasFluidPath &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={fluid_path} />
                  </div>}

                {projectInfo.labelData.isNonPyrogenic &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Non_pyrogenic} />
                  </div>}

                {projectInfo.labelData.hasOneWayValve &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={one_way_valve} />
                  </div>}

                  {projectInfo.labelData.numberOfDropsPerMilliliter !== "Not applicable" &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Drops_per_millilitre} />
                      <div>
                        <p>{projectInfo.labelData.numberOfDropsPerMilliliter}</p>
                      </div>
                  </div>}

                {projectInfo.labelData.liquidFilterPoreSize !== "Not applicable" &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Liquid_filter_with_pore_size} />
                      <div>
                        <p>{projectInfo.labelData.liquidFilterPoreSize}</p>
                      </div>
                  </div>}
          </div>
        )

      return null;
    }
    }

    const paragraphOnly = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div className='symbol-content paragraph-only'>
              {projectInfo.labelData.productName &&
                <div className='symbol-content-item'>
                  <p>{projectInfo.labelData.productName}</p>
                </div>}

              {projectInfo.labelData.intendedPurpose &&
                <div className='symbol-content-item'>
                  <p>{projectInfo.labelData.intendedPurpose}</p>
                </div>}

              {projectInfo.labelData.packagingContents &&
                <div className='symbol-content-item'>
                  <p>{projectInfo.labelData.packagingContents}</p>
                </div>}

              {projectInfo.labelData.containsCMRSubstances &&
                <div className='symbol-content-item'>
                  {projectInfo.labelData.cmrSubstancesList &&
                    <p>{projectInfo.labelData.cmrSubstancesList}</p>}
                </div>}

              {projectInfo.labelData.intendedForIntroduction &&
                <div className='symbol-content-item'>
                  {projectInfo.labelData.qualitativeComposition &&
                    <p>{projectInfo.labelData.qualitativeComposition}</p>}
                 {projectInfo.labelData.quantitativeInformation && 
                  <p>-{projectInfo.labelData.quantitativeInformation}</p>}
                </div>}

                {projectInfo.labelData.customMadeDevice &&
              <div className='symbol-content-item'>
                <p>custom-made device</p>
              </div>}

              {projectInfo.labelData.clinicalInvestigationOnly &&
              <div className='symbol-content-item'>
                <p>exclusively for clinical investigation</p>
              </div>}
              
          </div>
        )
      }

      return null;
    }

    const otherSymbols = () => {
      if(projectInfo && projectInfo.labelData){
        return (
          <div className='symbol-content other-symbols'>
              {projectInfo.labelData.productClass == 'Class I'
              ?( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                 </div>)
  
              :( <div className='symbol-content-item'>
                    <img className='symbol-img' src={CE_mark} />
                    <div className='symbol-info'>
                      <p>{projectInfo.labelData.notifiedBodyNumber}</p>
                    </div>
                 </div>)}

              {projectInfo.labelData.quantity > 0 &&
                <div className='symbol-content-item'>
                  <p>QTY: {projectInfo.labelData.quantity}</p>
                </div>}

                {/* {projectInfo.labelData.addWebsite &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Patient_information_website} />
                    <div>
                      <p>{projectInfo.labelData.website}</p>
                    </div>
                  </div>} */}
          </div>
        )
      }

      return null;
    }

    const handleUDI = () => {
      return (
        <div className='UDI-content'>
          UDI CODE
        </div>
      );
    }

  return (
    <div className="container label-information">
      <Link to='/dashboard/project' className='label-info-link'><ArrowBackIcon /> Back</Link>
      {!getProjectRequest
      ?(<div>
        <h3 className='label-info-title'>Label Title</h3>
        <div className='label-info-content row'>

          {/* label */}
          <div className='col-md-7'>
              <h5>Label Information :</h5>
            <div style={{borderRadius:'5px'}} className='label-info-content-item'>
              {projectInfo && 
                <div className='label-info-data'>
                  <div className='label-1'>
                    <div className='label-1-line-1'>
                      {symbolsWithImageAnd2ParagraphsOrMore()}
                      {symbolsWithImageAndParagraph()}
                      {paragraphOnly()}
                    </div>
                    {symbolsWithImageOnly()}
                    <div className='label-1-last-line'>
                      
                      {handleUDI()}
                      {otherSymbols()}
                    </div>

                  </div>
                </div>
              }
            </div>

          </div>
          {/* comment */}
          <div className='col-md'>
              <h5>Comments :</h5>
            <div style={{borderRadius:'5px'}} className='label-info-content-item'>
              <div className='label-info-comments'>
                <div className='comment-content'>
                  <div className='comment-header'>
                    <p className='comment-user-name'>User Name</p>
                    <p className='comment-user-role'>Creator</p>
                  </div>
                  <div className="comment-user-description">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* label description */}
        <p className='label-info-description'>
          <h6>Description :</h6>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
        </p>
      </div>)

      // ----- rotation request -----
      : (<div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
          <RotatingLines
              strokeColor="#011d41"
              strokeWidth="5"
              animationDuration="0.75"
              width="90"
              visible={true}
              /> 
      </div>)}
    </div>
  );

};

export default LabelInformation;