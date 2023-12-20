import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import LogoutModal from '../utilities/LogoutModal';
import axios from 'axios';

const SubscriptionChecker = () => {
  const token = Cookies.get('eIfu_ATK') || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const location = useLocation();


   return ( decodedToken &&
    decodedToken.userInfo &&
    decodedToken.userInfo.isSubscripted == true
    ? <Outlet />
    : <Navigate to="/check-subscription" state={{ from: location }} replace />
  )
};

export default SubscriptionChecker;
