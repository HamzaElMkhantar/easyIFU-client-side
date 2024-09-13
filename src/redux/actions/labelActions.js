import axios from '../axios';
import {ALL_LABELS_FAILED, 
        ALL_LABELS_REQUEST, 
        ALL_LABELS_RESET, 
        ALL_LABELS_SUCCESS, 
        APPROVED_LABEL_FAILED, 
        APPROVED_LABEL_REQUEST, 
        APPROVED_LABEL_RESET, 
        APPROVED_LABEL_SUCCESS, 
        APPROVE_LABEL_FAILED, 
        APPROVE_LABEL_REQUEST, 
        APPROVE_LABEL_RESET, 
        APPROVE_LABEL_SUCCESS, 
        CREATE_LABEL_FAILED, 
        CREATE_LABEL_REQUEST, 
        CREATE_LABEL_RESET, 
        CREATE_LABEL_SUCCESS, 
        DRAFT_LABEL_FAILED, 
        DRAFT_LABEL_REQUEST, 
        DRAFT_LABEL_RESET, 
        DRAFT_LABEL_SUCCESS, 
        GET_LABEL_FAILED, 
        GET_LABEL_REQUEST,
        GET_LABEL_RESET,
        GET_LABEL_SUCCESS,
        GET_TEMPLATES_FAILED,
        GET_TEMPLATES_REQUEST,
        GET_TEMPLATES_RESET,
        GET_TEMPLATES_SUCCESS,
        LABEL_LOGS_FAILED,
        LABEL_LOGS_REQUEST,
        LABEL_LOGS_RESET,
        LABEL_LOGS_SUCCESS,
        LOT_GENERATOR_REQUEST,
        LOT_GENERATOR_SUCCESS,
        LOT_GENERATOR_FAILED,
        LOT_GENERATOR_RESET,
        REJECTED_LABEL_FAILED,
        REJECTED_LABEL_REQUEST,
        REJECTED_LABEL_RESET,
        REJECTED_LABEL_SUCCESS,
        RELEASE_LABEL_FAILED,
        RELEASE_LABEL_REQUEST,
        RELEASE_LABEL_RESET,
        RELEASE_LABEL_SUCCESS,
        SAVE_ORDER_LABEL_FAILED,
        SAVE_ORDER_LABEL_REQUEST,
        SAVE_ORDER_LABEL_RESET,
        SAVE_ORDER_LABEL_SUCCESS,
        SEND_TO_APPROVER_FAILED,
        SEND_TO_APPROVER_REQUEST,
        SEND_TO_APPROVER_RESET,
        SEND_TO_APPROVER_SUCCESS,
        SEND_TO_RELEASER_FAILED,
        SEND_TO_RELEASER_REQUEST,
        SEND_TO_RELEASER_RESET,
        SEND_TO_RELEASER_SUCCESS,
        TO_PRINT_LABEL_FAILED,
        TO_PRINT_LABEL_REQUEST,
        TO_PRINT_LABEL_RESET,
        TO_PRINT_LABEL_SUCCESS} from '../constants/labelConstants';

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

export const createLabelAction = ( labelData, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: CREATE_LABEL_REQUEST
        });
  
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/create-label`, {labelData}, config);
      console.log(response)
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

export const sendToApproverAction = (data, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: SEND_TO_APPROVER_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/sent-to-approver`, data, config);
        console.log(response.data)
        dispatch({ 
            type: SEND_TO_APPROVER_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: SEND_TO_APPROVER_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: SEND_TO_APPROVER_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: SEND_TO_APPROVER_RESET
            });
        }, 1500)
        }
};

export const approveLabelAction = (data, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: APPROVE_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/approver-label`, data, config);
        console.log(response.data)
        dispatch({ 
            type: APPROVE_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: APPROVE_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: APPROVE_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: APPROVE_LABEL_RESET
            });
        }, 1500)
        }
};

export const sendToReleaserAction = (data, token) => async (dispatch) => {
    try {
        
        dispatch({ 
            type: SEND_TO_RELEASER_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/sent-to-releaser`, data, config);
        console.log(response.data)
        dispatch({ 
            type: SEND_TO_RELEASER_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: SEND_TO_RELEASER_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: SEND_TO_RELEASER_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: SEND_TO_RELEASER_RESET
            });
        }, 1500)
    }
};

export const releaseLabelAction = (data, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: RELEASE_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/release-label`, data, config);

        dispatch({ 
            type: RELEASE_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: RELEASE_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: RELEASE_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: RELEASE_LABEL_RESET
            });
        }, 1500)
    }
};

export const drafLabelsAction = ({companyId, productId: projectId, createdBy}, token) => async (dispatch) => {
    try {



        dispatch({ 
            type: DRAFT_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/draft/${projectId}/${companyId}/${createdBy}`, config);
        console.log(response.data)
        dispatch({ 
            type: DRAFT_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: DRAFT_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DRAFT_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: DRAFT_LABEL_RESET
            });
        }, 1500)
    }
};

export const approvedLabelsAction = ({productId, companyId, createdBy}, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: APPROVED_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/approved/${productId}/${companyId}/${createdBy}`, config);
        console.log(response.data)
        dispatch({ 
            type: APPROVED_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: APPROVED_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: APPROVED_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: APPROVED_LABEL_RESET
            });
        }, 1500)
    }
};

export const rejectedLabelsAction = ({productId, companyId, createdBy}, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: REJECTED_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/rejected/${productId}/${companyId}/${createdBy}`, config);

        dispatch({ 
            type: REJECTED_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: REJECTED_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: REJECTED_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: REJECTED_LABEL_RESET
            });
        }, 1500)
    }
};


export const saveLabelOrderAction = (data, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: SAVE_ORDER_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/save-order`, data, config);
        console.log(response.data)
        dispatch({ 
            type: SAVE_ORDER_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: SAVE_ORDER_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: SAVE_ORDER_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: SAVE_ORDER_LABEL_RESET
            });
        }, 1500)
    }
};

export const LabelsTemplateAction = (data, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: GET_TEMPLATES_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/template-labels/${data.companyId}/${data.userId}?searchWords=${data?.searchWords ? data.searchWords : ''}`, config);
        console.log(response.data)
        dispatch({ 
            type: GET_TEMPLATES_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: GET_TEMPLATES_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_TEMPLATES_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: GET_TEMPLATES_RESET
            });
        }, 1500)
    }
};

export const saveToPrintAction = (data, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: TO_PRINT_LABEL_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/save-to-print`, data, config);
        console.log(response.data)
        dispatch({ 
            type: TO_PRINT_LABEL_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: TO_PRINT_LABEL_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: TO_PRINT_LABEL_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: TO_PRINT_LABEL_RESET
            });
        }, 1500)
    }
};

export const getLabelLogsAction = (labelId, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: LABEL_LOGS_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/label-logs/${labelId}`, config);
        console.log(response.data)
        dispatch({ 
            type: LABEL_LOGS_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: LABEL_LOGS_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: LABEL_LOGS_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: LABEL_LOGS_RESET
            });
        }, 1500)
    }
};

export const generateLotNumberAction = (data, token) => async (dispatch) => {
    try {

        dispatch({ 
            type: LOT_GENERATOR_REQUEST
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/lotNumber-generator`, data, config);
        console.log(response.data)
        dispatch({ 
            type: LOT_GENERATOR_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: LOT_GENERATOR_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: LOT_GENERATOR_FAILED, 
            payload: error?.response?.data 
        });
    
        setTimeout(() =>{
            dispatch({ 
            type: LOT_GENERATOR_RESET
            });
        }, 1500)
    }
};
