import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { usersCompanyAction } from '../../redux/actions/userActions';
import { getProjectAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Avatar } from '@mui/material';
import bwipjs from 'bwip-js';


// manufacturer and product info symbols
import Manufacturer from '../../assets/eIFUSymbols/Manufacturer.png'
import Distributor from '../../assets/eIFUSymbols/Distributor.png'
import Authorized_Representative from '../../assets/eIFUSymbols/Authorized_Representative.png'
import Importer from '../../assets/eIFUSymbols/Importer.png'
import CE_mark from '../../assets/eIFUSymbols/CE_mark.png'
import catalogueNumberSymbol from '../../assets/eIFUSymbols/catalogue_number.png'
import modelNumberSymbol from '../../assets/eIFUSymbols/model_number.png'
import Serial_numberSymbol from '../../assets/eIFUSymbols/Serial_number.png'
import Batch_codeSymbol from '../../assets/eIFUSymbols/Batch_code.png'
import Date_of_manufactureSymbol from '../../assets/eIFUSymbols/Date_of_manufacture.png'
import Use_by_date from '../../assets/eIFUSymbols/Use_by_date.png'

import Medical_deviceSymbol from '../../assets/eIFUSymbols/Medical_device.png'
import nonSterileSymbol from '../../assets/eIFUSymbols/nonSterile.png'
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
import double_S_B_S from '../../assets/eIFUSymbols/doubleSBS.png'
import double_S_B_S_outside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-outside.png'
import double_S_B_S_inside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-inside.png'
// storage symbols
import fragile_handle_with_care from '../../assets/eIFUSymbols/fragile_handle_with_care.png'
import keep_away_from_sunlight from '../../assets/eIFUSymbols/keep_away_from_sunlight.png'
import protect_from_heat_and_radioactive_soures from '../../assets/eIFUSymbols/protect_from_heat_and_radioactive.png'
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
import Contains_human_origin from '../../assets/eIFUSymbols/Contains_human_origin.png'
import Contains_hazardous_substances from '../../assets/eIFUSymbols/Contains_hazardous_substances.png'
import Contains_nano_materials from '../../assets/eIFUSymbols/Contains_nano_materials.png'
import Single_patient_multiple_use from '../../assets/eIFUSymbols/Single_patient_multiple_use.png'

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
import Patient_information_website from '../../assets/eIFUSymbols/Patient_information_website.png'
import Health_care_centre_or_doctor from '../../assets/eIFUSymbols/Health_care_centre_or_doctor.png'
import date from '../../assets/eIFUSymbols/date.png'
import Translation from '../../assets/eIFUSymbols/Translation.png'
import Repackaging from '../../assets/eIFUSymbols/Repackaging.png'
import udi from '../../assets/eIFUSymbols/udi.png'

import * as htmlToImage from 'html-to-image'; // Correct import statement
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
// import imageToSvg from 'image-to-svg';
import domToImage from 'dom-to-image';
import { jsPDF } from "jspdf";


