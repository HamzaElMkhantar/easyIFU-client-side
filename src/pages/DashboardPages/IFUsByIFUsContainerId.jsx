import React, { useEffect, useState } from "react";
import SideBar from "../../components/header/SideBar";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import easyIFUlogo from "../../assets/easyIFU_Logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
import BarLinks from "../../utilities/BarLinks";
import { Table } from "react-bootstrap";
import { editIFUAction, getAllIFUsAction, getIFUsLanguesAction } from "../../redux/actions/IFUsActions";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

const IFUsByIFUsContainerId = () => {
  const { IFUsContainerId } = useParams();
  const location = useLocation();
  const queryStatus = location.search.split('=')[1] || null;

  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("sideToggle")) || false
  );
  const toggleSidebar = () => {
    const newToggleState = !isSidebarOpen;
    setIsSidebarOpen(newToggleState);
    localStorage.setItem("sideToggle", JSON.stringify(newToggleState));
  };

  // -- component logic --
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const companyId = decodedToken?.userInfo?.companyId || null;
  const userId = decodedToken?.userInfo?._id || null;

  const [data, setData] = useState([]);
  const [langues, setLangues] = useState([]);
  const [queryLangue, setQueryLangue] = useState('Global');
  const { getAllIFU, IFUsLangues, editIFU } = useSelector((state) => state);
  const { IFUsRequest, IFUsSuccess, IFUsFail, IFUsData } = getAllIFU;
  const { IFULanguesRequest, IFULanguesSuccess, IFULanguesFail, IFULangues } = IFUsLangues;
  const {editIFURequest, editIFUSuccess, editIFUFail, editIfu} = editIFU;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getAllIFUsAction(
        IFUsContainerId,
        companyId,
        userId,
        queryStatus,
        queryLangue,
        token
      )
    );
    dispatch(getIFUsLanguesAction(IFUsContainerId, companyId, userId, token));
  }, []);

  useEffect(() => {
    setData([]);
    dispatch(
      getAllIFUsAction(
        IFUsContainerId,
        companyId,
        userId,
        queryStatus,
        queryLangue,
        token
      )
    );
  }, [queryStatus, queryLangue]);

  useEffect(() => {
    if (IFUsSuccess) {
      setData(IFUsData);
    }
    if (IFUsFail) {
      toast.info(`${IFUsFail.message}`);
    }

    if (IFULanguesSuccess) {
      setLangues(IFULangues);
    }
    if (IFULanguesFail) {
      toast.info(`${IFULanguesFail.message}`);
    }

    if (editIFUSuccess) {
      navigate(`/dashboard/Instructions-for-use/info/${editIfu._id}`);
    }
    if (editIFUFail) {
      toast.info(`${editIFUFail.message}`);
    }
  }, [
    IFUsSuccess,
    IFUsFail,
    IFUsData,
    IFULanguesSuccess,
    IFULanguesFail,
    IFULangues,
    editIFUFail,
    editIFUSuccess,
  ]);

  const handleLogout = () => {
    dispatch(logoutAction(userId));
  };
  // ------ headers ------
  let barLinks = [
    { title: "IFUs", link: "/dashboard/IFUs/" + IFUsContainerId},
    { title: "Draft IFUs", link: "/dashboard/IFUs/" + IFUsContainerId + "?status=Draft" },
    { title: "approved IFUs", link: "/dashboard/IFUs/" + IFUsContainerId + "?status=approved" },
    { title: "published IFUs", link: "/dashboard/IFUs/" + IFUsContainerId + "?status=published" },
    { title: "rejected IFUs", link: "/dashboard/IFUs/" + IFUsContainerId + "?status=rejected" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id) => {
    dispatch(editIFUAction({ifuId: id}, token))
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

        <section className="container" style={{ padding: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {(decodedToken?.userInfo?.role.includes("Admin") ||
              decodedToken?.userInfo?.role.includes("Creator")) && (
              <button
                className="mb-2"
                onClick={() =>
                  navigate(
                    `/dashboard/Instructions-for-use-create/${IFUsContainerId}`
                  )
                }
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#9a3b3a",
                  borderRadius: "2px",
                  color: "#ecf0f3",
                  fontWeight: "700",
                  height: "40px",
                  width: "120px",
                }}
              >
                New IFU
              </button>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "",
                width: "80%",
                justifyContent: "center",
                marginTop: "-6px",
                borderRadius: "2px",
                overflowX: "scroll",
                paddingLeft: "0px",
              }}
            >
              {langues?.map((item) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => setQueryLangue(item.language)}
                    className="mx-2"
                    style={
                      queryLangue !== item.language
                        ? {
                            fontSize: "13px",
                            backgroundColor: "lightgray",
                            borderRadius: "2px",
                          }
                        : {
                            fontSize: "13px",
                            backgroundColor: "lightgray",
                            borderRadius: "2px",
                            borderBottom: "1px solid black",
                            backgroundColor: "#021d41",
                            color: "#fff",
                          }
                    }
                  >
                    {item.language}
                  </button>
                );
              })}
            </div>
          </div>
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
                  {(decodedToken?.userInfo?.role.includes("Release") ||
                    decodedToken?.userInfo?.role.includes("Admin")) && (
                    <th>created At</th>
                  )}
                  <th>IFU Name</th>
                  <th>Description</th>
                  <th>Versions</th>
                  <th>Status</th>
                  <th>langue</th>
                  <th>Edit</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {data?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{formatDate(item?.createdAt)}</td>

                      <td>
                        {item.IFUName?.length > 20
                          ? item.IFUName.substring(0, 20) + "..."
                          : item.IFUName}
                      </td>
                      <td>
                        {item?.IFUDescription?.length > 20
                          ? item.IFUDescription.substring(0, 20) + "..."
                          : item.IFUDescription}
                      </td>
                      <td>{item.ifuVersion}</td>
                      <td scope="col">{item.status ? item.status : "Draft"}</td>
                      <td scope="col">{item.language}</td>
                      <td scope="col">
                        <button
                          disabled={editIFURequest}
                          onClick={() => handleEdit(item._id)}
                        >
                          {editIFURequest ? (
                            <RotatingLines
                              strokeColor="#011d41"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="25"
                              visible={true}
                            />
                          ) : (
                            <ContentCopyIcon />
                          )}
                        </button>
                      </td>
                      {(decodedToken?.userInfo?.role.includes("Admin") ||
                        decodedToken?.userInfo?.role.includes("Creator")) && (
                        <td>
                          <Link
                            to={`/dashboard/Instructions-for-use/info/${item._id}`}
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
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {IFUsRequest && (
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
            {!IFUsRequest && data.length < 1 && (
              <p
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                No {queryStatus ? queryStatus : ""} IFUs found
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default IFUsByIFUsContainerId;
