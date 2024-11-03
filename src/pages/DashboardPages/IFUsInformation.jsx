import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import lottieLoader from "../../assets/lotties/lottieLoader.json";
import Lottie from "lottie-react";
import { getIFUAction, sendToApproverAction } from "../../redux/actions/IFUsActions";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UsersListModal from "../../components/usersListModal/UsersListModal";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import CheckListTable from "../../components/checklistTable/CheckListTable";
import EditIcon from '@mui/icons-material/Edit';
import QRCodeHandler from "../../components/QRCodeHandler/QRCodeHandler";
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const IFUsInformation = () => {
  const { IFUId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const { ifuRequest, ifuSuccess, ifuFail, ifuData } = useSelector(
    (state) => state.getOneIFU
  );
  const { approverRequest, approverSuccess, approverFail, sendToApprover } = useSelector(
    (state) => state.sendIFUsToApprover
  );

  const [receiverInfo, setReceiverInfo] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [instruction, setInstruction] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState({
    token,
    senderId: decodedToken?.userInfo?._id,
    receivedId: "",
    companyId: decodedToken?.userInfo?.companyId,
    ifuId: IFUId,
  });

  const dispatch = useDispatch();
  const data = {
    token,
    createdBy: decodedToken?.userInfo?._id,
    companyId: decodedToken?.userInfo?.companyId,
    ifuId: IFUId,
  };
  
  useEffect(() => {
    dispatch(getIFUAction(data));
    return () => {
      if (pdfFile) {
        URL.revokeObjectURL(pdfFile);
      }
    };
  }, []);

  useEffect(() => {
    if (ifuSuccess) {
      setInstruction(ifuData.ifuData);
      setPdfFile(ifuData.pdfData);
    }
    if (ifuFail) {
      toast.info(`${ifuFail.message}`);
    }
    if (approverFail) {
      Swal.fire({
        title: "Something Wrong!",
        text: `${approverFail?.message}`,
        icon: "warning",
        customClass: {
          popup: "custom-swal-bg",
          confirmButton: "custom-swal-button",
          icon: "custom-swal-icon",
        },
      })
      .finally(() => {
        setFormData({ ...formData, receivedId: "" });
        setReceiverInfo(null);
      });
    }
    if (approverSuccess) {
      Swal.fire({
        title: `${sendToApprover?.message}`,
        icon: "success", //sendToApprover,
        customClass: {
          popup: "custom-swal-bg",
          confirmButton: "custom-swal-button",
          icon: "custom-swal-icon",
        },
      });
    }
  }, [
    ifuSuccess,
    ifuFail,
    ifuData,
    approverSuccess,
    approverFail,
    sendToApprover,
  ]);



  const handlePopupToggle = (status) => {
    setIsPopupOpen(status);
  };

  const handleUserClick = (user) => {
    setFormData({ ...formData, receivedId: user._id });
    setReceiverInfo(user)
    setIsPopupOpen(false);
  };

  const handleSend = () => {
    dispatch(sendToApproverAction(formData));
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left Section - PDF Viewer */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Shadow effect
        }}
      >
        {pdfFile ? (
          <iframe
            src={`${pdfFile}#zoom=90`}
            width="100%"
            height="100%"
            style={{
              border: "none",
              backgroundColor: "transparent !important",
            }}
            title="PDF Viewer"
          />
        ) : (
          <p>No PDF selected</p>
        )}
      </div>

      {/* Right Section - Form */}
      <div
        style={{
          flex: 1,
          padding: "0px",
          justifyContent: "center",
          height: "100dvh",
          overflowY: "scroll",
        }}
      >
        <div
          className="mt-3 p-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to={`/dashboard/IFUs/${instruction?.IFUsContainerId}`}
            style={{
              backgroundColor: "#062D60",
              padding: "0px 10px 1px",
              borderRadius: "2px",
            }}
          >
            <KeyboardBackspaceIcon
              style={{ fontSize: "25px", color: "#DEE3E8" }}
            />
          </Link>
          <h5>{instruction?.IFUName}</h5>
          <div></div>
        </div>

        {/* Form with distributor fields and radio buttons */}
        {ifuRequest ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "81%",
            }}
          >
            <Lottie animationData={lottieLoader} style={{ width: "80%" }} />
          </div>
        ) : (
          <>
            <div className="ifu-information px-4">
              <div className="px-1">
                <h6>Description :</h6>
                {instruction && (
                  <p
                    style={{ fontSize: "14px" }}
                    className="label-info-description"
                  >
                    {instruction?.IFUDescription}
                  </p>
                )}
              </div>
              <div className="row mt-3 md-12">
                <div
                  className="col-md-6"
                  style={{
                    display: "",
                    gridGap: "10px",
                    backgroundColor: "",
                  }}
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
                    Language: {instruction?.language}
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
                    Version: {instruction?.ifuVersion}
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
                    Status: {instruction?.status}
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
                    Created By: {instruction?.createdBy?.lastName}{" "}
                    {instruction?.createdBy?.firstName}
                  </p>
                  {(instruction?.approvedBy?.lastName ||
                    instruction?.approvedBy?.firstName) && (
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
                      Approved By: {instruction?.approvedBy?.lastName}{" "}
                      {instruction?.approvedBy?.firstName}
                    </p>
                  )}
                  {(instruction?.releaseBy?.lastName ||
                    instruction?.releaseBy?.firstName) && (
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
                      Released By: {instruction?.releaseBy?.lastName}{" "}
                      {instruction?.releaseBy?.firstName}
                    </p>
                  )}
                </div>
                {instruction?.status === "published" &&<div className="col-md-6">
                  <QRCodeHandler IFUId={IFUId} size={100} /> <br />
                  <Link style={{color:'#001E43', fontWeight:'600'}} to={`https://www.easyifu.com/p-eIFU/${IFUId}`}> <InsertLinkIcon style={{color:'#ECF0F3', fontSize:'25px', backgroundColor:'#001E43', borderRadius:'5px', padding:'2px'}}/>: https://www.easyifu.com/p-eIFU/{IFUId}
                  </Link>
                </div>}
              </div>
              <CheckListTable checkList={instruction?.checkList} />

              {instruction?.status === "Draft" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={
                        formData.receivedId === ""
                          ? () => setIsPopupOpen(true)
                          : handleSend
                      }
                      style={{
                        backgroundColor: "#062D60",
                        width: "80%",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        marginTop: "15px",
                        color: "#FEFEFE",
                        fontSize: "18px",
                        fontWeight: "600",
                        height: "35px",
                      }}
                      disabled={approverRequest}
                    >
                      {formData.receivedId === "" ? (
                        "choose user"
                      ) : approverRequest ? (
                        <RotatingLines
                          strokeColor="#ffffff"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="20"
                          visible={true}
                        />
                      ) : (
                        "Send"
                      )}
                    </button>
                    <Link
                      to={`/dashboard/Instructions-for-use-update/${IFUId}`}
                      style={{
                        backgroundColor: "#066F05",
                        width: "40px",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        marginTop: "15px",
                        color: "#FEFEFE",
                        fontSize: "18px",
                        fontWeight: "600",
                        height: "35px",
                      }}
                    >
                      {" "}
                      <EditIcon />
                    </Link>
                  </div>
                  <p
                    style={{
                      marginTop: "10px",
                      color: "gray",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {receiverInfo &&
                      "Received: " +
                        receiverInfo.firstName +
                        " " +
                        receiverInfo.lastName}
                    <br />
                    <span
                      style={{
                        color: "gray",
                        fontSize: "12px",
                      }}
                    >
                      {receiverInfo?.role?.join(", ")}
                    </span>
                  </p>
                </>
              )}
            </div>
            {isPopupOpen && (
              <UsersListModal
                onUserClick={handleUserClick}
                handleClose={handlePopupToggle}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IFUsInformation;
