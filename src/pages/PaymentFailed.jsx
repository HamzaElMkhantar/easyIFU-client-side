import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="container" style={{height:'100vh', width:'100vw', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className="card p-4 mx-auto" style={{ maxWidth: '330px' }}>
        <div className="rounded-circle bg-light p-4 text-center">
          <i className="checkmark display-4 text-danger">X</i>
        </div>
        <h1 className="text-danger mt-4">Failed</h1>
        <p className="text-dark">
        Subscription Failed! <br/>
        We're here to help. Please check your payment details and try again.
        </p>
        <Link to={'/'} replace={true} style={{color:'#09566F', 
              textDecorationLine: 'underline', 
              padding:'5px 15px',
              borderRadius:'4px',
              color:'white',
              backgroundColor:'#dc3444'}}>Back Home</Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
