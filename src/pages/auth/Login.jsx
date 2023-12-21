import React, { useEffect, useRef, useState } from 'react';
import logoImage from '../../assets/easyIFU_Logo.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'
import {useDispatch, useSelector} from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';



const Login = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');


  const {login} = useSelector(state => state)
  const {loginRequest , loginFail, loginSuccess} = login;
  const dispatch = useDispatch();

  const token = Cookies.get('eIfu_ATK') || null;


  useEffect(() => {
    if(loginFail){
      if (!loginFail.status) {
        toast.error('No Server Response');
    } else if (loginFail.status === 400) {
        toast.warning('Missing Username or Password');
    } else if (loginFail.status === 401) {
        toast.warning('Unauthorized');
    } else {
        toast.error(loginFail.data?.message);
    }
    errRef.current.focus();
    }

  }, [loginFail]);
  


  useEffect(() => {
    setErrMsg('')
  }, [userEmail, userPassword])  



  const handleSubmit = async (e) => {
    e.preventDefault();
     await dispatch(loginAction(userEmail, userPassword))
  }

  const handleEmailInput  = (e) => setUserEmail(e.target.value);
  const handlePwdInput  = (e) => setUserPassword(e.target.value);

  if (loginSuccess || token) {
    toast.success('Code OTP sent to your email');
    return <Navigate to="/dashboard" />;
  }

  return (
    <section style={{ backgroundColor: '#ecf0f3', height:'100vh'}} className="h-90 gradient-form" >
      <div style={{height:'100%', display:'flex', justifyContent:'center', alignContent:'center'}} className="container py h-90">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black" style={{overflow:'hidden'}}>
              <div className="row g-0">
                <div className="col-lg-6">
                  <p style={{backgroundColor:'#f8d7d9', color:'#7a272e', textAlign:'center'}} ref={errRef} aria-live='assertive'>{errMsg}</p>
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                        <Link to='/'>
                        <img
                            src={logoImage}
                            style={{ width: '150px' }}
                            alt="logo"
                        />
                        </Link>
                    </div>
                    <form style={{marginTop:'20px'}} onSubmit={handleSubmit}>
                      <h6>Please login to your account</h6>
                      <div className="form-outline mb-2 mt-3">
                        <input
                          type="email"
                          id="email"
                          ref={userRef}
                          value={userEmail}
                          onChange={(e) => handleEmailInput(e)}
                          className="form-control"
                          placeholder="Email address"
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-2">
                        <input
                          type="password"
                          id="password"
                          value={userPassword}
                          onChange={(e) => handlePwdInput(e)}
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div className="text-center pt-1 mb-4 pb-1">

                          <button 
                            disabled={loginRequest ? true : false} 
                            style={{width:'100%', backgroundColor:'#08408b', border:'0', fontSize:'18px'}}
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            {
                            loginRequest ?
                              <div>
                                  <RotatingLines
                                  strokeColor="#FFFFFF"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="30"
                                  visible={true}
                                /> 
                              </div> : "Sign In"
                        }
                          </button>
                          
                        <Link to="/resetPassword" className="text-muted" href="#!">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to='/register' type="button" className="btn btn-outline-danger">
                          Create new
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{backgroundColor:'#08408b'}} className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h2 className="mb-4">We are more than just a company</h2>
                    <p className="small mb-0">
                    We are more than just a company. Simplify Your eIFU Compliance with EasyIfu - The Trusted Solution for medical device Manufacturers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
