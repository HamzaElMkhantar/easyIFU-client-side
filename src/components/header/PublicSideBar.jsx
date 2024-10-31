import React from "react";
import headerLogo from "../../assets/sideBar_logo.png";
import sidebarBG from "../../assets/sideBrdBG.svg";
import "./header.css";
import { Link } from "react-router-dom";
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const PublicSideBar = ({ metaData, allVersion }) => {
  return (
    <div id="wrapper" className={"toggled publicSideBar"}>
      <div id="sidebar-wrapper" style={{ height: "100%" }}>
        <img src={sidebarBG} className="bg-sidebar-img" alt="Sidebar Background" />
        <div className="sidebar-nav">
        <Link
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            to="/"
            className="navbar-brand mx-auto"
          >
            <img
              src={headerLogo}
              alt="Logo"
              width="100"
              height="100"
              style={{ marginLeft: "-50px", padding: "0", borderRadius: "4px" }}
            />
          </Link>
          <div className="sideBrd-user-info" style={{ backgroundColor: "" }}>
            <h6>{metaData?.IFUName}</h6>
            <p>version: {metaData?.ifuVersion}</p>
          </div>
          <div className="navList" style={{ overflowY: "scroll" }}>
            {allVersion.length > 0 && 
            allVersion.map(item => {
              return (
                <button key={item._id} className="navButton" style={{ fontSize: "16px", color: metaData?.ifuVersion !== item.ifuVersion ? '#ecf0f3':'#07566F', marginBottom:'10px', padding: "5px 3px", backgroundColor:'RGBA(170, 187, 204, 0)' }}>
                <CheckBoxIcon style={metaData?.ifuVersion !== item.ifuVersion ? {fontSize:'20px'} : {fontSize:'20px', color:'#07566F'}} /> Version 1.0
               </button>
              );
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSideBar;
