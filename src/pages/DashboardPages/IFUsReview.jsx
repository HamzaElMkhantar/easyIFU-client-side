import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import lottieLoader from "../../assets/lotties/lottieLoader.json";
import Lottie from "lottie-react";
import { approveIFUAction, getIFUAction, releaseIFUAction, sendToApproverAction, sendToReleaserAction } from "../../redux/actions/IFUsActions";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UsersListModal from "../../components/usersListModal/UsersListModal";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import CheckListTable from "../../components/checklistTable/CheckListTable";
import { usersCompanyAction } from "../../redux/actions/userActions";

const IFUsReview = () => {
  const { IFUId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  let userRole = decodedToken?.userInfo?.role;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ifuRequest, ifuSuccess, ifuFail, ifuData } = useSelector(
    (state) => state.getOneIFU
  );
  const {
    sendIFUsToApprover,
    approveIFU,
    sendIFUToReleaser,
    releaseIFU,
    usersCompany,
  } = useSelector((state) => state);

  const {
    usersCompanyRequest,
    usersCompanySuccess,
    usersCompanyFail,
    allUsers,
  } = usersCompany;

  const { approverRequest, approverSuccess, approverFail, sendToApprover } =
    sendIFUsToApprover;
  const { approveRequest, approveSuccess, approveFail, approvedIfu } =
    approveIFU;
  const { releaserRequest, releaserSuccess, releaserFail, sendToRelease } =
  sendIFUToReleaser;
  const { releaseIFURequest, releaseIFUSuccess, releaseIFUFail, releasedIfu } =
    releaseIFU;

    const data = {
      token,
      companyId: decodedToken?.userInfo?.companyId,
      ifuId: IFUId,
    };
    useEffect(() => {
      if(approveSuccess){
        toast.success('IFU approved successfully');
        dispatch(getIFUAction(data));
      }
      if(releaserSuccess){
        toast.success('IFU sent to releaser successfully');
        navigate('/dashboard/received-ifu')
      }
      if(releaseIFUSuccess){
        toast.success('IFU Published');
        navigate('/dashboard/received-ifu')
      }

      if(approveFail){
        toast.error(approveFail.message);
      }
      if(releaserFail){
        toast.error(releaserFail.message);
      }
      if(releaseIFUFail){
        toast.error(releaseIFUFail.message);
      }

    }, [approveSuccess, approveFail, releaserSuccess, releaserFail, releaseIFUSuccess, releaseIFUFail ])


  const [rejectToggle, setRejectTogle] = useState(false);
  const [allUsersCompany, setAllUsersCompany] = useState([]);
  const [user, setUser] = useState(null);
  const [rejectDecsription, setRejectDecsription] = useState(null);


  const [rejectedComment, setRejectedComment] = useState(null);
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [instruction, setInstruction] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState({
    senderId: decodedToken?.userInfo?._id,
    receivedId: "",
    companyId: decodedToken?.userInfo?.companyId,
    ifuId: IFUId,
    comment: '',
  });

  
  useEffect(() => {
    dispatch(
      usersCompanyAction(
        {
          _id: decodedToken?.userInfo?._id,
          companyId: decodedToken?.userInfo?.companyId,
        },
        token
      ))

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
    if (usersCompanySuccess) {
      setAllUsersCompany(allUsers);
    }

    if (ifuFail) {
      toast.info(`${ifuFail.message}`);
    }

  }, [
    ifuSuccess,
    ifuFail,
    ifuData,
    usersCompanySuccess
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

  const handleApproveIFU = (action) => {
    const data = {
      userId: decodedToken?.userInfo?._id,
      ifuId: IFUId,
      comment: rejectedComment,
      action,
    };

    dispatch(approveIFUAction(data, token));
  }

  const handleSendToPublisher = () => {
    const data = {
      ifuId: IFUId,
      userId: user,
      senderId: decodedToken?.userInfo?._id,
    }; 
    dispatch(sendToReleaserAction(data, token))
  }

  const handleReleaseIFU = (action) => { 
    const data = {
      userId: decodedToken?.userInfo?._id,
      ifuId: IFUId,
      comment: rejectedComment,
      action,
    };
    dispatch(releaseIFUAction(data, token));

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
            to={`/dashboard/received-ifu`}
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
        <div className="mx-4" style={{ border: "0" }}>
          {userRole?.includes("Approver") &&
            instruction?.status === "pending to approve" && (
              <div style={{ border: "0" }} className="card mb-3 p-2">
                <p>You may accept or reject it</p>
                <div className="card-body p-1">
                  {approveRequest && (
                    <div>
                      <RotatingLines
                        strokeColor="#011d41"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="30"
                        visible={true}
                      />
                    </div>
                  )}
                  {!approveRequest && (
                    <>
                      <div>
                        {!rejectToggle && (
                          <button
                            onClick={() => handleApproveIFU("accept")}
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
                              width: "97%",
                            }}
                            placeholder="Please include the reasons for rejection"
                          ></textarea>
                          <button
                            onClick={() => handleApproveIFU("reject")}
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
            instruction?.status === "approved" && (
              // send label to the releaser or release by approver it self if has role of release
              <div style={{ border: "0" }} className="card mb-3  p-2">
                <div className="card-body p-1">
                  <p>Send the eIFU to the Publisher.</p>
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
                  onClick={handleSendToPublisher}
                  style={{
                    padding: "2px 15px",
                    margin: "5px 4px",
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                  }}
                  disabled={releaserRequest}
                >
                  {releaserRequest ? (
                    <RotatingLines
                      strokeColor="#011d41"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="25"
                      visible={true}
                    />
                  ) : (
                    "Send to Publisher"
                  )}
                </button>
              </div>
            )}

          {userRole?.includes("Release") &&
            instruction?.status === "pending to publish" && (
              // releaser should release the label or reject the label
              <div style={{ border: "0" }} className="card mb-3 p-2">
                <div className="card-body p-1">
                  <p>
                    Publish the eIFU or send it back if further changes are
                    needed.
                  </p>
                  {!rejectToggle && (
                    <button
                      onClick={() => handleReleaseIFU("accept")}
                      style={{
                        padding: "2px 15px",
                        margin: "0px 2px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      {releaseIFURequest ? (
                        <RotatingLines
                          strokeColor="#011d41"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="25"
                          visible={true}
                        />
                      ) : (
                        "Accept"
                      )}
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
                      onClick={() => handleReleaseIFU("reject")}
                      disabled={releaseIFURequest}
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
        </div>
        {instruction?.status === "published" && (
              // releaser should release the label or reject the label
              <div style={{ border: "0", backgroundColor:'#1B9200' }} className="card mb-3 mx-4 p-2 pb-0">
                <div className="card-body  p-1">
                  <h5 style={{color:'#fff'}}>
                    this eIFU is publish
                  </h5>
                </div>
              </div>
            )}

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
              <div className="mt-3" style={{ display: "", gridGap: "10px" }}>
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
              <CheckListTable checkList={instruction?.checkList} />

              {instruction?.status === "Draft" && (
                <>
                  <button
                    onClick={
                      formData.receivedId === ""
                        ? () => setIsPopupOpen(true)
                        : handleSend
                    }
                    style={{
                      backgroundColor: "#062D60",
                      width: "100%",
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


export default IFUsReview