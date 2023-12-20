import React, { useEffect, useState } from 'react';
import './documentInformation.css'; // Make sure to create this stylesheet
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import { useDispatch, useSelector } from 'react-redux';
import { documentByIdAction } from '../../redux/actions/projectActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';

const DocumentInformation = () => {
    const {documentId, size} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {documentById} = useSelector(state => state)
    const {documentByIdRequest, documentByIdSuccess, documentByIdFail, document} = documentById

    const [documentInfo, setDocumentInfo] = useState(null)

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

    console.log(documentInfo)

    const componentRef = React.useRef();

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const [labelCount, setLabelCount] = useState(1)
    console.log(labelCount)

  return (
    <div className="container pt-3">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Link style={{height:'35px'}} to='/dashboard/documents' className='label-info-link'><ArrowBackIcon /> Back</Link>
          <button style={{height:'35px'}} onClick={handlePrint}><PrintIcon style={{fontSize:'40px', color:'#8C2E2C'}} /></button>
        </div>
        <div>
          <div  className='pt-4'>
            <label htmlFor="labelCount">How many label you want</label>
            <br/>
            <input style={{maxWidth:'150px'}}
                    id='labelCount' 
                    type='number'
                    min="1"
                    value={labelCount}
                    onChange={(e) => setLabelCount(e.target.value)}/>
          </div>
          <div className='document-content pt-4' >
           {!documentByIdRequest 
           ?<div ref={componentRef} className="A4-content pt-1" style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', alignItems:'flex-start'}}>
           {[...Array(parseInt(labelCount))].map((_, index) => (
             <img
               key={index}
               style={{ width: `${size}`, height: '', border: '1px solid black' }}
               className="card-img-top p-1 m-1"
               src={`${process.env.REACT_APP_BASE_URL}/assets/documents/${documentInfo && documentInfo?.imageUrl}`}
               alt={documentInfo && documentInfo?.projectName}
             />
             
           ))}
         </div>
        : <RotatingLines strokeColor="#191919"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            color="#fff"
            style={{ background: 'white' }}
            visible={true}/>}
            
          </div>
        </div>
    </div>
  );
};


export default DocumentInformation