import React, { useEffect, useState } from 'react'
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import './emailVerification.css'
import { useDispatch, useSelector } from 'react-redux';
import { GenerateOTPAction, VerifyOTPAction } from '../../redux/actions/authActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Navigate, Outlet, useNavigate} from 'react-router-dom';
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
    const navigate = useNavigate()

    useEffect(() => {
        if (VerifyOTP.OTPVerifySuccess) {
            toast.success('Success');
            navigate("/dashboard");
            // <Navigate to="/dashboard" />
        }

    }, [VerifyOTP.OTPVerifySuccess])


    if (VerifyOTP.OTPVerifySuccess) {
        return navigate("/dashboard");
      }

  return ( 
            <div className='emailVerification'>
                {VerifyOTP && VerifyOTP?.OTPVerifyRequest &&
                <div style={{width:'100%', textAlign:'center', position:'absolute', top:'30px'}}>
                    <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    /> 
                </div>}

                    <div className='form-content' style={{backgroundColor:''}}>
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