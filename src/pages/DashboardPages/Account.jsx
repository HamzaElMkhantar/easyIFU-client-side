import React, { useEffect, useState } from 'react'
import easyIFUlogo from '../../assets/easyIFU_Logo.png'
import '../../components/header/header.css';
import Avatar from '@mui/material/Avatar';
import SideBar from '../../components/header/SideBar';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateUserAction, getUserAction, toggleStatusUserAction } from '../../redux/actions/userActions';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';


const Account = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        JSON.parse(localStorage.getItem('sideToggle')) || false
      );
    const toggleSidebar = () => {
        const newToggleState = !isSidebarOpen;
        setIsSidebarOpen(newToggleState);
        localStorage.setItem('sideToggle', JSON.stringify(newToggleState));
      };
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleDropdown = () => {
          setIsOpen(!isOpen);
        };


      const {getUser, updateUser} = useSelector(state => state);
      const {userRequest, userSuccess, user, userFailed} = getUser;
      const {updateUserRequest, updateUserSuccess, updatedUser, updateUserFailed} = updateUser;
      console.log(userRequest, userSuccess, user, userFailed)
      const token = Cookies.get("eIfu_ATK") || null;
      const decodedToken = token ? jwtDecode(token) : null
  
      const [userState, setUserState] = useState(null);
      const [update_User, setUpdateUser] = useState({
        updateFirstName: false,
        updateLastName: false,
        updatePassword: false,
        updateEmail: false,
      })

      const [userInfo, setUserInfo] = useState({
          adminId: decodedToken ? decodedToken.userInfo._id : null,
          userId: decodedToken ? decodedToken.userInfo._id : null,
          firstName: '',
          lastName: '',
          password: '',
          email:'',
        })
      
        const dispatch = useDispatch();
      
        const handleInput = (e) => {
          setUserInfo({
            ...userInfo,
            [e.target.id]: e.target.value
          })
        }
      
        const handleSubmit = async (e) => {
          e.preventDefault();
        
          const { firstName, lastName, email, password } = userInfo;
        
          if (firstName !== '' || lastName !== '' || email !== '' || password !== '') {
            dispatch(UpdateUserAction(userInfo, token));
          } else {
            toast.info("Fields are Empty");
          }
        
          // Reset the form fields
          setUserInfo({
            ...userInfo,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
        }

        useEffect(() => {
            dispatch(getUserAction(decodedToken.userInfo._id, token))
        }, [])

        useEffect(() => {
            if(updateUserSuccess){
                dispatch(getUserAction(decodedToken.userInfo._id, token))
            }
        }, [updateUserSuccess])
 
        useEffect(() => {
            if(userSuccess){
                setUserState(user)
            }
        }, [userSuccess])

  
        useEffect(() => {
          if(updateUserSuccess){
              toast.success("Updated successfully")
          }
          if(updateUserFailed){
              toast.warning(`${updateUserFailed.message}`)
          }
        }, [updateUserSuccess, updateUserFailed])
  
  
        const dateFormat = (date) => {
          const dateObject = new Date(date);
          const day = String(dateObject.getDate()).padStart(2, '0');
          const month = String(dateObject.getMonth() + 1).padStart(2, '0');
          const year = dateObject.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          return formattedDate;
        };
  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className='' style={{paddingTop:'0px', width:'100%'}}>
        {/* Dashboard header  */}
        <div  style={{ borderBottom:'1px solid lightGray'}} id="page-content-wrapper">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='container-dashboard'>
                <div style={{display:'flex', alignItems:'center'}} className=''>
                    <span href="#menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
                        &#9776;
                    </span>
                    <Link to="/">
                        <img className='dash-Logo' src={easyIFUlogo} alt="easyIFU-logo" />
                    </Link>
                    <div style={{display:'flex', flexWrap:'wrap', gridGap:'5px'}} className='dash-header-sm-devices'>
                        
                    </div>
                </div>
                <div className="custom-dropdown-container">
                      <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
                        <button className="custom-dropdown-toggle" onClick={toggleDropdown}>
                          menu
                        </button>
                        <div className="custom-dropdown-menu">
                          {/* Dropdown items */}
                          <Link to="/dashboard">Home</Link>
                          <Link to="/dashboard/project">Project</Link>
                          <Link to="/dashboard/users">Users</Link>
                          <Link to="/dashboard/user/create">Create User</Link>
                          <Link to="/dashboard/company">Company</Link>
                          <Link to="/dashboard/account">Account</Link>
                        </div>
                      </div>
                      <Avatar className="avatar" sx={{ bgcolor: '#000000' }}></Avatar>
                    </div>

          </div>
        </div>

        {/* Dashboard  content   */}
        <section className='container' style={{marginTop:'20px'}}>
          <div style={{backgroundColor:'#fff', 
                        borderRadius:'10px', 
                        padding:'10px',
                        display:'flex',
                        marginTop:'10px'
                        }} className='col-12 manage-user-card'>
                <div className='col-lg-2'>
                    <Avatar 
                        sx={{ width: 130, height: 130, fontSize:'90px'}}
                        style={{backgroundColor:'black', color:"#ecf0f3", marginBottom:'15px'}}>
                        {userState && userState.firstName[0].toUpperCase()}
                    </Avatar>
                    
                </div>
                <div className='manage-user-card-content px-3 col-lg-8'>
                    <p style={{fontSize:'14px', color:'gray'}}>FirstName: {userState && userState.firstName} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>LastName: {userState && userState.lastName} </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Email: {userState && userState.email} </p>
                    <p style={{fontSize:'14px', color:'gray', display:'flex'}}>Role: {userState && userState.role.length > 1 ? userState?.role?.map((item) => (<p className='mx-1'> {item},</p>))  : userState?.role?.map((item) => (<p> {item} </p>))}  </p>
                    <p style={{fontSize:'14px', color:'gray'}}>Status: {userState && userState.isActive ? "active" : "not Active"} </p>
                    {userState && userState.createdAt && <p style={{fontSize:'14px', color:'gray'}}>Created: {userState && dateFormat(userState.createdAt)} </p>}

                </div>
                {userRequest 
                    ? <RotatingLines
                    strokeColor="#FFFFFF"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  /> 
                    : null}

          </div>

          <div  style={{
                    backgroundColor:'#fff',
                    marginTop:'20px',
                    borderRadius:'10px'
                }}
            className="card-body col-md-12">
              <div style={{display:'flex'}}>
                     {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                         <div className="form-outline mb-2 d-flex mx-2" style={{alignItems:'center'}}>
                            <label className="form-label" htmlFor="firstNam">
                              First Name
                            </label>
                            <input style={{width:'15px', height:'19px', padding:'0'}}
                                type="checkbox"
                                className="form-check-input"
                                name="firstNam"
                                value={update_User.updateFirstName ? true : false}
                                checked={update_User.updateFirstName ? true : false}
                                onChange={(e) => setUpdateUser({
                                  ...update_User,
                                  updateFirstName : !update_User.updateFirstName
                                })}
                            />
                          </div>}
                         {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                         <div className="form-outline mb-2 d-flex mx-2" style={{alignItems:'center'}}>
                            <label className="form-label" htmlFor="lastNam">
                              Last Name
                            </label>
                            <input style={{width:'15px', height:'19px', padding:'0'}}
                                type="checkbox"
                                id="lastNam"
                                value={update_User.updateLastName ? true : false}
                                className="form-check-input mb-2"
                                checked={update_User.updateLastName ? true : false}

                                onChange={(e) => setUpdateUser({
                                  ...update_User,
                                  updateLastName : !update_User.updateLastName
                                })}
                            />
                          </div>}
                          <div className="form-outline mb-2 d-flex mx-2" style={{alignItems:'center'}}>
                            <label className="form-label" htmlFor="pass">
                              Password
                            </label>
                            <input style={{width:'15px', height:'19px', padding:'0'}}
                                type="checkbox"
                                id="pass"
                                className="form-check-input mb-2"
                                value={update_User.updatePassword ? true : false}
                                checked={update_User.updatePassword ? true : false}
                                onChange={(e) => setUpdateUser({
                                  ...update_User,
                                  updatePassword : !update_User.updatePassword
                                })}
                            />
                          </div>
                          {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                        <div className="form-outline mb-2 d-flex mx-2" style={{alignItems:'center'}}>
                            <label className="form-label" htmlFor="email-update">
                              Email
                            </label>
                            <input style={{width:'15px', height:'19px', padding:'0'}}
                                type="checkbox"
                                id="email-update"
                                className="form-check-input mb-2"
                                onChange={(e) => setUpdateUser({
                                  ...update_User,
                                  updateEmail : !update_User.updateEmail
                                })}
                                checked={update_User.updateEmail ? true : false}
                                value={update_User.updateEmail ? true : false}
                            />
                          </div>}
                      </div>
  
                    <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                      <div className="row">
                       {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role.includes("Admin") &&
                            update_User.updateFirstName == true &&
                            <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                onChange={(e) => handleInput(e)}
                                placeholder="First Name"
                                value={userInfo.firstName}
                            />
                          </div>
                        </div>}

                        {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                        update_User.updateLastName == true &&
                            <div className="col-md-6">
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="lastName">
                                    Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        onChange={(e) => handleInput(e)}
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={userInfo.lastName}
                                    />
                                </div>
                            </div>}

                      </div>
                      <div className="row">
                        {decodedToken &&
                        decodedToken.userInfo &&
                        decodedToken.userInfo.role.includes("Admin") &&
                        update_User.updateEmail == true &&
                            <div className="col-md-6">
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="email">
                                E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => handleInput(e)}
                                    className="form-control"
                                    placeholder="E-mail"
                                    value={userInfo.email}
                                />
                            </div>
                            </div>}

                        {update_User.updatePassword == true &&<div className="col-md-6">
                          <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <input
                                value={userInfo.password}
                                type="password"
                                id="password"
                                onChange={(e) => handleInput(e)}
                                className="form-control"
                                placeholder="Password"
                            />
                          </div>
                        </div>}
                      </div>
                      <div className="text-center pt-1 mb-4 pb-1">
                      { (update_User.updateFirstName == true
                        || update_User.updateLastName == true
                        || update_User.updatePassword == true
                        || update_User.updateEmail == true) &&
                          <button disabled={updateUserRequest ? true : false}
                          style={{ width: '100%', backgroundColor: '#08408b', border: '0', fontSize: '18px' , fontWeight:'600'}}
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                         {updateUserRequest ?
                              <div>
                                  <RotatingLines
                                  strokeColor="#FFFFFF"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="30"
                                  visible={true}
                                /> 
                              </div>
                         :"Update"}
                        </button>}
                      </div>
                    </form>
          </div>
      </section>
      </main>
    </div>
  )
}


export default Account