import axios from 'axios';
import {CREATE_USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_RESET, CREATE_USER_SUCCESS, DELETE_USER_FAILED, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_RESET, GET_USER_SUCCESS, TOGGLE_STATUS_USER_FAILED, TOGGLE_STATUS_USER_REQUEST, TOGGLE_STATUS_USER_RESET, TOGGLE_STATUS_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USERS_COMPANY_FAILED, 
        USERS_COMPANY_REQUEST, 
        USERS_COMPANY_RESET, 
        USERS_COMPANY_SUCCESS 
    } from '../constants/userConstants';


export const usersCompanyAction = (user, token) => async (dispatch) => {
  try {
    dispatch({ 
        type: USERS_COMPANY_REQUEST 
    });

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    // console.log(user)
    const userId = user._id;
    const companyId = user.companyId

        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/companyUsers/${companyId}/${userId}`, config);

    dispatch({ 
        type: USERS_COMPANY_SUCCESS, 
        payload: data 
    });
    setTimeout(() =>{
      dispatch({ 
        type: USERS_COMPANY_RESET
      });
    }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: USERS_COMPANY_FAILED, 
          payload: error?.response?.data 
        });
      setTimeout(() =>{
        dispatch({ 
          type: USERS_COMPANY_RESET
        });
      }, 1500)
    }
};

export const getUserAction = (userId, token) => async (dispatch) => {
  try {

    console.log({userId, token})
      dispatch({ 
          type: GET_USER_REQUEST 
      });

      console.log('Fetching user with ID:', userId);

      const config = {
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies
      };

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/getUser/${userId}`, config);
      console.log('Response:', res);

      dispatch({ 
          type: GET_USER_SUCCESS,
          payload: res.data 
      });

      setTimeout(() => {
          dispatch({ 
              type: GET_USER_RESET 
          });
      }, 1500);
  } catch (error) {
      console.error('Error fetching user:', error);
      dispatch({
          type: GET_USER_FAILED, 
          payload: error?.response?.data || error.message,
      });

      setTimeout(() => {
          dispatch({ 
              type: GET_USER_RESET 
          });
      }, 1500);
  }
};


export const UpdateUserAction = (userInfo, token) => async (dispatch) => {
  try {

    console.log({userInfo, token})
      dispatch({ 
          type: UPDATE_USER_REQUEST 
      });

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies
      };

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update`, userInfo, config);
      console.log('Response:', res);

      dispatch({ 
          type: UPDATE_USER_SUCCESS,
          payload: res.data.user
      });

      setTimeout(() => {
          dispatch({ 
              type: UPDATE_USER_RESET 
          });
      }, 1500);
  } catch (error) {
      console.error('Error updating user:', error);
      dispatch({
          type: UPDATE_USER_FAILED, 
          payload: error?.response?.data || error.message,
      });

      setTimeout(() => {
          dispatch({ 
              type: UPDATE_USER_RESET 
          });
      }, 1500);
  }
};


  export const toggleStatusUserAction = (ids, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: TOGGLE_STATUS_USER_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
      const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/userStatus`, ids, config);
      console.log(data)
      dispatch({ 
          type: TOGGLE_STATUS_USER_SUCCESS,
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: TOGGLE_STATUS_USER_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: TOGGLE_STATUS_USER_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: TOGGLE_STATUS_USER_RESET
          });
        }, 1500)
      }
  };

  export const deleteUserAction = (ids, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: DELETE_USER_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          },
          data: ids
      }
      const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/user/delete`, config);
      console.log(data)
      dispatch({ 
          type: DELETE_USER_SUCCESS,
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_USER_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_USER_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_USER_RESET
          });
        }, 1500)
      }
  };


  export const createUserAction = (userInfo, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: CREATE_USER_REQUEST
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
      const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/create`, userInfo, config);
      console.log(data)
      dispatch({ 
          type: CREATE_USER_SUCCESS,
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: CREATE_USER_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_USER_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: CREATE_USER_RESET
          });
        }, 1500)
      }
  };