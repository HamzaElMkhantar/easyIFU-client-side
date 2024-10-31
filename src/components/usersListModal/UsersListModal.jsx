import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { getCountryAction } from "../../redux/actions/countryActions";
import { toast } from "react-toastify";
import { usersCompanyAction } from "../../redux/actions/userActions";

const UsersListModal = ({ onUserClick, handleClose, users }) => {
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [companyUsers, setCompanyUsers] = useState([]);
  const {
    usersCompanyRequest,
    usersCompanySuccess,
    usersCompanyFail,
    allUsers,
  } = useSelector((state) => state.usersCompany);

  const userData = {
    _id: decodedToken?.userInfo?._id,
    companyId: decodedToken?.userInfo?.companyId,
  };
  useEffect(() => {
    dispatch(usersCompanyAction(userData, token));   
  }, []);

  useEffect(() => {

    if (usersCompanySuccess) {
      setCompanyUsers(allUsers);
    }

    if (usersCompanyFail) {
        setError(usersCompanyFail?.message);
      }
  }, [usersCompanySuccess, allUsers, usersCompanyFail]);

  const handleUsersClick = (user) => {
    onUserClick(user);
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
        style={{ width: "400px", height: "450px" }}
      >
        <div className="p-4" style={{ width: "400px", height: "400px" }}>
          <h5>users:</h5>
          <ul
            className="list-group"
            style={{ overflowY: "scroll", maxHeight: "300px" }}
          >
            {usersCompanyRequest ? (
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
                companyUsers?.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleUsersClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  {user.firstName} {user.lastName}
                  <br />
                  <p style={{
                color: "gray",
                fontSize: "12px",
                marginTop:'-3px',
                marginBottom:'-3px',

              }}>{user?.role?.join(", ")}</p>
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

export default UsersListModal