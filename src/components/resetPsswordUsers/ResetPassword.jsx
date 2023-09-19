import React, { useEffect, useState } from 'react'
import './emailCheckForResetPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassOTPVerificationAction, resetPasswordAction } from '../../redux/actions/authActions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import jwtDecode from 'jwt-decode';

const ResetPassword= () => {
    const {token, email, id} = useParams()
    console.log(token)

    const [otpCode, setOtpCode] = useState('')
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isValid, setIsValid] = useState(false)


    useEffect(() => {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    
      if (token) {
        if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
          // Token has expired
          setIsValid(true);
        } else {
          // Token is still valid
          setIsValid(false);
        }
      }
    }, [token]);

    const { OTPVerification, resetPassword} = useSelector(state => state);
    const {checkCodeOtpRequest, checkCodeOtpSuccess, checkCodeOtpFail} = OTPVerification
    const {resetPasswordRequest, resetPasswordSuccess, resetPasswordFail} = resetPassword

    const dispatch = useDispatch()

    const handleVerifyForm = e => {
        e.preventDefault();
        dispatch(resetPassOTPVerificationAction(email, otpCode))
        setOtpCode("")
    }

    const handleResetForm = e => {
      e.preventDefault();
      if(newPassword == repeatPassword){
        dispatch(resetPasswordAction(email, newPassword))
        setNewPassword("")
        setRepeatPassword("")
      }else{
        toast.info("Password didn't match !")
        setNewPassword("")
        setRepeatPassword("")
      }
    }

    useEffect(() => {
        if(checkCodeOtpFail){
            toast.info('Verification Code Incorrect');
        }
    }, [checkCodeOtpFail])
    useEffect(() => {
        if(checkCodeOtpSuccess){
            toast.success('Verification Correct');
            setShowPasswordForm(true)
        }
    }, [checkCodeOtpSuccess])

    useEffect(() => {
      if(resetPasswordFail){
          toast.info('Reset Failed');
      }
  }, [resetPasswordFail])
  useEffect(() => {
      if(resetPasswordSuccess){
          toast.success('Password Changed Successfully');
          setShowPasswordForm(true)
      }
  }, [resetPasswordSuccess])



  return (
    <div className='emailVerification'>
          {isValid 
          ?<div>
            <div style={{paddingTop:'10px', backgroundColor:'#FFF3F4', textAlign:'start'}} className='form-content'>
              <h4 style={{color:"#7A272E"}}>Password reset failed</h4>
              <p style={{fontSize:"15px"}}>Your password reset link appears to be invalid 
                or has expired. Choose the button below to reset 
                your password again.</p>
            <Link to="/resetPassword" style={{color:'black'}}>
              reset your password?
            </Link>
            </div>
          </div>
          :
        <div  className='form-content'>

          <div>
            {!showPasswordForm && <div style={{paddingTop:'10px'}} className='EmailCode-verification'>
                <p>Enter Your Verification Code</p>
                <form action="" onSubmit={handleVerifyForm}>
                    <input onChange={(e) => setOtpCode(e.target.value)}
                            type="text" 
                            placeholder='Enter Verification Code'/>
                    <button disabled={checkCodeOtpRequest ? true : false} style={{marginTop:'10px'}} type='submit'>
                      {checkCodeOtpRequest 
                      ? <RotatingLines
                          strokeColor="#FFFFFF"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={true}
                      /> 
                          
                      :"Verify"}
                      </button>
                </form>
            </div>}

            {showPasswordForm && <div style={{paddingTop:'10px'}} className='EmailCode-verification'>
                <p>Enter Your Password</p>
                <form action="" onSubmit={handleResetForm} style={{textAlign:'start'}}>
                  <label htmlFor='password'>New Password</label>
                    <input onChange={(e) => setNewPassword(e.target.value)}
                            type="password" 
                            id='password'
                            value={newPassword}
                            placeholder='Enter Your Password'/>
                  <label htmlFor='repeatPassword'>Repeat Your Password</label>
                    <input onChange={(e) => setRepeatPassword(e.target.value)}
                            type="password" 
                            id='repeatPassword'
                            value={repeatPassword}
                            placeholder='Repeat Your Password'/>
                    <button disabled={resetPasswordRequest ? true : false} style={{marginTop:'10px'}} type='submit'>
                    {resetPasswordRequest 
                      ? <RotatingLines
                          strokeColor="#FFFFFF"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={true}
                      />  
                      :"Send"}
                    </button>
                </form>
            </div>}
          </div>

        </div>}
    </div>
  )
}


export default ResetPassword