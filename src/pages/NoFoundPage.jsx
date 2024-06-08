import React from 'react'
import "./notFound.css"
import pageNotFound from '../assets/404.svg'
import { Link } from 'react-router-dom'
const NoFoundPage = () => {
  return (
    <div id='notfound' style={{width: '100%', minHeight:'100vh', paddingTop:'', paddingBottom:'', display:'flex', justifyContent:'center', alignItems:'center'}} className=''>
      {/* <img  style={{width:'40%'}} src={pageNotFound} /> */}

      <div class="notfound">
        <div class="notfound-404">
        <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to="/">Go To Homepage</Link>
        </div>
    </div>
  )
}

export default NoFoundPage