// bar  code generator library
import JsBarcode from 'jsbarcode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
const ReleasedProject = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {getProject} = useSelector(state => state);
  const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;


  const [projectInfo, setProjectInfo] = useState({});
  const [imageSrc, setImageSrc] = useState('');

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


    // ---- UDI handler functions ----

  const convertDateToYYMMDD = (inputDate) => {
    // Split the input date into day, month, and year
    const [day, month, year] = inputDate.split('/');
    
    // Ensure the date components are valid
    if (day && month && year) {
        // Create a JavaScript Date object
        const jsDate = new Date(`${year}-${month}-${day}`);
    
        // Extract the year, month, and day components
        const yy = jsDate.getFullYear().toString().slice(-2);
        const mm = (jsDate.getMonth() + 1).toString().padStart(2, '0');
        const dd = jsDate.getDate().toString().padStart(2, '0');
    
        // Concatenate the components in "yymmdd" format
        const yymmdd = `${yy}${mm}${dd}`;
    
        return yymmdd;
    } else {
        // Return null for invalid input
        return null;
    }
    };
    
    const handleUDI = () => {
    
    if(projectInfo && projectInfo.labelData){
        const {udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc} = projectInfo.labelData

        let udiData = (udiDI && udiDI !== '' ? "(01)" + udiDI : '') +
                    (dateOfManufacture && dateOfManufacture !== '' ? "(11)" + convertDateToYYMMDD(dateOfManufacture) : '') +
                    (useByDate && useByDate !== '' ? "(17)" + convertDateToYYMMDD(useByDate) : '') +
                    (LOTNumber && LOTNumber !== '' ? "(10)" + LOTNumber : '') +
                    (serialNumber && serialNumber !== '' ? "(21)" + serialNumber : '');

        let udiPI =
                (dateOfManufacture && dateOfManufacture !== '' ? "(11)" + convertDateToYYMMDD(dateOfManufacture) : '') +
                (useByDate && useByDate !== '' ? "(17)" + convertDateToYYMMDD(useByDate) : '') +
                (LOTNumber && LOTNumber !== '' ? "(10)" + LOTNumber : '') +
                (serialNumber && serialNumber !== '' ? "(21)" + serialNumber : '');


        if(projectInfo.labelData.udiFormat == 'GS1'){
        if(projectInfo.labelData.udiType == 'GS1 (1D Bar Code)'){
            JsBarcode('#gs1-barcode', aidc, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
                });

                // console.log(udiData, udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc)
            return (
            <div style={{textAlign:'center', width:'100%'}}>
                <svg id='gs1-barcode' style={{ width: '100%' }}></svg>
                <p style={{fontSize:'12px', fontWidth:'20px'}}>{udiData}</p>
            </div>
            )
        }
        if(projectInfo.labelData.udiType == 'GS1 (Separate Bar Code)'){
            JsBarcode('#gs1-barcode-udiDI', udiDI, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
                });

            JsBarcode('#gs1-barcode-udiPI', udiPI, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
                });
            return (
            <div style={{display:'flex', justifyContent:'', alignItems:'center', flexWrap:'wrap', gridGap:'5px', width: '100%' }}>
                <div style={{textAlign:'center', margin:'0'}}>
                <svg id='gs1-barcode-udiDI' style={{ width: '100%' }}></svg>
                <p style={{fontSize:'12px', fontWeight:'500', margin:'0'}}>(01){udiDI}</p>
                </div>
                <div style={{textAlign:'center', margin:'0'}}>
                <svg id='gs1-barcode-udiPI' style={{ width: '100%' }}></svg>
                <p style={{fontSize:'12px', fontWeight:'500', margin:'0'}}>{udiPI}</p>
                </div>
            </div>
            )
        }
        }

        if(projectInfo.labelData.udiFormat == 'HIBCC'){
        JsBarcode('#hibcc-barcode', aidc, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
            });
        return(
            <div style={{textAlign:'center', width: '100%' }}>
            <svg id='hibcc-barcode' style={{ width: '100%' }}></svg>
            <p style={{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
        if(projectInfo.labelData.udiFormat == 'ICCBBA'){
        JsBarcode('#iccbba-barcode', aidc, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
            });
        return (
            <div style={{textAlign:'center', width: '100%' }}>
            <svg id='iccbba-barcode' style={{ width: '100%' }}></svg>
            <p style={{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
        if(projectInfo.labelData.udiFormat == 'IFA'){
        JsBarcode('#ifa-barcode', aidc, { 
            format: 'CODE128',
            width: 1.5, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
            });
        return(
            <div style={{textAlign:'center', width: '100%' }}>
            <svg id='ifa-barcode' style={{ width: '100%' }}></svg>
            <p style={{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
    }
    return null;
    }
    useEffect(() => {
        handleUDI() 
    }, [projectInfo])

      // data matrix
      const [dataMatrixValue, setDataMatrixValue] = useState('61297564251294350845');
      useEffect(() => {
      let canvas = document.createElement("canvas");
      bwipjs.toCanvas(canvas, {
          bcid: "datamatrix", // Barcode type
          text: dataMatrixValue, // Text to encode
          scale: 10, // 3x scaling factor
          height: 15, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center" // Always good to set this
      });
      setImageSrc(canvas.toDataURL("image/png"));
      }, [dataMatrixValue]);


// --------- new label design ----------
  const symbolsWithTextBehind = () => {
    if(projectInfo && projectInfo.labelData){
        return (
        <div className='symbols-with-text-behind'>
                {projectInfo.labelData.associatedWithIndividualPatient &&
                    ( projectInfo.labelData.healthCareCentreName == ''
                    || projectInfo.labelData.healthCareCentreAddress == ''
                    || projectInfo.labelData.doctorName == ''
                    ) &&
                <div className='symbol-content-item symbol-content-item-with-text'>
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
                    <div className='symbol-content-item symbol-content-item-with-text'>
                    <img className='symbol-img' src={Translation} />
                    <div>
                        {projectInfo.labelData.translationEntityName &&
                        <p>{projectInfo.labelData.translationEntityName}</p>}
                        {projectInfo.labelData.translationEntityAddress &&
                        <p>{projectInfo.labelData.translationEntityAddress}</p>}
                    </div>
                    </div>}

                {projectInfo.labelData.modificationToPackaging &&
                    <div className='symbol-content-item symbol-content-item-with-text'>
                    <img className='symbol-img' src={Repackaging} />
                    <div>
                        {projectInfo.labelData.repackagingEntityName &&
                        <p>{projectInfo.labelData.repackagingEntityName}</p>}
                        {projectInfo.labelData.repackagingEntityAddress &&
                        <p>{projectInfo.labelData.repackagingEntityAddress}</p>}
                    </div>
                    </div>}
                {projectInfo.labelData.associatedWithIndividualPatient &&
                (projectInfo.labelData.patientName || projectInfo.labelData.patientNumber) &&
                <div className='symbol-content-item symbol-content-item-with-text'>
                    <img className='symbol-img' src={patient_identification} />
                    <div>
                    <p>{projectInfo.labelData.patientName}</p>
                    <p>{projectInfo.labelData.patientNumber}</p>
                    </div>
                </div>}


            {/* sterility */}
            {projectInfo.labelData.isSterile == true &&
                projectInfo.labelData.hasSterilizationProcess &&

                (projectInfo.labelData.hasVaporizedHydrogenPeroxide  == true
                || projectInfo.labelData.hasAsepticProcessing  == true
                || projectInfo.labelData.hasEthyleneOxide  == true
                || projectInfo.labelData.hasIrradiation  == true
                || projectInfo.labelData.hasSteamOrDryHeat  == true
                ) 
                ?null
                :<div className='symbol-content-item sterileSymbol'>
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

            {projectInfo.labelData.needInstructionsForUse &&
                !projectInfo.labelData.eIFULink &&
                <div className='symbol-content-item'>
                    <img className='symbol-img' src={consult_instruction_for_use} />
                    {projectInfo.labelData.eIFULink &&
                    <div className=''>
                        <p>{projectInfo.labelData.eIFULink}</p>
                    </div>
                    }
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
                 !projectInfo.labelData.hasUpperLimitOfTemperature &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min-temperature'>{projectInfo.labelData.lowerTemperatureLimit}</p>
                    <img className='symbol-img' src={lower_limit_temperaure} />
                </div>}

                {projectInfo.labelData.hasUpperLimitOfTemperature &&
                 !projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <img className='symbol-img' style={{width:'5vw'}}  src={upper_limit_temperaure} />
                    <p className='max-temperature' >{projectInfo.labelData.upperTemperatureLimit}</p>
                </div>}

                {projectInfo.labelData.hasUpperLimitOfTemperature &&
                projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min-temperature' >{projectInfo.labelData.lowerTemperatureLimit}</p>
                    <img className='symbol-img'  src={temperature} />
                    <p className='max-temperature' >{projectInfo.labelData.upperTemperatureLimit}</p>
                </div>}

                {projectInfo.labelData.hasHumidityRange &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min' >{projectInfo.labelData.humidityMin}%</p>
                    <img className='symbol-img' src={HumidityLimit} />
                    <p className='max' >{projectInfo.labelData.humidityMax}%</p>
                </div>}

                {projectInfo.labelData.hasAtmosphericPressureRange &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min' >{projectInfo.labelData.atmosphericPressureMin}</p>
                    <img className='symbol-img' src={AtmPressureLimit} />
                    <p className='max' >{projectInfo.labelData.atmosphericPressureMax}</p>
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
    }
    return ;
    }

    const projectOwnerInfo = () => {
    if(projectInfo && projectInfo.labelData){
        return (
        <div className='project-owner-info'>

            <div className='symbol-content-item' style={{width:''}}>
                <img className='symbol-img' src={Manufacturer} />
                <div className=''>
                    <p>{projectInfo.labelData.manufacturerName}</p>
                    <p>{projectInfo.labelData.manufacturerAddress}</p>
                </div>
                </div>

            {projectInfo.labelData.hasDistributor &&
                <div className='symbol-content-item' style={{width:''}}>
                    <img className='symbol-img' src={Distributor} />
                    <div className=''>
                    <p>{projectInfo.labelData.distributorAddress}</p>
                    <p>{projectInfo.labelData.distributorAddress}</p> 
                    </div>
                </div>
                }
            {projectInfo.labelData.useByDate &&
                <div className='symbol-content-item'>
                <img className='symbol-img' src={Use_by_date} />
                <div className=''>
                    <p>{projectInfo.labelData.useByDate}</p>
                </div>
                </div>}

            {projectInfo.labelData.dateOfManufacture &&
                <div className='symbol-content-item'>
                <img className='symbol-img' src={Date_of_manufactureSymbol} />
                <div className=''>
                    <p>{projectInfo.labelData.dateOfManufacture}</p>
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

            {(projectInfo.labelData.catalogueNumber || projectInfo.labelData.modelNumber)&&
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


        </div>
        )
    }
    }
    
    const formatDate = (createdAt) => {
        const options = {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
      
        const dateObject = new Date(createdAt);
      
        return new Intl.DateTimeFormat('en-GB', options).format(dateObject);
    };
    const componentRef = useRef();

    const handleDownloadSVG = async () => {
      const node = componentRef.current;
    
      // Set the desired dimensions for resizing
      const desiredWidth = 900; // Replace with your desired width
      const desiredHeight = 630; // Replace with your desired height
    
      // Resize the SVG element or its content
      // node.style.width = `${desiredWidth}px`;
      // node.style.height = `${desiredHeight}px`;
    
      try {
        // Generate the resized SVG data URL
        const dataUrl = await htmlToImage.toSvg(node);
    
        // Create a Blob from the SVG data URL
        const blob = new Blob([dataUrl], { type: 'image/svg+xml' });
    
        // Reset the dimensions to their original values
        node.style.width = null;
        node.style.height = null;
    
        // Create a download link
        const link = document.createElement('a');
    
        // Set the link's href attribute to the SVG data URL
        link.href = dataUrl;
    
        // Set the download attribute with the desired file name
        link.download = 'Label.svg';
    
        // Append the link to the document
        document.body.appendChild(link);
    
        // Trigger a click on the link to start the download
        link.click();
      } catch (error) {
        console.error('Error generating SVG:', error);
    
        // Reset the dimensions to their original values in case of an error
        node.style.width = null;
        node.style.height = null;
      }
    };
  return (
    <div className='container label-information mb-5'>
        <Link to='/dashboard/project/released' className='label-info-link'><ArrowBackIcon /> Back</Link>
        <div style={{display:'none'}}>
                <div style={{display:'flex', flexDirection:'column', width:'100px'}}>
                  <div style={{backgroundColor:'#fff', textAlign:'center', width:'300px'}}>
                    <svg style={{width:'100px', backgroundColor:'#fff', textAlign:'center'}} id="gs1-barcode"></svg>
                  </div>
                  <div style={{backgroundColor:'#fff', textAlign:'center', width:'300px'}}>
                  <svg style={{width:'100px', backgroundColor:'#fff', textAlign:'center'}} id="hibcc-barcode"></svg>
                  </div>
                  <div style={{ backgroundColor:'#fff', textAlign:'center', width:'300px'}}>
                    <svg style={{width:'100px', backgroundColor:'#fff', textAlign:'center'}} id="iccbba-barcode"></svg>
                  </div>
                  <div style={{ backgroundColor:'#fff', textAlign:'center', width:'300px'}}>
                    <svg style={{width:'100px', backgroundColor:'#fff', textAlign:'center'}} id="ifa-barcode"></svg>
                  </div>
                  
                  </div>
                  <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', flexWrap:'wrap', gridGap:'10px'}}>
                    <div style={{textAlign:'center', marginRight:'5px'}}>
                      <svg id='gs1-barcode-udiDI'></svg>
                    </div>
                    <div style={{textAlign:'center'}}>
                      <svg id='gs1-barcode-udiPI'></svg>
                    </div>
                  </div>

                  <img  width={"100px"} src={imageSrc} alt={`data matrix from`} />
        </div>
      {!getProjectRequest ? 
      <div style={{marginTop:'30px'}}>
          <div className='label-info-content-item' style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gridGap:'10px', alignItems:'flex-start', flexDirection:'row-reverse'}}>
                        {projectInfo && 
                            <div className='label-info-data' style={{flex:'0.6', margin:'auto 0', backgroundColor:''}}>
                                <div className='template-1' style={{margin:'auto'}}>
                                    <div className='template-1-content'>
                                    <div className='template-1-content-top'>
                                        <div className='template-1-content-top-left'>
                                        <div className='template-1-content-top-left-header'>
                                            <div style={{width:'15%'}}>
                                            {projectInfo && 
                                                projectInfo.labelData && 
                                                projectInfo.labelData.productType == "Medical device" &&
                                                    <img className='symbol-img' src={Medical_deviceSymbol} />
                                                }
                                            </div>
                                            <div style={{width:'70%', textAlign:'center'}}>
                                            {projectInfo && 
                                                projectInfo.labelData && 
                                                projectInfo.labelData.productName &&
                                                <h5>{projectInfo.labelData.productName}</h5>}
                                            {projectInfo && 
                                                projectInfo.labelData && 
                                                projectInfo.labelData.intendedPurpose &&
                                            <p>{projectInfo.labelData.intendedPurpose}</p>}
                                            </div>
                                            {projectInfo &&
                                            projectInfo.labelData && 
                                                projectInfo.labelData.productClass == 'Class I'
                                                ?(<img style={{width:'8%'}} className='symbol-img' src={CE_mark} />)
                                    
                                                :( <div style={{width:'8%'}}  className=''>
                                                    <img style={{width:'100%'}} className='' src={CE_mark} />
                                                        {projectInfo &&
                                                        projectInfo.labelData && 
                                                        <p style={{fontSize:'60%', marginTop:'3px',  marginRight:'10px'}} >{projectInfo.labelData.notifiedBodyNumber}</p>}
                                                </div>)}
                                        </div>
                                        <ul className='template-1-content-top-left-body'>
                                        {projectInfo &&
                                            projectInfo.labelData && 
                                            projectInfo.labelData.intendedForIntroduction &&
                                            <>
                                                {projectInfo.labelData.qualitativeComposition &&
                                                <li>{projectInfo.labelData.qualitativeComposition}</li>}
                                            {projectInfo.labelData.quantitativeInformation && 
                                                <li>{projectInfo.labelData.quantitativeInformation}</li>}
                                            </>
                                            }
                                            {projectInfo &&
                                            projectInfo.labelData && 
                                            projectInfo.labelData.containsCMRSubstances &&
                                            <div className='symbol-content-item'>
                                                {projectInfo.labelData.cmrSubstancesList &&
                                                <li>{projectInfo.labelData.cmrSubstancesList}</li>}
                                            </div>}
                                            </ul>
                                        </div>

                                        <div className='template-1-content-top-right'>
                                        <div className='template-1-content-top-right-top'>
                                            <div style={{display:'flex', flexDirection:'column'}}>
                                            {projectInfo &&
                                                projectInfo.labelData && 
                                                projectInfo.labelData.quantity && 
                                            <p style={{flex:'0.95'}}>QTY: {projectInfo.labelData.quantity}</p>}
                                            <div >
                                                {projectInfo &&
                                                projectInfo.labelData && 
                                                (projectInfo.labelData.addManufacturerLogo
                                                || projectInfo.labelData.addWebsite) &&
                                                <img style={{width:'25%', marginTop:''}} className='symbol-img' src={Patient_information_website} />}
                                            </div>
                                            </div>
                                            {projectInfo &&
                                                projectInfo.labelData && 
                                                projectInfo.labelData.manufacturerLogo &&
                                                <img src={`${process.env.REACT_APP_BASE_URL}/assets/companyImage/${projectInfo.labelData.manufacturerLogo}`} alt="" />}
                                        </div>
                                        {projectInfo && projectInfo.labelData &&  projectInfo.labelData.addWebsite &&
                                        projectInfo.labelData.website &&
                                            <p>{projectInfo.labelData.website}</p>}
                                        </div>
                                    </div>
                                    <div className='template-1-content-mid'>
                                        <div className='template-1-content-mid-fist-item'>
                                        {projectInfo && 
                                            projectInfo.labelData && 
                                            projectInfo.labelData.packagingContents &&
                                        <p className='template-1-content-mid-fist-item-top'>
                                            {projectInfo.labelData.packagingContents}
                                        </p>}
                                        <div className='template-1-content-mid-fist-item-bottom'>
                                        {projectInfo && 
                                            projectInfo.labelData && 
                                            projectInfo.labelData.customMadeDevice &&
                                            <p>custom-made device</p>}
                                        {projectInfo && 
                                            projectInfo.labelData && 
                                            projectInfo.labelData.clinicalInvestigationOnly &&
                                            <p>exclusively for clinical investigation</p>}
                                        </div>
                                        </div>
                                        <div className='template-1-content-mid-second-item'>
                                        {projectOwnerInfo()}
                                        </div>
                                    </div>
                                    <div className='template-1-content-bottom'>
                                        <div className='rest-of-the symbols'>
                                        {symbolsWithTextBehind()}
                                        </div>
                                        <div className="code-bar">
                                        {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType !== 'GS1 (Data Matrix)' && handleUDI()}
                                        {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType == 'GS1 (Data Matrix)' && 
                                            imageSrc &&
                                            <div style={{display:'flex', alignItems:'center', marginTop:'1%'}}>
                                            <img style={{width:'15%', height:'auto'}} src={imageSrc} alt={`data matrix from`} />
                                            <div style={{fontSize:'12px'}}>
                                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.dateOfManufacture}</p>
                                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.useByDate}</p>
                                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.LOTNumber}</p>
                                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.serialNumber}</p>
                                            </div>
                                            </div>}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='' style={{flex:'0.4'}}>
                            <h5>Dynamic Data :</h5>
                                <form  style={{backgroundColor:'#fff', padding:'10px', borderRadius:'4px', border:'1px solid lightGray'}}>
                                  <div className='form-group' style={{display:'flex', flexDirection:'column'}}>
                                    <label style={{fontWeight:'500'}}>Lot Number:</label>
                                    <input style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                                  </div>
                            
                                </form>
                        </div>
          </div>
      </div>
      
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
  )
}

export default ReleasedProject