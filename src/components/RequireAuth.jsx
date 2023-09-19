import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { logoutAction, refreshAction } from '../redux/actions/authActions';
import { toast } from 'react-toastify';
import EmailVerification from '../pages/emailVerification/EmailVerification';


const RequireAuth = () => {

  const dispatch = useDispatch()

  // const R_Token = Cookies.get('eIfu_RTK') || null;
  // let checkTokenExpiration = null;

  const token = Cookies.get('eIfu_ATK') || null;
  let decodedToken = null;

  
  
  


  const logOut = async () => {
    // toast.info('Oop! Your Session is Expired Please LogIn Again');
    toast.info('Your Session is Expired, Please LogIn Again');
    setTimeout(() =>{
       dispatch(logoutAction())
    },1000)
  }
  try {
    if (token) {
      decodedToken = jwt_decode(token);

      // Check token expiration if it has an 'exp' claim.
      if (decodedToken.exp) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimeInSeconds) {
          // Token has expired; handle it accordingly (e.g., redirect to login).
          console.log("Token has expired");
          // You can add your logic for handling expired tokens here.
          logOut()
        }
      }
    }
  } catch (error) {
    // Handle the error (e.g., log it or redirect to an error page).
    console.error("Error decoding token:", error);
  }

  // if (R_Token) {
  //   // Decode the JWT token (assuming you have the token in a variable named 'token')
  //   checkTokenExpiration = jwt_decode(R_Token);
    
  //   // Get the expiration timestamp from the decoded token
  //   const expirationTimestamp = checkTokenExpiration.exp * 1000; // Convert to milliseconds
  //   const expirationTimestamp_accessT = decodedToken.exp * 1000; // Convert to milliseconds
    
  //   // Calculate the current time in milliseconds
  //   const currentTime = new Date().getTime();
    
  //   // Calculate the remaining time until expiration in milliseconds
  //   const timeUntilExpiration = expirationTimestamp - currentTime;

  //   const timeUntilExpiration_accessT = expirationTimestamp_accessT - currentTime;

    
  //   // Check if the token is about to expire within 2 minutes (120 seconds)
  //   const aboutToExpire = timeUntilExpiration <= 120000; // 120,000 milliseconds = 2 minutes
  //   const aboutToExpire_accessT = timeUntilExpiration_accessT <= 120000
  //   if (aboutToExpire || aboutToExpire_accessT) {
  //     // Token is about to expire within 2 minutes
  //     console.log("Token is about to expire!");
  //     // dispatch(refreshAction());
  //   } else {
  //     // Token is still valid
  //     console.log("Token is still valid.");
  //   }
  // }

  const location = useLocation();

  let content ;
  console.log(decodedToken)
  // if(token){
  //   if(decodedToken.userInfo.OTPVerified){
  //     console.log("decodedToken.OTPVerified = true")
  //     return <Outlet />
  //   }else if(!decodedToken.userInfo.OTPVerified){
  //     console.log("decodedToken.OTPVerified = false")

  //     return <Navigate to="/verify" state={{ from: location }} replace/>
  //   }
  // }else{
  //   <Navigate to="/login" state={{ from: location }} replace/>
  // }
  return (
    token
        ?(decodedToken.userInfo.OTPVerified ? <Outlet /> :<Navigate to="/verify" state={{ from: location }} replace/>)
        : <Navigate to="/login" state={{ from: location }} replace/>
  )
}

export default RequireAuth;



