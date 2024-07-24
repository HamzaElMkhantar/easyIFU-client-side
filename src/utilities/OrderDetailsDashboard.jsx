import React from 'react'

const OrderDetailsDashboard = ({data}) => {
  return (
    <div>
    <div style={{display:'flex', fontSize:'14px', justifyContent:'space-between'}}>
        <p><strong>Order Name:</strong></p> 
        <p><strong>Produced Name:</strong></p>
        <p><strong>Print Count:</strong></p>
        <hr />
    </div>
     {data && data?.map((item, index) => (
    <div key={index} style={{ display:'flex', 
                                fontSize:'11px', 
                                justifyContent:'space-between',
                                alignItems:'center',
                                backgroundColor:"#4682A9",
                                padding:'15px 10px 0px 10px',
                                marginBottom:"2px",
                                borderRadius:'5px',
                            }}>
        <p style={{flex:'0.4'}}>{item.labelName.length > 16 ? item.labelName.slice(0,16) + "...": item.labelName}</p>
        <p style={{flex:'0.4'}}>{item?.produceBy?.firstName} {item?.produceBy?.lastName}</p>
        <p style={{flex:'0.2'}}>{item.printCount}</p>
        <hr />
    </div>
    ))}
    </div>
  )
}

export default OrderDetailsDashboard