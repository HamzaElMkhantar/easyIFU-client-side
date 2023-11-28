import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/DashboardPages/Dashboard';
import RequireAuth from './components/RequireAuth';
import NoFoundPage from './pages/NoFoundPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the 
import Cookies from 'js-cookie';
import Project from './pages/DashboardPages/Project';
import Users from './pages/DashboardPages/Users';
import MyCompany from './pages/DashboardPages/MyCompany';
import Account from './pages/DashboardPages/Account';
import { useDispatch } from 'react-redux';
import { refreshAction } from './redux/actions/authActions';
import EmailVerification from './pages/emailVerification/EmailVerification';
import EmailCheckForResetPassword from './components/resetPsswordUsers/EmailCheckForResetPassword';
import ResetPassword from './components/resetPsswordUsers/ResetPassword';
import ManageUser from './pages/DashboardPages/ManageUser';
import CreateUser from './pages/DashboardPages/CreateUser';
import ManufacturerInfoComponent from './pages/DashboardPages/ManufacturerInfo';
import ProductInfoComponent from './pages/DashboardPages/ProductInfoComponent';
import SterilityComponent from './pages/DashboardPages/SterilityComponent';
import StorageComponent from './pages/DashboardPages/StorageComponent';
import SafeUseComponent from './pages/DashboardPages/SafeUseComponent';
import IVDDiagnosticComponent from './pages/DashboardPages/IVDDiagnosticComponent';
import TransfusionInfusionComponent from './pages/DashboardPages/TransfusionInfusionComponent';
import OthersComponent from './pages/DashboardPages/OthersComponent';
import LabelInformation from './pages/DashboardPages/LabelInformation';
import jwtDecode from 'jwt-decode';
// import jwtDecode from 'jwt-decode';

