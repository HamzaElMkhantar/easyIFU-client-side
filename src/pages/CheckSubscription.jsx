import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { paymentCompanyAction } from '../redux/actions/companyAcions';
import { RotatingLines } from 'react-loader-spinner';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const CheckSubscription = () => {

    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null
    const {paymentCompany} = useSelector(state => state)
    const {paymentCompanyRequest, paymentCompanySuccess, paymentCompanyFail, paymentCompanyInfo} = paymentCompany
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(paymentCompanySuccess){
            window.location.href = paymentCompanyInfo.url
        }
        if(paymentCompanyFail){
            toast.warning(`${paymentCompanyFail.message}`)
        }
        if(paymentCompanyRequest){
            toast.warning(
            <RotatingLines strokeColor="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            color="#fff"
            style={{ background: 'white' }}
            visible={true}/>)
        }
    },[paymentCompanySuccess, paymentCompanyFail, paymentCompanyRequest])
    const handlePayment = (priceId) => {
        const data = {
            priceId, 
            companyId: decodedToken &&  decodedToken.userInfo && decodedToken.userInfo.companyId
        }
        if(token && decodedToken){
            dispatch(paymentCompanyAction(data, token))
        }

        if(!token || !decodedToken){
            toast.info("Should be LoggedIn")
        }
    }
   
    useEffect(() => {
        if(decodedToken.userInfo.isSubscripted == true){
          navigate('/dashboard')
        }

    }, [])
  return (
    <div style={{width:'100vw', height:'89vh', paddingTop:'40px'}} className="container">
        <Link to='/' style={{color:'#fff', backgroundColor:'#072D60', padding:'5px 10px', borderRadius:'4px'}}>Back Home</Link>
        {paymentCompanyRequest && <div style={{position:'absolute', top:'10px', margin:'0 auto', display:'flex', justifyContent:'center', width:'90%'}}>
            <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="90"
                    visible={true}
                /> 
        </div>}
      <div className="text-center">
        <div className="pricing-card-content">
          <div className="pricing-card monthly">
            <div className="card-top">
              <h4>Monthly</h4>
              <p>What You’ll Get</p>
              <ul className="pricing-list" style={{textAlign:'left'}}>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Compliance
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Dynamic Link
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  IFU CheckList
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Report
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Company Brand
                </li>
              </ul>
            </div>
            <div className="card-bottom">
              <span>
                <h3>400$/</h3>month
              </span>
              <button
                disabled={paymentCompanyRequest ? true : false}
                onClick={() => handlePayment('price_1OMdApHVJ5B30zKAG4Nv8UXl')}
              >
                {!paymentCompanyRequest ? 'Choose' : 'Loading...'}
              </button>
            </div>
          </div>

          <div className="pricing-card annualy">
            <div className="card-top">
              <h4>Annually</h4>
              <p style={{ color: 'lightGray', textAlign:'center' }}>What You’ll Get</p>
              <ul className="pricing-list" style={{textAlign:'left'}}>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Compliance
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Dynamic Link
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  IFU CheckList
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Report
                </li>
                <li>
                  {' '}
                  <CheckCircleIcon style={{ marginRight: '10px' }} />
                  Company Brand
                </li>
              </ul>
            </div>

            <div className="card-bottom">
              <span>
                <h3>4320$/</h3>year
              </span>
              <h3 style={{ color: '#EEBA00', textAlign: 'center', fontWeight: '700', margin: '5px 0' }}>
                You Save 10%
              </h3>
              <button
                disabled={paymentCompanyRequest ? true : false}
                onClick={() => handlePayment('price_1OMdBjHVJ5B30zKAOdW223p6')}
              >
                {!paymentCompanyRequest ? 'Choose' : 'Loading...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSubscription;
