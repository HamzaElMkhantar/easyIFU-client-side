import React from 'react'

const OrderDetailsDashboard = ({data}) => {
  return (
    <div>
    <div style={{display:'flex', fontSize:'14px', justifyContent:'space-between'}}>
        <p><strong>ID</strong></p> 
        <p><strong>Order Name</strong></p> 
        <p><strong>Status</strong></p>
        <hr />
    </div>
     {data?.map((item, index) => (
    <div key={item._id} style={{ display:'flex', 
                                fontSize:'11px', 
                                justifyContent:'space-between',
                                alignItems:'center',
                                backgroundColor:"#4682A9",
                                padding:'15px 10px 0px 10px',
                                marginBottom:"2px",
                                borderRadius:'5px',
                            }}>
        <p style={{flex:'0.4'}}>{item.shortId}</p>
        <p style={{flex:'0.4'}}>{item.labelName.length > 16 ? item.labelName?.slice(0,16) + "...": item.labelName}</p>
        <p style={{flex:'0.2'}}>{item.status}</p>
        <hr />
    </div>
    ))}
    </div>
  )
}

export default OrderDetailsDashboard