import React, { useEffect, useState } from 'react';
import './documentInformation.css'; // Make sure to create this stylesheet
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import { useDispatch, useSelector } from 'react-redux';
import { documentByIdAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../templates/template1/Template1';
import { handleUDI } from '../../utilities/handleUDI';
import { convertDateToYYMMDD } from '../../utilities/convertDateToYYMMDD';
import bwipjs from 'bwip-js';
import { saveToPrintAction } from '../../redux/actions/labelActions';
import Swal from 'sweetalert2'

const DocumentInformation = () => {
    const {documentId} = useParams()
    const query = new URLSearchParams(useLocation().search)
    
    
    const [numOfPrint, setNumOfPrint] = useState(1);
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
console.log("print num :" , numOfPrint)
    const [documentInfo, setDocumentInfo] = useState(null)

    const {documentById, saveToPrint} = useSelector(state => state)
    const {documentByIdRequest, documentByIdSuccess, documentByIdFail, document} = documentById
    const {saveToPrintRequest, saveToPrintSuccess, saveToPrintFail, saveToPrintData} = saveToPrint

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(documentByIdAction(documentId, token))
    }, [])

    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        if(documentByIdSuccess){
            setDocumentInfo(document)
        }

        if(documentByIdFail){
            toast.warning(`${documentByIdFail.message}`)
        }
    }, [documentByIdSuccess, documentByIdFail])

  //   useEffect(() => {
  //     if(saveToPrintSuccess){
  //       Swal.fire({
  //         title: "Printing was successful",
  //         icon: "success",
  //         customClass: {
  //           popup: 'custom-swal-bg',
  //           confirmButton: 'custom-swal-button',
  //           icon: 'custom-swal-icon'
  //         }
  //       });
  //     }
  // }, [saveToPrintSuccess])

    useEffect(() => {
      setNumOfPrint(documentInfo?.printLogs[0].numOfPrint)
    }, [documentInfo])
    const componentRef = React.useRef();


    const userId = decodedToken?.userInfo?._id || null
    const [data, setData] = useState({
      labelId: documentId, 
      printedBy: userId, 
      isPrinted: true,
      action: 'isPrinted',
      numOfPrint
    })

    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    //   onAfterPrint: () => handlePrintSuccess(),
    //   onPrintError: () => handlePrintFailure(),
    // });
    // const handlePrintSuccess = () => {
    //   // alert('Printing was successful!');
    //   dispatch(saveToPrintAction(data, token))
    // };
  
    // const handlePrintFailure = () => {
    //   alert('Printing failed.');
    //   toast.info("Print Failed")
    // };

    const [isPrintInitiated, setIsPrintInitiated] = useState(false);

    const navigate = useNavigate()
    const handlePrintSuccess = () => {
      dispatch(saveToPrintAction(data, token)); // Adjust data and token variables as needed
      // if(saveToPrintSuccess){
        Swal.fire({
          // title: "Printing was successful",
          icon: "success",
          customClass: {
            popup: 'custom-swal-bg',
            confirmButton: 'custom-swal-button',
            icon: 'custom-swal-icon'
          }
        }).then(() => {
          navigate(`/dashboard/templates`)
        })
        // documentInfo.printCount - documentInfo.printLogs[0].numOfPrint
        setData({...data,
          numOfPrint: documentInfo?.printLogs[0].numOfPrint
        })
      // }
      navigate(`/dashboard/templates`)
    };
  
    const handlePrintFailure = async () => {
      await dispatch(saveToPrintAction({...data, action: 'failed'}, token));
      navigate(`/dashboard/templates`)
    };
  
    // const handlePrint = useReactToPrint({
    //   content: () => {
    //     setIsPrintInitiated(true);
    //     return componentRef.current;
    //   },
    //   onAfterPrint: () => {
    //     if (isPrintInitiated) {
    //       const userConfirmed = window.confirm('Did the document print successfully?');
    //       if (userConfirmed) {
    //         handlePrintSuccess();
    //       } else {
    //         handlePrintFailure();
    //       }
    //       setIsPrintInitiated(false);
    //     }
    //   },
    //   onPrintError: handlePrintFailure,
    // });

    const handlePrint = useReactToPrint({
      content: () => {
        // setIsPrintInitiated(true);
        return componentRef.current;
      },
      onAfterPrint: () => {

          Swal.fire({
            title: 'Did the document print successfully?',
            text: "Please confirm if your document printed as expected.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            customClass: {
              popup: 'custom-swal-bg',
              confirmButton: 'custom-swal-button',
              cancelButton: 'custom-swal-button',
              icon: 'custom-swal-icon'
            }
          }).then((result) => {
            if (result.isConfirmed) {

              handlePrintSuccess();
              navigate(`/dashboard/document-sizes/${documentId}`)
            } else if (result.dismiss === Swal.DismissReason.cancel) {

              handlePrintFailure();
              navigate(`/dashboard/document-sizes/${documentId}`)
            }
          });
          // setIsPrintInitiated(false);
        
      },
      onPrintError: handlePrintFailure,
    });

    const [dataMatrixValue, setDataMatrixValue] = useState('245');

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

