import React, { useEffect, useState } from "react";
import easyIFUlogo from "../../assets/easyIFU_Logo.png";
import "../../components/header/header.css";
import Avatar from "@mui/material/Avatar";
import SideBar from "../../components/header/SideBar";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  UpdateUserAction,
  getUserAction,
  toggleStatusUserAction,
} from "../../redux/actions/userActions";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import { logoutAction } from "../../redux/actions/authActions";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BarLinks from "../../utilities/BarLinks";
import Heading from "../../components/Heading/Heading";

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("sideToggle")) || false
  );
  const toggleSidebar = () => {
    const newToggleState = !isSidebarOpen;
    setIsSidebarOpen(newToggleState);
    localStorage.setItem("sideToggle", JSON.stringify(newToggleState));
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userInfo?._id || null;

  const [form, setForm] = useState({
    companyId: decodedToken?.userInfo?.companyId || null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const [request, setRequest] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleContact = async (e) => {
    e.preventDefault();

    try {
      setRequest(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/create-contact`,
        form
      );
      toast.success("Contact submitted successfully");
      setForm({
        companyId:
          decodedToken &&
          decodedToken.userInfo &&
          decodedToken.userInfo.companyId,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.warning("Failed to submit contact request");
    } finally {
      setRequest(false);
    }
  };

  // ------ headers ------
  const { logout } = useSelector((state) => state);
  const { logoutRequest, logoutSuccess, logoutFail } = logout;
  const handleLogout = () => {
    dispatch(logoutAction(userId));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className=""
      style={{ height: "70vh", width: "100%", display: "flex" }}
    >
      <SideBar isSidebarOpen={isSidebarOpen} />

      <main className="" style={{ paddingTop: "0px", width: "100%" }}>
        {/* Dashboard header  */}
        <div style={{ position: "sticky", top: "0" }} id="page-content-wrapper">
          <Box sx={{ flexGrow: 1 }} className="">
            <AppBar
              position="static"
              style={{ backgroundColor: "#ecf0f3", marginBottom: "-10px" }}
            >
              <Toolbar className="container" style={{ marginTop: "-10px" }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="black"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleSidebar}
                >
                  <WidgetsRoundedIcon style={{ color: "#021d41" }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/">
                    <img
                      className="dash-Logo"
                      src={easyIFUlogo}
                      alt="easyIFU-logo"
                    />
                  </Link>
                </Typography>

                <div>
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    style={{ height: "35px", width: "35px", padding: "2px" }}
                  >
                    <Avatar
                      style={{
                        color: "#ecf0f3",
                        backgroundColor: "#021d41",
                        height: "100%",
                        width: "100%",
                      }}
                      onClick={handleMenu}
                    />
                    {/* <Avatar style={{backgroundColor:'#021d41', color:'#fff', height:'30px', width:'30px'}}>Y</Avatar> */}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAnchor}
                  >
                    <Link
                      to="/dashboard/account"
                      style={{ color: "black" }}
                      onClick={handleCloseAnchor}
                    >
                      {" "}
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link
                      to="/dashboard/company"
                      style={{ color: "black" }}
                      onClick={handleCloseAnchor}
                    >
                      {" "}
                      <MenuItem>My Company</MenuItem>
                    </Link>
                    <Link
                      style={{
                        color: "black",
                        borderTop: "1px solid lightGray",
                      }}
                      onClick={() => handleLogout()}
                    >
                      {" "}
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          borderTop: "1px solid lightGray",
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Link>
                  </Menu>
                </div>
              </Toolbar> 
            </AppBar>
          </Box>
        <Heading>Contact us / </Heading>
        </div>

        {/* Dashboard  content   */}
        <section className="container" style={{ marginTop: "80px" }}>
          <form
            style={{
              width: "60%",
              margin: "auto",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
            onSubmit={handleContact}
          >
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={request}
            >
              {request ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
