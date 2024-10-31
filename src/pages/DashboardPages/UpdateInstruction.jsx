import React, { useEffect, useLayoutEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { createIFUAction, getIFUAction, updateIFUAction } from "../../redux/actions/IFUsActions";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CountriesList from "../../components/CountriesList/CountriesList";
import { findCompanyChecklistAction } from "../../redux/actions/checklistActions";
import lottieLoader from "../../assets/lotties/lottieLoader.json";
import Lottie from "lottie-react";
const UpdateInstruction = () => {
  const { ifuId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const [checklistData, setChecklistData] = useState([]);
  const [errors, setErrors] = useState({});

  const [instruction, setInstruction] = useState(null);
  const [checklist, setChecklist] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [formData, setFormData] = useState({
    createdBy: decodedToken?.userInfo?._id,
    companyId: decodedToken?.userInfo?.companyId,
    ifuId: ifuId,
    IFUName: "",
    IFUDescription: "",
    language: "Global",
  });

  const { getOneIFU, updateIFU } = useSelector(
    (state) => state
  );

  const { ifuRequest, ifuSuccess, ifuFail, ifuData } = getOneIFU;
  const { updateIFURequest, updateIFUSuccess, updateIFUFail, updateIfu } = updateIFU;

  const {
    findCompanyChecklistRequest,
    findCompanyChecklistSuccess,
    findCompanyChecklistFail,
    companyChecklist,
  } = useSelector((state) => state.findCompanyChecklist);


  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (ifuSuccess) {
      setInstruction(ifuData?.ifuData);
      setPdfFile(ifuData?.pdfData);
      setChecklist(ifuData?.ifuData?.checkList);

      setChecklistData(
        ifuData?.ifuData?.checkList?.map((el) => ({
          questionId: el.questionId?._id,
          answer: el.answer,
        }))
      );
    }
    if (ifuFail) {
      toast.info(`${ifuFail.message}`);
    }

  }, [ifuSuccess, ifuFail, ifuData]);
  useEffect(() => {
    if (updateIFUSuccess) {
      const data = {
        token,
        createdBy: decodedToken?.userInfo?._id,
        companyId: decodedToken?.userInfo?.companyId,
        ifuId: ifuId,
      };
      toast.info(`${updateIfu.message}`);
      dispatch(getIFUAction(data));
      navigate(`/dashboard/Instructions-for-use/info/${ifuId}`)
    }

    if (updateIFUFail) {
      toast.info(`${updateIFUFail.message}`);
    }
  }, [updateIFUSuccess, updateIFUFail])

  useEffect(() => {
    const data = {
        token,
        createdBy: decodedToken?.userInfo?._id,
        companyId: decodedToken?.userInfo?.companyId,
        ifuId: ifuId,
      };
    if (!checklist) {
      dispatch(
        findCompanyChecklistAction(decodedToken?.userInfo?.companyId, token)
      );
    }

    dispatch(getIFUAction(data));
    return () => {
      if (pdfFile) {
        URL.revokeObjectURL(pdfFile);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileData(file);
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Please select a valid PDF file.");
      setPdfFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle when a country is clicked in the child component
  const handleCountryClick = (country) => {
    setFormData({ ...formData, language: country.langName });
    setIsPopupOpen(false); // Close the popup
  };

  // Toggle the popup visibility
  const handlePopupToggle = (status) => {
    setIsPopupOpen(status);
  };

  const handleChecklist = (e, questionId) => {
    const { value } = e.target;
  
    // Reset error if the user selects an option
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: false }));
  
    // Update `checklist` by finding the corresponding question and updating its answer
    setChecklist((prevChecklist) =>
      prevChecklist.map((el) =>
        el.questionId._id === questionId ? { ...el, answer: value } : el
      )
    );
  
    // Update `checklistData` to ensure it only contains `questionId` and `answer` fields
    setChecklistData((prevChecklistData) => {
      const existingEntryIndex = prevChecklistData.findIndex(
        (entry) => entry.questionId === questionId
      );
      console.log(e.target.name)
      console.log(questionId)
      console.log(prevChecklistData)
  
      if (existingEntryIndex !== -1) {
        // Update the answer for the existing entry
        return prevChecklistData.map((entry) =>
          entry.questionId === questionId ? { ...entry, answer: value } : entry
        );
      } else {
        // Add a new entry if it doesn't exist
        return [...prevChecklistData, { questionId, answer: value }];
      }
    });
  };
  
  

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    checklist.forEach((item) => {
      const foundAnswer = checklistData.find(
        (entry) => entry.questionId === item.questionId._id
      );
      if (!foundAnswer) {
        valid = false;
        newErrors[item._id] = true; // Mark as error
      }
    });

    setErrors(newErrors);
    return valid;
    // return  true; 
  };

  console.log({checklistData})
  console.log({checklist})

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    // console.log("Form Submitted:", checklistData);
    // Submit your form here (e.g., send to an API or backend) checklistData
    if (validateForm()) {

    const formSubmissionData = new FormData();
    formSubmissionData.append("companyId", formData.companyId);
    formSubmissionData.append("ifuId", ifuId);
    formSubmissionData.append("file", fileData);
    formSubmissionData.append("checklistData", JSON.stringify(checklistData));

    // Dispatch the action to your Redux store
    dispatch(updateIFUAction(formSubmissionData, token));
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {isPopupOpen && (
        <CountriesList
          onCountryClick={handleCountryClick}
          handleClose={handlePopupToggle}
        />
      )}

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
        <div className="mt-3 p-3">
          <Link
            to={`/dashboard/IFUs/${instruction?.IFUsContainerId}`}
            style={{
              backgroundColor: "#062D60",
              padding: "2px 10px 5px",
              borderRadius: "2px",
            }}
          >
            <KeyboardBackspaceIcon
              style={{ fontSize: "25px", color: "#DEE3E8" }}
            />
          </Link>
        </div>

        {/* Form with distributor fields and radio buttons */}
        {findCompanyChecklistRequest ? (
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
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "30px", width: "85%", margin: "auto" }}
            encType="multipart/form-data"
          >
            <h5 style={{ fontSize: "22px", marginTop: "", marginLeft: "" }}>
              Instruction for use Form:
            </h5>
            <div>
              <input
                id="file-upload"
                style={{ display: "none" }} // Hide the actual file input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload" // Associate label with input
                style={{
                  border: "2px dashed #007bff",
                  borderRadius: "5px",
                  padding: "20px",
                  textAlign: "center",
                  margin: "20px 0",
                  width: "100%",
                  cursor: "pointer", // Change cursor to pointer
                  display: "inline-block",
                }}
              >
                {pdfFile
                  ? "File Selected: " + instruction?.IFUName
                  : "Drag & Drop your PDF here or Click to Upload"}
              </label>
            </div>
            <div className="form-outline mb-2 mt-3">
              <label className="form-label" htmlFor="IFUName">
                Name:
              </label>
              <input
                disabled
                type="text"
                id="IFUName"
                className="form-control"
                name="IFUName"
                value={instruction?.IFUName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-3 mt-3">
              <label className="form-label" htmlFor="IFUDescription">
                Description:
              </label>
              <textarea
                disabled
                type="text"
                id="IFUDescription"
                className="form-control"
                name="IFUDescription"
                value={instruction?.IFUDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="IFUDescription">
                language selected :
              </label>
              <input
                type="text"
                id="IFUDescription"
                className="form-control"
                name="IFUDescription"
                value={instruction?.language}
                disabled
                
              />
            </div>

            {/* Radio questions */}
            <h5
              className="my-3"
              style={{ fontSize: "22px", marginTop: "20px" }}
            >
              Checklist:
            </h5>
            {checklist?.map((itm, index) => (
              itm.questionId?.question &&<div key={itm._id} className="mb-3">
                <div>
                  <label style={{ fontWeight: "500" }}>
                    {index + 1}- {itm.questionId?.question}
                  </label>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      className="form-check-label"
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name={`question-${itm.questionId?._id}`}
                        value="true"
                        checked={checklistData?.find(
                            (entry) => entry.questionId === itm.questionId?._id
                          )?.answer === "true"
                        }
                        onChange={(e) => handleChecklist(e, itm.questionId?._id)}
                      />
                      True
                    </label>
                    <label
                      style={{ fontSize: "14px" }}
                      className="form-check-label"
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name={`question-${itm.questionId?._id}`}
                        value="false"
                        checked={checklistData?.find(
                            (entry) => entry.questionId === itm.questionId?._id
                          )?.answer === "false"
                        }
                        onChange={(e) => handleChecklist(e, itm.questionId?._id)}
                      />
                      False
                    </label>
                    <label
                      style={{ fontSize: "14px" }}
                      className="form-check-label"
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name={`question-${itm.questionId?._id}`}
                        value="not_applicable"
                        checked={checklistData?.find(
                            (entry) => entry.questionId === itm.questionId?._id
                          )?.answer === "not_applicable"
                        }
                        onChange={(e) => handleChecklist(e, itm.questionId?._id)}
                      />
                      Not Applicable
                    </label>

                    {/* Show validation error if question is unanswered */}
                    {errors[itm._id] && (
                      <div style={{ color: "red" }}>
                        This question is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              disabled={updateIFURequest}
              style={{
                width: "100%",
                backgroundColor: "#08408b",
                border: "0",
                fontSize: "18px",
                borderRadius: "2px",
              }}
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 mt-4"
              type="submit"
            >
              {updateIFURequest ? (
                <div>
                  <RotatingLines
                    strokeColor="#FFFFFF"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  />
                </div>
              ) : (
                "save instruction"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateInstruction