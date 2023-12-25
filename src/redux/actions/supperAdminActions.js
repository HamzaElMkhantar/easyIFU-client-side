import axios from 'axios';
import { COMPANIES_SUPPER_ADMIN_FAILED, 
        COMPANIES_SUPPER_ADMIN_REQUEST,
        COMPANIES_SUPPER_ADMIN_RESET,
        COMPANIES_SUPPER_ADMIN_SUCCESS, 
        CONTACTS_SUPPER_ADMIN_FAILED, 
        CONTACTS_SUPPER_ADMIN_REQUEST,
        CONTACTS_SUPPER_ADMIN_RESET,
        CONTACTS_SUPPER_ADMIN_SUCCESS, 
        DELETE_COMPANY_SUPPER_ADMIN_FAILED, 
        DELETE_COMPANY_SUPPER_ADMIN_REQUEST, 
        DELETE_COMPANY_SUPPER_ADMIN_RESET, 
        DELETE_COMPANY_SUPPER_ADMIN_SUCCESS, 
        DELETE_CONTACT_SUPPER_ADMIN_FAILED, 
        DELETE_CONTACT_SUPPER_ADMIN_REQUEST, 
        DELETE_CONTACT_SUPPER_ADMIN_RESET, 
        DELETE_CONTACT_SUPPER_ADMIN_SUCCESS, 
        DELETE_PROJECT_SUPPER_ADMIN_FAILED, 
        DELETE_PROJECT_SUPPER_ADMIN_REQUEST, 
        DELETE_PROJECT_SUPPER_ADMIN_RESET, 
        DELETE_PROJECT_SUPPER_ADMIN_SUCCESS, 
        DELETE_USER_SUPPER_ADMIN_FAILED, 
        DELETE_USER_SUPPER_ADMIN_REQUEST, 
        DELETE_USER_SUPPER_ADMIN_RESET, 
        DELETE_USER_SUPPER_ADMIN_SUCCESS, 
        GET_COMPANY_SUPPER_ADMIN_FAILED, 
        GET_COMPANY_SUPPER_ADMIN_REQUEST, 
        GET_COMPANY_SUPPER_ADMIN_RESET, 
        GET_COMPANY_SUPPER_ADMIN_SUCCESS, 
        GET_CONTACT_SUPPER_ADMIN_FAILED, 
        GET_CONTACT_SUPPER_ADMIN_REQUEST,
        GET_CONTACT_SUPPER_ADMIN_RESET,
        GET_CONTACT_SUPPER_ADMIN_SUCCESS,
        GET_PROJECT_SUPPER_ADMIN_FAILED,
        GET_PROJECT_SUPPER_ADMIN_REQUEST,
        GET_PROJECT_SUPPER_ADMIN_RESET,
        GET_PROJECT_SUPPER_ADMIN_SUCCESS,
        GET_USER_SUPPER_ADMIN_FAILED,
        GET_USER_SUPPER_ADMIN_REQUEST,
        GET_USER_SUPPER_ADMIN_RESET,
        GET_USER_SUPPER_ADMIN_SUCCESS,
        PERMISSION_COMPANY_SUPPER_ADMIN_FAILED,
        PERMISSION_COMPANY_SUPPER_ADMIN_REQUEST,
        PERMISSION_COMPANY_SUPPER_ADMIN_RESET,
        PERMISSION_COMPANY_SUPPER_ADMIN_SUCCESS,
        PROJECTS_SUPPER_ADMIN_FAILED,
        PROJECTS_SUPPER_ADMIN_REQUEST,
        PROJECTS_SUPPER_ADMIN_RESET,
        PROJECTS_SUPPER_ADMIN_SUCCESS,
        USERS_SUPPER_ADMIN_FAILED,
        USERS_SUPPER_ADMIN_REQUEST,
        USERS_SUPPER_ADMIN_RESET,
        USERS_SUPPER_ADMIN_SUCCESS} from '../constants/supperAdminConstants';
import Cookies from 'js-cookie';
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from '../constants/authConstants';

  export const adminRegisterAction = (userInfo) => async (dispatch) => {
    try {
      console.log(userInfo)
  
      dispatch({ type: REGISTER_REQUEST });
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/admin-register`, userInfo);
      console.log(response.data)
  
  
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      setTimeout(() =>{
        dispatch({ 
          type: 'REGISTER_RESET'
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: REGISTER_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: 'REGISTER_RESET'
          });
        }, 1500)
      }
  };
        
  export const adminLoginAction = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/login`, {
            email,
            password,
          });
  
      // Store the access token and refresh token in cookies
      Cookies.set('eIfu_ATK', response.data.accessToken);
      Cookies.set('eIfu_RTK', response.data.refreshToken); // Set the expiration time as needed
      dispatch({ 
          type: LOGIN_SUCCESS, 
          payload: response.data 
        });
      setTimeout(() =>{
        dispatch({ 
          type: 'LOGIN_RESET'
        });
      }, 1500)
    } catch (error) {
  
      dispatch({
          type: LOGIN_FAILED, 
          payload: error.response });
      setTimeout(() =>{
        dispatch({ 
          type: 'LOGIN_RESET'
        });
      }, 1500)
    }
  };


