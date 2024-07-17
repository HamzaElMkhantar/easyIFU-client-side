import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { usersCompanyAction } from '../../redux/actions/userActions';
import { saveDocumentAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Avatar } from '@mui/material';
import bwipjs from 'bwip-js';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { useReactToPrint } from 'react-to-print';

import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { getLabelAction, saveLabelOrderAction } from '../../redux/actions/labelActions';
import { convertDateToYYMMDD } from '../../utilities/convertDateToYYMMDD';
import { handleUDI } from '../../utilities/handleUDI';
import Template1 from '../../templates/template1/Template1';
import SideBarLabelInfo from '../../components/header/SideBarLabelInfo';

const ReleasedProject = () => {
  const {projectId} = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null

  const {getLabel, saveDocument, saveOrderLabel} = useSelector(state => state);
    const {getLabelRequest, getLabelSuccess, getLabelFail, label} = getLabel;
  const {saveOrderLabelRequest, saveOrderLabelSuccess, savedOrderId, saveOrderLabelFail} = saveOrderLabel;

  const [projectInfo, setProjectInfo] = useState({});
  const [imageSrc, setImageSrc] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLabelAction(projectId, token))

}, [])

useEffect(() => {
    if(saveOrderLabelSuccess && savedOrderId){
      console.log("savedOrderId", savedOrderId)
      console.log("savedOrderId", savedOrderId)
      navigate(`/dashboard/document/${savedOrderId?._id}`)
    }


    if(saveOrderLabelFail){
      toast.warning(`${saveOrderLabelFail.message}`)
    }
  }, [ saveOrderLabelSuccess, saveOrderLabelFail,])

  useEffect(() => {
    if(getLabelSuccess){
      setProjectInfo(label)
    }


    if(getLabelFail){
      toast.warning(`${getLabelFail.message}`)
    }
  }, [getLabelSuccess, getLabelFail, savedOrderId])

    //  handle dynamic data for label
    function formatSumDateToYYYYMMDD(date) {
      if (!date || isNaN(date.getTime())) {
          console.log("Invalid date");
          return ''; // or return some default value
      }
  
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
  }
    const [dynamicData, setDynamicData] = useState({
        LotNumber: projectInfo?.labelData?.LOTNumber || '',
        useByDate: '',
        serialNumber: projectInfo?.labelData?.serialNumber || '',
        manufacturerDate: formatSumDateToYYYYMMDD(new Date()),
        hasPatientName: projectInfo.labelData?.hasPatientName || false,
        patientName: '' ,
        hasPatientNumber: projectInfo.labelData?.hasPatientNumber || false,
        patientNumber: '',
        hasDoctorName: projectInfo.labelData?.hasDoctorName || false,
        doctorName: '',
        quantity: projectInfo?.labelData?.quantity || 0,
        printCount: 1
    })

    useEffect(() => {
      setDynamicData({
        LotNumber: projectInfo?.labelData?.LOTNumber || '',
        useByDate: projectInfo?.labelData?.useByDate || '',
        serialNumber: projectInfo?.labelData?.serialNumber || '',
        manufacturerDate: formatSumDateToYYYYMMDD(new Date()),
        hasPatientName: projectInfo.labelData?.hasPatientName || false,
        patientName: projectInfo?.labelData?.patientName || '' ,
        hasPatientNumber: projectInfo.labelData?.hasPatientNumber || false,
        patientNumber: projectInfo?.labelData?.patientNumber || '',
        hasDoctorName: projectInfo.labelData?.hasDoctorName || false,
        doctorName: projectInfo?.labelData?.doctorName || '',
        quantity: projectInfo?.labelData?.quantity || 0,
        printCount: 1
    })
    }, [projectInfo])

    const [dateValidation, setDateValidation] = useState(true)
     const handleManufacturerDateChange = (event) => {
        const inputDate = event.target.value;
        const nameKey = event.target.name;
    
        // Regular expression for the "yyyy-mm-dd" format
        const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateFormatRegex.test(inputDate)) {
            // // Update the state only if the input is in the correct format
            // setDynamicData({
            //   ...dynamicData,
            //   [nameKey]: inputDate
            // });
            console.error('Invalid date format');
            setDateValidation(false)
          }
    
       
          // Update the state only if the input is in the correct format
          setDynamicData({
            ...dynamicData,
            [nameKey]: inputDate
          });

          if (dateFormatRegex.test(inputDate)) {
            setDateValidation(true)
          }
    
      };
    
    function addDates(date1Str, date2Str) {
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    
        if (!dateFormatRegex.test(date1Str) || !dateFormatRegex.test(date2Str)) {
            console.log("Both dates are not valid");
            return;
        }
    
        // Parse date strings into Date objects
        const date1 = new Date(date1Str);
        const date2 = new Date(date2Str);
    
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            console.log("Invalid date format");
            return;
        }
    
        // Perform addition
        const resultMilliseconds = date1.getTime() + date2.getTime();
    
        return new Date(resultMilliseconds);
    }
    const [activeTemplate, setActiveTemplate] = useState('template-1')
    const isTemplate3 = activeTemplate === "template-3" ? true : false


      const [dataMatrixValue, setDataMatrixValue] = useState(null);
      const [useByDateDataLabel, setUseByDateDataLabel] = useState(null);

      useEffect(() => {
          handleUDI(projectInfo) 
          if(projectInfo && projectInfo.labelData){
            const {udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc, haDateOfManufacture, hasLotNumber, haSerialNumber} = projectInfo.labelData

            let useByDateData = null
            if(haDateOfManufacture){
              if(dynamicData.manufacturerDate!== ''){
                useByDateData = "(17)" +  convertDateToYYMMDD(formatSumDateToYYYYMMDD(addDates(dynamicData?.manufacturerDate,projectInfo?.labelData?.useByDate)))
                setUseByDateDataLabel(formatSumDateToYYYYMMDD(addDates(dynamicData?.manufacturerDate,projectInfo?.labelData?.useByDate)))
              }else{
                useByDateData = "(17)" +  convertDateToYYMMDD(useByDate)
                setUseByDateDataLabel(useByDate)
              }
            }else{

              if(dynamicData.expirationDate == ''){
                useByDateData = "(17)" +  convertDateToYYMMDD(useByDate)
                setUseByDateDataLabel(useByDate)
              }else{
                useByDateData = "(17)" +  convertDateToYYMMDD(dynamicData.expirationDate)
                setUseByDateDataLabel(dynamicData.expirationDate)
              }
            }

            let udiData = (udiDI && udiDI !== '' ? "(01)" + udiDI : '') +
                              (haDateOfManufacture ? (dynamicData.manufacturerDate!== '' ? "(11)" + convertDateToYYMMDD(dynamicData.manufacturerDate) :  "yyyy-mm-dd") : '') +
                              (useByDateData) +
                              (hasLotNumber ? (dynamicData.LotNumber !== '' ? "(10)" + dynamicData.LotNumber : 'XXXXXXXX') : '') +
                              (haSerialNumber ?  (dynamicData.serialNumber !== '' ? "(21)" + dynamicData.serialNumber : 'XXXXXXXX'): '');
                  setDataMatrixValue(udiData)
          }
      }, [projectInfo, dynamicData])
  
      // data matrix
      useEffect(() => {
        let canvas = document.createElement("canvas");
        bwipjs.toCanvas(canvas, {
          bcid: "datamatrix", // Barcode type
          text: dataMatrixValue ? dataMatrixValue : '612975642512', // Text to encode
          scale: 10, // 3x scaling factor
          height: 15, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center" // Always good to set this
        });
        setImageSrc(canvas.toDataURL("image/png"));
      }, [dataMatrixValue]);
     
      const saveOrder = () => {
        const data = {
          labelId: projectId,
           dynamicData,
           producerId: decodedToken?.userInfo._id
        }
        dispatch(saveLabelOrderAction(data, token))
      }
      const [size, setSize] = useState('');
      const handleSizeChange = (newSize) => {
        setSize(newSize);
        console.log('Size updated in parent:', newSize);
      };
  return (
    <div className='container label-information mb-5' style={{padding:'0', height:'70vh', display:'flex'}}>
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
        <SideBarLabelInfo isSidebarOpen={true} 
                  status={projectInfo?.status}
                  hideInfo={true}
                  projectId={projectId}/>
      {!getLabelRequest ? 
      <main style={{marginTop:'30px', width:'100%'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <Link to='/dashboard/templates' className='label-info-link mb-3'><ArrowBackIcon /> Back</Link>
              {!getLabelRequest && projectInfo &&
                  <h6  className='label-info-title mb-4' style={{color:'#', flex:'1', fontSize:'24px'}}>{projectInfo?.labelName}</h6>
              }
          </div>
          <div className='label-info-content-item row'>
            {projectInfo && 
              <div className='label-info-data col-md-8'>
                <TransformWrapper initialScale={1}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <TransformComponent >
                          <div style={{backgroundColor:'', width:'40vw', height:'', cursor:'zoom-in'}}>
                            {/* displaying label should be dynamic ...! */}
                              {projectInfo.labelTemplate == "Template1" &&
                                <Template1
                                    scale={'1'}
                                    width={"100"}
                                    height={"150"} 
                                    projectInfo={projectInfo}
                                    handleUDI={handleUDI}
                                    imageSrc={imageSrc}
                                    onSizeChange={handleSizeChange}
                                    dynamicData={dynamicData}
                                />}
                          </div>
                          </TransformComponent>
                          <div className="" style={{backgroundColor:'',marginTop:'30px', width:'100%'}}>
                            <button style={{backgroundColor:'#062D60', color:'#F0F0F0', padding:'2px 10px', margin:'5px', borderRadius:'2px'}} onClick={() => zoomIn()}>+</button>
                            <button style={{backgroundColor:'#062D60', color:'#F0F0F0', padding:'2px 10px', margin:'5px', borderRadius:'2px'}} onClick={() => zoomOut()}>-</button>
                            <button style={{backgroundColor:'#062D60', color:'#F0F0F0', padding:'2px 10px', margin:'5px', borderRadius:'2px'}} onClick={() => resetTransform()}>reset</button>
                          </div>
                      </React.Fragment>
                    )}
                </TransformWrapper>
              </div>}

                {/* dynamic data  */}
              <div className='col-md-4'>
                  <h5>Dynamic Data :</h5>
                    {dateValidation ? '' : <p style={{color:'red'}}>Date not Valid</p>}
                      <form  style={{backgroundColor:'#fff', padding:'10px', borderRadius:'4px', border:'1px solid lightGray'}}>
                        {projectInfo?.labelData?.hasLotNumber &&
                        <div className='form-group mb-3' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>Lot Number:</label>
                          <input placeholder='Lot Number' value={dynamicData.LotNumber} onChange={(e) => setDynamicData({...dynamicData, LotNumber: e.target.value})} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>}

                        {projectInfo && projectInfo?.labelData && !projectInfo?.labelData?.haDateOfManufacture && projectInfo?.labelData?.useByDate && 
                        <div className='form-group mb-3' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>Expiration Date:</label>
                          <input placeholder='yyyy-mm-dd' value={dynamicData.useByDate} name='useByDate' onChange={(e) => handleManufacturerDateChange(e)} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>}
                        
                        {projectInfo && projectInfo?.labelData && projectInfo?.labelData?.haSerialNumber &&
                        <div className='form-group mb-3' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>Serial Number:</label>
                          <input placeholder='Serial Number' value={dynamicData.serialNumber} onChange={(e) => setDynamicData({...dynamicData, serialNumber: e.target.value})} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>}
                        {projectInfo && projectInfo?.labelData && projectInfo?.labelData?.haDateOfManufacture && 
                        <div className='form-group mb-3' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>Manufacturer Date: </label>
                          <input placeholder='yyyy-mm-dd' value={dynamicData.manufacturerDate} name='manufacturerDate' onChange={(e) => handleManufacturerDateChange(e)} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>}
                        {projectInfo && projectInfo?.labelData && projectInfo?.labelData?.quantity && 
                        <div className='form-group mb-3' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>Quantity: </label>
                          <input placeholder='quantity' type='number' min="0" value={dynamicData.quantity} name='quantity' onChange={(e) => setDynamicData({...dynamicData, quantity: e.target.value})} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>}
                      </form>
                      <div className='card mt-2'>
                      <div className='form-group px-2 py-2' style={{display:'flex', flexDirection:'column'}}>
                          <label style={{fontWeight:'500'}}>how many label you want to print? : {dynamicData.printCount}</label>
                          <input placeholder='printCount' type='number' min="1" value={dynamicData.printCount} name='quantity' onChange={(e) => setDynamicData({...dynamicData, printCount: e.target.value})} style={{borderBottom:'1px solid gray', borderRadius:'0px', padding:'0px 10px', outline:'none'}}/>
                        </div>
                      </div>
                      <button disabled={saveOrderLabelRequest ? true : false} className='label-info-link' style={{width:'100%', marginTop:'10px'}} 
                          onClick={() => saveOrder() }>{saveOrderLabelRequest 
                          ? <RotatingLines
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                strokeColor="#FFFFFF"
                                visible={true}
                                /> 
                          : "Save Order"}
                      </button>
                  <div className='mt-3' style={{display:'', gridGap:'10px'}}>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Label Name: {projectInfo?.labelName}</p>
                    {projectInfo?.labelDescription &&<p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Label description: {projectInfo?.labelDescription}</p>}
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Version: {projectInfo?.labelVersion}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>createdBy: {projectInfo?.createdBy?.lastName} {projectInfo?.createdBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ApprovedBy: {projectInfo?.approvedBy?.lastName} {projectInfo?.approvedBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ReleasedBy: {projectInfo?.releaseBy?.lastName} {projectInfo?.releaseBy?.firstName}</p>
                    {(projectInfo?.produceBy?.lastName || projectInfo?.produceBy?.firstName) &&
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}> <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ProducedBy: {projectInfo?.produceBy?.lastName} {projectInfo?.produceBy?.firstName}</p>}
                    {projectInfo?.printCount > 0 &&
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}> <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Print count: {projectInfo?.printCount}</p>}
                  </div>
              </div>
              
          </div>
      </main>
      
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