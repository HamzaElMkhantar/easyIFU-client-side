import axios from 'axios';
import { BaseUrl } from '../../config';
import {CREATE_USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_RESET, CREATE_USER_SUCCESS, DELETE_USER_FAILED, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_RESET, GET_USER_SUCCESS, TOGGLE_STATUS_USER_FAILED, TOGGLE_STATUS_USER_REQUEST, TOGGLE_STATUS_USER_RESET, TOGGLE_STATUS_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USERS_COMPANY_FAILED, 
        USERS_COMPANY_REQUEST, 
        USERS_COMPANY_RESET, 
        USERS_COMPANY_SUCCESS 
    } from '../constants/userConstants';
import Cookies from 'js-cookie';


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

        const {data} = await axios.get(`${BaseUrl}/api/v1/user/companyUsers/${companyId}/${userId}`);

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
      dispatch({ 
          type: GET_USER_REQUEST 
      });

      console.log(userId)
  
      const config = {
          headers: { 
              'Authorization': `Bearer ${token}`
          }
      }
   
  
      const {data} = await axios.get(`${BaseUrl}/api/v1/user/getUser/${userId}` , config);
      console.log(data)
      dispatch({ 
          type: GET_USER_SUCCESS,
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: GET_USER_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type:GET_USER_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: GET_USER_RESET
          });
        }, 1500)
      }
  };

  export const UpdateUserAction = (userInfo, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: UPDATE_USER_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
      const {data} = await axios.post(`${BaseUrl}/api/v1/user/update`, userInfo, config);
      console.log(data)
        Cookies.set('eIfu_ATK', data.accessToken);
      dispatch({ 
          type: UPDATE_USER_SUCCESS,
          payload: data.user
      });
      setTimeout(() =>{
        dispatch({ 
          type: UPDATE_USER_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type:UPDATE_USER_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: UPDATE_USER_RESET
          });
        }, 1500)
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
      const {data} = await axios.post(`${BaseUrl}/api/v1/user/userStatus`, ids, config);
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
      const {data} = await axios.delete(`${BaseUrl}/api/v1/user/delete`, config);
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
      const {data} = await axios.post(`${BaseUrl}/api/v1/user/create`, userInfo, config);
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