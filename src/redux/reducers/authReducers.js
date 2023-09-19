import {LOGIN_FAILED, 
        LOGIN_REQUEST, 
        LOGIN_SUCCESS, 

        LOGOUT_REQUEST,
        LOGOUT_SUCCESS,
        LOGOUT_FAILED,

        REFRESH_FAILED, 
        REFRESH_REQUEST, 
        REFRESH_SUCCESS, 
        
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        REGISTER_FAILED,
        OTP_GENERATE_REQUEST,
        OTP_GENERATE_SUCCESS,
        OTP_GENERATE_FAILED,
        OTP_VERIFY_REQUEST,
        OTP_VERIFY_SUCCESS,
        OTP_VERIFY_FAILED,
        RESET_PASSWORD_EMAIL_CHECK_REQUEST,
        RESET_PASSWORD_EMAIL_CHECK_SUCCESS,
        RESET_PASSWORD_EMAIL_CHECK_FAILED,
        RESET_PASSWORD_CODE_CHECK_REQUEST,
        RESET_PASSWORD_CODE_CHECK_SUCCESS,
        RESET_PASSWORD_CODE_CHECK_FAILED,
        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAILED
    } from "../constants/authConstants";

const registerState = {

    registerRequest : false,
    registerSuccess :  false,
    registerFail : null,
}
const loginState = {

    loginRequest : false,
    loginSuccess :  false,
    loginFail : null,
}
const refreshState = {

    refreshRequest : false,
    refreshSuccess :  false,
    refreshFail : null,
}
const logoutState = {

    logoutRequest : false,
    logoutSuccess :  false,
    logoutFail : null,
}
const OTPState = {

    OTPRequest : false,
    OTPSuccess :  false,
    OTPFail : null,
}
const OTPVerifyState = {

    OTPVerifyRequest : false,
    OTPVerifySuccess :  false,
    OTPVerifyFail : null,
}
const CheckEmail = {
    checkEmailRequest : false,
    checkEmailSuccess :  false,
    checkEmailFail : null,
}
const CheckOTPCode = {
    checkCodeOtpRequest : false,
    checkCodeOtpSuccess :  false,
    checkCodeOtpFail : null,
}

const resetPassword = {
    resetPasswordRequest : false,
    resetPasswordSuccess :  false,
    resetPasswordFail : null,
}


export const registerReducer = (state = registerState, action) => {

    switch(action.type){
        case REGISTER_REQUEST:
            return {
                ...state,
                registerRequest : true,
                registerSuccess :  false,
                registerFail : null,
            } ;
        case REGISTER_SUCCESS :
            return {
                ...state,
                registerRequest : false,
                registerSuccess : true
            } ;
        case REGISTER_FAILED :
            return {
                ...state,
                registerFail : action.payload,
                registerSuccess :  false,
                registerRequest : false
            } ;
        case "REGISTER_RESET" :
            return registerState;
        default :
            return state ;
    }

}

export const loginReducer = (state = loginState, action) => {

    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest : true,
                loginSuccess :  false,
                loginFail : null,
            } ;
        case LOGIN_SUCCESS :
            return {
                ...state,
                loginRequest : false,
                loginSuccess : true,
                users : action.payload,
            } ;
        case LOGIN_FAILED :
            return {
                ...state,
                loginFail : action.payload,
                loginSuccess :  false,
                loginRequest : false
            } ;
        case "LOGIN_RESET" :
            return loginState ;
        default :
            return state ;
    }

}

export const refreshTokenReducer = (state = refreshState, action) => {

    switch(action.type){
        case REFRESH_REQUEST:
            return {
                ...state,
                refreshRequest : true,
                refreshSuccess :  false,
                refreshFail : null,
            } ;
        case REFRESH_SUCCESS :
            return {
                ...state,
                refreshRequest : false,
                refreshSuccess : true,
                newAccessToken : action.payload,
            } ;
        case REFRESH_FAILED :
            return {
                ...state,
                refreshFail : action.payload,
                refreshRequest : false
            } ;
        case 'REFRESH_RESET' :
            return refreshState;
        default :
            return state ;
    }

}

