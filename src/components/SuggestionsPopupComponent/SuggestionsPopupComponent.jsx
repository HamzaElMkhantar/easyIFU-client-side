import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { generateLotNumberAction } from "../../redux/actions/labelActions";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const SuggestionsPopupComponent = (props) => {
  const { onSuggestionClick, handleClose, templateId } = props;

  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;

  const dispatch = useDispatch();
  const { generateLotNumber } = useSelector((state) => state);
  const {
    generateLotsRequest,
    generateLotsSuccess,
    generateLotsFail,
    generateLotsData,
  } = generateLotNumber;

  const [suggestions, setSuggestions] = useState(null);
  const [formData, setFormData] = useState({
    producerId: decodedToken?.userInfo?._id,
    companyId: decodedToken?.userInfo?.companyId,
    templateId,
    charCount: 5,
    numCount: 3,
    prefix: "",
  });

  useEffect(() => {
    dispatch(generateLotNumberAction(formData, token));
  }, []);

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion); // Call parent function with the suggestion
  };

  const handleCloseClick = () => {
    handleClose(false);
  };

  const handleGenerateLotNumber = (event) => {
    event.preventDefault();
    setSuggestions(null);
    dispatch(generateLotNumberAction(formData, token));
  };

  useEffect(() => {
    if (generateLotsSuccess) {
      setSuggestions(generateLotsData?.suggestions);
    }
    if (generateLotsFail) {
      setSuggestions([]);
      toast.warning(`${generateLotsFail.message}`);
    }
  }, [generateLotsSuccess, generateLotsFail, generateLotsData]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If prefix is entered, reset charCount, and vice versa
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "999",
        height: "400px",
      }}
    >
      <div className="card shadow-lg" style={{ width: "600px" }}>
        <div className="row g-0">
          {/* Left section for the suggestions */}
          <div className="col-md-6 bg-light p-3">
            <h5>Suggestions: {suggestions ? suggestions?.length : 0}</h5>
            <ul
              className="list-group"
              style={{ overflowY: "scroll", maxHeight: "300px" }}
            >
              {generateLotsRequest ? 
              <div style={{width:'100%', marginTop:'20%', display:'flex', justifyContent:'center'}}>
                <RotatingLines
                  strokeColor="#011d41"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
                  :
                  suggestions?.map((suggestion) => (
                <li
                  key={suggestion}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer" }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {/* Right section for the form */}
          <div className="col-md-6 p-4">
            <h5>Fill in Details</h5>
            <form>
              {
                <div className="mb-3">
                  <label htmlFor="charCount" className="form-label">
                    Number of characters(after the Prefix)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="charCount"
                    name="charCount"
                    value={formData.charCount}
                    onChange={handleInputChange}
                    placeholder="Enter character count"
                  />
                </div>
              }

              <div className="mb-3">
                <label htmlFor="numCount" className="form-label">
                  Number of digits
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="numCount"
                  name="numCount"
                  value={formData.numCount}
                  onChange={handleInputChange}
                  placeholder="Enter number count"
                />
              </div>

              {
                <div className="mb-3">
                  <label htmlFor="prefix" className="form-label">
                    Prefix
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="prefix"
                    name="prefix"
                    value={formData.prefix}
                    onChange={handleInputChange}
                    placeholder="Optional prefix"
                  />
                </div>
              }

              <div
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                }}
                className="d-flex align-items-center"
              >

                  <button
                    onClick={(event) => handleGenerateLotNumber(event)}
                    style={{
                      padding: "2px 8px",
                      backgroundColor: "#062D60",
                      color: "#fff",
                      fontWeight: "600",
                      opacity: generateLotsRequest ? 0.5 : 1
                    }}
                    disabled={generateLotsRequest}
                  >
                    Generate
                  </button>
                <button
                  onClick={() => handleCloseClick()}
                  style={{
                    padding: "2px 8px",
                    backgroundColor: "#062D60",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPopupComponent;
