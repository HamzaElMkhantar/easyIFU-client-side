import axios from 'axios';
import { BaseUrl } from '../../config';
import { GET_COMPANY_FAILED, 
        GET_COMPANY_REQUEST, 
        GET_COMPANY_RESET, 
        GET_COMPANY_SUCCESS, 
        PAYMENT_COMPANY_FAILED, 
        PAYMENT_COMPANY_REQUEST, 
        PAYMENT_COMPANY_RESET, 
        PAYMENT_COMPANY_SUCCESS, 
        PRICES_COMPANY_FAILED, 
        PRICES_COMPANY_REQUEST, 
        PRICES_COMPANY_RESET, 
        PRICES_COMPANY_SUCCESS, 
        UPDATE_COMPANY_FAILED, 
        UPDATE_COMPANY_REQUEST,
        UPDATE_COMPANY_RESET,
        UPDATE_COMPANY_SUCCESS} from '../constants/companyConstants';

export const getCompanyInfoAction = (companyId, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: GET_COMPANY_REQUEST
        });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company/${companyId}`, config);

        dispatch({ 
            type: GET_COMPANY_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: GET_COMPANY_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_COMPANY_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: GET_COMPANY_RESET
            });
        }, 1500)
        }
};

export const updateCompanyInfoAction = (data, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: UPDATE_COMPANY_REQUEST
        });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/company/update`, data, config);

        dispatch({ 
            type: UPDATE_COMPANY_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: UPDATE_COMPANY_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: UPDATE_COMPANY_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: UPDATE_COMPANY_RESET
            });
        }, 1500)
        }
};

export const paymentCompanyAction = (data, token) => async (dispatch) => {
    try {
    
        dispatch({ 
            type: PAYMENT_COMPANY_REQUEST
        });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/company/subscription-payment`, data, config);

        dispatch({ 
            type: PAYMENT_COMPANY_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: PAYMENT_COMPANY_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PAYMENT_COMPANY_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: PAYMENT_COMPANY_RESET
            });
        }, 1500)
        }
};

export const paymentPricesCompanyAction = () => async (dispatch) => {
    try {
    
        dispatch({ 
            type: PRICES_COMPANY_REQUEST
        });
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/company/subscription-prices`);

        dispatch({ 
            type: PRICES_COMPANY_SUCCESS, 
            payload: response.data.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: PRICES_COMPANY_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PRICES_COMPANY_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: PRICES_COMPANY_RESET
            });
        }, 1500)
        }
};