import React, { useEffect, useLayoutEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { createIFUAction } from "../../redux/actions/IFUsActions";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CountriesList from "../../components/CountriesList/CountriesList";
import { findCompanyChecklistAction } from "../../redux/actions/checklistActions";
import lottieLoader from "../../assets/lotties/lottieLoader.json";
import Lottie from "lottie-react";
const CreateInstructions = () => {
  const { IFUsContainerId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const [checklist, setChecklist] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [formData, setFormData] = useState({
    createdBy: decodedToken?.userInfo?._id,
    companyId: decodedToken?.userInfo?.companyId,
    IFUsContainerId: IFUsContainerId,
    IFUName: "",
    IFUDescription: "",
    language: "Global",
  });

  const { ifuRequest, ifuSuccess, ifuFail } = useSelector(
    (state) => state.createIFU
  );

  const {
    findCompanyChecklistRequest,
    findCompanyChecklistSuccess,
    findCompanyChecklistFail,
    companyChecklist,
  } = useSelector((state) => state.findCompanyChecklist);

  const dispatch = useDispatch();
  useEffect(() => {
    if (ifuSuccess) {
      toast.success("IFU created successfully.");

      setFormData({
        createdBy: decodedToken?.userInfo?._id,
        companyId: decodedToken?.userInfo?.companyId,
        IFUsContainerId: IFUsContainerId,
        IFUName: "",
        IFUDescription: "",
        language: "",
      });

      setFileData(null);
      setPdfFile(null);
    }
    if (ifuFail) {
      toast.error(`${ifuFail.message}`);
    }
  }, [ifuSuccess, ifuFail]);

  useEffect(() => {
    if (!checklist) {
      dispatch(
        findCompanyChecklistAction(decodedToken?.userInfo?.companyId, token)
      );
    }
  }, []);

  useEffect(() => {
    if (findCompanyChecklistSuccess) {
      setChecklist(companyChecklist);
    }
    if (findCompanyChecklistFail) {
      setChecklist([]);
    }
  }, [findCompanyChecklistSuccess, findCompanyChecklistFail]);
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

  const [checklistData, setChecklistData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChecklist = (e, questionId) => {
    const { value } = e.target;

    // Reset error if the user selects an option
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: false }));

    // Update the state to include the questionId and the selected value
    setChecklistData((prevChecklistData) => {
      const existingEntryIndex = prevChecklistData.findIndex(
        (entry) => entry.questionId === questionId
      );

      if (existingEntryIndex !== -1) {
        // Update the existing answer for this question
        const updatedChecklistData = [...prevChecklistData];
        updatedChecklistData[existingEntryIndex] = {
          questionId,
          answer: value,
        };
        return updatedChecklistData;
      } else {
        // Add new answer entry for the question
        return [...prevChecklistData, { questionId, answer: value }];
      }
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    checklist.forEach((item) => {
      const foundAnswer = checklistData.find(
        (entry) => entry.questionId === item._id
      );
      if (!foundAnswer) {
        valid = false;
        newErrors[item._id] = true; // Mark as error
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      console.log("Form Submitted:", checklistData);
      // Submit your form here (e.g., send to an API or backend) checklistData

      const formSubmissionData = new FormData();
      formSubmissionData.append("companyId", formData.companyId);
      formSubmissionData.append("createdBy", formData.createdBy);
      formSubmissionData.append("IFUsContainerId", IFUsContainerId);
      formSubmissionData.append("IFUName", formData.IFUName);
      formSubmissionData.append("IFUDescription", formData.IFUDescription);
      formSubmissionData.append("language", formData.language);
      formSubmissionData.append("file", fileData);
      formSubmissionData.append("checklistData", JSON.stringify(checklistData));

      // Dispatch the action to your Redux store
      dispatch(createIFUAction(formSubmissionData, token));
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
            to={`/dashboard/IFUs/${IFUsContainerId}`}
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
                  ? "File Selected: " + fileData.name
                  : "Drag & Drop your PDF here or Click to Upload"}
              </label>
            </div>
            <div className="form-outline mb-2 mt-3">
              <label className="form-label" htmlFor="IFUName">
                Name:
              </label>
              <input
                type="text"
                id="IFUName"
                className="form-control"
                name="IFUName"
                value={formData.IFUName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-3 mt-3">
              <label className="form-label" htmlFor="IFUDescription">
                Description:
              </label>
              <textarea
                type="text"
                id="IFUDescription"
                className="form-control"
                name="IFUDescription"
                value={formData.IFUDescription}
                required
                onChange={handleInputChange}
              />
            </div>

            <button
              type="button"
              style={{
                // cursor: "pointer",
                padding: "2px 15px",
                backgroundColor: "#062D60",
                color: "#ECF0F3",
                width: "140px",
              }}
              onClick={(event) => {
                event.preventDefault();
                handlePopupToggle(true);
              }}
            >
              Select Langue
            </button>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="IFUDescription">
                language selected :
              </label>
              <input
                type="text"
                id="IFUDescription"
                className="form-control"
                name="IFUDescription"
                value={formData.language}
                disabled
                required
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
              <div key={itm._id} className="mb-3">
                <div>
                  <label style={{ fontWeight: "500" }}>
                    {index + 1}- {itm.question}
                  </label>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      className="form-check-label"
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name={`question-${itm._id}`} // Unique name per question
                        value="true"
                        checked={
                          checklistData.find(
                            (entry) => entry.questionId === itm._id
                          )?.answer === "true"
                        }
                        onChange={(e) => handleChecklist(e, itm._id)}
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
                        name={`question-${itm._id}`}
                        value="false"
                        checked={
                          checklistData.find(
                            (entry) => entry.questionId === itm._id
                          )?.answer === "false"
                        }
                        onChange={(e) => handleChecklist(e, itm._id)}
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
                        name={`question-${itm._id}`}
                        value="not_applicable"
                        checked={
                          checklistData.find(
                            (entry) => entry.questionId === itm._id
                          )?.answer === "not_applicable"
                        }
                        onChange={(e) => handleChecklist(e, itm._id)}
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
              disabled={ifuRequest}
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
              {ifuRequest ? (
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

export default CreateInstructions;
