import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions/authActions';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "600px",
    width:"98%" ,
    bgcolor: 'background.paper',
    border: '1px solid lightGray',
    boxShadow: 4,
    p: 4,
    borderRadius: '3px'
  };
const LogoutModal = () => {


  const {logout} = useSelector(state => state);
  const {logoutRequest, logoutSuccess, logoutFail} = logout
console.log(logoutRequest, logoutSuccess, logoutFail)

    const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction())
  }

  useEffect(() => {
    if(logoutSuccess){
        <Navigate to="/login" />;
    }

    if(logoutFail){
        toast.info(`${logoutFail.message}`);
    }
  }, [logoutSuccess, logoutFail])


  return (
    <div>

        <Modal 
            show={true}  // Change 'open' to 'show'
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            centered
            style={{
                backdropFilter: 'blur(5px)',
                width:'100vw',
                height:'100vh',
                position:'absolute'
        }}
    >
        <Typography id="modal-modal-description" style={{padding:'20px', textAlign:'center'}}>
            <form onSubmit={handleLogout}>
                <div className="form-group">
                    <label>Your Session is Expired, Please LogIn Again</label>
                </div>
                {!logoutRequest 
                ? <div style={{display:'flex', justifyContent:'center'}}>
                    <button style={{marginTop:'30px', padding:'5px 20px', fontWeight:'600', fontSize:'18px', borderRadius:'5px', backgroundColor:'#011d41', color:'#fff'}}>LogIn</button>
                    </div>
                : <div style={{width:'100%', marginTop:'26px', display:'flex', justifyContent:'center'}}>
                    <RotatingLines
                        strokeColor="#011d41"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="40"
                        visible={true}
                    /> 
                </div>
                }
            </form>
        </Typography>
    </Modal>
    </div>

  )
}

export default LogoutModal