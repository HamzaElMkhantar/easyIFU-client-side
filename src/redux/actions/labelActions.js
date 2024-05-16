import axios from 'axios';
import {ALL_LABELS_FAILED, 
        ALL_LABELS_REQUEST, 
        ALL_LABELS_RESET, 
        ALL_LABELS_SUCCESS, 
        CREATE_LABEL_FAILED, 
        CREATE_LABEL_REQUEST, 
        CREATE_LABEL_RESET, 
        CREATE_LABEL_SUCCESS, 
        GET_LABEL_FAILED, 
        GET_LABEL_REQUEST,
        GET_LABEL_RESET,
        GET_LABEL_SUCCESS} from '../constants/labelConstants';

export const getAllLabelsAction = (productId, companyId, createdBy, token) => async (dispatch) => {
    try {

      dispatch({ type: ALL_LABELS_REQUEST });


      const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/labels-company-by-user/${productId}/${companyId}/${createdBy}`, config);
      console.log(response.data)
  
      dispatch({ type: ALL_LABELS_SUCCESS, 
                payload: response.data });
      setTimeout(() =>{
        dispatch({ 
          type: ALL_LABELS_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: ALL_LABELS_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: ALL_LABELS_RESET
          });
        }, 1500)
    }
};

export const getLabelAction = (labelId, token) => async (dispatch) => {
  try {

  
      dispatch({ 
          type: GET_LABEL_REQUEST
      });

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/${labelId}`, config);

      dispatch({ 
          type: GET_LABEL_SUCCESS, 
          payload: response.data
      });
      setTimeout(() =>{
      dispatch({ 
          type: GET_LABEL_RESET
      });
      }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: GET_LABEL_FAILED, 
          payload: error?.response?.data 
      });

      setTimeout(() =>{
          dispatch({ 
          type: GET_LABEL_RESET
          });
      }, 1500)
      }
  };

  export const createLabelAction = (labelData, token) => async (dispatch) => {
    try {
        console.log(labelData)
    
        dispatch({ 
            type: CREATE_LABEL_REQUEST
        });
  
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/create-label`, {labelData}, config);
      console.log(response.data)
        dispatch({ 
            type: CREATE_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: CREATE_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: CREATE_LABEL_FAILED, 
            payload: error?.response?.data 
        });
  
        setTimeout(() =>{
            dispatch({ 
            type: CREATE_LABEL_RESET
            });
        }, 1500)
        }
    };