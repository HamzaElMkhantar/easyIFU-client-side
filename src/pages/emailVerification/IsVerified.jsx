import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const IsVerified = () => {
    const R_Token = Cookies.get('eIfu_RTK') || null;
    const A_Token = Cookies.get('eIfu_ATK') || null;
    const decodedToken = A_Token ? jwtDecode(A_Token) : null

    const location = useLocation();
  return (
    A_Token &&
    decodedToken && 
    decodedToken.userInfo &&
    decodedToken.userInfo.OTPVerified == true
    ? <Outlet />
    : <Navigate to="/verify" state={{ from: location }} replace />
  )
}

export default IsVerified