import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/actions/authActions';
import { toast } from 'react-toastify';
import LogoutModal from '../utilities/LogoutModal';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';


const RequireAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  useEffect(() => {
    const checkTokenExpiration = () => {
      const accessToken = Cookies.get('eIfu_ATK') || null;
      const refreshToken = Cookies.get('eIfu_RTK') || null;

      try {
        // Check Access Token expiration
        if (!accessToken) {
          // console.log('Access Token not found');
          dispatch(logoutAction());
          // <Navigate to="/login" state={{ from: location }} replace />;
          setShowLogoutModal(true);
          return;
        }
        // if (accessToken) {
        //   const decodedAccessToken = jwtDecode(accessToken);

        //   if (decodedAccessToken.exp) {
        //     const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        //   // console.log('Refresh Token expires at:', new Date(decodedAccessToken.exp * 1000));

        //     if (decodedAccessToken.exp < currentTimeInSeconds) {
        //       console.log('Access Token has expired');
        //       // <LogoutModal openValue={true} />
        //       toast.info('Your Session is Expired, Please LogIn Again AT');
        //       dispatch(logoutAction());
        //       // setShowLogoutModal(true);
        //       return;
        //     }
        //   }
          
        // }

        // Check Refresh Token expiration
        if (!refreshToken) {
          // console.log('Refresh Token not found');
          // setShowLogoutModal(true);
          toast.info('Your Session is Expired, Please LogIn Again RT');
          dispatch(logoutAction());
          // <Navigate to="/login" state={{ from: location }} replace />;
          return;
        }
        if (refreshToken) {
          const decodedRefreshToken = jwtDecode(refreshToken);
          // console.log('Refresh Token expires at:', new Date(decodedRefreshToken.exp * 1000));

          if (decodedRefreshToken.exp) {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            if (decodedRefreshToken.exp < currentTimeInSeconds) {
              // console.log('Refresh Token has expired');
              // toast.info('Your Session is Expired, Please LogIn Again');
              dispatch(logoutAction());
              setShowLogoutModal(true);
              return;
            }
          }
        }

      } catch (error) {
        // console.error('Error decoding token:', error);
      }
    };


    // Check token expiration when the component mounts
    checkTokenExpiration();

    // Set up an interval to check token expiration every 5 minutes
    const intervalId = setInterval(checkTokenExpiration, 20 * 60 * 1000);


    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const accessToken = Cookies.get('eIfu_ATK') || null;
  const refreshToken = Cookies.get('eIfu_RTK') || null;

  // return accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <>
      {/* {showLogoutModal && <LogoutModal />} */}
      { accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
      {/* <Outlet /> */}
      {/* {(showLogoutModal) && <LogoutModal />} */}
    </>
  );
};

export default RequireAuth;
