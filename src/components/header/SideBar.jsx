import React, { useEffect, useState } from "react";
import headerLogo from "../../assets/sideBar_logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import LogoutIcon from "@mui/icons-material/Logout";
import LastPageIcon from "@mui/icons-material/LastPage";
import sidebarBG from "../../assets/sideBrdBG.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useDispatch, useSelector } from "react-redux";
import ContactsIcon from "@mui/icons-material/Contacts";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { logoutAction } from "../../redux/actions/authActions";
import { RotatingLines } from "react-loader-spinner";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const SideBar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const token = Cookies.get("eIfu_ATK") || null;
  const Rtoken = Cookies.get("eIfu_RTK") || null;
  const decoded_RToken = Rtoken ? jwtDecode(Rtoken) : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userInfo?._id || null;

  const { logout } = useSelector((state) => state);
  const { logoutRequest, logoutSuccess, logoutFail } = logout;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    // handleCloseAnchor()
  };
  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
    }
  }, [logoutSuccess]);
  return (
    <div id="wrapper" className={!isSidebarOpen ? "" : "toggled"}>
      <div id="sidebar-wrapper" style={{ height: "100%" }}>
        <img src={sidebarBG} className="bg-sidebar-img" />
        <div className="sidebar-nav" style={{ position: "" }}>
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
            <h4>{`${decoded_RToken?.firstName} ${decoded_RToken?.lastName}`}</h4>
            <p>{decoded_RToken?.email}</p>
          </div>
          <div
            style={{
              backgroundColor: "",
              height: "",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ height: "", overflowY: "scroll" }}
              className="navList"
            >
              {
                <Link
                  style={{ fontSize: "11px", padding: "5px 3px" }}
                  to="/dashboard"
                >
                  <HomeRoundedIcon style={{ color: "#9A3B3B" }} />
                  Home
                </Link>
              }
              {decodedToken?.userInfo?.role.includes("Admin") ||
              decodedToken?.userInfo?.role.includes("Creator") ? (
                <Link
                  style={{ fontSize: "11px", padding: "5px 3px" }}
                  to="/dashboard/project"
                >
                  <InventoryRoundedIcon style={{ color: "#088395" }} />
                  Projects
                </Link>
              ) : (
                <Link
                  style={{ fontSize: "11px", padding: "5px 3px" }}
                  to="/dashboard/received-project"
                >
                  <InventoryRoundedIcon style={{ color: "#088395" }} />
                  Projects
                </Link>
              )}

              {(decodedToken?.userInfo?.role.includes("Producer") ||
                decodedToken?.userInfo?.role.includes("Admin")) && (
                <>
                  <Link
                    style={{ fontSize: "11px", padding: "5px 3px" }}
                    to="/dashboard/documents"
                  >
                    <BeenhereIcon style={{ color: "#5E9F7A" }} />
                    Orders
                  </Link>
                </>
              )}
              <Link
                style={{ fontSize: "11px", padding: "5px 3px" }}
                to="/dashboard/contact"
              >
                <ContactsIcon style={{ color: "#3992B0" }} /> contact Us
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            color: "white",
            bottom: "20px",
            marginLeft: "10px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              margin: "4px",
              color: "rgb(81,90,104, 0.5)",
            }}
          >
            Subscription Info:
          </p>
          <p
            style={{
              fontSize: "11px",
              margin: "0 20px",
              color: "rgb(81,90,104, 0.5)",
            }}
          >
            Start Date:{" "}
            {decodedToken?.userInfo?.companySubscriptionInfo?.startDate}
          </p>
          <p
            style={{
              fontSize: "11px",
              margin: "0 20px",
              color: "rgb(81,90,104, 0.5)",
            }}
          >
            End Date: {decodedToken?.userInfo?.companySubscriptionInfo?.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
