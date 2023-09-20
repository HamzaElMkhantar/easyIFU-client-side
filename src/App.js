
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


  const intervalRef = useRef(null);
  const dispatch = useDispatch();

   // Memoize the interval setup function to prevent re-renders
   const setupInterval = useMemo(() => {
    return () => {
      if (R_Token || A_Token) {
        intervalRef.current = setInterval(() => {
          dispatch(refreshAction());
          console.log('Token refresh scheduled.');
        }, 300000); // Refresh every 5 minute (300000 milliseconds)
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
        </Route>
        <Route path='/verify' element={<EmailVerification />} />


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
