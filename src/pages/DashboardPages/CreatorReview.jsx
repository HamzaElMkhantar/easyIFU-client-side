import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './project.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Typography } from '@mui/material';

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
import QRCode from 'qrcode-generator';
import bwipjs from 'bwip-js';
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { ReleaseTheProjectAction, getProjectAction, sendingProjectToOtherRoleAction } from '../../redux/actions/projectActions'
import { usersCompanyAction } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from 'react-bootstrap';
const CreatorReview = () => {
    const {projectId} = useParams();
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {getProject, usersCompany, sendingProjectToOtherRole, ReleaseTheProject} = useSelector(state => state);
    const {usersCompanyRequest, usersCompanySuccess, usersCompanyFail, allUsers} = usersCompany;
    const {getProjectRequest, getProjectSuccess, getProjectFail, project} = getProject;
    const {sendingProjectRequest, sendingProjectSuccess, sendingProjectFail, sendingProjectMessage} = sendingProjectToOtherRole
    const [projectInfo, setProjectInfo] = useState({});
    const [allUsersCompany, setAllUsersCompany] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [sendTo, setSendTo] = useState({
      projectId,
      senderId: decodedToken && decodedToken.userInfo && decodedToken.userInfo._id,
      receivedId: '',
      comment: ''
    });

    const [modalToggle, setModalToggle] = useState(false)
    // const [acceptProject, setAcceptProject] = useState(false);
    // const [rejectProject, setRejectProject] = useState(false);


    const handleResetModalState = (e) => {
        e.preventDefault()
        setModalToggle(false)
    }

    const dispatch = useDispatch()
    const  handleSendLabel = (e) => {
        e.preventDefault()
        dispatch(sendingProjectToOtherRoleAction(sendTo, token))
    }
    useEffect(() => {
        if(sendingProjectSuccess){
          toast.success(`${sendingProjectMessage.message}`)
          setModalToggle(false)

        }
        if(sendingProjectFail){
          toast.error(`${sendingProjectFail.message}`)
          
        }
      },  [sendingProjectSuccess, sendingProjectFail])

    useEffect(() => {
        dispatch(getProjectAction(projectId, token))
        dispatch(usersCompanyAction({
            _id:decodedToken && decodedToken.userInfo && decodedToken.userInfo._id, 
            companyId: decodedToken && decodedToken.userInfo && decodedToken.userInfo.companyId 
            }, token))
    }, [])

    useEffect(() => {
        if(getProjectSuccess){
          setProjectInfo(project)
        }
        if(usersCompanySuccess){
          setAllUsersCompany(allUsers)
        }
    
        if(getProjectFail){
          toast.warning(`${getProjectFail.message}`)
        }
      }, [getProjectSuccess, getProjectFail, usersCompanySuccess])

      useEffect(() => {
        if(getProjectSuccess){
          setProjectInfo(project)
        }
        if(usersCompanySuccess){
          setAllUsersCompany(allUsers)
        }
    
        if(getProjectFail){
          toast.warning(`${getProjectFail.message}`)
        }
      }, [getProjectSuccess, getProjectFail, usersCompanySuccess])


      // release project
    const {releaseProjectRequest, releaseProjectSuccess, releaseProjectFail, releaseProjectMessage} = ReleaseTheProject

     const [releaseAcceptProject, setReleaseAcceptProject] = useState(false);
    const [rejectProject, setRejectProject] = useState(false);


      const handleRelease = (e) => {
        e.preventDefault()
        const data = {
            projectId,
            releaseId: decodedToken && decodedToken.userInfo && decodedToken.userInfo._id
        }
        dispatch(ReleaseTheProjectAction(data, token))
    }

    const handleAcceptedProject = () => {
      setReleaseAcceptProject(false)
      setModalToggle(true)
      setRejectProject(false)
  }

  const handleReleasedProject = () => {
    setReleaseAcceptProject(true)
    setModalToggle(true)
    setRejectProject(true)
}


useEffect(() => {
  if(releaseProjectSuccess){
    toast.success(`${releaseProjectMessage.message}`)
    setModalToggle(false)
    setReleaseAcceptProject(false)
    setRejectProject(false)
  }
  if(releaseProjectFail){
    toast.error(`${releaseProjectFail.message}`)
    
  }
},  [releaseProjectSuccess, releaseProjectFail])

    //  handle dynamic data for label

    const [dynamicData, setDynamicData] = useState({
        LotNumber: '',
        expirationDate: '',
        serialNumber: '',
        manufacturerDate: ''
    })

            
    // ---- UDI handler functions ----

    const convertDateToYYMMDD = (inputDate) => {
    // Split the input date into day, month, and year
   
    const [year, month, day ] = inputDate.split('-');
    
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
    
    const [activeTemplate, setActiveTemplate] = useState('template-1')
    const isTemplate3 = activeTemplate === "template-3" ? true : false

     const handleUDI = () => {
      
      if(projectInfo && projectInfo.labelData){
        const {udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc, haDateOfManufacture, hasLotNumber, haSerialNumber} = projectInfo.labelData

        let udiData = (udiDI && udiDI !== '' ? "(01)" + udiDI : '') +
                      (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== '' ? "(11)" + "XXXXXXXX" : '') +
                      (useByDate && useByDate !== '' ? "(17)" + convertDateToYYMMDD(useByDate) : '') +
                      (hasLotNumber &&  LOTNumber && LOTNumber !== '' ? "(10)" + "XXXXXXXX" : '') +
                      (haSerialNumber && serialNumber && serialNumber !== '' ? "(21)" + "XXXXXXXX" : '');
        let udiPI =
                  (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== '' ? "(11)" + "XXXXXXXX" : '') +
                  (useByDate && useByDate !== '' ? "(17)" + convertDateToYYMMDD(useByDate) : '') +
                  (hasLotNumber && LOTNumber && LOTNumber !== '' ? "(10)" + "XXXXXXXX" : '') +
                  (haSerialNumber && serialNumber && serialNumber !== '' ? "(21)" + "XXXXXXXX" : '');


        if(projectInfo.labelData.udiFormat == 'GS1'){
          if(projectInfo.labelData.udiType == 'GS1 (1D Bar Code)'){
            JsBarcode('#gs1-barcode', udiData, { 
              format: 'CODE128',
              width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
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
                <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWidth:'20px'}}>{udiData}</p>
              </div>
              )
          }
          if(projectInfo.labelData.udiType == 'GS1 (Separate Bar Code)'){
            JsBarcode('#gs1-barcode-udiDI', udiDI, { 
              format: 'CODE128',
              width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
              height: 40, // Set the height of the bars
              displayValue: false, // Show the human-readable value below the barcode
              background: 'white', // Set the background color of the SVG
              lineColor: 'black', // Set the color of the bars });
              fontSize: 10
                });

            JsBarcode('#gs1-barcode-udiPI', udiPI, { 
              format: 'CODE128',
              width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
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
                  <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWeight:'500', margin:'0'}}>(01){udiDI}</p>
                </div>
                <div style={{textAlign:'center', margin:'0'}}>
                  <svg id='gs1-barcode-udiPI' style={{ width: '100%' }}></svg>
                  <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWeight:'500', margin:'0'}}>{udiPI}</p>
                </div>
              </div>
            )
          }
          // if(projectInfo.labelData.udiType == 'GS1 (Data Matrix)'){
          //     let canvas = document.createElement("canvas");
          //      bwipjs.toCanvas(canvas, {
          //       bcid: "datamatrix", // Barcode type
          //       text: aidc, // Text to encode
          //       scale: 5, // 3x scaling factor
          //       height: 10, // Bar height, in millimeters
          //       includetext: true, // Show human-readable text
          //       textxalign: "center" // Always good to set this
          //     });
          //     setImageSrc(canvas.toDataURL("image/png"));
          //   return (
          //     <div style={{display:'flex', alignItems:'center'}}>
          //       {imageSrc &&
          //         <>
          //         <img  width={"100px"} src={imageSrc} alt={`data matrix from`} />
          //         <div style={{fontSize:'12px'}}>
          //           {dateOfManufacture !== '' && <p style={{margin:'2px 10px'}}>{"(11)" + convertDateToYYMMDD(projectInfo.labelData.dateOfManufacture)}</p>}
          //           {useByDate !== '' && <p style={{margin:'2px 10px'}}>{"(17)" + convertDateToYYMMDD(projectInfo.labelData.useByDate)}</p>}
          //           {LOTNumber !== '' && <p style={{margin:'2px 10px'}}>{"(10)" + projectInfo.labelData.LOTNumber}</p>}
          //           {serialNumber !== '' && <p style={{margin:'2px 10px'}}>{"(21)" + projectInfo.labelData.serialNumber}</p>}
          //           </div>
          //         </>
          //       }
          //     </div>
          //   )
          // }
        }

        if(projectInfo.labelData.udiFormat == 'HIBCC'){
          JsBarcode('#hibcc-barcode', udiData, { 
            format: 'CODE128',
            width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
              });
          return(
            <div style={{textAlign:'center', width: '100%' }}>
              <svg id='hibcc-barcode' style={{ width: '100%' }}></svg>
              <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
        if(projectInfo.labelData.udiFormat == 'ICCBBA'){
          JsBarcode('#iccbba-barcode', udiData, { 
            format: 'CODE128',
            width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
              });
          return (
            <div style={{textAlign:'center', width: '100%' }}>
              <svg id='iccbba-barcode' style={{ width: '100%' }}></svg>
              <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
        if(projectInfo.labelData.udiFormat == 'IFA'){
          JsBarcode('#ifa-barcode', udiData, { 
            format: 'CODE128',
            width: isTemplate3 ? 0.4 : 0.9, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: 'white', // Set the background color of the SVG
            lineColor: 'black', // Set the color of the bars });
            fontSize: 10
              });
          return(
            <div style={{textAlign:'center', width: '100%' }}>
              <svg id='ifa-barcode' style={{ width: '100%' }}></svg>
              <p style={isTemplate3 ? {fontSize: "9px", fontWeight:"600"} :{fontSize:'12px', fontWeight:'500'}}>{udiData}</p>
            </div>
            )
        }
      }
      return null;
    }

      useEffect(() => {
          handleUDI() 
          if(projectInfo && projectInfo.labelData){
            const {udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc, haDateOfManufacture, haLOTNumber, haSerialNumber} = projectInfo.labelData
    
            let udiData = (udiDI && udiDI !== '' ? "(01)" + udiDI : '') +
                          (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== '' ? "(11)" + "XXXXXXXX" : '') +
                          (useByDate && useByDate !== '' ? "(17)" + convertDateToYYMMDD(useByDate) : '') +
                          (haLOTNumber &&  LOTNumber && LOTNumber !== '' ? "(10)" + "XXXXXXXX" : '') +
                          (haSerialNumber && serialNumber && serialNumber !== '' ? "(21)" + "XXXXXXXX" : '');
                        }
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
                    <img className='symbol-img sm-img' src={Translation} />
                    <div>
                      {projectInfo.labelData.translationEntityName &&
                        <p>{projectInfo.labelData.translationEntityName}</p>}
                      {projectInfo.labelData.translationEntityAddress &&
                        <p>{projectInfo.labelData.translationEntityAddress}</p>}
                    </div>
                  </div>}
  
                {projectInfo.labelData.modificationToPackaging &&
                  <div className='symbol-content-item symbol-content-item-with-text'>
                    <img className='symbol-img sm-img' src={Repackaging} />
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
            {projectInfo.labelData.isSterile ?
              (projectInfo.labelData.hasSterilizationProcess &&
  
              (projectInfo.labelData.hasVaporizedHydrogenPeroxide  == true
                || projectInfo.labelData.hasAsepticProcessing  == true
                || projectInfo.labelData.hasEthyleneOxide  == true
                || projectInfo.labelData.hasIrradiation  == true
                || projectInfo.labelData.hasSteamOrDryHeat  == true
              ) 
              ?null
              :<div className='symbol-content-item sterileSymbol'>
                <img className='symbol-img sterileSymbol-img' src={sterileSymbol} />
              </div>)
            : null}
  
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
              projectInfo.labelData.hasSterilizationProcess &&
          
              projectInfo.labelData.hasVaporizedHydrogenPeroxide &&
                <div className='symbol-content-item'>
                  <img className='symbol-img sterileSymbol-img' src={VaporizedHydrogenPeroxideSymbol} />
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
                    <p className='min-temperature p-1 m-1'>{projectInfo.labelData.lowerTemperatureLimit}{projectInfo?.labelData?.temperatureUnite}</p>
                  <img className='symbol-img' src={lower_limit_temperaure} />
                </div>}
  
              {projectInfo.labelData.hasUpperLimitOfTemperature &&
                !projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div className='symbol-content-item symbol-content-item-range'>
                  <img className='symbol-img p-1 m-1' src={upper_limit_temperaure} />
                    <p className='max-temperature' >{projectInfo.labelData.upperTemperatureLimit}{projectInfo?.labelData?.temperatureUnite}</p>
                </div>}
  
              {projectInfo.labelData.hasUpperLimitOfTemperature &&
                projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min-temperature' >{projectInfo.labelData.lowerTemperatureLimit}{projectInfo?.labelData?.temperatureUnite}</p>
                  <img className='symbol-img p-1 m-1'  src={temperature} />
                    <p className='max-temperature' >{projectInfo.labelData.upperTemperatureLimit}{projectInfo?.labelData?.temperatureUnite}</p>
                </div>}
  
              {projectInfo.labelData.hasHumidityRange &&
                <div className='symbol-content-item symbol-content-item-range'>
                    <p className='min mt-1' >{projectInfo.labelData.humidityMin}%</p>
                  <img className='symbol-img p' src={HumidityLimit} />
                    <p className='max ' >{projectInfo.labelData.humidityMax}%</p>
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
                    <img className='symbol-img sterileSymbol-img' src={control} />
                  </div>
              }
  
              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isControlMaterialForNegativeRange &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img sterileSymbol-img' src={control_negative} />
                  </div>
              }
  
              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isControlMaterialForPositiveRange &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img sterileSymbol-img' src={control_positive} />
                  </div>
              }
  
              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isIVDForPerformanceEvaluation &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={for_IVD_performance_evaluation_only} />
                  </div>
              }
  
            {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.hasSpecificNumberOfTests &&
                    <div className='symbol-content-item' style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                        <img style={{width:'80%', height:'40px', marginBottom:'-0px', marginTop:'5px'}} className='symbol-img' src={contains_suffient_for_n_tests} />
                        {projectInfo.labelData.numberOfTests && 
                          <div className=''>
                            <p style={{marginTop:"0px", marginLeft:'-5px'}}>{projectInfo.labelData.numberOfTests}</p>
                          </div>}
                    </div>}
  
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
                {/* {projectInfo.labelData.reprocessedDevice &&
            <div className='symbol-content-item'>
              <img className='symbol-img' src={Repackaging} />
              <div>
                {projectInfo.labelData.reprocessingCycles &&
                  <p>number of reprocessing cycles: {projectInfo.labelData.reprocessingCycles}</p>}
                {projectInfo.labelData.reprocessingLimitation &&
                  <p>{projectInfo.labelData.reprocessingLimitation}</p>}
              </div>
            </div>}  */}
  
                {projectInfo.labelData.needInstructionsForUse &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={consult_instruction_for_use} />
                  {projectInfo.labelData.eIFULink &&
                    <div className=''>
                      <p>{projectInfo.labelData.eIFULink}</p>
                    </div>
                  }
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
                      <p>{projectInfo?.labelData?.manufacturerName}</p>
                      <p>{projectInfo?.labelData?.manufacturerAddress}</p>
                      <p>{projectInfo?.labelData?.manufacturerCity}</p>
                      <p>{projectInfo?.labelData?.manufacturerCountry}</p>
                    </div>
                  </div>
  
                  {projectInfo.labelData.hasDistributor &&
                  <div className='symbol-content-item' style={{width:''}}>
                    <img className='symbol-img' src={Distributor} />
                    <div className=''>
                      <p>{projectInfo.labelData.distributorName}</p>
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

              {projectInfo.labelData.haDateOfManufacture &&
                <div className='symbol-content-item'>
                  <img className='symbol-img manufacture-img' src={Date_of_manufactureSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.dateOfManufacture}</p>
                  </div>
                </div>}

              {projectInfo.labelData.hasLotNumber &&
                <div className='symbol-content-item'>
                  <img className='symbol-img' src={Batch_codeSymbol} />
                  <div className=''>
                    <p>{projectInfo.labelData.LOTNumber}</p>
                  </div>
                </div>}

              {projectInfo.labelData.haSerialNumber &&
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
                {!projectInfo.labelData.isOutsideEU &&
                    <div className='symbol-content-item'>
                      <img className='symbol-img Authorized_Representative' src={Authorized_Representative} />
                      <div className=''>
                        <p>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                        <p>{projectInfo.labelData.europeanAuthorizedRepAddress}</p> 
                      </div>
                    </div>
                  }
                {!projectInfo.labelData.isOutsideEU &&
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
  
      //  ---- end update ----
    
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
      const commentsDivRef = useRef(null);

      useEffect(() => {
        // Scroll to the last comment when the component is initially rendered
        if (commentsDivRef.current) {
          commentsDivRef.current.scrollTop = commentsDivRef.current.scrollHeight;
        }
      }, [projectInfo]);
      useEffect(() => {
        // Scroll to the top when the pathname changes
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, []);


  return (
    <div className='container label-information mb-5'>
            <div>

                <Modal
                    show={modalToggle}  // Change 'open' to 'show'
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    centered
                    style={{
                        backdropFilter: 'blur(5px)',
                        width:'100vw',
                        height:'100vh',
                        position:'absolute'
                }}
                >
                <Typography id="modal-modal-description" style={{padding:'15px', textAlign:'center'}}>
                    {!rejectProject && <form onSubmit={handleSendLabel}>
                        <div className="form-group">
                            <label style={{fontSize:'25px', marginBottom:'15px'}}>choose user to send the project</label>
                        </div>
                         <div className="form-group">
                            <textarea style={{border:'1px solid lightGray', width:'100%', padding:"6px 10px", fontSize:'18px', borderRadius:'10px', marginBottom:'10px'}} 
                                    placeholder='Explain why you reject the project' 
                                    name="" id="" 
                                    rows='6'
                                    value={sendTo.comment}
                                    onChange={(e) => setSendTo({...sendTo, comment: e.target.value})}
                                    >
                            </textarea>
                        </div>
                        <div className="form-group mt-3 mb-2 mx-0"style={{textAlign:"left", fontSize:'18px'}}>
                        <label>Send Project To:</label>
                        <select value={sendTo.receivedId} onChange={(e) => setSendTo({...sendTo,receivedId: e.target.value})} style={{width:'40%', minWidth:'100px', padding:'2px 10px', borderRadius:'10px', outline:'none', border:'2px solid lightGray'}}>
                            <option>Choose User :</option>
                            {allUsersCompany &&
                                allUsersCompany.map(item => {
                                return (
                                <option value={`${item._id}`}>{`${item.firstName} ${item.lastName}: ( ${item.role} )`}</option>
                                )})
                            }
                        </select>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            {sendingProjectRequest
                                ? <RotatingLines
                                strokeColor="#011d41"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                color="#fff"
                              
                                visible={true}
                                /> :<button style={{backgroundColor:'#072D60', borderRadius:'4px', color:'#fff', padding:'2px 6px' }}
                                disabled={sendingProjectRequest ? true : false}
                               type='submit'
                               >Send..</button>}
                              
                                    
                                  
                            <button style={{backgroundColor:'#9A3B3A', borderRadius:'4px', color:'#fff', padding:'2px 6px' }}
                               onClick={(e) => handleResetModalState(e)}
                               >Close</button>
                        </div>
                    </form>}

                    {releaseAcceptProject && 
                    <form onSubmit={handleRelease}>
                        <div className="form-group">
                            <label style={{fontSize:'25px', marginBottom:'15px'}}>Release this Project</label>
                        </div>

                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div>
                                {releaseProjectRequest
                                    ? <RotatingLines
                                    strokeColor="#011d41"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="20"
                                    color="#fff"
                                
                                    visible={true}
                                    /> :
                                    <>
                                    <button onClick={() => handleRelease} style={{backgroundColor:'#072D60', borderRadius:'4px', color:'#fff', padding:'2px 6px' }}
                                            type='submit'
                                        >Save </button>
                                    
                                    </>
                                }
                            </div>
                           
                           <button style={{backgroundColor:'#9A3B3A', borderRadius:'4px', color:'#fff', padding:'2px 6px' }}
                               onClick={(e) => handleResetModalState(e)}
                               >Close</button>
                        </div>
                    </form>}
                    
                </Typography>
                </Modal>
                </div>
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
        <Link to='/dashboard/received-project' className='label-info-link'><ArrowBackIcon /> Back</Link>
        {!getProjectRequest && 
            <h3 className='label-info-title' style={{color:'#'}}>{projectInfo && projectInfo.projectName}</h3>
        }
        <div className='mt-1'>
            {!getProjectRequest
            ?<div>
                <div>
                    <div >
                    <div className='mb-2' style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
              <button style={activeTemplate === "template-1" ? {backgroundColor:'#08408b', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'} : {backgroundColor:'#046B81', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'}}
               onClick={() => setActiveTemplate("template-1")} className='mx-1'>template1</button>
             
             <button style={activeTemplate === "template-2" ? {backgroundColor:'#08408b', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'} : {backgroundColor:'#046B81', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'}}
               onClick={() => setActiveTemplate("template-2")} className='mx-1'>template2</button>
                <button style={activeTemplate === "template-3" ? {backgroundColor:'#08408b', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'} : {backgroundColor:'#046B81', borderRadius:'5px', padding:'0px px', height:'30px', color:'#fff', fontSize:'14px', fontWeight:'600'}}
               onClick={() => setActiveTemplate("template-3")} className='mx-1'>template3</button>
            </div>
                        <div>
                            <button onClick={() => handleAcceptedProject()} className="btn btn-outline-primary">
                                Resend
                            </button>
                           {decodedToken && (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Release") )&&
                            <button onClick={() => handleReleasedProject()} className="btn btn-outline-primary mx-2">
                                Release
                            </button>}
                        </div>
                    </div>
                        
                    <div className='label-info-content-item' style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                        {projectInfo && 
                <div className='label-info-data' style={{display:'flex', justifyContent:'flex-end'}} >
                  <div style={activeTemplate === "template-1" ? {} : {display:'none'}} className='template-1'>
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
                                ?(<img style={{width:'12%', margin:'0', padding:'0'}} className='symbol-img' src={CE_mark} />)
                    
                                :( <div style={{width:'12%', margin:'0', padding:'0'}}  className=''>
                                      <img style={{width:'100%'}} className='' src={CE_mark} />
                                        {projectInfo &&
                                          projectInfo.labelData && 
                                        <p style={{fontSize:'65%', margin:'0', padding:'0', textAlign:'center'}} >{projectInfo.labelData.notifiedBodyNumber}</p>}
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
                                  projectInfo.labelData.quantity > 0 
                                ?  <p style={{flex:'0.95'}}>QTY: {projectInfo.labelData.quantity}</p>
                                : <p style={{flex:'0.95'}}></p>}
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
                                <img src={`${process.env.REACT_APP_BASE_URL}/assets/images/${projectInfo.labelData.manufacturerLogo}`} alt="" />}
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
                            (projectInfo.labelData.packagingContents || projectInfo.labelData.packagingContents.length !== 0)&& projectInfo.labelData.packagingContents[0] !== '' &&
                          <ul className='template-1-content-mid-fist-item-top' style={{ display:'flex', flexWrap:'wrap', gridGap:'2%', padding:'5px  0px', justifyContent:'center', borderTop:'0.1px solid lightGray' , borderBottom:'0.1px solid lightGray', fontSize:'10px'}}>
                            {projectInfo?.labelData?.packagingContents?.map((item => {
                              return (
                                  <li style={{listStyle:'circle !important'}}>- {item}</li>
                              )
                            }))}
                          </ul>}
                          <div className='template-1-content-mid-fist-item-bottom'>
                          {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.customMadeDevice &&
                              <p>custom-made device</p>}
                          {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.clinicalInvestigationOnly &&
                              <p className='mx-4'>exclusively for clinical investigation</p>}
                          </div>
                        </div>
                        <div className='template-1-content-mid-second-item'>
                          {projectOwnerInfo()}
                        </div>
                      </div>
                      <div className='template-1-content-bottom'>
                        <div className='rest-of-the-symbols'>
                          {symbolsWithTextBehind()}
                        </div>
                        <div className="code-bar">
                        {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType !== 'GS1 (Data Matrix)' && handleUDI()}
                          {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType == 'GS1 (Data Matrix)' && 
                              imageSrc &&
                            <div style={{display:'flex', alignItems:'center', marginTop:'1%'}}>
                              <img style={{width:'100px', height:'100px'}} src={imageSrc} alt={`data matrix from`} />
                              <div style={{fontSize:'12px'}}>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haDateOfManufacture && projectInfo.labelData.dateOfManufacture}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.useByDate}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.hasLotNumber && projectInfo.labelData.LOTNumber}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haSerialNumber && projectInfo.labelData.serialNumber}</p>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={activeTemplate === "template-2" ? {} : {display:'none'}} className='template-2'>
                    <div className='template-2-content-top'>
                      <div className='template-1-content-top-header'>
                        <div className='ce-mark-and-website-content'>
                        {projectInfo && projectInfo.labelData &&  projectInfo.labelData.addWebsite &&
                           projectInfo.labelData.website &&
                           <p>
                              <img style={{width:'25%', marginTop:''}} className='symbol-img' src={Patient_information_website} />
                              <p style={{fontSize:'70%'}}>{projectInfo.labelData.website}</p>
                           </p>}
                                                        {projectInfo &&
                               projectInfo.labelData && 
                                 projectInfo.labelData.productClass == 'Class I'
                                ?(<img style={{width:'30%'}} className='symbol-img' src={CE_mark} />)
                    
                                :( <div style={{width:'100%', display:'flex',  alignItems:'center'}}  className=''>
                                      <img style={{width:'35%'}} className='' src={CE_mark} />
                                        {projectInfo &&
                                          projectInfo.labelData && 
                                        <p style={{fontSize:'80%',  marginRight:'10px'}} >{projectInfo.labelData.notifiedBodyNumber}</p>}
                                  </div>)}
                        </div>
                        <div className='label-header-info'>
                        {projectInfo && 
                                projectInfo.labelData && 
                                projectInfo.labelData.productName &&
                                <h3>{projectInfo.labelData.productName}</h3>}
                            {projectInfo && 
                        projectInfo.labelData && 
                                  projectInfo.labelData.intendedPurpose &&
                              <p>{projectInfo.labelData.intendedPurpose}</p>}
                        </div>
                        <div className='label-MD-QTY-info' style={{display:'flex', flexDirection:'column'}}> 
                        {projectInfo &&
                                projectInfo.labelData && 
                                  projectInfo.labelData.quantity > 0 
                                ?  <p style={{marginBottom:'10%'}}>QTY: {projectInfo.labelData.quantity}</p>
                                : <p style={{marginBottom:'10%'}}></p>}
                        <p >
                        {projectInfo && 
                                projectInfo.labelData && 
                                  projectInfo.labelData.productType == "Medical device" &&
                                    <img className='symbol-img' src={Medical_deviceSymbol} />
                                  }
                        </p>
                        </div>
                      </div>
                      <div className='template-2-content-top-rest-content'>
                      {projectInfo && 
                            projectInfo.labelData && 
                            (projectInfo.labelData.packagingContents || projectInfo.labelData.packagingContents.length !== 0)&& projectInfo.labelData.packagingContents[0] !== '' &&
                          <ul className='template-1-content-mid-fist-item-top' style={{ display:'flex', flexWrap:'wrap', gridGap:'2%', padding:'5px  0px', justifyContent:'center', borderTop:'0.1px solid lightGray' , borderBottom:'0.1px solid lightGray', fontSize:'10px'}}>
                            {projectInfo?.labelData?.packagingContents?.map((item => {
                              return (
                                  <li style={{listStyle:'circle !important'}}>- {item}</li>
                              )
                            }))}
                          </ul>}
                        <ul className='intended-for-intro-and-cmr-substance'>
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
                        <div className='template-2-content-top-rest-content-bottom'>
                        {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.customMadeDevice &&
                              <p className='mx-1'>custom-made device</p>}
                          {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.clinicalInvestigationOnly &&
                              <p className='mx-1'>exclusively for clinical investigation</p>}
                        </div>
                      </div>
                    </div>
                    <div className='template-2-content-mid'>
                      <div className='project-owner-info-content'>
                        {projectOwnerInfo()}
                      </div>
                      <div className='symbols-with-text-behind-content'>
                        {symbolsWithTextBehind()}
                      </div>
                    </div>
                    <div className='template-2-content-bottom'>
                    <div className="code-bar" style={{ width:'100%'}}>
                        {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType !== 'GS1 (Data Matrix)' && handleUDI()}
                          {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType == 'GS1 (Data Matrix)' && 
                              imageSrc &&
                            <div style={{display:'flex', alignItems:'center', marginTop:'1%'}}>
                              <img style={{width:'100px', height:'100px'}} src={imageSrc} alt={`data matrix from`} />
                              <div style={{fontSize:'12px'}}>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haDateOfManufacture && projectInfo.labelData.dateOfManufacture}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.useByDate}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.hasLotNumber && projectInfo.labelData.LOTNumber}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haSerialNumber && projectInfo.labelData.serialNumber}</p>
                              </div>
                            </div>}
                        </div>
                       
                    </div>
                  </div>

                  <div style={activeTemplate === "template-3" ? {} : {display:'none'}} className='template-3'>
                    <div className='header'>
                          <div className='medical-device-symbol-header' style={{width:'5%'}}>
                                    {projectInfo && 
                                      projectInfo.labelData && 
                                        projectInfo.labelData.productType == "Medical device" &&
                                          <img className='symbol-img' src={Medical_deviceSymbol} />
                                        }
                            </div>
                            <div className='medical-device-symbol-header' style={{width:'8%', right:'0', top:'0', marginTop:'-5px'}}>
                              {projectInfo &&
                                projectInfo.labelData && 
                                  projectInfo.labelData.productClass == 'Class I'
                                  ?(<img style={{width:'100%'}} className='symbol-img' src={CE_mark} />)
                      
                                  :( <div style={{width:'100%', padding:'0', display:'flex', alignItems:'center', flexDirection:'column'}}  className=''>
                                        <img style={{width:'100%'}} className='' src={CE_mark} />
                                          {projectInfo &&
                                            projectInfo.labelData && 
                                          <p style={{fontSize:'70%', marginTop:'-5px'}} >{projectInfo.labelData.notifiedBodyNumber}</p>}
                                    </div>)}
                            </div>
                    {projectInfo && 
                                projectInfo.labelData && 
                                projectInfo.labelData.productName &&
                                <h3>{projectInfo.labelData.productName}</h3>}
                             {projectInfo && 
                                projectInfo.labelData && 
                                  projectInfo.labelData.intendedPurpose &&
                              <p>{projectInfo.labelData.intendedPurpose}</p>}
                    </div>
                    <div className='template-3-top-content'>
                      <div className='template-3-code-bar'>
                        <div style={{marginBottom:"1%"}}>
                        {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType !== 'GS1 (Data Matrix)' && handleUDI()}
                          {projectInfo && projectInfo.labelData && projectInfo.labelData.udiType == 'GS1 (Data Matrix)' && 
                              imageSrc &&
                            <div style={{display:'flex', alignItems:'center', marginTop:'1%'}}>
                              <img style={{width:'70px', height:'70px'}}  src={imageSrc} alt={`data matrix from`} />
                              <div style={{fontSize:'12px'}}>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haDateOfManufacture && projectInfo.labelData.dateOfManufacture}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.useByDate}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.hasLotNumber && projectInfo.labelData.LOTNumber}</p>
                                <p style={{margin:'2px 10px'}}>{projectInfo.labelData && projectInfo.labelData.haSerialNumber && projectInfo.labelData.serialNumber}</p>
                              </div>
                            </div>}
                        </div>
                        <div className='barcode-projectOwner'>
                          <div className='symbol-content-item' style={{width:''}}>
                              <img className='symbol-img' src={Manufacturer} />
                              <div className=''>
                                <p>{projectInfo?.labelData?.manufacturerName}</p>
                                <p>{projectInfo?.labelData?.manufacturerAddress}</p>
                                <p>{projectInfo?.labelData?.manufacturerCity}</p>
                                <p>{projectInfo?.labelData?.manufacturerCountry}</p>
                              </div>
                            </div>

                          {projectInfo?.labelData?.hasDistributor &&
                              <div className='symbol-content-item' style={{width:''}}>
                                <img className='symbol-img' src={Distributor} />
                                <div className=''>
                                  <p>{projectInfo.labelData.distributorName}</p>
                                  <p>{projectInfo.labelData.distributorAddress}</p> 
                                </div>
                              </div>
                            }
                          </div>
                      </div>
                      <div className='template-3-manufacturer-logo'>
                          <div className='template-1-content-top-right-top'>

                            <div style={{display:'flex', flexDirection:'column', marginLeft:'5px'}}>
                              {projectInfo &&
                                projectInfo.labelData && 
                                  projectInfo.labelData.quantity > 0 
                                ?  <p style={{fontSize:'80%', marginBottom:"17%"}}>QTY: {projectInfo.labelData.quantity}</p>
                                : <p style={{fontSize:'80%', marginBottom:"17%"}}></p>}
                              <div >
                                
                                {projectInfo &&
                                  projectInfo.labelData && 
                                  (projectInfo.labelData.addManufacturerLogo
                                   || projectInfo.labelData.addWebsite) &&
                                  <img style={{width:'17%'}} className='symbol-img' src={Patient_information_website} />}
                              </div>
                            </div>
                              {projectInfo &&
                                  projectInfo.labelData && 
                                  projectInfo.labelData.manufacturerLogo &&
                                <img src={`${process.env.REACT_APP_BASE_URL}/assets/images/${projectInfo.labelData.manufacturerLogo}`} alt="" />}
                          </div>
                          {projectInfo && projectInfo.labelData &&  projectInfo.labelData.addWebsite &&
                           projectInfo.labelData.website &&
                            <p style={{fontSize:'70%', marginLeft:'5px'}}>{projectInfo.labelData.website}</p>}
                      </div>
                    </div>

                    <div>
                    <div className='template-3-content-mid-fist-item symbols-with-text-behind'>
                          {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.customMadeDevice &&
                              <p>custom-made device</p>}
                          {projectInfo && 
                            projectInfo.labelData && 
                              projectInfo.labelData.clinicalInvestigationOnly &&
                              <p className='mx-'>exclusively for clinical investigation</p>}
                      </div>
                      <div className='template-3-content-mid-second-item'>
                      {projectInfo?.labelData?.useByDate &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Use_by_date} />
                            <div className=''>
                              <p>{projectInfo?.labelData?.useByDate}</p>
                            </div>
                          </div>}

                        {projectInfo?.labelData?.haDateOfManufacture &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img manufacture-img' src={Date_of_manufactureSymbol} />
                            <div className=''>
                              <p>{projectInfo?.labelData?.dateOfManufacture}</p>
                            </div>
                          </div>}

                        {projectInfo?.labelData?.hasLotNumber &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Batch_codeSymbol} />
                            <div className=''>
                              <p>{projectInfo?.labelData?.LOTNumber}</p>
                            </div>
                          </div>}

                        {projectInfo?.labelData?.haSerialNumber &&
                          <div className='symbol-content-item'>
                            <img className='symbol-img' src={Serial_numberSymbol} />
                            <div className=''>
                              <p>{projectInfo?.labelData?.serialNumber}</p>
                            </div>
                          </div>}

                        {(projectInfo?.labelData?.catalogueNumber || projectInfo?.labelData?.modelNumber)&&
                              <div className='symbol-content-item'>
                                <img className='symbol-img' src={catalogueNumberSymbol} />
                                <div className=''>
                                  <p>{projectInfo?.labelData?.catalogueNumber}</p>
                                </div>
                              </div>}

                        {projectInfo?.labelData?.modelNumber &&
                              <div className='symbol-content-item'>
                                <img className='symbol-img' src={modelNumberSymbol} />
                                <div className=''>
                                  <p>{projectInfo?.labelData?.modelNumber}</p>
                                </div>
                              </div>}
                          

                          {/* if outside of EUROPE */}
                        {!projectInfo?.labelData?.isOutsideEU &&
                            <div className='symbol-content-item'>
                              <img className='symbol-img Authorized_Representative' src={Authorized_Representative} />
                              <div className=''>
                                <p>{projectInfo?.labelData?.europeanAuthorizedRepName}</p>
                                <p>{projectInfo?.labelData?.europeanAuthorizedRepAddress}</p> 
                              </div>
                            </div>
                          }
                        {!projectInfo?.labelData?.isOutsideEU &&
                            <div className='symbol-content-item'>
                              <img className='symbol-img' src={Importer} />
                              <div className=''>
                                <p>{projectInfo?.labelData?.importerName}</p>
                                <p>{projectInfo?.labelData?.importerAddress}</p> 
                              </div>
                            </div>
                          }
                      </div>
                      {projectInfo && 
                            projectInfo.labelData && 
                            (projectInfo.labelData.packagingContents || projectInfo.labelData.packagingContents.length !== 0)&& projectInfo.labelData.packagingContents[0] !== '' &&
                          <ul className='template-3-content-mid-fist-item-top' style={{ display:'flex', flexWrap:'wrap', gridGap:'2%', padding:'5px  0px', justifyContent:'center',fontSize:'10px', marginBottom:'0'}}>
                            {projectInfo?.labelData?.packagingContents?.map((item => {
                              return (
                                  <li style={{listStyle:'circle !important'}}>- {item}</li>
                              )
                            }))}
                          </ul>}
                    </div>

                    <div className='template3-bottom-content'>
                    <div className='rest-of-the-symbols'>
                          {symbolsWithTextBehind()}
                        </div>
                    </div>
                  </div>
              </div>
                        }

                        <div className=''>
                            <h5>Comments :</h5>
                                <div ref={commentsDivRef} style={{borderRadius:'5px', maxHeight:'600px', overflowY:'scroll'}} className='label-info-content-item label-info-content-item-cmnt'>
                                {projectInfo &&
                                    projectInfo.comments?.length > 0 ?
                                    projectInfo.comments.map((item, index) => 
                                    (item.comment == '' || item.comment === undefined) ? null : (
                                            <div className='label-info-comments' >
                                                <div className='comment-content' style={{ border:'0.5px solid lightGray'}}>
                                                <div className='comment-header' style={{display:'flex', alignItems:'center'}}>
                                                    <Avatar style={{marginRight:'10px', backgroundColor: '#9A3B3A', fontWeight:'700'}} >{item.name[0].toUpperCase()}</Avatar>
                                                    <div>
                                                        <p className='comment-user-name'>{item.name}</p>
                                                        <p className='comment-user-role'>{item.role}</p>
                                                        <p className='comment-user-role'>createdAt: {formatDate(item.createdAt)}</p>
                                                    </div>
                                                </div>
                                                <div className="comment-user-description">
                                                    {item.comment}
                                                </div>
                                                </div>
                                            </div>)
                                    )
                                
                                : <p>No comments yet</p>}
                            
                                </div>
                        </div>
                    </div>

                    
                    </div>
                </div>
                <h6>Description :</h6>
                {projectInfo && 
                projectInfo.projectDescription &&
                <p className='label-info-description'>
                    {projectInfo.projectDescription}
                </p>
                }

            </div>

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
    </div>
  )
}

export default CreatorReview