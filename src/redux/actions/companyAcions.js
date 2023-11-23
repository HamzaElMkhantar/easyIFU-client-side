import axios from 'axios';
import { BaseUrl } from '../../config';
import { GET_COMPANY_FAILED, 
        GET_COMPANY_REQUEST, 
        GET_COMPANY_RESET, 
        GET_COMPANY_SUCCESS } from '../constants/companyConstants';

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
    
        const response = await axios.get(`${BaseUrl}/api/v1/company/${companyId}`, config);

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