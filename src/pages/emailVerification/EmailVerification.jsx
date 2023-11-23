import React, { useEffect, useState } from 'react'
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import './emailVerification.css'
import { useDispatch, useSelector } from 'react-redux';
import { GenerateOTPAction, VerifyOTPAction } from '../../redux/actions/authActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
const EmailVerification = () => {
    const [otpCode, setOtpCode] = useState('')

    const {GenerateOTP, VerifyOTP} = useSelector(state => state);
    const dispatch = useDispatch()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
    const handleOtpForm = e => {
        e.preventDefault();
        dispatch(VerifyOTPAction(decodedToken.userInfo._id, otpCode))
    }

    const handleBTN = () => {
        dispatch(GenerateOTPAction(decodedToken.userInfo._id))
    }    
    
    useEffect(() => {
        if(GenerateOTP.OTPRequest){
            toast.info(
               <RotatingLines
                    strokeColor="#FFFFFF"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                     visible={true}
                /> 
            );
        }

    }, [GenerateOTP.OTPRequest])
    useEffect(() => {
        if(VerifyOTP.OTPFail){
            toast.error('Please Try Again');
        }
    }, [VerifyOTP.OTPFail])
    useEffect(() => {
        if(GenerateOTP.OTPSuccess){
            toast.success('Code OTP sent to your email');
        }
    }, [GenerateOTP.OTPSuccess])

        
    useEffect(() => {
        if(VerifyOTP.OTPVerifyFail){
            toast.error('Code OTP Incorrect');
        }
    }, [VerifyOTP.OTPVerifyFail])

    useEffect(() => {
        if (VerifyOTP.OTPVerifySuccess) {
            toast.success('Success');
            // <Navigate to="/dashboard" />;
        }
    }, [VerifyOTP.OTPVerifySuccess])

    const navigate = useNavigate()
    if (VerifyOTP.OTPVerifySuccess) {
        navigate("/dashboard");
    }


  return (
    <div className='emailVerification'>
        <div className='form-content'>
            <LocalPostOfficeRoundedIcon className='OTP-Icon' />
            <h3>Enter OTP</h3>
            <p>We have sent you access code via email<br/>  for OTP Verification</p>
            <form action="" onSubmit={handleOtpForm}>
                <input onChange={(e) => setOtpCode(e.target.value)}
                        type="text" 
                        placeholder='Enter OTP'/>
                <button type='submit'>Verify</button>
            </form>
            <div>
                <p>Didn't receive the code? <br/>
                    <span onClick={() => handleBTN()}>Sent code again</span>                    
                </p>
            </div>
        </div>
    </div>
  )
}

export default EmailVerification