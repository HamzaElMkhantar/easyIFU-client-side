import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSucceed = () => {
  return (
    <div className="container" style={{height:'100vh', width:'100vw', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <div className="rounded-circle bg-light p-4 text-center">
          <i className="checkmark display-4 text-success">✓</i>
        </div>
        <h1 className="text-success mt-4">Success</h1>
        <p className="text-dark">
        Subscription successful! Welcome to  <br />easyIFU.com
        </p>
        <Link to={'/'} style={{color:'#09566F', textDecorationLine: 'underline'}}>back Home</Link>
      </div>
    </div>
  );
};

export default PaymentSucceed;