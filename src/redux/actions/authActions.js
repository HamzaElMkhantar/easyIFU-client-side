import axios from 'axios';
import Cookies from 'js-cookie';
import {
        REGISTER_FAILED, 
        REGISTER_REQUEST, 
        REGISTER_SUCCESS,
  
        LOGIN_FAILED, 
        LOGIN_REQUEST, 
        LOGIN_SUCCESS, 

        REFRESH_FAILED, 
        REFRESH_REQUEST, 
        REFRESH_SUCCESS,

        LOGOUT_FAILED, 
        LOGOUT_REQUEST, 
        LOGOUT_SUCCESS,
        RESET_PASSWORD_EMAIL_CHECK_REQUEST,
        RESET_PASSWORD_EMAIL_CHECK_SUCCESS,
        RESET_PASSWORD_EMAIL_CHECK_FAILED,
        RESET_PASSWORD_CODE_CHECK_REQUEST,
        RESET_PASSWORD_CODE_CHECK_SUCCESS,
        RESET_PASSWORD_CODE_CHECK_FAILED,
        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAILED, 
      } from '../constants/authConstants';
import jwtDecode from 'jwt-decode';


export const registerAction = (userInfo) => async (dispatch) => {
  try {

    dispatch({ type: REGISTER_REQUEST });

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, userInfo);
    console.log(response.data)


    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    setTimeout(() =>{
      dispatch({ 
        type: 'REGISTER_RESET'
      });
    }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: REGISTER_FAILED, 
          payload: error?.response?.data });
      setTimeout(() =>{
        dispatch({ 
          type: 'REGISTER_RESET'
        });
      }, 1500)
    }
};

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config =    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies
      credentials: 'include', 
      responseType: 'json'
    }

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
          email,
          password,
        }, config);


    // Store the access token and refresh token in cookies
    // Cookies.set('eIfu_ATK', response.data.accessToken);
    // Cookies.set('eIfu_RTK', response.data.refreshToken); // Set the expiration time as needed
    dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: response.data 
      });
    setTimeout(() =>{
      dispatch({ 
        type: 'LOGIN_RESET'
      });
    }, 1500)
  } catch (error) {

    dispatch({
        type: LOGIN_FAILED, 
        payload: error.response });
    setTimeout(() =>{
      dispatch({ 
        type: 'LOGIN_RESET'
      });
    }, 1500)
  }
};


