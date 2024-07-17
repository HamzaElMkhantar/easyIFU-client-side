import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { documentByIdAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { handleUDI } from '../../utilities/handleUDI';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import bwipjs from 'bwip-js';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Template1 from '../../templates/template1/Template1';
import { convertDateToYYMMDD } from '../../utilities/convertDateToYYMMDD';
import SideBarLabelInfo from '../../components/header/SideBarLabelInfo';
import { saveToPrintAction } from '../../redux/actions/labelActions';




const LabelSizes = () => {
    const {documentId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
    const [imageSrc, setImageSrc] = useState('');
    
    const [size, setSize] = useState('');
    const handleSizeChange = (newSize) => {
      setSize(newSize);
      console.log('Size updated in parent:', newSize);
    };

    const {documentById, saveToPrint} = useSelector(state => state)
    const {documentByIdRequest, documentByIdSuccess, documentByIdFail, document} = documentById
    const {saveToPrintRequest, saveToPrintSuccess, saveToPrintFail, saveToPrintData} = saveToPrint
    
    const userId = decodedToken?.userInfo?._id || null
    const [data, setData] = useState({
      labelId: documentId, 
      printedBy: userId, 
      isPrinted: false,
      action: 'toPrint',
      numOfPrint: 1
    })
    const [documentInfo, setDocumentInfo] = useState(null)
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(documentByIdAction(documentId, token))
    }, [])
    useEffect(() => {
        if(documentByIdSuccess){
            setDocumentInfo(document)
        }

        if(documentByIdFail){
            toast.warning(`${documentByIdFail.message}`)
        }
    }, [documentByIdSuccess, documentByIdFail])

    useEffect(() => {
      if(saveToPrintSuccess){
        navigate(`/dashboard/document/${documentId}`)
      }

      if(saveToPrintFail){
          toast.warning(`${saveToPrintFail.message}`)
      }
  }, [saveToPrintSuccess, saveToPrintFail])


    const [dataMatrixValue, setDataMatrixValue] = useState('245');
//       //  handle dynamic data for label
//   function formatSumDateToYYYYMMDD(date) {
//     if (!date || isNaN(date.getTime())) {
//         console.log("Invalid date");
//         return ''; // or return some default value
//     }

//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const dd = String(date.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
// }
useEffect(() => {
  handleUDI(documentInfo) 
  if(documentInfo && documentInfo.labelData){

    const {udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc, haDateOfManufacture, hasLotNumber, haSerialNumber} = documentInfo.labelData

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

setDataMatrixValue(udiData || '123')
}
}, [documentInfo])
// data matrix
useEffect(() => {
  if (typeof document !== 'undefined' && document?.createElement) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d'); // Get the 2D context of the canvas

    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix", // Barcode type
      text: dataMatrixValue ? dataMatrixValue : '612975642512', // Text to encode
      scale: 10, // 3x scaling factor
      height: 15, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center" // Always good to set this
    }, function (err, cvs) { // Callback function with canvas object
      if (err) {
        console.error(err);
        return;
      }
      setImageSrc(cvs.toDataURL("image/png")); // Use `cvs` here instead of `canvas`
    });
  }
}, [dataMatrixValue]);


const saveDataToPrint = () => {
  dispatch(saveToPrintAction(data, token))
}
  return (
    <div className="container" style={{padding:'0', height:'70vh', width:'100%', display:'flex'}}>
      <SideBarLabelInfo isSidebarOpen={true} 
                  status={documentInfo?.status}
                  hideInfo={true}
                  projectId={documentId}/>
      <main style={{padding: "20px 5px", backgroundColor:'', margin:"0 auto", flex:0.95}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Link style={{height:'35px'}} to={'/dashboard/documents'} className='label-info-link'><ArrowBackIcon /> Back</Link>
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
            <div className='row mt-2'>
              
            {!documentByIdRequest 
            ?<>
              <div className='label-info-data col-md-7'> 
                {size && <p style={{color:'gray'}}>size: {size}mm</p>}
                {documentInfo?.labelTemplate == "Template1" &&
                    <Template1
                        scale={'1'}
                        width={"100"}
                        height={"150"} 
                        projectInfo={documentInfo}
                        handleUDI={handleUDI}
                        imageSrc={imageSrc}
                        onSizeChange={handleSizeChange}
                    />}
              </div>
              <div className='col-md-5' style={{height:'100%'}}>
                <div className='card-body' style={{backgroundColor:'white', border:'1px solid lightgray', height:'100%'}}>
                  <h5 className='my-2 pb-1' style={{textAlign:'', borderBottom:'1px solid lightgray'}}>how many label you want to print? : {data.numOfPrint}</h5>
                  <input style={{borderBottom:'1px solid black'}}
                  type="number" min='1' value={data.numOfPrint} onChange={e => setData({...data, numOfPrint: e.target.value})} />
                  {/* <Link to={`/dashboard/document/${documentId}`}> */}
                      <button 
                        onClick={saveDataToPrint} 
                        disabled={saveToPrintRequest ? true : false}
                        className='my-3' 
                        style={{backgroundColor:'#062D60', color:'#fff', fontSize:'18px', fontWeight:"", width:'100%', borderRadius:'5px'}}>
                          {saveToPrintRequest 
                          ? <RotatingLines
                              strokeColor="#fff"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="30"
                              visible={true}/> :"Save"}</button>
                  {/* </Link>  */}
                </div>
                <div className='mt-3' style={{display:'', gridGap:'10px'}}>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Label Name: {documentInfo?.labelName}</p>
                    {documentInfo?.labelDescription &&<p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Label description: {documentInfo?.labelDescription}</p>}
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Version: {documentInfo?.labelVersion}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>createdBy: {documentInfo?.createdBy?.lastName} {documentInfo?.createdBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ApprovedBy: {documentInfo?.approvedBy?.lastName} {documentInfo?.approvedBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}>  <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ReleasedBy: {documentInfo?.releaseBy?.lastName} {documentInfo?.releaseBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}> <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>ProducedBy: {documentInfo?.produceBy?.lastName} {documentInfo?.produceBy?.firstName}</p>
                    <p className='mb-1' style={{color:'gray', fontSize:'14px', fontWeight:'500', margin:'0'}}> <CheckCircleOutlineIcon style={{width:'20px', marginRight:"5px", color:"#08408B", marginBottom:'1px'}}/>Print count: {documentInfo?.printCount}</p>
                </div>
              </div>
            </>
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
      </main>
</div>
  )
}

export default LabelSizes