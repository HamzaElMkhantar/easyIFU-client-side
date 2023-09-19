import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../../components/header/SideBar'
import Avatar from '@mui/material/Avatar';
import {Routes, Route } from 'react-router-dom';
import '../../components/header/header.css';

const Users = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='' style={{height:'70vh', width:'100%', display:'flex'}}>
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className='' style={{paddingTop:'0px', width:'100%'}}>
        {/* Dashboard header  */}
        <div  style={{ borderBottom:'1px solid lightGray'}} id="page-content-wrapper">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='container'>
            <span href="#menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </span>
            <div >
              <Avatar
              sx={{ width: 40, height: 40 }}
                  style={{backgroundColor:'black'}}>
                  
              </Avatar>
            </div>
          </div>
        </div>

        {/* Dashboard  content   */}
        <section className='container' style={{marginTop:'20px'}}>
         
        </section>
      </main>
    </div>
  )
}

export default Users