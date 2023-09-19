import React, { useEffect, useState } from 'react'
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import './emailCheckForResetPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassOTPVerificationAction, resetUserPasswordEmailCheckAction } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const EmailCheckForResetPassword = () => {
    const [otpEmail, setOtpEmail] = useState('')

    const {EmailCheck} = useSelector(state => state);
    const {checkEmailRequest, checkEmailSuccess, checkEmailFail} = EmailCheck
    const dispatch = useDispatch()

    const handleEmailForm = e => {
        e.preventDefault();
        dispatch(resetUserPasswordEmailCheckAction(otpEmail))
        setOtpEmail("")
    }
        
    useEffect(() => {
        if(checkEmailSuccess){
            toast.success('check email success');
        }
    }, [checkEmailSuccess])

    useEffect(() => {
        console.log(checkEmailFail?.message)
        if (checkEmailFail) {
            toast.warning("Email Doesn't Exist ");
        }
    }, [checkEmailFail])


  return (
    <div className='emailVerification'>
        <div  className='form-content'>

            <div className='EmailCode-verification'>
                    <p>Sent verification code via email</p>
                <form action="" onSubmit={handleEmailForm}>
                    <input onChange={(e) => setOtpEmail(e.target.value)}
                            type="email" 
                            required
                            value={otpEmail}
                            placeholder='Enter Your Email'/>
                    <button disabled={checkEmailRequest? true : false} style={{marginTop:'10px'}} type='submit'>
                       {checkEmailRequest
                       ? <RotatingLines
                            strokeColor="#FFFFFF"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="30"
                            visible={true}
                        /> 
                       : "Send"}
                    </button>
                </form>
            </div> 
        
            

        </div>
    </div>
  )
}


export default EmailCheckForResetPassword