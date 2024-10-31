import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./project.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Typography } from "@mui/material";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  ReleaseTheProjectAction,
  sendingProjectToOtherRoleAction,
} from "../../redux/actions/projectActions";
import {
  approveLabelAction,
  getLabelAction,
  releaseLabelAction,
  sendToReleaserAction,
} from "../../redux/actions/labelActions";
import { usersCompanyAction } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { Modal } from "react-bootstrap";

// handle  zoom
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// import label Templates
import Template1 from "../../templates/template1/Template1";
import SideBarLabelInfo from "../../components/header/SideBarLabelInfo";
import { handleUDI } from "../../utilities/handleUDI";

const componentMapping = {
  Template1: Template1,

  // Add other mappings as needed
};
const ApproverReview = () => {
  const { projectId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const {
    getLabel,
    usersCompany,
    sendingProjectToOtherRole,
    ReleaseTheProject,
  } = useSelector((state) => state);
  const { getLabelRequest, getLabelSuccess, getLabelFail, label } = getLabel;
  const {
    usersCompanyRequest,
    usersCompanySuccess,
    usersCompanyFail,
    allUsers,
  } = usersCompany;
  const {
    sendingProjectRequest,
    sendingProjectSuccess,
    sendingProjectFail,
    sendingProjectMessage,
  } = sendingProjectToOtherRole;

  const [projectInfo, setProjectInfo] = useState({});
  const [allUsersCompany, setAllUsersCompany] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [sendTo, setSendTo] = useState({
    projectId,
    senderId: decodedToken?.userInfo?._id,
    receivedId: "",
    comment: "",
  });

  const [modalToggle, setModalToggle] = useState(false);
  const [acceptProject, setAcceptProject] = useState(false);
  const [rejectProject, setRejectProject] = useState(false);


  const handleResetModalState = (e) => {
    e.preventDefault();

    setModalToggle(false);
    setAcceptProject(false);
    setRejectProject(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSendLabel = (e) => {
    e.preventDefault();
    dispatch(sendingProjectToOtherRoleAction(sendTo, token));
  };
  useEffect(() => {
    if (sendingProjectSuccess) {
      toast.success(`${sendingProjectMessage.message}`);
      setModalToggle(false);
      setAcceptProject(false);
      setRejectProject(false);
    }
    if (sendingProjectFail) {
      toast.error(`${sendingProjectFail.message}`);
    }
  }, [sendingProjectSuccess, sendingProjectFail]);

  useEffect(() => {
    dispatch(getLabelAction(projectId, token));
    dispatch(
      usersCompanyAction(
        {
          _id: decodedToken?.userInfo?._id,
          companyId: decodedToken?.userInfo?.companyId,
        },
        token
      )
    );
  }, []);

  useEffect(() => {
    if (getLabelSuccess) {
      setProjectInfo(label);
    }
    if (usersCompanySuccess) {
      setAllUsersCompany(allUsers);
    }

    if (getLabelFail) {
      toast.warning(`${getLabelFail.message}`);
    }
  }, [getLabelSuccess, getLabelFail, usersCompanySuccess]);

  // -- handle release project --
  const {
    releaseProjectRequest,
    releaseProjectSuccess,
    releaseProjectFail,
    releaseProjectMessage,
  } = ReleaseTheProject;

  const [releaseAcceptProject, setReleaseAcceptProject] = useState(false);
  // const [rejectProject, setRejectProject] = useState(false);

  const handleRelease = (e) => {
    e.preventDefault();
    const data = {
      projectId,
      releaseId:
        decodedToken && decodedToken.userInfo && decodedToken.userInfo._id,
    };
    dispatch(ReleaseTheProjectAction(data, token));
  };
  useEffect(() => {
    if (releaseProjectSuccess) {
      toast.success(`${releaseProjectMessage.message}`);
      setModalToggle(false);
      setReleaseAcceptProject(false);
      setRejectProject(false);
    }
    if (releaseProjectFail) {
      toast.error(`${releaseProjectFail.message}`);
    }
  }, [releaseProjectSuccess, releaseProjectFail]);


  const { approveLabel, sendToReleaser, releaseLabel } = useSelector(
    (state) => state
  );

  const {
    approveLabelRequest,
    approveLabelSuccess,
    approveLabelFail,
    approveLabelMessage,
  } = approveLabel;
  const {
    sendToReleaserRequest,
    sendToReleaserSuccess,
    sendToReleaserFail,
    sendToReleaserMessage,
  } = sendToReleaser;
  const {
    releaseLabelRequest,
    releaseLabelSuccess,
    releaseLabelFail,
    releaseLabelMessage,
  } = releaseLabel;
  const [rejectToggle, setRejectTogle] = useState(false);
  const [rejectDecsription, setRejectDecsription] = useState(null);
  const [user, setUser] = useState(null);

  const handleApproveLabel = (action) => {
    const data = {
      labelId: projectId,
      userId: decodedToken?.userInfo?._id,
      comment: rejectDecsription,
      action,
    };
    dispatch(approveLabelAction(data, token));
  };

  const handlesendToRelaser = () => {
    const data = {
      labelId: projectId,
      userId: user,
      senderId: decodedToken?.userInfo?._id,
    };
    dispatch(sendToReleaserAction(data, token));
  };

  const handleReleaseLabel = (action) => {
    const data = {
      labelId: projectId,
      userId: decodedToken?.userInfo?._id,
      comment: rejectDecsription,
      action,
    };
    dispatch(releaseLabelAction(data, token));
  };

  let handleStatusCard = null;
  let userRole = decodedToken?.userInfo?.role;
  const labelHandleStatus = (rejectToggle) => {
    if (
      userRole?.includes("Approver") &&
      projectInfo.status === "pending_approval"
    ) {
      handleStatusCard = (
        <div className="card mb-3 p-2">
          <p>Review the label. You can accept or reject it.</p>
          <div className="card-body p-1">
            {approveLabelRequest && (
              <div style={{}}>
                <RotatingLines
                  strokeColor="#011d41"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            )}
            {!approveLabelRequest && (
              <>
                <div>
                  {!rejectToggle && (
                    <button
                      onClick={() => handleApproveLabel("accept")}
                      style={{
                        padding: "2px 15px",
                        margin: "0px 2px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Accept
                    </button>
                  )}
                  <button
                    disabled={false}
                    onClick={() => setRejectTogle(!rejectToggle)}
                    style={{
                      padding: "2px 15px",
                      margin: "0px 2px",
                      backgroundColor: "#CE5F5D",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {rejectToggle ? "X" : "Reject"}
                  </button>
                </div>
                {rejectToggle && (
                  <>
                    <textarea
                      onChange={(e) => setRejectDecsription(e.target.value)}
                      style={{
                        border: "1px solid lightGray",
                        margin: "10px 6px",
                        padding: "5px",
                        minHeight: "100px",
                        width: "97%",
                      }}
                      placeholder="Please include the reasons for rejection"
                    ></textarea>
                    <button
                      onClick={() => handleApproveLabel("reject")}
                      disabled={false}
                      style={{
                        padding: "2px 15px",
                        margin: "0 6px",
                        backgroundColor: "#CE5F5D",
                        color: "white",
                        fontWeight: "600",
                        width: "97%",
                      }}
                    >
                      Continue
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }

    if (userRole?.includes("Approver") && projectInfo?.status === "approved") {
      // send label to the releaser or release by approver it self if has role of release
      handleStatusCard = (
        <div className="card mb-3  p-2">
          <div className="card-body p-1">
            <p>Send the label to the Releaser.</p>
            <select
              onChange={(e) => setUser(e.target.value)}
              style={{
                backgroundColor: "#021d41",
                padding: "6px 8px",
                color: "white",
                width: "100%",
              }}
              name=""
              id=""
            >
              <option value="">-- select releaser --</option>
              {allUsersCompany.map((user) => {
                return user.role.includes("Release") ? (
                  <option value={user._id}>
                    {user.firstName} {user.lastName}( {user.role.join("-")} )
                  </option>
                ) : null;
              })}
            </select>
          </div>
          <button
            onClick={handlesendToRelaser}
            style={{
              padding: "2px 15px",
              margin: "5px 4px",
              backgroundColor: "green",
              color: "white",
              fontWeight: "600",
            }}
          >
            Send
          </button>
        </div>
      );
    }

    if (
      userRole?.includes("Release") &&
      projectInfo?.status == "pending_release"
    ) {
      // releaser should release the label or reject the label
      handleStatusCard = (
        <div className="card mb-3 p-2">
          <div className="card-body p-1">
            <p>
              Release the label or send it back if further changes are needed.
            </p>
            {!rejectToggle && (
              <button
                onClick={() => handleReleaseLabel("accept")}
                style={{
                  padding: "2px 15px",
                  margin: "0px 2px",
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Accept
              </button>
            )}
            <button
              disabled={false}
              onClick={() => setRejectTogle(!rejectToggle)}
              style={{
                padding: "2px 15px",
                margin: "0px 2px",
                backgroundColor: "#CE5F5D",
                color: "white",
                fontWeight: "600",
              }}
            >
              {rejectToggle ? "X" : "Reject"}
            </button>
          </div>
          {rejectToggle && (
            <>
              <textarea
                onChange={(e) => setRejectDecsription(e.target.value)}
                style={{
                  border: "1px solid lightGray",
                  margin: "10px 6px",
                  padding: "5px",
                  minHeight: "100px",
                }}
                placeholder="Please include the reasons for rejection"
              ></textarea>
              <button
                onClick={() => handleReleaseLabel("reject")}
                disabled={false}
                style={{
                  padding: "2px 15px",
                  margin: "0 6px",
                  backgroundColor: "#CE5F5D",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Continue
              </button>
            </>
          )}
        </div>
      );
    }
  };

  labelHandleStatus(rejectToggle);
  useEffect(() => {
    if (approveLabelSuccess || sendToReleaserSuccess || releaseLabelSuccess) {
      if (approveLabelSuccess) {
        // toast.success(`${approveLabelMessage}`)
        Swal.fire({
          text: `${approveLabelMessage?.message}`,
          icon: "success",
        });
        dispatch(getLabelAction(projectId, token));
        labelHandleStatus(rejectToggle);
      }
      if (sendToReleaserSuccess) {
        // toast.success(`${sendToReleaserMessage}`)
        Swal.fire({
          text: `${sendToReleaserMessage?.message}`,
          icon: "success",
        });
        labelHandleStatus(rejectToggle);
        navigate("/dashboard/received-project");
      }
      if (releaseLabelSuccess) {
        Swal.fire({
          text: `${releaseLabelMessage?.message}`,
          icon: "success",
        });
        labelHandleStatus(rejectToggle);
        navigate("/dashboard/received-project");
      }
    } else {
      if (approveLabelFail) {
        // toast.error(`${approveLabelFail?.message}`)
        Swal.fire({
          text: `${approveLabelFail?.message}`,
          icon: "warning",
        });
        labelHandleStatus(rejectToggle);
      }
      if (sendToReleaserFail) {
        // toast.error(`${sendToReleaserFail?.message}`)
        Swal.fire({
          text: `${sendToReleaserFail?.message}`,
          icon: "warning",
        });
        labelHandleStatus(rejectToggle);
      }
      if (releaseLabelFail) {
        // toast.error(`${releaseLabelFail?.message}`)
        Swal.fire({
          text: `${releaseLabelFail?.message}`,
          icon: "warning",
        });
        labelHandleStatus(rejectToggle);
      }
    }
  }, [
    approveLabelSuccess,
    sendToReleaserSuccess,
    releaseLabelSuccess,
    approveLabelFail,
    sendToReleaserFail,
    releaseLabelFail,
  ]);

  const [size, setSize] = useState("");
  const handleSizeChange = (newSize) => {
    setSize(newSize);
  };
  return (
    <div
      className="container label-information mb-5"
      style={{ padding: "0", height: "70vh", width: "100%", display: "flex" }}
    >
      <SideBarLabelInfo
        isSidebarOpen={true}
        status={projectInfo?.status}
        hideInfo={true}
        projectId={projectId}
      />
      <div>
        <Modal
          show={modalToggle} // Change 'open' to 'show'
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          centered
          style={{
            backdropFilter: "blur(5px)",
            width: "100vw",
            height: "100vh",
            position: "absolute",
          }}
        >
          <Typography
            id="modal-modal-description"
            style={{ padding: "15px", textAlign: "center" }}
          >
            {!releaseAcceptProject && (
              <form onSubmit={handleSendLabel}>
                <div className="form-group">
                  <label style={{ fontSize: "25px", marginBottom: "15px" }}>
                    choose user to send the project
                  </label>
                </div>
                {rejectProject && (
                  <div className="form-group">
                    <textarea
                      style={{
                        border: "1px solid lightGray",
                        width: "100%",
                        padding: "6px 10px",
                        fontSize: "18px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                      placeholder="Explain why you reject the project"
                      name=""
                      id=""
                      rows="6"
                      required={rejectProject ? true : false}
                      value={sendTo.comment}
                      onChange={(e) =>
                        setSendTo({ ...sendTo, comment: e.target.value })
                      }
                    ></textarea>
                  </div>
                )}
                <div
                  className="form-group mt-3 mb-2 mx-0"
                  style={{ textAlign: "left", fontSize: "18px" }}
                >
                  <label>Send Project To:</label>
                  <select
                    value={sendTo.receivedId}
                    onChange={(e) =>
                      setSendTo({ ...sendTo, receivedId: e.target.value })
                    }
                    style={{
                      width: "40%",
                      minWidth: "100px",
                      padding: "2px 10px",
                      borderRadius: "10px",
                      outline: "none",
                      border: "2px solid lightGray",
                    }}
                  >
                    <option>Choose User :</option>
                    {allUsersCompany &&
                      allUsersCompany.map((item) => {
                        return (
                          <option
                            value={`${item._id}`}
                          >{`${item.firstName} ${item.lastName}: ( ${item.role} )`}</option>
                        );
                      })}
                  </select>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {sendingProjectRequest ? (
                    <RotatingLines
                      strokeColor="#011d41"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      color="#fff"
                      visible={true}
                    />
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#072D60",
                        borderRadius: "4px",
                        color: "#fff",
                        padding: "2px 6px",
                      }}
                      disabled={sendingProjectRequest ? true : false}
                      type="submit"
                    >
                      Send..
                    </button>
                  )}
                  <button
                    style={{
                      backgroundColor: "#9A3B3A",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "2px 6px",
                    }}
                    onClick={(e) => handleResetModalState(e)}
                  >
                    Close
                  </button>
                </div>
              </form>
            )}

            {releaseAcceptProject && (
              <form onSubmit={handleRelease}>
                <div className="form-group">
                  <label style={{ fontSize: "25px", marginBottom: "15px" }}>
                    Release this Project
                  </label>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    {releaseProjectRequest ? (
                      <RotatingLines
                        strokeColor="#011d41"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        color="#fff"
                        visible={true}
                      />
                    ) : (
                      <>
                        <button
                          onClick={() => handleRelease}
                          style={{
                            backgroundColor: "#072D60",
                            borderRadius: "4px",
                            color: "#fff",
                            padding: "2px 6px",
                          }}
                          type="submit"
                        >
                          Save{" "}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    style={{
                      backgroundColor: "#9A3B3A",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "2px 6px",
                    }}
                    onClick={(e) => handleResetModalState(e)}
                  >
                    Close
                  </button>
                </div>
              </form>
            )}
          </Typography>
        </Modal>
      </div>
      <main
        style={{
          padding: "20px 5px",
          backgroundColor: "",
          margin: "0 auto",
          flex: 0.95,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/dashboard/received-project"
            style={{ height: "35px" }}
            className="label-info-link"
          >
            <ArrowBackIcon /> Back
          </Link>
          {!getLabelRequest && projectInfo && (
            <h6
              className="label-info-title"
              style={{ color: "#", flex: "1", fontSize: "24px" }}
            >
              {projectInfo?.labelName}
            </h6>
          )}
        </div>

        <div className="mt-1">
          {!getLabelRequest ? (
            <div>
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div className="mb-2">
                  <div className="row">
                    <p
                      className=""
                      style={{
                        color: "gray",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      Size: {size}mm
                    </p>
                    <div
                      className="test col-md-8"
                      style={{
                        borderRadius: "",
                        borderRight: "1px solid lightGray",
                        margin: "auto",
                      }}
                    >
                      <TransformWrapper initialScale={1}>
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                          <React.Fragment>
                            <TransformComponent>
                              <div
                                style={{
                                  backgroundColor: "",
                                  width: "",
                                  height: "",
                                  margin: "auto",
                                  cursor: "zoom-in",
                                }}
                              >
                                {/* displaying label should be dynamic ...! */}
                                {projectInfo?.labelTemplate === "Template1" && (
                                  <Template1
                                    scale={"1"}
                                    width={"100"}
                                    height={"150"}
                                    projectInfo={projectInfo}
                                    imageSrc={imageSrc}
                                    onSizeChange={handleSizeChange}
                                  />
                                )}
                              </div>
                            </TransformComponent>
                            <div
                              className=""
                              style={{
                                backgroundColor: "",
                                marginTop: "30px",
                                width: "100%",
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "#062D60",
                                  color: "#F0F0F0",
                                  padding: "2px 10px",
                                  margin: "5px",
                                  borderRadius: "2px",
                                }}
                                onClick={() => zoomIn()}
                              >
                                +
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#062D60",
                                  color: "#F0F0F0",
                                  padding: "2px 10px",
                                  margin: "5px",
                                  borderRadius: "2px",
                                }}
                                onClick={() => zoomOut()}
                              >
                                -
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#062D60",
                                  color: "#F0F0F0",
                                  padding: "2px 10px",
                                  margin: "5px",
                                  borderRadius: "2px",
                                }}
                                onClick={() => resetTransform()}
                              >
                                reset
                              </button>
                            </div>
                          </React.Fragment>
                        )}
                      </TransformWrapper>
                    </div>
                    <div className="col-md-4">
                      {userRole?.includes("Approver") &&
                        projectInfo.status == "pending_approval" && (
                          <div className="card mb-3 p-2">
                            <p>You may accept or reject it</p>
                            <div className="card-body p-1">
                              {approveLabelRequest && (
                                <div style={{}}>
                                  <RotatingLines
                                    strokeColor="#011d41"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="30"
                                    visible={true}
                                  />
                                </div>
                              )}
                              {!approveLabelRequest && (
                                <>
                                  <div>
                                    {!rejectToggle && (
                                      <button
                                        onClick={() =>
                                          handleApproveLabel("accept")
                                        }
                                        style={{
                                          padding: "2px 15px",
                                          margin: "0px 2px",
                                          backgroundColor: "green",
                                          color: "white",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Accept
                                      </button>
                                    )}
                                    <button
                                      disabled={false}
                                      onClick={() =>
                                        setRejectTogle(!rejectToggle)
                                      }
                                      style={{
                                        padding: "2px 15px",
                                        margin: "0px 2px",
                                        backgroundColor: "#CE5F5D",
                                        color: "white",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {rejectToggle ? "X" : "Reject"}
                                    </button>
                                  </div>
                                  {rejectToggle && (
                                    <>
                                      <textarea
                                        onChange={(e) =>
                                          setRejectDecsription(e.target.value)
                                        }
                                        style={{
                                          border: "1px solid lightGray",
                                          margin: "10px 6px",
                                          padding: "5px",
                                          minHeight: "100px",
                                          width: "97%",
                                        }}
                                        placeholder="Please include the reasons for rejection"
                                      ></textarea>
                                      <button
                                        onClick={() =>
                                          handleApproveLabel("reject")
                                        }
                                        disabled={false}
                                        style={{
                                          padding: "2px 15px",
                                          margin: "0 6px",
                                          backgroundColor: "#CE5F5D",
                                          color: "white",
                                          fontWeight: "600",
                                          width: "97%",
                                        }}
                                      >
                                        Continue
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      {userRole?.includes("Approver") &&
                        projectInfo?.status === "approved" && (
                          // send label to the releaser or release by approver it self if has role of release
                          <div className="card mb-3  p-2">
                            <div className="card-body p-1">
                              <p>Send the label to the Releaser.</p>
                              <select
                                onChange={(e) => setUser(e.target.value)}
                                style={{
                                  backgroundColor: "#021d41",
                                  padding: "6px 8px",
                                  color: "white",
                                  width: "100%",
                                }}
                                name=""
                                id=""
                              >
                                <option value="">-- select releaser --</option>
                                {allUsersCompany.map((user) => {
                                  return user.role.includes("Release") ? (
                                    <option value={user._id}>
                                      {user.firstName} {user.lastName}({" "}
                                      {user.role.join("-")} )
                                    </option>
                                  ) : null;
                                })}
                              </select>
                            </div>
                            <button
                              onClick={handlesendToRelaser}
                              style={{
                                padding: "2px 15px",
                                margin: "5px 4px",
                                backgroundColor: "green",
                                color: "white",
                                fontWeight: "600",
                              }}
                            >
                              Send
                            </button>
                          </div>
                        )}

                      {userRole?.includes("Release") &&
                        projectInfo?.status == "pending_release" && (
                          // releaser should release the label or reject the label
                          <div className="card mb-3 p-2">
                            <div className="card-body p-1">
                              <p>
                                Release the label or send it back if further
                                changes are needed.
                              </p>
                              {!rejectToggle && (
                                <button
                                  onClick={() => handleReleaseLabel("accept")}
                                  style={{
                                    padding: "2px 15px",
                                    margin: "0px 2px",
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                  }}
                                >
                                  Accept
                                </button>
                              )}
                              <button
                                disabled={false}
                                onClick={() => setRejectTogle(!rejectToggle)}
                                style={{
                                  padding: "2px 15px",
                                  margin: "0px 2px",
                                  backgroundColor: "#CE5F5D",
                                  color: "white",
                                  fontWeight: "600",
                                }}
                              >
                                {rejectToggle ? "X" : "Reject"}
                              </button>
                            </div>
                            {rejectToggle && (
                              <>
                                <textarea
                                  onChange={(e) =>
                                    setRejectDecsription(e.target.value)
                                  }
                                  style={{
                                    border: "1px solid lightGray",
                                    margin: "10px 6px",
                                    padding: "5px",
                                    minHeight: "100px",
                                  }}
                                  placeholder="Please include the reasons for rejection"
                                ></textarea>
                                <button
                                  onClick={() => handleReleaseLabel("reject")}
                                  disabled={false}
                                  style={{
                                    padding: "2px 15px",
                                    margin: "0 6px",
                                    backgroundColor: "#CE5F5D",
                                    color: "white",
                                    fontWeight: "600",
                                  }}
                                >
                                  Continue
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      <div className="card p-1">
                        <h6>Description :</h6>
                        {projectInfo && (
                          <p
                            style={{ fontSize: "14px" }}
                            className="label-info-description"
                          >
                            {projectInfo?.labelDescription}
                          </p>
                        )}
                      </div>
                      <div
                        className="mt-3"
                        style={{ display: "", gridGap: "10px" }}
                      >
                        <p
                          className="mb-1"
                          style={{
                            color: "gray",
                            fontSize: "14px",
                            fontWeight: "500",
                            margin: "0",
                          }}
                        >
                          {" "}
                          <CheckCircleOutlineIcon
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              color: "#08408B",
                              marginBottom: "1px",
                            }}
                          />
                          Version: {projectInfo?.labelVersion}
                        </p>
                        <p
                          className="mb-1"
                          style={{
                            color: "gray",
                            fontSize: "14px",
                            fontWeight: "500",
                            margin: "0",
                          }}
                        >
                          {" "}
                          <CheckCircleOutlineIcon
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              color: "#08408B",
                              marginBottom: "1px",
                            }}
                          />
                          Created By: {projectInfo?.createdBy?.lastName}{" "}
                          {projectInfo?.createdBy?.firstName}
                        </p>
                        {(projectInfo?.approvedBy?.lastName ||
                          projectInfo?.approvedBy?.firstName) && (
                          <p
                            className="mb-1"
                            style={{
                              color: "gray",
                              fontSize: "14px",
                              fontWeight: "500",
                              margin: "0",
                            }}
                          >
                            {" "}
                            <CheckCircleOutlineIcon
                              style={{
                                width: "20px",
                                marginRight: "5px",
                                color: "#08408B",
                                marginBottom: "1px",
                              }}
                            />
                            Approved By: {projectInfo?.approvedBy?.lastName}{" "}
                            {projectInfo?.approvedBy?.firstName}
                          </p>
                        )}
                        {(projectInfo?.releaseBy?.lastName ||
                          projectInfo?.releaseBy?.firstName) && (
                          <p
                            className="mb-1"
                            style={{
                              color: "gray",
                              fontSize: "14px",
                              fontWeight: "500",
                              margin: "0",
                            }}
                          >
                            {" "}
                            <CheckCircleOutlineIcon
                              style={{
                                width: "20px",
                                marginRight: "5px",
                                color: "#08408B",
                                marginBottom: "1px",
                              }}
                            />
                            Released By: {projectInfo?.releaseBy?.lastName}{" "}
                            {projectInfo?.releaseBy?.firstName}
                          </p>
                        )}
                      </div>
                      <div></div>
                    </div>

     
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // ----- rotation request -----
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
                width="90"
                visible={true}
              />
            </div>
          )}
        </div>
      </main>
      <div style={{ display: "none" }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100px" }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              textAlign: "center",
              width: "300px",
            }}
          >
            <svg
              style={{
                width: "100px",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
              id="gs1-barcode"
            ></svg>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              textAlign: "center",
              width: "300px",
            }}
          >
            <svg
              style={{
                width: "100px",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
              id="hibcc-barcode"
            ></svg>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              textAlign: "center",
              width: "300px",
            }}
          >
            <svg
              style={{
                width: "100px",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
              id="iccbba-barcode"
            ></svg>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              textAlign: "center",
              width: "300px",
            }}
          >
            <svg
              style={{
                width: "100px",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
              id="ifa-barcode"
            ></svg>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gridGap: "10px",
          }}
        >
          <div style={{ textAlign: "center", marginRight: "5px" }}>
            <svg id="gs1-barcode-udiDI"></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <svg id="gs1-barcode-udiPI"></svg>
          </div>
        </div>

        <img width={"100px"} src={imageSrc} alt={`data matrix from`} />
      </div>
    </div>
  );
};

export default ApproverReview;