export const logOutReducer = (state = logoutState, action) => {

    switch(action.type){
        case LOGOUT_REQUEST:
            return {
                ...state,
                 logoutRequest : true,
                 logoutSuccess :  false,
                 logoutFail : null,
            } ;
        case LOGOUT_SUCCESS :
            return {
                ...state,
                logoutRequest : false,
                 logoutSuccess : true,
                 logoutData: action.payload
            } ;
        case LOGOUT_FAILED :
            return {
                ...state,
                 logoutFail: true,
                 logoutRequest : false
            } ;
        case "LOGOUT_RESET" :
            return logoutState;
        default :
            return state ;
    }

}

export const GenerateOTPReducer = (state = OTPState, action) => {

    switch(action.type){
        case OTP_GENERATE_REQUEST:
            return {
                ...state,
                 OTPRequest : true,
                 OTPSuccess :  false,
                 OTPSuccess : null,
            } ;
        case OTP_GENERATE_SUCCESS :
            return {
                ...state,
                OTPRequest : false,
                OTPSuccess : true,
                successMessage: action.payload
            } ;
        case OTP_GENERATE_FAILED :
            return {
                ...state,
                 OTPFail: action.payload,
                 OTPRequest : false
            } ;
        case "OTP_GENERATE_RESET" :
            return OTPState;
        default :
            return state ;
    }
}

export const VerifyOTPReducer = (state = OTPVerifyState, action) => {

    switch(action.type){
        case OTP_VERIFY_REQUEST:
            return {
                ...state,
                 OTPVerifyRequest : true,
                 OTPVerifySuccess :  false,
                 OTPVerifyFail : null,
            } ;
        case OTP_VERIFY_SUCCESS :
            return {
                ...state,
                OTPVerifyRequest : false,
                 OTPVerifySuccess : true
            } ;
        case OTP_VERIFY_FAILED :
            return {
                ...state,
                 OTPVerifyFail: true,
                 OTPVerifyRequest : false
            } ;
        case "OTP_VERIFY_RESET" :
            return OTPVerifyState;
        default :
            return state ;
    }
}

export const resetUserPasswordEmailCheckReducer = (state = CheckEmail, action) => {

    switch(action.type){
        case RESET_PASSWORD_EMAIL_CHECK_REQUEST:
            return {
                ...state,
                 checkEmailRequest : true,
                 checkEmailSuccess :  false,
                 checkEmailFail : null,
            } ;
        case RESET_PASSWORD_EMAIL_CHECK_SUCCESS :
            return {
                ...state,
                checkEmailRequest : false,
                checkEmailSuccess : true,
                checkEmail: action.payload
            } ;
        case RESET_PASSWORD_EMAIL_CHECK_FAILED :
            return {
                ...state,
                checkEmailRequest : false,
                checkEmailSuccess : false,
                checkEmailFail: action.payload
            } ;
        case "RESET_PASSWORD_EMAIL_CHECK_RESET" :
            return CheckEmail;

        default :
            return state ;
    }
}

export const resetPassOTPVerificationReducer = (state = CheckOTPCode, action) => {

    switch(action.type){
        case RESET_PASSWORD_CODE_CHECK_REQUEST:
            return {
                ...state,
                 checkCodeOtpRequest : true,
                 checkCodeOtpSuccess :  false,
                 checkCodeOtpFail : null,
            } ;
        case RESET_PASSWORD_CODE_CHECK_SUCCESS :
            return {
                ...state,
                checkCodeOtpRequest : false,
                checkCodeOtpSuccess : true,
                checkCodeOtp: action.payload
            } ;
        case RESET_PASSWORD_CODE_CHECK_FAILED :
            return {
                ...state,
                checkCodeOtpFail: true,
                checkCodeOtpRequest : false
            } ;
        case "RESET_PASSWORD_CODE_CHECK_RESET" :
            return CheckOTPCode;
        default :
            return state ;
    }
}

export const resetPasswordReducer = (state = resetPassword, action) => {

    switch(action.type){
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                 resetPasswordRequest : true,
                 resetPasswordSuccess :  false,
                 resetPasswordFail : null,
            } ;
        case RESET_PASSWORD_SUCCESS :
            return {
                ...state,
                resetPasswordRequest : false,
                resetPasswordSuccess : true,
                resetPassword: action.payload
            } ;
        case RESET_PASSWORD_FAILED :
            return {
                ...state,
                resetPasswordFail: true,
                resetPasswordRequest : false
            } ;
        case "RESET_PASSWORD_RESET" :
            return resetPassword;
        default :
            return state ;
    }
}