import React, { useEffect, useState } from "react";
import SideBar from "../../components/header/SideBar";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import easyIFUlogo from "../../assets/easyIFU_Logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ProjectByRoleIdAction,
  releasedProjectAction,
} from "../../redux/actions/projectActions";
import { RotatingLines } from "react-loader-spinner";

import { logoutAction } from "../../redux/actions/authActions";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BarLinks from "../../utilities/BarLinks";
import { Table } from "react-bootstrap";
import { drafLabelsAction } from "../../redux/actions/labelActions";
const DraftLabels = () => {
  const { productId } = useParams();

  // side bar toggle
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

  // -- component logic --
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const companyId = decodedToken?.userInfo?.companyId || null;
  const userId = decodedToken?.userInfo?._id || null;

  const [data, setData] = useState([]);
  const { drafLabels } = useSelector((state) => state);
  const {
    draftLabelsRequest,
    draftLabelsSuccess,
    draftLabelsFail,
    draftLabels,
  } = drafLabels;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      drafLabelsAction({ companyId, productId, createdBy: userId }, token)
    );
  }, []);
  useEffect(() => {
    if (draftLabelsSuccess) {
      setData(draftLabels);
    }
    if (draftLabelsFail && draftLabelsFail.message != "no label found!") {
      toast.error(`${draftLabelsFail.message}`);
    }
  }, [draftLabelsSuccess, draftLabelsFail]);

  // ------ headers ------
  const { logout } = useSelector((state) => state);
  const { logoutRequest, logoutSuccess, logoutFail } = logout;
  const handleLogout = () => {
    dispatch(logoutAction(userId));
  };
  // ------ headers ------
  let barLinks = [
    { title: "All Labels", link: "/dashboard/labels/" + productId },
    { title: "Draft", link: "/dashboard/project/draft/" + productId },
    { title: "Approved", link: "/dashboard/project/approved/" + productId },
    { title: "Released", link: "/dashboard/project/released/" + productId },
    { title: "Rejected", link: "/dashboard/project/rejected/" + productId },
  ];

  // if(decodedToken &&
  //   decodedToken?.userInfo &&
  //   (decodedToken?.userInfo?.role.includes("Admin") || decodedToken?.userInfo?.role.includes("Creator"))){
  //     barLinks = [
  //       {title: 'All Labels', link: '/dashboard/labels/'+productId},
  //       {title: 'Draft', link: '/dashboard/project/draft/'+productId},
  //       {title: 'Approved', link: '/dashboard/project/approved/'+productId},
  //       {title: 'Released', link: '/dashboard/project/released/'+productId},
  //       {title: 'Rejected', link: '/dashboard/project/rejected/'+productId},
  //       {title: 'Received', link: '/dashboard/received-project'},
  //       {title: 'Archived', link: '/dashboard/archived-project'},
  //     ];
  // } else if(decodedToken &&
  //   decodedToken?.userInfo &&
  //   (!decodedToken?.userInfo?.role.includes("Admin") || !decodedToken?.userInfo?.role.includes("Creator"))){
  //     barLinks = [
  //       {title: 'All Labels', link: '/dashboard/labels/'+productId},
  //       {title: 'Draft', link: '/dashboard/project/draft/'+productId},
  //       {title: 'Approved', link: '/dashboard/project/approved/'+productId},
  //       {title: 'Released', link: '/dashboard/project/released/'+productId},
  //       {title: 'Rejected', link: '/dashboard/project/rejected/'+productId},
  //       {title: 'Received', link: '/dashboard/received-project'},
  //       {title: 'Archived', link: '/dashboard/archived-project'},
  //     ];
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div style={{ height: "70vh", width: "100%", display: "flex" }}>
      <SideBar isSidebarOpen={isSidebarOpen} />
      <main style={{ paddingTop: "0px", width: "100%" }}>
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
          <BarLinks pages={barLinks} />
        </div>

        <section
          className="container"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <h6>Draft Label: {data.length} </h6>
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              style={{ backgroundColor: "#fff" }}
              className="table responsive-table table-hover my-1"
            >
              <thead
                style={{
                  backgroundColor: "#075670",
                  textAlign: "center",
                  color: "#fff",
                }}
                className="thead-dark"
              >
                <tr>
                  <th>#</th>
                  <th>Label Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Details</th>
                  {(decodedToken?.userInfo?.role.includes("Release") ||
                    decodedToken?.userInfo?.role.includes("Admin")) && (
                    <th>created At</th>
                  )}
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.labelName}</td>
                      <td>
                        {item?.labelDescription?.length > 20
                          ? item.labelDescription.substring(0, 20) + "..."
                          : item.labelDescription}
                      </td>
                      <td scope="col">{item.status ? item.status : "Draft"}</td>
                      {decodedToken &&
                        decodedToken?.userInfo &&
                        (decodedToken?.userInfo?.role.includes("Admin") ||
                          decodedToken?.userInfo?.role.includes("Creator")) && (
                          <td>
                            {item.labelStep < 11 ? (
                              <Link
                                to={`/dashboard/create-project/step${item.labelStep}/${item._id}`}
                                style={{
                                  backgroundColor: "#021D41",
                                  color: "#fff",
                                  padding: "2px 10px",
                                  borderRadius: "4px",
                                }}
                              >
                                Continue
                              </Link>
                            ) : (
                              <Link
                                to={`/dashboard/project-information/${item._id}`}
                                style={{
                                  color: "#021D41",
                                  backgroundColor: "#efefef",
                                  padding: "2px 10px",
                                  borderRadius: "4px",
                                }}
                              >
                                <VisibilityIcon
                                  style={{
                                    paddingBottom: "3px",
                                    fontSize: "24px",
                                  }}
                                />
                              </Link>
                            )}
                          </td>
                        )}
                      <td>{formatDate(item?.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {draftLabelsRequest && (
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RotatingLines
                  strokeColor="#011d41"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
              </div>
            )}
            {!draftLabelsRequest && data.length < 1 && (
              <p
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                No draft projects found
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DraftLabels;
