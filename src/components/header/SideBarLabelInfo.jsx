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
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useDispatch, useSelector } from "react-redux";
import ContactsIcon from "@mui/icons-material/Contacts";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { logoutAction } from "../../redux/actions/authActions";
import { RotatingLines } from "react-loader-spinner";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Accordion } from "react-bootstrap";
import Swal from "sweetalert2";

const SideBarLabelInfo = ({
  isSidebarOpen,
  projectInfo,
  projectId,
  onTemplateChange,
  status,
  hideInfo,
}) => {
  const { logout } = useSelector((state) => state);
  const { logoutRequest, logoutSuccess, logoutFail } = logout;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    // handleCloseAnchor()
  };

  const navigate = useNavigate();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
    }
  }, [logoutSuccess]);

  // --------------- collapse ---------------
  const [collapsed, setCollapsed] = useState({
    update: false,
    template: false,
    sendTo: false,
  });

  const toggleCollapse = (section) => {
    setCollapsed((prevCollapsed) => ({
      update: false,
      template: false,
      sendTo: false,
      [section]: !prevCollapsed[section], // Toggle the specified section
    }));
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  //   const [activeTemplate, setActiveTemplate] = useState('');

  const [activeTemplate, setActiveTemplate] = useState("Template1");
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleTemplateChange = (template) => {
    if (status == "Draft") {
      if (typeof onTemplateChange === "function") {
        onTemplateChange(template);
      }
      setActiveTemplate(template);
    } else {
      Swal.fire({
        title: "Changing Template only for Draft labels!",
        text: "Please use the Edit button for new Draft edition",
        icon: "info",
        customClass: {
          popup: "custom-swal-bg",
          confirmButton: "custom-swal-button",
          icon: "custom-swal-icon",
        },
      });
    }
  };

  const handleMessageUpdate = () => {
    if (status !== "Draft") {
      Swal.fire({
        title: "Update only for Draft labels!",
        text: "Please use the Edit button for new Draft edition",
        icon: "info",
        customClass: {
          popup: "custom-swal-bg",
          confirmButton: "custom-swal-button",
          icon: "custom-swal-icon",
        },
      });
    }
  };

  return (
    <div
      id="wrapper"
      className={!isSidebarOpen ? "" : "toggled"}
      style={{ zIndex: "100" }}
    >
      <div id="sidebar-wrapper" style={{ height: "100vh", zIndex: "100" }}>
        <img src={sidebarBG} className="bg-sidebar-img" />
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
          <div className="sideBrd-user-info">
            <h4>
              {decodedToken &&
                decodedToken.userInfo &&
                `${
                  decodedToken &&
                  decodedToken.userInfo &&
                  decodedToken.userInfo.firstName
                } ${
                  decodedToken &&
                  decodedToken.userInfo &&
                  decodedToken.userInfo.lastName
                }`}
            </h4>
            <p>
              {decodedToken &&
                decodedToken.userInfo &&
                decodedToken.userInfo.email}
            </p>
          </div>
          {!hideInfo && (
            <div
              style={{
                height: "",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "95%",
                  margin: "auto",
                }}
              >
                {/* Collapsible header with button */}
                <button
                  onClick={() => toggleCollapse("update")}
                  className={`collapsible-header-update + ${
                    !collapsed.update ? "border" : ""
                  }`}
                >
                  Update Label
                </button>
                {/* Collapsible content */}
                {
                  <div
                    className={`collapsible-update update ${
                      !collapsed.update ? "collapsed" : "expanded"
                    }`}
                  >
                    <Link
                      onClick={handleMessageUpdate}
                      style={{ margin: "0", padding: " 5px" }}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step1/${projectId}`
                      }
                    >
                      Manufacturer Info
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step2/${projectId}`
                      }
                    >
                      Legislation
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step3/${projectId}`
                      }
                    >
                      Product Info
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step4/${projectId}`
                      }
                    >
                      Intended Purpose
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step5/${projectId}`
                      }
                    >
                      Sterility
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step6/${projectId}`
                      }
                    >
                      Storage
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step7/${projectId}`
                      }
                    >
                      Safe Use
                    </Link>
                    {projectInfo?.labelData &&
                      projectInfo?.labelData?.productType ===
                        "In Vitro Diagnostic (IVD) Medical Device" && (
                        <Link
                          onClick={handleMessageUpdate}
                          to={
                            status == "Draft" &&
                            `/dashboard/update-project/step8/${projectId}`
                          }
                          style={{
                            backgroundColor: "rd",
                            marginBottom: "5px",
                            borderRadius: "4px",
                          }}
                        >
                          IVD Diagnostic
                        </Link>
                      )}
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step9/${projectId}`
                      }
                    >
                      Transfusion-Infusion
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step10/${projectId}`
                      }
                    >
                      Others
                    </Link>
                    <Link
                      onClick={handleMessageUpdate}
                      to={
                        status == "Draft" &&
                        `/dashboard/update-project/step11/${projectId}`
                      }
                    >
                      Translation/Repackaging
                    </Link>
                  </div>
                }

                <div>
                  {/* Collapsible header button */}
                  <button
                    className={`collapsible-header + ${
                      collapsed.template ? "border" : ""
                    }`}
                    onClick={() => toggleCollapse("template")}
                  >
                    Templates
                  </button>

                  {/* Collapsible content with transition */}
                  <div
                    className={`collapsible-content ${
                      !collapsed.template ? "collapsed" : "expanded"
                    }`}
                  >
                    {/* Links */}
                    <button
                      className={`template-button ${
                        activeTemplate === "Template1" ? "active" : ""
                      }`}
                      onClick={() => handleTemplateChange("Template1")}
                    >
                      Template 1
                    </button>
                    <button
                      className={`template-button ${
                        activeTemplate === "Template2" ? "active" : ""
                      }`}
                      onClick={() => handleTemplateChange("Template2")}
                    >
                      Template 2
                    </button>
                    <button
                      className={`template-button ${
                        activeTemplate === "Template3" ? "active" : ""
                      }`}
                      onClick={() => handleTemplateChange("Template3")}
                    >
                      Template 3
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarLabelInfo;