export const contactsAction = (token) => async (dispatch) => {
  try {
    dispatch({ 
        type: CONTACTS_SUPPER_ADMIN_REQUEST 
    });

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/contacts`, config);

    dispatch({ 
        type: CONTACTS_SUPPER_ADMIN_SUCCESS, 
        payload: data 
    });
    setTimeout(() =>{
      dispatch({ 
        type: CONTACTS_SUPPER_ADMIN_RESET
      });
    }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: CONTACTS_SUPPER_ADMIN_FAILED, 
          payload: error?.response?.data 
        });
      setTimeout(() =>{
        dispatch({ 
          type: CONTACTS_SUPPER_ADMIN_RESET
        });
      }, 1500)
    }
};

export const contactByIdAction = (contactId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: GET_CONTACT_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/contact-by-id/${contactId}`, config);
  
      dispatch({ 
          type: GET_CONTACT_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: GET_CONTACT_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_CONTACT_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: GET_CONTACT_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const deleteContactAction = (contactId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: DELETE_CONTACT_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/delete-contact/${contactId}`, config);
  
      dispatch({ 
          type: DELETE_CONTACT_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_CONTACT_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_CONTACT_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_CONTACT_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

//   company actions
export const companiesAction = (token) => async (dispatch) => {
    try {
      dispatch({ 
          type: COMPANIES_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/companies`, config);
  
      dispatch({ 
          type: COMPANIES_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: COMPANIES_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: COMPANIES_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: COMPANIES_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const companyByIdAction = (companyId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: GET_COMPANY_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/company-by-id/${companyId}`, config);
  
      dispatch({ 
          type: GET_COMPANY_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: GET_COMPANY_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_COMPANY_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: GET_COMPANY_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const changeCompanyPermissionAction = (companyId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: PERMISSION_COMPANY_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/company-permission/${companyId}`, config);
  
      dispatch({ 
          type: PERMISSION_COMPANY_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: PERMISSION_COMPANY_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PERMISSION_COMPANY_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: PERMISSION_COMPANY_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const deleteCompanyAction = (contactId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: DELETE_COMPANY_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/delete-contact/${contactId}`, config);
  
      dispatch({ 
          type: DELETE_COMPANY_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_COMPANY_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_COMPANY_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_COMPANY_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

//   user actions
export const usersAction = (token) => async (dispatch) => {
    try {
      dispatch({ 
          type: USERS_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/users`, config);
  
      dispatch({ 
          type: USERS_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: USERS_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: USERS_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: USERS_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const userByIdAction = (userId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: GET_USER_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/user-by-id/${userId}`, config);
  
      dispatch({ 
          type: GET_USER_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: GET_USER_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_USER_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: GET_USER_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const deleteUserAction = (userId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: DELETE_USER_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/delete-user/${userId}`, config);
  
      dispatch({ 
          type: DELETE_USER_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_USER_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_USER_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_USER_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

//   project actions
export const projectsAction = (token) => async (dispatch) => {
    try {
      dispatch({ 
          type: PROJECTS_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/projects`, config);
  
      dispatch({ 
          type: PROJECTS_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: PROJECTS_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PROJECTS_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: PROJECTS_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const projectByIdAction = (projectId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: GET_PROJECT_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/project-by-id/${projectId}`, config);
  
      dispatch({ 
          type: GET_PROJECT_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: GET_PROJECT_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_PROJECT_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: GET_PROJECT_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };

  export const deleteProjectAction = (projectId, token) => async (dispatch) => {
    try {
      dispatch({ 
          type: DELETE_PROJECT_SUPPER_ADMIN_REQUEST 
      });
  
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
          const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/supper-admin/delete-project/${projectId}`, config);
  
      dispatch({ 
          type: DELETE_PROJECT_SUPPER_ADMIN_SUCCESS, 
          payload: data 
      });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_PROJECT_SUPPER_ADMIN_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_PROJECT_SUPPER_ADMIN_FAILED, 
            payload: error?.response?.data 
          });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_PROJECT_SUPPER_ADMIN_RESET
          });
        }, 1500)
      }
  };