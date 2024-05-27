import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { documentByIdAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const LabelSizes = () => {
    const {documentId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    let documentSizes = [14, 17]

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
  return (
    <div className="container py-3">
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Link style={{height:'35px'}} to='/dashboard/documents' className='label-info-link'><ArrowBackIcon /> Back</Link>
    </div>
      <div className='' style={{display:'flex', justifyContent:'center', alignItems:'flex-start', flexWrap:'wrap', margin:'auto', gridGap:''}}>
       {!documentByIdRequest 
       ? documentSizes?.map((item, index) =>{
        return (
        <Link to={`/dashboard/document/${documentInfo?._id}/${item}cm`}  className='card-wrapper' style={{width:'32%', textAlign:'center', paddingRight:'1%', margin:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <p style={{fontSize:'14px', color:'gray', margin:'0', padding:'0'}}>with size:{item}cm</p>
            <img style={{width:`100%`, margin:'0', padding:'0'}} className="" src={`${process.env.REACT_APP_BASE_URL}/assets/documents/${documentInfo && documentInfo?.imageUrl}`}alt={documentInfo && documentInfo?.projectName} />
        </Link>
        )
       }) 
        : <RotatingLines strokeColor="#191919"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        color="#fff"
        style={{ background: 'white' }}
        visible={true}/>}
        
      </div>
</div>
  )
}

export default LabelSizes