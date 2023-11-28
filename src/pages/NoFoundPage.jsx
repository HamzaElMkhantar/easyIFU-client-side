import React from 'react'
import pageNotFound from '../assets/404.svg'
const NoFoundPage = () => {
  return (
    <div style={{width: '100%', minHeight:'100vh', paddingTop:'', paddingBottom:'', display:'flex', justifyContent:'center', alignItems:'center'}} className='container'>
      <img  style={{width:'80%'}} src={pageNotFound} />
    </div>
  )
}

export default NoFoundPage