const [size, setSize] = useState('');

console.log("document : ", documentInfo)

const handleSizeChange = (newSize) => {
  setSize(newSize);
  console.log('Size updated in parent:', newSize);
};


  return (
    <div className="container pt-3">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Link style={{height:'35px'}} to={`/dashboard/document-sizes/${documentId}`} className='label-info-link'><ArrowBackIcon /> Back</Link>
          <button style={{height:'35px'}} onClick={handlePrint}><PrintIcon style={{fontSize:'40px', color:'#8C2E2C'}} /></button>
        </div>
        <div>
          {/* <div  className='pt-4 d-flex' style={{backgroundColor:''}}>
            <div>
            <label htmlFor="labelCount">How many label you want</label>
            <br/>
            <input style={{maxWidth:'150px'}}
                    id='labelCount' 
                    type='number'
                    min="1"
                    value={numOfPrint}
                    onChange={(e) => setLabelCount(e.target.value)}/>
            </div>
            </div> */}
            {size && <h3 style={{color: '', fontSize:'25px', textAlign:'center'}}>size: {size}mm</h3>}

          <div className='document-content pt-4'>

           {!documentByIdRequest 
           ? <div ref={componentRef} 
              className="container" 
              style={{display:'flex', 
                  flexWrap:'wrap', 
                  justifyContent:'space-evenly',
                  alignItems:'flex-start', 
                  position:'relative'}}>
            
           {/* {numOfPrint &&[...Array(parseInt(numOfPrint))].map((_, index) => (
           documentInfo && documentInfo?.labelTemplate == "Template1" &&
              <Template1
                  printCount={documentInfo.printCount + index+1 - documentInfo.printLogs[0].numOfPrint < 0 ? documentInfo.printCount + index+1 : documentInfo.printCount + index+1 }
                  border={'0'}
                  scale={'1'}
                  width={"100"}
                  height={"150"} 
                  projectInfo={documentInfo}
                  handleUDI={handleUDI}
                  imageSrc={imageSrc}
                  onSizeChange={handleSizeChange}
                  isFreeTrail={true}
              />
           ))}
            */}
            {numOfPrint && [...Array(parseInt(numOfPrint))].map((_, index) => {
                const printCount = documentInfo?.printCount - documentInfo?.printLogs[0]?.numOfPrint + index + 1
                
                console.log(`Rendering Template1: index=${index}, printCount=${printCount}`);

                return documentInfo && documentInfo?.labelTemplate == "Template1" &&(
                  <Template1
                    key={index}
                    printCount={printCount}
                    border={'0'}
                    scale={'1'}
                    width={"100"}
                    height={"150"}
                    projectInfo={documentInfo}
                    handleUDI={handleUDI}
                    imageSrc={imageSrc}
                    onSizeChange={handleSizeChange}
                    isFreeTrail={true}
                  />
                );
              })}

         </div>
        : <div style={{textAlign:'center'}}>
            <RotatingLines strokeColor="#191919"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              color="#fff"
              style={{ background: 'white' }}
              visible={true}/>
        </div>}
            
          </div>
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
    </div>
  );
};


export default DocumentInformation