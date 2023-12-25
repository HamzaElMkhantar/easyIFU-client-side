import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import SideBar from '../../components/header/SideBar';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { UpdateUserAction, getUserAction, toggleStatusUserAction } from '../../redux/actions/userActions';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import easyIFUlogo from '../../assets/easyIFU_Logo.png'


const ManageUser = () => {
  const [isOpen, setIsOpen] = useState(false);
      
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    const {userId} = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userState, setUserState] = useState(null);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
 
    const {getUser, updateUser, toggleStatusUser} = useSelector(state => state);
    const {userRequest, userSuccess, user, userFailed} = getUser;
    const {updateUserRequest, updateUserSuccess, updatedUser, updateUserFailed} = updateUser;
    const {toggleUserRequest, toggleUserSuccess, toggledUser, toggleUserFail} = toggleStatusUser
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const [userInfo, setUserInfo] = useState({
        adminId: decodedToken ? decodedToken.userInfo._id : null,
        userId,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
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
        dispatch(getUserAction(userId, token))
      }, [])

      useEffect(() => {
        if(user){
            setUserState(user)
        }
        if(updatedUser){
            setUserState(updatedUser)
        }
      
      }, [user, updatedUser])
      
      useEffect(() => {
        if(toggleUserSuccess){
          setUserState(toggledUser)
        }
     
        if(toggledUser){
            if(toggledUser.isActive){
                toast.success("user is active")
            }else{
                toast.success("user is Deactivate")
            }
        }
      }, [toggleUserSuccess, toggledUser])

      useEffect(() => {
        if(updateUserSuccess){
            toast.success("User update successfully")
        }
        if(updateUserFailed){
            toast.warning(`${updateUserFailed.message}`)
        }
      }, [updateUserSuccess, updateUserFailed])


      const handleUserToggle = () => {
        const ids = {
            userId,
            adminId: decodedToken.userInfo._id
        }
        dispatch(toggleStatusUserAction(ids, token))
      }

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
        <Link style={{backgroundColor:'#08408b', color:'#fff', padding:"2px 0px", borderRadius:'10px', display:'flex', width:'80px', justifyContent:"center", alignItems:'center', fontWeight:'600'}} to="/dashboard/users">
            <ArrowBackRoundedIcon style={{marginRight:'5px'}}/>
            Back
        </Link>
       <div style={{backgroundColor:'#fff', 
                    borderRadius:'10px', 
                    padding:'10px',
                    display:'flex',
                    marginTop:'10px'
                    }} className='col-12 manage-user-card'>
            <div className='col-lg-2' style={{display:'flex', flexDirection:'column', justifyItems:'center', alignItems:'center'}}>
                <Avatar 
                    sx={{ width: 130, height: 130, fontSize:'90px'}}
                    style={{backgroundColor:'black', color:"#ecf0f3", marginBottom:'15px'}}>
                    {userState && userState.firstName[0]}
                </Avatar> 
                {/* toggleUserRequest */}
                <div  style={{display:'flex', justifyContent:'', marginTop:'20px'}} className='mx-4'>
                    {userState &&
                    userState.isActive === true ?
                    <button 
                        onClick={() => handleUserToggle()} 
                        style={{padding:'1px 15px', 
                                    borderRadius:'6px', 
                                    backgroundColor:'#4CA44C90', 
                                    color:'#033C03', 
                                    fontWeight:'600',
                                    width:'100px'
                                }} >
                      {toggleUserRequest 
                      ? <RotatingLines
                          strokeColor="#FFFFFF"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="20"
                          visible={true}/> 
                      : "Activate"}
                    </button>
                   : <button 
                        onClick={() => handleUserToggle()}
                        style={{padding:'1px 15px', 
                                    borderRadius:'6px', 
                                    backgroundColor:'#8C1B0890', 
                                    color:'#8C1B08', 
                                    fontWeight:'600',
                                    width:'110px'

                                }} >
                      {toggleUserRequest 
                      ? <RotatingLines
                          strokeColor="#FFFFFF"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="20"
                          visible={true}/> 
                      : "Deactivate"}
                      </button>}
                </div>
            </div>
            <div className='manage-user-card-content px-3 col-lg-8'>
                <p style={{fontSize:'14px', color:'gray'}}>FirstName: {userState && userState.firstName} </p>
                <p style={{fontSize:'14px', color:'gray'}}>LastName: {userState && userState.lastName} </p>
                <p style={{fontSize:'14px', color:'gray'}}>Email: {userState && userState.email} </p>
                <p style={{fontSize:'14px', color:'gray'}}>Role: {userState && userState.role} </p>
                <p style={{fontSize:'14px', color:'gray'}}>Status: {userState && userState.isActive ? "active" : "not Active"} </p>
                <p style={{fontSize:'14px', color:'gray'}}>Created: {userState && dateFormat(userState.createdAt)} </p>

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
  
                    <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                      <div className="row">
                       {decodedToken &&
                            decodedToken.userInfo &&
                            decodedToken.userInfo.role.includes("Admin")&&
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

                        <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="text-center pt-1 mb-4 pb-1">
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
                        </button>
                      </div>
                    </form>
                  </div>
      </section>
    </main>
  </div>
  )
}

export default ManageUser