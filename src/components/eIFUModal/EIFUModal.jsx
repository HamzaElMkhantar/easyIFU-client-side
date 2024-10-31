import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { findAllIFUsAction } from "../../redux/actions/IFUsActions";

const EIFUModal = ({ onLinkClick, handleClose }) => {
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [eIFUs, setEIFUs] = useState([]);
  const {
    findAllIFUsRequest,
    findAllIFUsSuccess,
    findAllIFUsFail,
    findAllIFUsData,
  } = useSelector((state) => state.findAllIFUs);

  const companyId = decodedToken?.userInfo?.companyId;
  useEffect(() => {
    dispatch(findAllIFUsAction(companyId, token));
  }, []);


  useEffect(() => {
    if (findAllIFUsSuccess) {
      setEIFUs(findAllIFUsData);
    }

    if (findAllIFUsFail) {
      setError(findAllIFUsFail?.message);
    }
  }, [findAllIFUsSuccess, findAllIFUsFail]);

  const handleUsersClick = (id) => {
    onLinkClick(`https://www.easyifu.com/p-eIFU/${id}`);
  };
  const handleCloseClick = () => {
    handleClose(false);
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
      <div
        className="card shadow-lg"
        style={{ width: "60%", height: "450px" }}
      >
        <div className="p-4" style={{ width: "100%", height: "400px" }}>
          <h5>eIFUs:</h5>
          <ul
            className="list-group"
            style={{ overflowY: "scroll", maxHeight: "300px" }}
          >
            {findAllIFUsRequest ? (
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
                eIFUs?.map((el) => (
                <li
                  key={el._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleUsersClick(el._id)}
                  style={{ cursor: "pointer" }}
                >
                  {el.IFUName}
                  <br />
                  <p style={{
                color: "gray",
                fontSize: "12px",
                marginTop:'-3px',
                marginBottom:'-3px',

              }}>{el?.language}</p>
                </li>
              ))
            )}
          </ul>

          <div className="d-flex justify-content-end mt-3"></div>
        </div>
        <span
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
            cursor: "pointer",
          }}
        >
          Close
        </span>
      </div>
    </div>
  );
};

export default EIFUModal
