import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/header/SideBar";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../components/header/header.css";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import { Table } from "react-bootstrap";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  startProjectAction,
} from "../../redux/actions/projectActions";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import easyIFUlogo from "../../assets/easyIFU_Logo.png";
import BarLinks from "../../utilities/BarLinks";
import { logoutAction } from "../../redux/actions/authActions";
import {
  createProductAction,
  getProductByProjectIdAction,
} from "../../redux/actions/productActions";
import Swal from "sweetalert2";
import Heading from "../../components/Heading/Heading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "98%",
  bgcolor: "background.paper",
  border: "1px solid lightGray",
  boxShadow: 4,
  p: 4,
  borderRadius: "3px",
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


const Products = () => {
  const { projectId } = useParams();
 
  // toggle form
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("sideToggle")) || false
  );
  const toggleSidebar = () => {
    const newToggleState = !isSidebarOpen;
    setIsSidebarOpen(newToggleState);
    localStorage.setItem("sideToggle", JSON.stringify(newToggleState));
  };

  // --- component logic ---
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const companyId =  decodedToken?.userInfo?.companyId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);
  const { logout, getProductByProjectId, createProduct } =
    useSelector((state) => state);

  const { createProductRequest, createProductSuccess, createProductFail } =
    createProduct;
  const { logoutRequest, logoutSuccess, logoutFail } = logout;
  const { productRequest, productSuccess, productsData, productFail } =
    getProductByProjectId;
console.log({logoutRequest, logoutSuccess, logoutFail })
  const [formData, setFormData] = useState({
    companyId:decodedToken?.userInfo?.companyId,
    createdBy:decodedToken?.userInfo?._id,
    projectId,
    productDescription: "",
    productName: "",
  });

  const userId = decodedToken?.userInfo?._id || null;

  const handleLogout = () => {
    dispatch(logoutAction(userId));
  };

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
    }
  }, [logoutSuccess, navigate]);

  // get all products
  useEffect(() => {
    dispatch(
      getProductByProjectIdAction(
        projectId,
        companyId,
        decodedToken?.userInfo?._id,
        token
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (createProductSuccess) {
      dispatch(
        getProductByProjectIdAction(
          projectId,
          companyId,
          decodedToken?.userInfo?._id,
          token
        )
      );
      handleClose();
      setFormData({
        companyId: decodedToken?.userInfo?.companyId,
        createdBy: decodedToken?.userInfo?._id,
        projectId,
        productDescription: "",
        productName: "",
      });
    }

    if (createProductFail) {
      if (createProductFail.message === "payment_required!") {
        handleClose();
        Swal.fire({
          title: "Subscription Needed",
          text: "To unlock the ability to create additional products, please upgrade your subscription.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Upgrade Now",
          cancelButtonText: "Close",
          customClass: {
            popup: "custom-swal-bg",
            confirmButton: "custom-swal-button",
            cancelButton: "custom-swal-cancel-button",
            icon: "custom-swal-icon",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            navigate("/check-subscription");
          }
        });
      } else {
        toast.warning(`${createProductFail.message}`);
      }
    }
  }, [createProductSuccess, createProductFail]);

  useEffect(() => {
    if (productSuccess) {
      setAllProjects(productsData);
    }

    if (productFail) {
      setAllProjects([]);
    }
  }, [productSuccess, productFail]);

  const handleCreateProject = () => {
    dispatch(createProductAction(formData, token));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.projectName === "" || formData.projectDescription === "") {
      toast.warning("Fields are Empty !");
    } else {
      dispatch(startProjectAction(formData, token));
    }
  };

  // ------ headers ------
  let barLinks = [
    { title: "Products", link: "/dashboard/products/" + projectId },
    {
      title: "Instructions for Use",
      link: "/dashboard/Instructions-for-use/" + projectId,
    },
  ];


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
          <BarLinks pages={barLinks} />
        <Heading><Link className='linkStyle' to='/dashboard/project'>Projects</Link> / <Link className='linkStyle' to={'/dashboard/products/' + projectId}>Products</Link> / </Heading>

        </div>

        {/* Dashboard  content   */}
        <section className="container pb-5" style={{ marginTop: "15px" }}>
          {/* modal */}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{ color: "#08408B", textAlign: "center" }}>
                Product Information
              </h2>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="projectName">1- Product Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectName"
                      id="projectName"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDescription">2- Product Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectDescription"
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDescription: e.target.value,
                        })
                      }
                    />
                  </div>

                  {!createProductRequest ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        onClick={handleCreateProject}
                        style={{
                          marginTop: "20px",
                          padding: "5px 20px",
                          fontWeight: "600",
                          fontSize: "18px",
                          borderRadius: "5px",
                          backgroundColor: "#011d41",
                          color: "#fff",
                        }}
                      >
                        Start Creating
                      </button>
                      <button
                        onClick={handleClose}
                        style={{
                          marginTop: "20px",
                          padding: "5px 20px",
                          fontWeight: "600",
                          fontSize: "18px",
                          borderRadius: "5px",
                          backgroundColor: "#1753A2",
                          color: "#fff",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
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
                </form>
              </Typography>
            </Box>
          </Modal>

          {/* <Link to='/dashboard/create-project/step1'> */}
          {(decodedToken?.userInfo?.role.includes("Admin") ||
              decodedToken?.userInfo?.role.includes("Creator")) && (
              <button
                onClick={handleOpen}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#9a3b3a",
                  borderRadius: "3px",
                  color: "#ecf0f3",
                  fontWeight: "700",
                }}
              >
                New Product
              </button>
            )}
          {/* </Link> */}
          <div>
            <Table
              striped
              bordered
              hover
              style={{ backgroundColor: "#fff" }}
              className="table table-hover my-1"
            >
              <thead
                style={{ backgroundColor: "#075670", textAlign: "center" }}
                className="thead-dark"
              >
                <tr style={{ color: "#fff" }}>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Description</th>
                  {(decodedToken?.userInfo?.role.includes("Admin") ||
                      decodedToken?.userInfo?.role.includes("Creator")) && (
                      <>
                        <th scope="col">createdAt</th>
                        <th scope="col">Details</th>
                      </>
                    )}
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {allProjects.length > 0 &&
                  allProjects?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.productName}</td>
                        <td>
                          {item.productDescription?.length > 20
                            ? item.productDescription.substring(0, 20) + "..."
                            : item.productDescription}
                        </td>
                        <td>{formatDate(item?.createdAt)}</td>
                        {(decodedToken?.userInfo?.role.includes("Admin") ||
                            decodedToken?.userInfo?.role.includes(
                              "Creator"
                            )) && (
                            <td>
                              {item.labelStep < 12 ? (
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
                                  to={`/dashboard/labels/${item._id}`}
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
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {productRequest && (
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
            {allProjects.length < 1 && !productRequest && (
              <h6 style={{ textAlign: "center", marginTop: "10px" }}>
                No Projects Created
              </h6>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;
