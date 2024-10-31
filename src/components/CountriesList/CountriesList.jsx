import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { getCountryAction } from "../../redux/actions/countryActions";
import { toast } from "react-toastify";

const CountriesList = ({ onCountryClick, handleClose }) => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  const token = Cookies.get("eIfu_ATK") || null;

  const {
    getCountryRequest,
    getCountrySuccess,
    getCountryFail,
    getCountryData,
  } = useSelector((state) => state.countries);
  console.log({
    getCountryRequest,
    getCountrySuccess,
    getCountryFail,
    getCountryData,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountryAction(countryName, token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountryAction(countryName, token));
  }, [dispatch, countryName]);

  // Handle clicking on a country
  const handleCountryClick = (country) => {
    onCountryClick(country);
  };

  const handleCloseClick = () => {
    handleClose(false);
  };

  useEffect(() => {
    if (getCountrySuccess) {
      setCountries(getCountryData);
    }
    if (getCountryFail) {
      toast.info(`${getCountryFail.message}`);
    }
  }, [getCountrySuccess, getCountryFail]);

  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "999",
        height: "400px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{ width: "400px", height: "450px" }}
      >
        <div className="p-4" style={{ width: "400px", height: "400px" }}>
          <label htmlFor="" className="mb-2" style={{ width: "100%" }}>
            <input
              onChange={(e) => setCountryName(e.target.value)}
              type="text"
              placeholder="search"
              className="px-2"
              style={{
                border: "1px solid lightgray",
                width: "100%",
                borderRadius: "5px",
                height: "40px",
              }}
            />
          </label>
          <h5>Langues:</h5>
          <ul
            className="list-group"
            style={{ overflowY: "scroll", maxHeight: "300px" }}
          >
            {getCountryRequest ? (
              <div
                style={{
                  width: "100%",
                  marginTop: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RotatingLines
                  strokeColor="#011d41"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            ) : (
              countries?.map((country) => (
                <li
                  key={country._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleCountryClick(country)}
                  style={{ cursor: "pointer" }}
                >
                  {country.langName}
                </li>
              ))
            )}
          </ul>

          <div className="d-flex justify-content-end mt-3"></div>
        </div>
        <button
          onClick={handleCloseClick}
          style={{
            padding: "5px 10px",
            backgroundColor: "#062D60",
            color: "#fff",
            fontWeight: "600",
            width: "70px",
            marginLeft: "auto",
            marginRight: "5%",
            borderRadius: "2px",
            marginTop: "10px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CountriesList;