function App() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const token = Cookies.get('eIfu_ATK') || null;

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPage = pathSegments[1];

    // Hide the header on the login and register pages
    if (currentPage === 'login' 
        || currentPage === 'register' 
        || currentPage === 'dashboard' 
        || currentPage === 'verify') {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    if(currentPage === 'dashboard'){
      setShowFooter(false)
    }else{
      setShowFooter(true)
    }
  }, [location]);
  

  const R_Token = Cookies.get('eIfu_RTK') || null;
  const A_Token = Cookies.get('eIfu_ATK') || null;
  const decodedToken = A_Token ? jwtDecode(A_Token) : null

  const intervalRef = useRef(null);
  const dispatch = useDispatch();

   // Memoize the interval setup function to prevent re-renders
   const setupInterval = useMemo(() => {
    return () => {
      if (R_Token || A_Token) {
        intervalRef.current = setInterval(() => {
          dispatch(refreshAction());
          console.log('Token refresh scheduled.');
        }, 900000); // Refresh every 15 minute (900000 milliseconds)
      }
    };
  }, [dispatch]);
  
  useEffect(() => {
    setupInterval();
    return () => {
      if(intervalRef.current){
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="App">
      {showNav && <Header />}
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/resetPassword/verified/:email/:token/:id' element={<ResetPassword />} />
          <Route path='/resetPassword' element={<EmailCheckForResetPassword />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/project' element={<Project />} />
          <Route path='/dashboard/users' element={<Users />} />
          <Route path='/dashboard/company' element={<MyCompany />} />
          <Route path='/dashboard/account' element={<Account />} />
          {/* routes for creator */}
          <Route path='/dashboard/create-project/step1/:projectId' element={<ManufacturerInfoComponent />} />
          <Route path='/dashboard/create-project/step2/:projectId' element={<ProductInfoComponent />} />
          <Route path='/dashboard/create-project/step3/:projectId' element={<SterilityComponent />} />
          <Route path='/dashboard/create-project/step4/:projectId' element={<StorageComponent />} />
          <Route path='/dashboard/create-project/step5/:projectId' element={<SafeUseComponent />} />
          <Route path='/dashboard/create-project/step6/:projectId' element={<IVDDiagnosticComponent />} />
          <Route path='/dashboard/create-project/step7/:projectId' element={<TransfusionInfusionComponent />} />
          <Route path='/dashboard/create-project/step8/:projectId' element={<OthersComponent />} />
          <Route path='/dashboard/project-information/:projectId' element={<LabelInformation />} />
          {/* this routes for admin users */}
          <Route path='/dashboard/user/:userId' element={<ManageUser />} />
          <Route path='/dashboard/user/create' element={<CreateUser />} />
        </Route>
          {/* this route for user who logged in but still don't verified his email */}
          {decodedToken && 
            decodedToken.userInfo && 
              decodedToken.userInfo.OTPVerified == false && 
            <Route path='/verify' element={<EmailVerification />} />
          }



        <Route path='*' element={<NoFoundPage />} />
      </Routes>



      {/* ToastContainer */}
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme="dark"
              />

     {showFooter && <Footer />}
    </div>
  );
}

export default App;

// ---------------------------------


// import './App.css';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Header from './components/header/Header';
// import Home from './pages/home/Home';
// import Footer from './components/footer/Footer';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/DashboardPages/Dashboard';
// import RequireAuth from './components/RequireAuth';
// import NoFoundPage from './pages/NoFoundPage';
// import ProtectedRoute from './components/ProtectedRoute'; // Import the 
// import Cookies from 'js-cookie';
// import Project from './pages/DashboardPages/Project';
// import Users from './pages/DashboardPages/Users';
// import MyCompany from './pages/DashboardPages/MyCompany';
// import Account from './pages/DashboardPages/Account';
// import { useDispatch } from 'react-redux';
// import { refreshAction } from './redux/actions/authActions';
// import EmailVerification from './pages/emailVerification/EmailVerification';
// import EmailCheckForResetPassword from './components/resetPsswordUsers/EmailCheckForResetPassword';
// import ResetPassword from './components/resetPsswordUsers/ResetPassword';
// import ManageUser from './pages/DashboardPages/ManageUser';
// import CreateUser from './pages/DashboardPages/CreateUser';
// import ManufacturerInfoComponent from './pages/DashboardPages/ManufacturerInfo';
// import ProductInfoComponent from './pages/DashboardPages/ProductInfoComponent';
// import SterilityComponent from './pages/DashboardPages/SterilityComponent';
// import StorageComponent from './pages/DashboardPages/StorageComponent';
// import SafeUseComponent from './pages/DashboardPages/SafeUseComponent';
// import IVDDiagnosticComponent from './pages/DashboardPages/IVDDiagnosticComponent';
// import TransfusionInfusionComponent from './pages/DashboardPages/TransfusionInfusionComponent';
// import OthersComponent from './pages/DashboardPages/OthersComponent';
// import LabelInformation from './pages/DashboardPages/LabelInformation';
// // import jwtDecode from 'jwt-decode';

// function App() {
//   const location = useLocation();
//   const [showNav, setShowNav] = useState(true);
//   const [showFooter, setShowFooter] = useState(true);
//   const token = Cookies.get('eIfu_ATK') || null;

//   useEffect(() => {
//     const pathSegments = location.pathname.split('/');
//     const currentPage = pathSegments[1];

//     // Hide the header on the login and register pages
//     if (currentPage === 'login' 
//         || currentPage === 'register' 
//         || currentPage === 'dashboard' 
//         || currentPage === 'verify') {
//       setShowNav(false);
//     } else {
//       setShowNav(true);
//     }

//     if(currentPage === 'dashboard'){
//       setShowFooter(false)
//     }else{
//       setShowFooter(true)
//     }
//   }, [location]);

//   const R_Token = Cookies.get('eIfu_RTK') || null;
//   const A_Token = Cookies.get('eIfu_ATK') || null;

//   const intervalRef = useRef(null);
//   const dispatch = useDispatch();

//   const setupInterval = useMemo(() => {
//     return () => {
//       if (R_Token || A_Token) {
//         const refresh = () => {
//           if (document.visibilityState === 'visible') {
//             // Dispatch the refresh action only when the document is visible
//             dispatch(refreshAction());
//             // console.log('Token refresh scheduled.');
//           }
//         };
  
//         // Setup a timeout to refresh the token after a certain idle period
//         let timeoutId;
  
//         const setupTimeout = () => {
//           timeoutId = setTimeout(() => {
//             refresh();
//             setupTimeout(); // Reset the timeout for the next idle period
//           }, 900000); // Refresh every 15 minutes (900,000 milliseconds)
//         };
  
//         // Set up initial timeout
//         setupTimeout();
  
//         // Set up an event listener to reset the timeout on user activity
//         const resetTimeout = () => {
//           clearTimeout(timeoutId);
//           setupTimeout();
//         };
  
//         window.addEventListener('mousemove', resetTimeout);
//         window.addEventListener('keydown', resetTimeout);
  
//         intervalRef.current = { refresh, resetTimeout };
//       }
//     };
//   }, [dispatch, R_Token, A_Token]);
  
  
//   useEffect(() => {
//     setupInterval();
//     return () => {
//       if(intervalRef.current){
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);
//   return (
//     <div className="App">
//       {showNav && <Header />}
//       <Routes>
        
//         <Route path='/' element={<Home />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path='/login' element={<Login />} /> 
//           <Route path='/register' element={<Register />} /> 
//           <Route path='/resetPassword/verified/:email/:token/:id' element={<ResetPassword />} />
//           <Route path='/resetPassword' element={<EmailCheckForResetPassword />} />
//         </Route>

//         <Route element={<RequireAuth />}>
//           <Route path='/dashboard' element={<Dashboard />} />
//           <Route path='/dashboard/project' element={<Project />} />
//           <Route path='/dashboard/users' element={<Users />} />
//           <Route path='/dashboard/company' element={<MyCompany />} />
//           <Route path='/dashboard/account' element={<Account />} />
//           {/* routes for creator */}
//           <Route path='/dashboard/create-project/step1/:projectId' element={<ManufacturerInfoComponent />} />
//           <Route path='/dashboard/create-project/step2/:projectId' element={<ProductInfoComponent />} />
//           <Route path='/dashboard/create-project/step3/:projectId' element={<SterilityComponent />} />
//           <Route path='/dashboard/create-project/step4/:projectId' element={<StorageComponent />} />
//           <Route path='/dashboard/create-project/step5/:projectId' element={<SafeUseComponent />} />
//           <Route path='/dashboard/create-project/step6/:projectId' element={<IVDDiagnosticComponent />} />
//           <Route path='/dashboard/create-project/step7/:projectId' element={<TransfusionInfusionComponent />} />
//           <Route path='/dashboard/create-project/step8/:projectId' element={<OthersComponent />} />
//           <Route path='/dashboard/project-information/:projectId' element={<LabelInformation />} />
//           {/* this routes for admin users */}
//           <Route path='/dashboard/user/:userId' element={<ManageUser />} />
//           <Route path='/dashboard/user/create' element={<CreateUser />} />
//         </Route>
//           {/* this route for user who logged in but still don't verified his email */}
//           <Route path='/verify' element={<EmailVerification />} />



//         <Route path='*' element={<NoFoundPage />} />
//       </Routes>



//       {/* ToastContainer */}
//       <ToastContainer
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 progress={undefined}
//                 theme="dark"
//               />

//      {showFooter && <Footer />}
//     </div>
//   );
// }

// export default App;