export const refreshAction = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_REQUEST });
    const refreshToken = Cookies.get('eIfu_RTK') || null;
    if (!refreshToken) {
      // Handle the case where the refresh token is missing.
      dispatch({ type: REFRESH_FAILED, payload: 'Refresh token missing' });
      return;
    }
    console.log("is refresh request !!")
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies
    };

    const config =    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies
      credentials: 'include', 
      responseType: 'json'
    }

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/refresh`,{}, config);

    console.log("response : " , response)
    console.log("response data : " ,response.data)

    dispatch({ type: REFRESH_SUCCESS, payload: 'succeed'});

    if(response == 201){
      console.log("201 response")
      window.location.href = "/login";

    }
    setTimeout(() =>{
      dispatch({ 
        type: 'REFRESH_RESET'
      });
    }, 1500)
  } catch (error) {
    console.log(error);

  
    dispatch({ type: REFRESH_FAILED, payload: error });
    setTimeout(() =>{
      dispatch({ 
        type: 'REFRESH_RESET'
      });
    }, 1500)
  }
};


export const logoutAction = () => async (dispatch) => {
    try {
  
      dispatch({ type: LOGOUT_REQUEST });
      const config =    {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include', 
        responseType: 'json'
      }

      const {data} = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/logout', {}, config)
      console.log(data)
  
      dispatch({ type: LOGOUT_SUCCESS });
      Cookies.remove('eIfu_ATK');
      Cookies.remove('eIfu_RTK');
      setTimeout(() =>{
        dispatch({ 
          type: 'LOGOUT_RESET'
        });
      }, 1500)
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGOUT_FAILED });
      setTimeout(() =>{
        dispatch({ 
          type: 'LOGOUT_RESET'
        });
      }, 1500)
    }
  };

  export const GenerateOTPAction = (id) => async (dispatch) => {
    try {

      console.log(id)
      dispatch({ type: "OTP_GENERATE_REQUEST" });

      const {data} = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/generateOTP',{id})
      console.log(data)

      dispatch({ 
        type: "OTP_GENERATE_SUCCESS",
        payload: data
       });
       setTimeout(() =>{
        dispatch({ 
          type: 'OTP_GENERATE_RESET'
        });
      }, 1500)

    } catch (error) {
      console.error(error);
      dispatch({ 
        type: "OTP_GENERATE_FAILED",
        payload: error
       });
       setTimeout(() =>{
        dispatch({ 
          type: 'OTP_GENERATE_RESET'
        });
      }, 1500)
    }
  };

  export const VerifyOTPAction = (id, VerificationOTP) => async (dispatch) => {
    try {
  
      dispatch({ type: "OTP_VERIFY_REQUEST"});

      const {data} = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/verifyOTP',{id, VerificationOTP})

      Cookies.set('eIfu_ATK', data.accessToken);
      dispatch({ 
        type: "OTP_VERIFY_SUCCESS",
        payload: data
       });
       setTimeout(() =>{
        dispatch({ 
          type: 'OTP_VERIFY_RESET'
        });
      }, 1500)
    } catch (error) {
      console.error(error);
      dispatch({ 
        type: "OTP_VERIFY_FAILED",
        payload: error
       });
       setTimeout(() =>{
        dispatch({ 
          type: 'OTP_VERIFY_RESET'
        });
      }, 1500)
    }
  };

  export const resetUserPasswordEmailCheckAction = (email) => async (dispatch) => {
    try {
  
        dispatch({ type: RESET_PASSWORD_EMAIL_CHECK_REQUEST});

        const {data} = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/checkEmail',{email})

        dispatch({ 
          type: RESET_PASSWORD_EMAIL_CHECK_SUCCESS,
          payload: data
        });
        setTimeout(() =>{
          dispatch({ 
            type: 'RESET_PASSWORD_EMAIL_CHECK_RESET'
          });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({ 
          type: RESET_PASSWORD_EMAIL_CHECK_FAILED,
          payload: error.response.data,
        });
        setTimeout(() =>{
          dispatch({ 
            type: 'RESET_PASSWORD_EMAIL_CHECK_RESET'
          });
        }, 1500)
    }
  }

export const resetPassOTPVerificationAction = (email, otpCode) => async (dispatch) => {
  try {
      dispatch({ type: RESET_PASSWORD_CODE_CHECK_REQUEST});

      const {data} = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/checkResetCode',{email, resetPassOTP: otpCode})
      console.log(data)
      dispatch({ 
        type: RESET_PASSWORD_CODE_CHECK_SUCCESS,
        payload: data
      });

      setTimeout(() =>{
        dispatch({ 
          type: 'RESET_PASSWORD_CODE_CHECK_RESET'
        });
      }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({ 
        type: RESET_PASSWORD_CODE_CHECK_FAILED,
        payload: error
      });
      setTimeout(() =>{
        dispatch({ 
          type: 'RESET_PASSWORD_CODE_CHECK_RESET'
        });
      }, 1500)
  }
}


export const resetPasswordAction = (data) => async (dispatch) => {
  try {
    console.log(data)
      dispatch({ type: RESET_PASSWORD_REQUEST});

      const res = await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/auth/resetPassword',data)
      console.log(res.data)
      dispatch({ 
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data
      });
      setTimeout(() =>{
        dispatch({ 
          type: 'RESET_PASSWORD_RESET'
        });
      }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({ 
        type: RESET_PASSWORD_FAILED,
        payload: error
      });
      setTimeout(() =>{
        dispatch({ 
          type: 'RESET_PASSWORD_RESET'
        });
      }, 1500)
  }
}